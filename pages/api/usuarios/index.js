import Usuario from '../../../models/Usuario';
import dbConnect from '../../../util/dbConnect';

dbConnect();

const assert = require('assert');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const jwtSecret = 'SUPERSECRETE20220';

const saltRounds = 10;

function findUser(email, callback) {
    Usuario.findOne({ email }, callback);
}

async function createUser(email, password, callback) {
    const caixa = await createCaixa();

    bcrypt.hash(password, saltRounds, function (err, hash) {
        // Store hash in your password DB.
        Usuario.create(
            {
                email,
                password: hash,
                caixa
            },
            function (err, userCreated) {
                assert.strictEqual(err, null);
                callback(userCreated);
            }
        );
    });
    console.log('usuário criado com sucesso!');
}

const createCaixa = async () => {
    try {
        const newCaixa = newBodyCaixa();

        const res = await fetch(`${process.env.API_URL}/api/caixa`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCaixa)
        });

        return newCaixa._id;
    } catch (err) {
        console.error(err);
    }
};

const newBodyCaixa = () => {
    const caixa = {};

    caixa._id = mongoose.Types.ObjectId();
    caixa.saldoTotal = 0;
    caixa.movimentacoes = [];

    console.log('CAIXA ID');
    console.log(caixa._id);

    return caixa;
};

export default (req, res) => {
    if (req.method === 'POST') {
        // signup
        try {
            assert.notStrictEqual(null, req.body.email, 'Email é necessário');
            assert.notStrictEqual(null, req.body.password, 'Senha é necessária');
        } catch (bodyError) {
            res.status(403).json({ error: true, message: bodyError.message });
        }

        const email = req.body.email;
        const password = req.body.password;

        findUser(email, function (err, user) {
            if (err) {
                res.status(500).json({ error: true, message: 'Erro ao encontrar usuário' });
                return;
            }
            if (!user) {
                console.log('email nao existe');
                // procede para a criação de usuário
                createUser(email, password, function (creationResult) {
                    console.log('creationResult');
                    console.log(creationResult);
                    if (
                        !(
                            Object.keys(creationResult).length === 0 &&
                            creationResult.constructor === Object
                        )
                    ) {
                        const user = creationResult;
                        console.log('token');
                        const token = jwt.sign({ userId: user._id, email: user.email }, jwtSecret, {
                            expiresIn: 3000 //50 minutos
                        });
                        console.log(token);
                        res.status(200).json({ token });
                        return;
                    }
                });
            } else {
                // Usuário já existe
                res.status(403).json({ error: true, message: 'Email já existe!' });
                return;
            }
        });
    }
};

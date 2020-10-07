import Usuario from '../../models/Usuario';

import dbConnect from '../../util/dbConnect';

dbConnect();

const assert = require('assert');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = 'SUPERSECRETE20220';

const saltRounds = 10;

function findUser(email, callback) {
    Usuario.findOne({ email }, callback);
}

function authUser(email, password, hash, callback) {
    bcrypt.compare(password, hash, callback);
}

export default (req, res) => {
    if (req.method === 'POST') {
        //login
        try {
            assert.notStrictEqual(null, req.body.email, 'Email necessário');
            assert.notStrictEqual(null, req.body.password, 'Senha necessária');
        } catch (bodyError) {
            res.status(403).send(bodyError.message);
        }

        const email = req.body.email;
        const password = req.body.password;

        findUser(email, function (err, user) {
            if (err) {
                res.status(500).json({ error: true, message: 'Erro ao encontrar usuário' });
                return;
            }
            if (!user) {
                res.status(404).json({ error: true, message: 'Usuário não encontrado!' });
                return;
            } else {
                authUser(email, password, user.password, function (err, match) {
                    if (err) {
                        res.status(500).json({ error: true, message: 'Falha na autenticação' });
                    }
                    if (match) {
                        const token = jwt.sign(
                            { userId: user._id, email: user.email },
                            jwtSecret,
                            {
                                expiresIn: 3000, //50 minutos
                            },
                        );
                        res.status(200).json({ token });
                        return;
                    } else {
                        res.status(401).json({ error: true, message: 'Falha na autenticação' });
                        return;
                    }
                });
            }
        });

    } else {
        // Handle any other HTTP method
        res.statusCode = 401;
        res.end();
    }
};

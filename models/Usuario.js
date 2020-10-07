const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'O seu usuário deve ter um e-mail!']
        },
        password: {
            type: String,
            required: [true, 'O seu usuário deve ter uma senha!']
        },
        caixa: {
            type: ObjectId
        }
    },
    {
        versionKey: false
    }
);

module.exports =
    mongoose.models.Usuario || mongoose.model('Usuario', UsuarioSchema, 'usuarios');

const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const CaixaSchema = new mongoose.Schema(
    {
        // _id: {
        //     type: ObjectID
        // },
        saldoTotal: {
            type: Number,
            required: [true, 'Por favor, adicione um valor númerico para o saldo do seu caixa']
        },
        movimentacoes: [
            {
                data: {
                    type: Date,
                    required: true,
                    default: Date.now()
                },
                id: {
                    type: String,
                    required: true
                },
                categoria: {
                    type: ObjectId,
                    ref: 'Categoria'
                },
                tipo: {
                    type: String,
                    required: true
                },
                valor: {
                    type: Number,
                    required: true
                },
                descricao: {
                    type: String
                }
            }
        ]
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.models.Caixa || mongoose.model('Caixa', CaixaSchema, 'caixa');

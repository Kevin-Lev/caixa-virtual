const mongoose = require('mongoose')

const CategoriaSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A sua categoria deve ter um nome!']
        }
    },
    {
        versionKey: false
    }
)

module.exports =
    mongoose.models.Categoria || mongoose.model('Categoria', CategoriaSchema, 'categorias')

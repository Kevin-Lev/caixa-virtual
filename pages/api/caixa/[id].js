import dbConnect from '../../../util/dbConnect'
import Caixa from '../../../models/Caixa'
import Categoria from '../../../models/Categoria'
import moment from 'moment'

dbConnect()

const isMovimentacaoDia = (mov) =>
    moment(mov.data).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req

    switch (method) {
        case 'GET':
            try {
                let caixa = await Caixa.findById(id)

                if (!caixa) {
                    return res.status(400).json({ success: false })
                }

                // Filtrar quais são as movimentações do dia
                for (let i = 0; i < caixa.movimentacoes.length; i++) {
                    if (!isMovimentacaoDia(caixa.movimentacoes[i])) {
                        caixa.movimentacoes.splice(i, 1)
                        i -= 1
                        continue
                    }

                    const cat = await Categoria.findById(caixa.movimentacoes[i].categoria)

                    caixa.movimentacoes[i].categoria = cat
                }

                res.status(200).json({ success: true, data: caixa })
            } catch (error) {
                console.error('GET request: ' + error)
                res.status(400).json({ success: false })
            }
            break
        case 'PUT':
            try {
                const caixa = await Caixa.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                })

                if (!caixa) {
                    return res.status(400).json({ success: false })
                }
            } catch (error) {
                console.error('PUT request' + error)
                res.status(400).json({ sucess: false })
            }
            break
    }
}

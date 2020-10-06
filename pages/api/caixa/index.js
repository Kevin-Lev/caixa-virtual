import dbConnect from '../../../util/dbConnect';
import Caixa from '../../../models/Caixa';

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const caixas = await Caixa.find({});
                res.status(200).json({ success: true, data: caixas });
            } catch (error) {
                console.error(error);
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const newCaixa = await Caixa.create(req.body);

                res.status(201).json({ success: true, data: newCaixa });
            } catch (error) {
                console.error(error);
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
};

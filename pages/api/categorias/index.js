import dbConnect from '../../../util/dbConnect';
import Categoria from '../../../models/Categoria';

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const categorias = await Categoria.find({});
                res.status(200).json({ success: true, data: categorias });
            } catch (error) {
                console.error(error);
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const newCategoria = await Categoria.create(req.body);

                res.status(201).json({ success: true, data: newCategoria });
            } catch (error) {
                console.error(error);
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
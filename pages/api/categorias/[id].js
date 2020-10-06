import dbConnect from '../../../util/dbConnect';
import Categoria from '../../../models/Categoria';

dbConnect();

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req;

    switch (method) {
        case 'GET':
            try {
                const categoria = await Categoria.findById(id);

                if (!categoria) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: categoria });
            } catch (error) {
                console.error('GET request: ' + error);
                res.status(400).json({ sucess: false });
            }
            break;
        case 'PUT':
            try {
                const categoria = await Categoria.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if (!categoria) {
                    return res.status(400).json({ success: false });
                }
            } catch (error) {
                console.error('PUT request' + error);
                res.status(400).json({ sucess: false });
            }
            break;
    }
};

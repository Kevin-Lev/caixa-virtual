import dbConnect from '../../../util/dbConnect';
import Caixa from '../../../models/Caixa';

dbConnect();

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req;

    switch (method) {
        case 'GET':
            try {
                const caixa = await Caixa.findById(id);

                if (!caixa) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: caixa });
            } catch (error) {
                console.error('GET request: ' + error);
                res.status(400).json({ sucess: false });
            }
            break;
        case 'PUT':
            try {
                const caixa = await Caixa.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if (!caixa) {
                    return res.status(400).json({ success: false });
                }
            } catch (error) {
                console.error('PUT request' + error);
                res.status(400).json({ sucess: false });
            }
            break;
        }
}
import dbConnect from '../../../util/dbConnect';
import Usuario from '../../../models/Usuario';

dbConnect();

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req;

    switch (method) {
        case 'GET':
            try {
                const usuario = await Usuario.findById(id);

                if (!usuario) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: usuario });
            } catch (error) {
                console.error('GET request: ' + error);
                res.status(400).json({ sucess: false });
            }
            break;
        case 'PUT':
            try {
                const usuario = await Usuario.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if (!usuario) {
                    return res.status(400).json({ success: false });
                }
            } catch (error) {
                console.error('PUT request' + error);
                res.status(400).json({ sucess: false });
            }
            break;
    }
};

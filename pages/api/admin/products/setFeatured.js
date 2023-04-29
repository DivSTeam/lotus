import { getSession } from 'next-auth/react';
import Product from '../../../../models/Product';
import db from '../../../../utils/db';

const handler = async (req, res) => {

    const session = await getSession({ req });
    if (!session || !session.user.isAdmin) {
        return res.status(401).send('admin signin required');
    }
    const {
        query: { id },
        method,
    } = req;

    switch (method) {
        case "PUT":
            try {
                await db.connect();
                const product = await Product.findById(id);

                if (!product) {
                    return res
                        .status(404)
                        .json({ success: false, message: "Product not found" });
                }

                product.isFeatured = true;

                await product.save();
                await db.disconnect();
                return res
                    .status(200)
                    .json({ success: true, message: "Product set as featured" });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ success: false, message: error.message });
            }
        default:
            return res.status(405).json({ success: false });
    }
};

export default handler;

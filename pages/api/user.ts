import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

interface RequestBodyParams {
    name: string,
    email: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { name, email }: RequestBodyParams = JSON.parse(req.body);

    if (req.method === 'PUT') {
        const data = await prisma.user.update({
            data: {
                name
            },
            where: {
                email
            }
        })
        console.log(data);
    }

    return res.status(400).json({ message: 'Nothing happened.' });
}

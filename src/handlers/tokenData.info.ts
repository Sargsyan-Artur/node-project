import jwt from "jsonwebtoken";


export async function getToken(req: any) {
    const authHeader: string = req.headers['authorization'] || req.headers['Authorization'] || req.body['token'];

    const token: string = authHeader && authHeader.split(' ')[1];

    const secret_key: string = process.env.SECRET_KEY as string;
    return await jwt.verify(token, secret_key) as { exp: number, id: string };
}   
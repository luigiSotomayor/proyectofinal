import jwt from 'jsonwebtoken';

const { sign, verify } = jwt;

const generateSign = (id) => {
    return sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

const verifySign = (token) => {
    return verify(token, process.env.JWT_SECRET);
}

export { generateSign, verifySign };
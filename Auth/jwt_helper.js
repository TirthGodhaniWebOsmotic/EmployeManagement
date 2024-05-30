const JWT = require('jsonwebtoken');
const createError = require('http-errors');
require('dotenv').config();

const generateToken = (payload, secret, options) => {
    return new Promise((resolve, reject) => {
        JWT.sign(payload, secret, options, (err, token) => {
            if (err) {
                console.error(err.message);
                reject(createError.InternalServerError());
            }
            resolve(token);
        });
    });
};

const verifyToken = (token, secret) => {
    return new Promise((resolve, reject) => {
        JWT.verify(token, secret, (err, payload) => {
            if (err) {
                if (err.name === 'JsonWebTokenError') {
                    reject(createError.Unauthorized());
                } else {
                    reject(createError.Unauthorized(err.message));
                }
            } else {
                resolve(payload);
            }
        });
    });
};

module.exports = {
    signAccessToken: (userId) => {
        const payload = {};
        const secret = process.env.ACCESS_TOKEN_SECRET;
        const options = {
            expiresIn: "30m",
            issuer: "testMine.com",
            audience: userId
        };
        console.log({payload, secret, options});
        return generateToken(payload, secret, options);
    },

    verifyAccessToken: async (req, res, next) => {
        try {
            if (!req.headers['authorization']) {
                throw createError.Unauthorized();
            }

            const authHeader = req.headers['authorization'];
            const bearerToken = authHeader.split(" ");
            const token = bearerToken[1];

            const payload = await verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
            req.payload = payload;
            next();
        } catch (error) {
            next(error);
        }
    },

    signRefreshToken: (userId) => {
        const payload = {};
        const secret = process.env.REFRESH_TOKEN_SECRET;
        const options = {
            expiresIn: "30m",
            issuer: "testMine.com",
            audience: userId
        };

        return generateToken(payload, secret, options);
    },

    verifyRefreshToken: async (refreshToken) => {
        try {
            const payload = await verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const userId = payload.aud;
            return userId;
        } catch (error) {
            throw createError.Unauthorized();
        }
    }
};

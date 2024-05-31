const createError = require('http-errors');
const User = require('./user.model');
const {authSchema} = require('./auth_schema');
const {signAccessToken, signRefreshToken, verifyRefreshToken} = require('./jwt_helper')

module.exports = {

    registerUser: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const result = await authSchema.validate(req.body);

            if (result.error) {
                const errorMessage = result.error.details[0].message;
                throw createError.BadRequest(errorMessage);
            }
            const existingUser = await User.findOne({email});
            if (existingUser) {
                throw createError.Conflict(`${email} is already registered.`);
            }
            const newUser = new User({email, password});
            const savedUser = await newUser.save();

            const accessToken = await signAccessToken(savedUser.id);
            const refreshToken = await signRefreshToken(savedUser.id);
            // console.log({accessToken});
            res.send({accessToken, refreshToken});
        } catch (err) {
            next(err);
        }
    },

    loginUser: async (req, res, next) => {
        try {
            const result = await authSchema.validateAsync(req.body);
            const user = await User.findOne({email: result.email});
            if (!user) throw createError.NotFound("User Not Registered");
            const isMatch = await user.isValidPassword(result.password)
            if (!isMatch) throw createError.Unauthorized('Username/password not valid');
            const accessToken = await signAccessToken(user.id)
            const refreshToken = await signRefreshToken(user.id);
            // console.log({accessToken, refreshToken});
            res.send({accessToken, refreshToken});
        } catch (error) {
            if (error.isJoi === true) return next(createError.BadRequest("Invalid Username/Password"))
            next(error);
        }
    },
    refreshToken: async (req, res, next) => {
        try {
            const {refreshToken} = req.body;
            if (!refreshToken) throw createError.BadRequest()
            const userId = await verifyRefreshToken(refreshToken);
            const accessToken = await signAccessToken(userId);
            const refToken = await signRefreshToken(userId);
            res.send({accessToken: accessToken, refreshToken: refToken})
        } catch (err) {
            next(err);
        }
    }
}

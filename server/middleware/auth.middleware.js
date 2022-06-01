const jwt = require("jsonwebtoken")
const config = require("config")

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') return next()

    try {
        const token = req.headers.authorization.split(' ')[1]

        if (!token) return res.status(401).json({status: 'error', message: 'Auth error'})

        const decode = jwt.verify(token, config.get('jwtSecretKey'))
        req.user = decode
        next()
    } catch (error) {
        return res.status(401).json({status: 'error', message: 'Auth error'})
    }
}
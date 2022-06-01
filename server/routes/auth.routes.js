const Router = require("express")
const bcrypt = require("bcryptjs")
const {check, validationResult} = require("express-validator")
const jwt = require("jsonwebtoken")
const config = require("config")

const User = require("../models/User")

const router = new Router()

router.post('/registration', [
        check('email', "Неверный e-mail").isEmail(),
        check('pass', "Пароль должен быть не менее 8 символов и не более 25").isLength(8, 25)
    ],

    async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({status: 'error', message: "Ошибка запроса", errors})
        }

        const {email, pass} = req.body
        const candidate = await User.findOne({email})

        if (candidate) {
            return res.status(400).json({status: 'error', message: "Пользователь с таким e-mail уже существует"})
        }

        const passHash = await bcrypt.hash(pass, 5)
        const user = new User({email, pass: passHash})
        await user.save()

        return res.json({status: 'success', message: "Пользователь успешно создан"})
    } catch (error) {
        console.log("Ошибка сервера");
        res.send({status: 'error', message: "Ошибка сервера"})
    }
})

router.post('/login', async (req, res) => {
    try {
        const {email, pass} = req.body
        const user = await User.findOne({email})

        if (!user) {
            return res.status(404).json({status: 'error', message: "Пользователь не найден"})
        }

        const isPassValid = await bcrypt.compare(pass, user.pass)
        if (!isPassValid) {
            return res.status(404).json({status: 'error', message: "Неверный пароль"})
        }

        const token = jwt.sign({id: user.id}, config.get("jwtSecretKey"), {expiresIn: "1h"})

        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                plan: user.plan,
                usedSpace: user.usedSpace,
                avatar: user.avatar
            }
        })
    } catch (error) {
        console.log("Ошибка сервера");
        res.send({status: 'error', message: "Ошибка сервера"})
    }
})

module.exports = router
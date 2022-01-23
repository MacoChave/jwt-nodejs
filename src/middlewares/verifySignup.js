import { ROLES } from "../models/role"
import user from "../models/user"

export const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).json({ message: `${req.body.roles[i]} does not exist` })
            }
        }
    }

    next()
}

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    const userFound = await user.findOne({ username: req.body.username })
    if (userFound) return res.status(400).json({ message: 'The user already exists' })

    const emailFound = await user.findOne({ email: req.body.email })
    if (emailFound) return res.status(400).json({ message: 'The email already exists' })

    next()
}
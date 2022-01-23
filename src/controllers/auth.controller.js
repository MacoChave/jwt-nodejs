import jwt from "jsonwebtoken";
import user from "../models/user"
import role from "../models/role"
import config from '../config'

export const signUp = async (req, res) => {
    const { username, email, password, roles } = req.body

    const userFound = user.find({ email })

    const newUser = new user({
        username,
        email,
        password: user.encryptPassword(password)
    })

    if (roles) {
        const foundRoles = await role.find({ name: { $in: roles } })
        newUser.roles = foundRoles.map(role => role._id)
    } else {
        const foundRole = await role.findOne({ name: 'user' })
        newUser.roles = [foundRole._id]
    }

    const savedUser = await newUser.save()

    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
        expiresIn: 86400 // 24h
    })

    res.status(200).json({ token })

}

export const signIn = async (req, res) => {
    const userFound = await user.findOne({ email: req.body.email }).populate('roles')

    if (!userFound) return res.status(400).json({ message: 'User not found' })

    const matchPassword = await user.comparePassword(req.body.password, userFound.password)

    if (!matchPassword) return res.status(401).json({ token: null, message: 'Invalid password' })

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
        expiresIn: 86400
    })

    res.json({ token })
}
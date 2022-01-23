import jwt from "jsonwebtoken"
import config from "../config"
import role from "../models/role"
import user from "../models/user"

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token']

        if (!token) return res.status(403).json({ message: 'No token provided' })

        const decoded = jwt.verify(token, config.SECRET)
        req.userId = decoded.id

        const userFound = await user.findById(req.userId, { password: 0 })

        if (!userFound) return res.status(404).json({ message: 'No user found' })

        next()
    } catch (error) {
        console.error(error)
        res.status(401).json({ message: 'Unauthorized' })
    }
}

export const isModerator = async (req, res, next) => {
    const userFound = await user.findById(req.userId)
    const roles = await role.find({ _id: { $in: userFound.roles } })

    console.log({ roles })

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'moderator') {
            next()
            return
        }
    }

    return res.status(403).json({ message: 'Require moderator role' })
}

export const isAdmin = async (req, res, next) => {
    const userFound = await user.findById(req.userId)
    const roles = await role.find({ _id: { $in: userFound.roles } })

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin') {
            next()
            return
        }
    }

    return res.status(403).json({ message: 'Require admin role' })
}
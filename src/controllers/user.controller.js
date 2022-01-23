import role from "../models/role"
import user from "../models/user"

export const createUser = async (req, res) => {
    const { username, email, password, roles } = req.body

    const newUser = new user({
        username,
        email,
        password: user.encrypPassword(password)
    })

    if (roles) {
        const foundRoles = await role.find({ name: { $in: roles } })
        newUser.roles = foundRoles.map(role => role._id)
    } else {
        const foundRole = await role.findOne({ name: 'user' })
        newUser.roles = [foundRole]
    }

    const savedUser = await newUser.save()

    res.status(200).json({ message: 'User created' })
}
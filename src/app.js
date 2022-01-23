import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'
import productsRoutes from './routes/products.routes'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import { createRoles } from './libs/initialSetup'

const app = express()
createRoles()

app.set('pkg', pkg)
app.set('port', process.env.PORT || 3000)
app.set('json spaces', 4)

app.use(express.json())
app.use(morgan('dev'))

// Welcome Routes
app.get('/', (req, res) => {
    res.json(
        {
            name: pkg.name,
            description: pkg.description,
            version: pkg.version,
            author: pkg.author,
            license: pkg.license
        }
    )
})

// Routes
app.use('/api/products', productsRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

export default app
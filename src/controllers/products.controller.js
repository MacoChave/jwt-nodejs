import product from "../models/product"

export const createProduct = async (req, res) => {
    const { name, category, price, imageUrl } = req.body

    const newProduct = new product({ name, category, price, imageUrl })
    const productSaved = await newProduct.save()
    res.status(201).json(productSaved)
}

export const getProducts = async (req, res) => {
    const products = await product.find()
    res.status(200).json(products)
}

export const getProductById = async (req, res) => {
    const product = await product.findById(req.params.productId)
    res.status(200).json(product)
}

export const updateProductById = async (req, res) => {
    const updatedProduct = await product.findByIdAndUpdate(req.params.productId, req.body, {
        new: true
    })
    res.status(200).json(updatedProduct)
}

export const deletProductById = async (req, res) => {
    const { productId } = req.params;
    await product.findByIdAndDelete(productId)
    res.status(200).json()
}

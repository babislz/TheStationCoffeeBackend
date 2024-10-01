const { Product } = require('../model/product');

class ProductController {
    static async create(req, res) {
        const { name, category, price } = req.body;
        let image;

        if (req.file) {
            image = req.file.path;
        }

        try {
            const productExists = await Product.findOne({ name });
            if (productExists) {
                return res.status(422).json({ message: 'O produto já existe.' });
            }

            const prod = new Product({
                name,
                category,
                price,
                image,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                removedAt: null
            });

            const newProduct = await Product.create(prod);
            return res.status(201).json({ message: 'Produto criado com sucesso.', product: newProduct });

        } catch (error) {
            return res.status(500).json({ message: 'Algo deu errado.', data: error.message });
        }
    }

    static async getProdById(req, res) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'ID do produto não fornecido.' });
        }

        try {
            const product = await Product.findById(id);

            if (!product) {
                return res.status(404).json({ message: 'Produto não encontrado.' });
            }
            return res.status(200).json(product);

        } catch (error) {
            return res.status(500).json({ message: 'Não foi possível encontrar o produto.', data: error.message });
        }
    }

    static async getAllProducts(req, res) {
        try {
            const products = await Product.find(); 
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao buscar produtos.', data: error.message });
        }
    }

    static async deleteProductById(req, res) {
        const { id } = req.params;
    
        if (!id) {
            return res.status(400).json({ message: 'ID do produto não fornecido.' });
        }
    
        try {
            const product = await Product.findById(id); 
    
            if (!product) {
                return res.status(404).json({ message: 'Produto não encontrado.' });
            }
    
            await Product.findByIdAndDelete(id);
    
            return res.status(200).send({ message: 'Produto deletado com sucesso.' });
        } catch (error) {
            return res.status(500).json({ message: 'Não foi possível deletar o produto.', data: error.message });
        }
    }

    static async deleteAllProducts(req, res) {
        try {
            await Product.deleteMany();
            return res.status(200).send({ message: 'Produtos deletados com sucesso.' });
        } catch (error) {
            return res.status(500).json({ message: 'Não foi possível deletar os produtos.', data: error.message });
        }
    }
    
    
    static async updateProdById(req, res) {
        const { id } = req.params;
        const { name, category, price } = req.body;
        let image;
    
        if (req.file) {
            image = req.file.path;
        }
    
        if (!id) {
            return res.status(400).json({ message: 'ID do produto não fornecido.' });
        }
    
        try {
            const product = await Product.findById(id);
            
            if (!product) {
                return res.status(404).json({ message: 'Produto não encontrado.' });
            }
    
            const updatedProduct = {
                name,
                category,
                price,
                updatedAt: Date.now(),
                removedAt: null
            };
    
            if (image) {
                updatedProduct.image = image;
            }
    
            await Product.findByIdAndUpdate(id, updatedProduct);
            return res.status(200).send({ message: 'Produto modificado com sucesso.' });
        } catch (error) {
            return res.status(500).json({ message: 'Não foi possível modificar o produto.', data: error.message });
        }
    }    
}

module.exports = ProductController;

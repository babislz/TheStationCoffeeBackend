const Prod = require('../model/product');

class ProductController {
    static async create(req, res) {
        const { name, category, price } = req.body;

        try {
            const productExists = await Prod.findOne({ name });
            if (productExists) {
                return res.status(422).json({ message: 'O produto já existe.' });
            }

            const prod = new Prod({
                name,
                category,
                price,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                removedAt: null
            });

            const newProduct = await Prod.create(prod);
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
            const product = await Prod.findById(id);

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
            const products = await Prod.find(); 
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao buscar produtos.', data: error.message });
        }
    }
    static async deleteProductById(req, res) {
        try {
            const { _id } = req.params;
        } catch (error) {
            
        }
    }
}

module.exports = ProductController;

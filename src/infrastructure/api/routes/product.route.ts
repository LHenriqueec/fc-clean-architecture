import express, { Request, Response } from 'express';
import ListProductUseCase from '../../../usecase/product/list/list.product.usecase';
import ProductRepository from '../../product/repository/sequelize/product.repository';
import CreateProductUseCase from '../../../usecase/product/create/create.product.usecase';

export const productRoute = express.Router();

productRoute.get('/', async (req: Request, res: Response) => {
    const usecase = new ListProductUseCase(new ProductRepository());
    const output = await usecase.execute({});

    res.send(output);
});

productRoute.post('/', async (req: Request, res: Response) => {
    try {
        const usecase = new CreateProductUseCase(new ProductRepository());
        
        const { name, price } = req.body;
        const output = await usecase.execute({ name, price });

        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});
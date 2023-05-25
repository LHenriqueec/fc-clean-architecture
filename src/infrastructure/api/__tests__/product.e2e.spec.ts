import { app, sequelize } from '../express';
import request from 'supertest';

describe('E2E test for product', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should create product', async () => {
        const product = { name: 'Product A', price: 73.5 };
        const response = await request(app)
            .post('/product')
            .send(product);
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id')
        expect(response.body.name).toBe(product.name)
        expect(response.body.price).toBe(product.price)
    });

    it('should list products', async () => {
        let response = await request(app)
            .post('/product')
            .send({ name: 'Product A', price: 73.5 });
        expect(response.status).toBe(200);

        response = await request(app).get('/product').send();

        expect(response.status).toBe(200);
        expect(response.body.products.length).toBe(1);
    });
});
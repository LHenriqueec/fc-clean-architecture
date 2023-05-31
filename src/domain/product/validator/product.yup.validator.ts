import * as yup from 'yup';

import Product from '../entity/product';
import ValidatorInterface from '../../@shared/validator/validator.interface';

export default class ProductYupValidator implements ValidatorInterface<Product> {
    validate(product: Product): void {
        try {
            yup.object()
                .shape({
                    id: yup.string().required('Id is required'),
                    name: yup.string().required('Name is required'),
                    price: yup.number().moreThan(0, 'Price must be greater than zero')
                })
                .validateSync(product, { abortEarly: false })
        } catch (errors) {
            const e = errors as yup.ValidationError;
            e.errors.forEach(error => product.notification.addError({
                context: 'Product',
                message: error
            }))
        }
    }
}
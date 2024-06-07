import { check, body, validationResult } from 'express-validator';


export const emailPasswordValidator = [
    body('email', 'Invalid does not Empty').not().isEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('password', 'The minimum password length is 6 characters').isLength({min: 6}),
];



  export const createProductValidator = [
    body('title', 'Title can not be Empty, should contain only alpha-numeric and should be more than 5 characters long').not().isEmpty().isLength({min: 6}).matches(/^[a-zA-Z0-9 ]+$/i),
    body('description', 'Description can not be Empty should contain only alpha-numeric and should be more than 5 characters long').not().isEmpty().isLength({min: 6}).matches(/^[a-zA-Z0-9 ]+$/i),
    body('price', 'Price can not be Empty and should be a valid number').not().isEmpty().isNumeric(),
    body('imageUrl', 'Image url can not be Empty').not().isEmpty().isLength({min: 6}),
  ];


  
  export const createCartValidator = [
    body('productId', 'Product Id can not be Empty and should be a valid number').not().isEmpty().isNumeric(),
    body('quantity', 'Quantity can not be Empty and should be a valid number').not().isEmpty().isNumeric(),
  ];


  
  export const addressValidator = [
    body('city', 'City can not be Empty, and should be more than 2 characters long').not().isEmpty().isLength({min: 3}),
    body('state', 'State can not be Empty and should be more than 2 characters long').not().isEmpty().isLength({min: 3}),
    body('pinCode', 'Pin code can not be Empty and should be a valid number').not().isEmpty().isNumeric().isLength(6),
    body('phone', 'Phone can not be Empty should be 10 characters long').not().isEmpty().isLength(10),
  ];

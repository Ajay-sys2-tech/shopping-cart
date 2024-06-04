import { check, body, validationResult } from 'express-validator';


export const emailPasswordValidator = [
    body('email', 'Invalid does not Empty').not().isEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('password', 'The minimum password length is 6 characters').isLength({min: 6}),
];



  export const createProductValidator = [
    body('title', 'Title can not be Empty and should be more than 5 characters long').not().isEmpty().isLength({min: 6}).isAlphanumeric(),
    body('description', 'Description can not be Empty and should be more than 5 characters long').not().isEmpty().isLength({min: 6}).isAlphanumeric(),
    body('price', 'Price can not be Empty and should be a valid number').not().isEmpty().isNumeric(),
    body('imageUrl', 'Image url can not be Empty').not().isEmpty().isLength({min: 6}),
  ];

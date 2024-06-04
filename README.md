# shopping-cart

# live url: https://shopping-cart-qkas.onrender.com

POST  /user/register  ---> for user registration
POST  /user/login  ---> for user login


POST  /admin/register  ---> for admin registration
POST  /admin/login  ---> for admin login

GET     /products   ---> to get all the products
GET     /products/productId  ---> to get the product by Id
POST    /products   ---> to add a new product
PATCH   /products/productId   ---> to update a product
DELETE  /products/productId  ---> to delete a product by its Id

GET   /cart   ---> get cart items
POST  /cart   ---> add product to cart
DELETE /checkout  ---> to check out from the cart
DELETE /cart/cartItemId  ---> delete a product from the cart

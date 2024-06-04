# shopping-cart

# live url: https://shopping-cart-qkas.onrender.com

POST  /user/register  ---> for user registration <br /> 
POST  /user/login  ---> for user login <br /> 


POST  /admin/register  ---> for admin registration <br /> 
POST  /admin/login  ---> for admin login <br /> 

GET     /products   ---> to get all the products <br /> 
GET     /products/productId  ---> to get the product by Id <br /> 
POST    /products   ---> to add a new product <br /> 
PATCH   /products/productId   ---> to update a product <br /> 
DELETE  /products/productId  ---> to delete a product by its Id <br /> 

GET   /cart   ---> get cart items <br /> 
POST  /cart   ---> add product to cart <br /> 
DELETE /checkout  ---> to check out from the cart <br /> 
DELETE /cart/cartItemId  ---> delete a product from the cart

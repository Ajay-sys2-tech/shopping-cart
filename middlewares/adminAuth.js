import jwt from 'jsonwebtoken';
import { getAdminUser } from '../repository/userRepo.js';
import 'dotenv/config';

export const verifyAdmin = async (req, res, next) => {
    // const {authorization} = req.headers;
    // const token = authorization?.split(" ")[1];
    const token = req.cookies.admin_token;

    if (!token) {
        res.status(401).json({error: 'You are not authorized'});
        return
    } 

    try {
        const payload = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
        
        if (payload) {
          const admin = await getAdminUser();
         
          req['admin'] = admin;
          next()
        } else {
            res.status(403).json({error: 'Forbidden'});
        }
      } catch (err) {
        console.log('Error ', err)
        res.status(403).json({error: 'Forbidden'});
      }
     
}
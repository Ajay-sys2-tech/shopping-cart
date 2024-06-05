import jwt from 'jsonwebtoken';
import { getUserById } from '../repository/userRepo.js';
import 'dotenv/config';

export const verifyUser = async (req, res, next) => {
    // const {authorization} = req.headers;
    // const token = authorization?.split(" ")[1];

    const token = req.cookies.user_token;

    if (!token) {
        res.status(401).json({error: 'You are not authorized'});
        return
    } 

    try {
        const payload = jwt.verify(token, process.env.JWT_USER_SECRET);
        
        if (payload) {
          const user = await getUserById(payload.id)
          req['user'] = user;
          next()
        } else {
            res.status(401).json({error: 'You are not authorized'});
        }
      } catch (err) {
        console.log('Error ', err)
        res.status(401).json({error: 'You are not authorized'});
      }
     
}
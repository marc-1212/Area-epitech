import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const config = require('../config/auth.config');

class JWT {
    verifyToken(req: Request, res: Response, next: NextFunction) {
        console.log("Session control cookie:");
        console.log('Cookies: ', req.cookies.token)
        console.log(req.cookies.sessionControl);

        const token = req.cookies.token;
        if(!token){
            return res.status(401).send({ success: false, message: "Unauthorized" })
        }

        // const token = authHeader.split(" ")[1];
        jwt.verify(token, config.secret, (err: any, decoded: any) => {
            console.log(decoded);
            if (err) {
                return res
                .status(403)
                .send({ success: false, message: "Token Expired" })
            }
            console.log("VERIFIED")

            if (req.params.userId) {
                if (decoded.user.id != req.params.userId) {
                    return res
                    .status(401)
                    .send({ success: false, message: "Unauthorized" }) 
                }
            }
            console.log("AUTHORIZED")

            next();
        });
    }
  }

export default new JWT();

import { Request, response, Response } from 'express';
import { default as bcrypt } from 'bcryptjs';
import moment from 'moment';
import axios from 'axios';
const jwt = require("jsonwebtoken");
const config = require('../config/auth.config');

// DB
import { Query } from '../database'

export function login(req: Request, res: Response) {
  let pas: string = String(req.query.password)
  let query = 'SELECT * FROM user WHERE email = ?';

  Query(query, [req.query.email]).then((result) => {
    if (!result.length) {
      return res.status(401).json({
        message: "Incorrect email or password.",
      });
    }

    if (result[0].is_google == 1) {
      return res.status(401).json({
        message: "Login with google",
      });
    }

    if (bcrypt.compareSync(pas, result[0]['password_hash'])) { // check password
      let query = `UPDATE user SET last_connection = now() WHERE id = ?`;
      Query(query, [result[0].id])
        .then(() => {
          let id = result[0].id;
          const user = {
            id: result[0].id,
            name: result[0].name + " " + result[0].surname,
            email: result[0].email,
          };
          const token = jwt.sign({
            user
          },
            config.secret, {
            expiresIn: 3000
          });
          console.log("token: ", token)
          /*return res.header('auth-token', token).json({
              user
          })*/
          //maxAge in milliseconds
          res.cookie("token", token, { maxAge: 90000000 })
          return res.status(200).json({
            id
          });
        });
    } else {
      return res.status(401).json({
        message: "Incorrect email or password.",
      });
    }
  })
    .catch((error) => {
      return res.status(401).json({
        message: error.message,
        error: error,
      });
    });
}

export function log(req: Request, res: Response) {
  let query = 'INSERT INTO log (userId, message, creator) VALUES (?, ?, ?)';

  Query(query, [req.query.userId, req.query.message, req.query.from])
    .then((result) => {
      return res.status(200).json({
        status: 'OK',
        result: result
      });
    })
    .catch((error) => {
      return res.status(401).json({
        message: error.message,
        error: error,
      });
    });
}

export async function fetchLogs(req: Request, res: Response) {
  let query = 'SELECT * FROM log WHERE userId = ?';
  console.log(req.query.userId);
  Query(query, [req.query.userId])
    .then((result) => {
      console.log(result);
      return res.status(200).json({
        result
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(401).json({
        message: error.message,
        error: error,
      });
    });
}

export async function clearLogs(req: Request, res: Response) {
  let query = 'DELETE FROM log WHERE userId = ?';
  Query(query, [req.query.userId])
    .then((result) => {
      console.log(result);
      return res.status(200).json({
        result
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(401).json({
        message: error.message,
        error: error,
      });
    });
}

export function logout(req: Request, res: Response) {
  return res.cookie('token', "", { maxAge: 0, httpOnly: true }).status(200).json({});
}

export function loginGoogle(req: Request, res: Response) {
  let pas: string = String(req.query.password)
  let query = 'SELECT * FROM user WHERE email = ?';

  Query(query, [req.query.email])
  .then(async (result) => {
    if (result.length) {
      let id = result[0].id;
      const user = {
        id: result[0].id,
        name: "Google User",
        email: result[0].email,
      };
      const token = jwt.sign({
        user
      },
      config.secret, {
        expiresIn: 3000
      });
      console.log("token: ", token)
      res.cookie("token", token, { maxAge: 90000000 })
      return res.status(200).json({
        id
      });
    } else {
      let insert_query = 'INSERT INTO user (email, last_connection, is_google) VALUES (?, ?, ?)';
      Query(insert_query, [req.query.email, moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'), 1])
      .then((result) => {
        let queryTwo = 'SELECT * FROM user';

        Query(queryTwo, [])
        .then(async (resultats) => {
            let id = resultats.length;
            const user = {
              id: resultats.length,
              name: "Google User",
              email: resultats[0].email,
            };
            const token = jwt.sign({
              user
            },
            config.secret, {
              expiresIn: 3000
            });
            console.log("token: ", token)
            res.cookie("token", token, { maxAge: 90000000 })
            return res.status(200).json({
              id
            });
        });
      }
      ).catch((error) => {
        return res.status(401).json({
            message: error.message,
            error: error,
        });
      });
    }
  });
}

export function register(req: Request, res: Response) {
  let pas: string = String(req.query.password)
  let query = 'SELECT * FROM user WHERE email = ?';

  Query(query, [req.query.email])
    .then(async (result) => {
        if (result.length) {
          return res.status(401).json({
            message: "Email already in use. Please use a different email.",
          });
        } else {
          // Email is available
          const salt = await bcrypt.genSalt(config.salt_rounds);
          
          bcrypt.hash(pas, salt, (err, hash) => {
            if (err) {
              return res.status(500).send({
                msg: err
              });
            } else {
              // has hashed pw => add to database
              let insert_query = 'INSERT INTO user (email, name, surname, password_hash, salt, last_connection, is_google) VALUES (?, ?, ?, ?, ?, ?, ?)';
              Query(insert_query, [req.query.email, req.query.name, req.query.surname, hash, salt, moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'), 0])
              .then((result) => {
                return res.status(201).send({
                  msg: 'Registered!'
                });
              }
              ).catch((error) => {
                return res.status(401).json({
                  message: error.message,
                  error: error,
                });
              });
          }
        });
      }
    });
}

export async function reddit(req: Request, res: Response) {
  const encoded_header = Buffer.from(req.query.client + ':' + req.query.secret).toString("base64");
  const headers = {
    Authorization: `Basic ${encoded_header}`
  }
  let response = await axios.post("https://www.reddit.com/api/v1/access_token?scope=submit&grant_type=authorization_code&code=" + req.query.code + "&redirect_uri=http://localhost:8081/reddit/callback", null, { headers });
  console.log(response.data.access_token);
  let token = response.data.access_token;

  let request: any = await axios.get("https://oauth.reddit.com/api/v1/me", { headers: { Authorization: "Bearer " + token } });

  const q = "UPDATE user SET reddit_token = ? WHERE id = ?"
  Query(q, [token, req.query.userId])
    .then((result) => {
      return res.status(201).send({
        msg: token
      });
    }
    ).catch((error) => {
      console.log(error);
      return res.status(401).json({
        message: error.message,
        error: error,
      });
    });
}
import { Request, Response } from 'express';
import { default as bcrypt } from 'bcryptjs';
import moment from 'moment';
import { Actions } from '../classes/actions/actions';

const jwt = require("jsonwebtoken");
const config = require('../config/auth.config');

// DB
import { Query } from '../database'

export async function fetchCards(req: Request, res: Response) {
    let query = 'SELECT * FROM actioncard WHERE userId = ?';
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

export async function fetchId(req: Request, res: Response) {
    let query = 'SELECT cards FROM user WHERE id = ?';
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

export async function addCard(req: Request, res: Response) {
    let q = req.query;
    let query = 'INSERT INTO actioncard \
    (userId, serviceAction, serviceReaction, action, reaction, message, webhook, botToken, frequency, specificMessage, status, jokeChannel, tokenCheckMessage, subreddit, redditDescription, redditTitle, redditWebhook, city, weatherChannel, cityAction, player, riotKey) \
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    Query(query,[q.userId, '', '', '', '', '', '', '', null, '', 0, '', '', '', '', '', '', '', '', '', '', ''])
    .then((result) => {
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

export function activateCard(req: Request, res: Response) {
    const actions = new Actions;
    const action: string = String(req.query.action);
    let query = "SELECT status FROM actioncard WHERE id = ?";
    Query(query, [req.query.id]).then((results) => {
        if (results[0].status === 0) {
            console.log('launching action');
            actions.launcher(req.query);
            let updateQuery = "UPDATE actioncard SET status = '1' where id = ?";
            Query(updateQuery, [req.query.id]).then((results) => {
                return res.status(200).json({
                    status: 1
                });
            }).catch((error) => {
                console.log(error)
                return res.status(200).json({
                    status: 0
                });
            });
        }
    })
    .catch((error) => {
        return res.status(200).json({
            message: error.message,
            status: 0,
            error
        });
    });
}

export function deactivateCard(req: Request, res: Response) {
    let query = "SELECT status FROM actioncard WHERE id = ?";
    Query(query, [req.query.id]).then((results) => {
        if (results[0].status === 1) {
            let updateQuery = "UPDATE actioncard SET status = '0' where id = ?";
            Query(updateQuery, [req.query.id]).then((results) => {
                return res.status(200).json({
                    status: 0
                });
            }).catch((error) => {
                console.log(error)
                return res.status(200).json({
                    status: 1
                });
            });
        }
    })
    .catch((error) => {
        return res.status(200).json({
            message: error.message,
            status: 0,
            error
        });
    });
}

export async function removeCard(req: Request, res: Response) {
    let q = req.query;
    let query = 'DELETE FROM actioncard WHERE id = ?';
    Query(query,[q.cardId])
    .then((result) => {
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

export async function updateCardAction(req: Request, res: Response) {
    let q = req.query;
    if (q.field && q.value) {
        let query = 'UPDATE actioncard SET serviceAction = ?, action = ?,' + q.field + '= ? WHERE id = ? AND userId = ?';
        Query(query,[q.serviceAction, q.action, q.value, q.id, q.userId])
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
    } else {
        let query = 'UPDATE actioncard SET serviceAction = ?, action = ? WHERE id = ? AND userId = ?';
        Query(query,[q.serviceAction, q.action, q.id, q.userId])
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
}

export async function updateCardReaction(req: Request, res: Response) {
    let q = req.query;
    if (q.field && q.value) {
        let query = 'UPDATE actioncard SET serviceReaction = ?, reaction = ?,' + q.field + '= ? WHERE id = ? AND userId = ?';
        Query(query,[q.serviceReaction, q.reaction, q.value, q.id, q.userId])
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
    } else {
        let query = 'UPDATE actioncard SET serviceReaction = ?, reaction = ? WHERE id = ? AND userId = ?';
        Query(query,[q.serviceReaction, q.reaction, q.id, q.userId])
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
}

export async function redditAuth(req: Request, res: Response) {
    let query = 'SELECT reddit_token FROM user WHERE id = ?';
    Query(query,[req.query.userId])
    .then((result) => {
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
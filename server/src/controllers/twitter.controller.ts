import { Request, Response } from 'express';
import { WebhookClient } from 'discord.js';
const twitterWebhooks = require('twitter-webhooks');

// DB
import { Query } from '../database'

const schedule = require('node-schedule');
let job: any;

export function activateTwitter(req: Request, res: Response) {
    const message = req.query.message;
    const channel = req.query.channel;

    let query = "SELECT connected FROM service WHERE name='twitter'";
    Query(query, []).then((results) => {
        if (results[0].connected === 0) {
            const userActivityWebhook = twitterWebhooks.userActivity({
                serverUrl: 'localhost:8081',
                route: '/twitter/webhook', //default : '/'
                consumerKey: '[YOUR CONSUMER KEY]',
                consumerSecret: '[YOUR CONSUMER SECRET]',
                accessToken: '[YOUR APP ACCESS TOKEN]',
                accessTokenSecret: '[YOUR APP ACCESS TOKEN SECRET]',
                environment: 'env-beta', //default : 'env-beta'
            });
            userActivityWebhook.register();

            userActivityWebhook.subscribe({
                userId: '[TWITTER USER ID]',
                accessToken: '[TWITTER USER ACCESS TOKEN]',
                accessTokenSecret: '[TWITTER USER ACCESS TOKEN SECRET]'
            })
            .then(function (userActivity: any) {
                userActivity
                .on('favorite', (data: any) => console.log (userActivity.id + ' - favorite'))
                .on ('tweet_create', (data: any) => console.log (userActivity.id + ' - tweet_create'))
                .on ('follow', (data: any) => console.log (userActivity.id + ' - follow'))
                .on ('mute', (data: any) => console.log (userActivity.id + ' - mute'))
                .on ('revoke', (data: any) => console.log (userActivity.id + ' - revoke'))
                .on ('direct_message', (data: any) => console.log (userActivity.id + ' - direct_message'))
                .on ('direct_message_indicate_typing', (data: any) => console.log (userActivity.id + ' - direct_message_indicate_typing'))
                .on ('direct_message_mark_read', (data: any) => console.log (userActivity.id + ' - direct_message_mark_read'))
                .on ('tweet_delete', (data: any) => console.log (userActivity.id + ' - tweet_delete'))
            });
        }
    })
    .catch((error) => {
        return res.status(200).json({
            message: error.message,
            error
        });
    });

    query = "UPDATE service SET connected='1' WHERE name='twitter'";
    Query(query, []).then((results) => {
        return res.status(200).json({
            'connected': 1
        });
    })
    .catch((error) => {
        return res.status(200).json({
            message: error.message,
            error
        });
    });
}

export function deactivateTwitter(req: Request, res: Response) {
    const query = "UPDATE service SET connected='0' WHERE name='twitter'";
    Query(query, []).then((results) => {
        job.cancel();
        return res.status(200).json({
            'connected': null
        });
    })
    .catch((error) => {
        return res.status(200).json({
            message: error.message,
            error
        });
    });
}

export function fetchTwitterStatus(req: Request, res: Response) {
    const query = "SELECT connected FROM service WHERE name='twitter'";
    Query(query, []).then((results) => {
        if (results == 0) {
            results == null;
        }
        return res.status(200).json({
            results
        });
    })
    .catch((error) => {
        return res.status(200).json({
            message: error.message,
            error
        });
    });
}

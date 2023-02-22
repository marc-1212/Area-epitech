import { Request, Response } from 'express';
import { WebhookClient } from 'discord.js';
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
import { Actions } from '../classes/actions/actions';
import { Query } from '../database'

export function activateCard(req: Request, res: Response) {
    const actions = new Actions;
    const action: string = String(req.query.action);
    let query = "SELECT connected FROM service WHERE name='discord'";
    Query(query, []).then((results) => {
        if (results[0].connected === 0) {
            console.log('launching action');
            actions.launcher(req.query);
        }
    })
    .catch((error) => {
        return res.status(200).json({
            message: error.message,
            error
        });
    });

    query = "UPDATE service SET connected='1' WHERE name='discord'";
    Query(query, []).then((rWebhookClientesults) => {
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

export function deactivateCard(req: Request, res: Response) {
    const actions = new Actions;
    const query = "UPDATE service SET connected='0' WHERE name='discord'";
    Query(query, []).then((results) => {
        actions.launcher({
            action_serice: "timer",
            action: "cancel_timer"
        });
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

export function fetchDiscordStatus(req: Request, res: Response) {
    const query = "SELECT connected FROM service WHERE name='discord'";
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

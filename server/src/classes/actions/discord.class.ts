import { WebhookClient } from 'discord.js';
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
import { TextChannel } from 'discord.js';
import { Reactions } from '../reactions/reactions';
import { Query } from '../../database'

export class DiscordActions {
    schedule: any;
    timer: any;
    frenchTimer: any;
    launch: any;

    //constructor
    constructor() {
        this.launch = {};
        this.launch["cancel_time"] = this.cancelTimer;
        this.launch["test"] = this.test;
        this.launch["discord_timer"] = this.discord_timer;
        this.launch["FrenchInChat"] = this.discord_frenchInChat;
        this.launch["SpecificMessage"] = this.discord_checkSpecificMessage;
    }


    static sendWebhookNotFound(payload: any) {
        console.log("invalid token");
        let query = 'INSERT INTO log (userId, message, creator) VALUES (?, ?, ?)';
        Query(query, [payload.userId, "INVALID BOT TOKEN", "DISCORD"])
            .then((result) => {
            })
            .catch((error) => {
            })
    }
    // actions
    discord_timer(payload: any) { //message spammer
        let reaction = new Reactions;
        this.schedule = require('node-schedule');
        console.log('timer set up');
        this.timer = this.schedule.scheduleJob("*/5 * * * * *", function () { reaction.launcher(payload) });
    }

    discord_frenchInChat(payload: any) { //catch french people lacking in the chat
        let reaction = new Reactions;
        const client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent
            ],
        });

        client.once('ready', (c: any) => {
            console.log(`Ready! Logged in as ${c.user.tag}`);
        });


        client.login(payload.botToken).catch((error: any) => {
            DiscordActions.sendWebhookNotFound(payload);
            console.log('invalid bot token')
            return;
        })
        console.log('bot logged in');

        client.on('messageCreate', async (message: any) => {
            console.log('fetching messages');
            if (message.author.bot) return;
            const m = message.content.toLowerCase();
            if (m === 'france is the best' || m == "allez le bleu" || m == "croissant" || m == "baguette") {
                reaction.launcher(payload);
            }
            console.log('sent message by app');
        })
    }

    discord_checkSpecificMessage(payload: any) { //check if someone sends specific message
        let reaction = new Reactions;
        const client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent
            ],
        });

        client.once('ready', (c: any) => {
            console.log(`Ready! Logged in as ${c.user.tag}`);
        });

        client.login(payload.tokenCheckMessage).catch((error: any) => {
            DiscordActions.sendWebhookNotFound(payload);
            console.log('invalid bot token')
            return;
        })
        console.log('bot logged in');

        client.on('messageCreate', async (message: any) => {
            console.log('fetching messages');
            if (message.author.bot) return;
            console.log(message.content);
            if (message.content.toLowerCase() === payload.specificMessage.toLowerCase()) {
                reaction.launcher(payload);
            }
            console.log('sent message by app');
        })
    }

    cancelTimer(payload: any) {
        this.timer.cancel();
    }

    test(payload: any) {
        let reaction = new Reactions;
        reaction.launcher(payload);
    }

    // launcher
    launcher(payload: any) {
        console.log('discord action')
        try {
            this.launch[payload.action](payload);
        } catch (error) {
            console.log(error);
        }
    }
}
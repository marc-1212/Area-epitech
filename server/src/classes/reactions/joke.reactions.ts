import { WebhookClient, EmbedBuilder } from 'discord.js';
const https = require('https');
import axios from 'axios';
import { Query } from '../../database';

export class JokeReactions {
    launch: any;

    constructor() {
        this.building_launcher();
    }

    building_launcher() {
        this.launch = {};
        this.launch["SendJoke"] = this.sendJoke;
    }

    launcher(payload: any) {
        console.log(payload.reaction);
        try {
            this.launch[payload.reaction](payload);
        } catch (error) {
            console.log(error);
        }
    }

    sendJoke(payload: any) {
        console.log('fetching joke');
        https.get('https://official-joke-api.appspot.com/random_joke', (response: any) => {
            let data = '';
            // A chunk of data has been received.
            response.on('data', (chunk: any) => {
                data += chunk;
            });
            // The whole response has been received. Print out the result.
            response.on('end', () => {
                const res = JSON.parse(data)
                const message = res;
                const channel = payload.jokeChannel;
                console.log(message);
                console.log('sending message to channel');
                const msg = message.setup + ' ' + message.punchline;
                if (channel === 'area') {
                    let query = 'INSERT INTO log (userId, message, creator) VALUES (?, ?, ?)';
                    Query(query, [payload.userId, msg, 'joke-api'])
                        .then((result) => {
                        })
                        .catch((error) => {
                        });
                } else {
                    const webhookClient = new WebhookClient({ url: `"${channel}"` });
                    const embed = new EmbedBuilder()
                        .setTitle(message.punchline)
                        .setColor(0x00FFFF);
                    webhookClient.send({
                        content: message.setup,
                        username: 'joker',
                        embeds: [embed],
                    });
                }
            });
        }).on("error", (err: any) => {
            console.log("Error: " + err.message);
        });
    }
}
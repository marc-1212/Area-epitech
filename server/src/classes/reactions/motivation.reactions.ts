import { WebhookClient, EmbedBuilder } from 'discord.js';
const https = require('https');
import { Query } from '../../database';

export class WeatherReactions {
    launch: any;

    constructor() {
        this.building_launcher();
    }

    building_launcher() {
        this.launch = {};
        this.launch["sendMotivation"] = this.sendMotivation;
    }

    launcher(payload: any) {
        console.log(payload.reaction);
        try {
            this.launch[payload.reaction](payload);
        } catch (error) {
            console.log(error);
        }
    }

    sendMotivation(payload: any) {
        console.log('fetching api motivation quote');
        https.get('https://motivational-quote-api.herokuapp.com/quotes/random'), (response: any) => {
            let data = '';
            response.on('data', (info: any) => {
                data += info;
            });
            response.on('end', () => {
                const result = JSON.parse(data);
                const message = result;
                const channel = payload.motivationChannel;
                console.log(message);
                console.log('sending motivation quote to channel');
                const msg = message.setup + ' ' + message.punchline;
                if (channel === 'area') {
                    let query = 'INSERT INTO log (userId, message, creator) VALUES (?, ?, ?)';
                    Query(query, [payload.userId, msg, 'quote-api'])
                        .then((result) => {
                        })
                        .catch((error) => {
                        });
                } else {
                    const webhookClient = new WebhookClient({ url: `"${channel}"` });
                    const embed = new EmbedBuilder()
                        .setTitle(message.quote)
                        .setColor(0x00FFFF);
                    webhookClient.send({
                        content: message.setup,
                        username: 'motivation',
                        embeds: [embed],
                    });
                }
            }).on("error", (err: any) => {
                console.log("Error: ", err.message);
            });
        };
    }
}
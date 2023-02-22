import { WebhookClient, EmbedBuilder } from 'discord.js';
const https = require('https');
import axios from 'axios';
import { Query } from '../../database';

export class RedditReactions {
    launch: any;

    constructor() {
        this.building_launcher();
    }

    building_launcher() {
        this.launch = {};
        this.launch["createCollection"] = this.createCollection;
        this.launch["getKarma"] = this.getKarma;
    }

    launcher(payload: any) {
        console.log(payload.reaction);
        try {
            this.launch[payload.reaction](payload);
        } catch (error) {
            console.log(error);
        }
    }

    createCollection(payload: any) {
        let query = "SELECT reddit_token FROM user where id = ?"
        Query(query, [payload.userId]).then((results) => {
            console.log(results[0].reddit_token);
            if (results[0].reddit_token) {
                console.log(payload)
                const url = `https://oauth.reddit.com/api/submit?kind=self&sr=r/${payload.subreddit}&title=${payload.redditTitle}&text=${payload.redditDescription}`
                let headers = { Authorization: `bearer ${results[0].reddit_token}`}
                axios.post(url, null, { headers }).catch((error: any) => {
                    console.log(error);
                });;
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    getKarma(payload: any) {
        let query = "SELECT reddit_token FROM user where id = ?"
        Query(query, [payload.userId]).then((results) => {
            console.log(results[0].reddit_token);
            if (results[0].reddit_token) {
                axios.get("https://oauth.reddit.com/api/v1/me", { headers: { Authorization: "Bearer " + results[0].reddit_token } }).then((response: any) => {
                    const msg = `${response.data.subreddit.display_name_prefixed}'s total karma is: ${response.data.total_karma}`
                    if (payload.redditWebhook === 'area') {
                        let query = 'INSERT INTO log (userId, message, creator) VALUES (?, ?, ?)';
                        Query(query, [payload.userId, msg, 'reddit'])
                            .then((result) => {
                            })
                            .catch((error) => {
                        });
                    } else {
                        const webhookClient = new WebhookClient({ url: `"${payload.redditWebhook}"` });
                        const embed = new EmbedBuilder()
                            .setTitle(msg)
                            .setColor(0x00FFFF);
                        webhookClient.send({
                            content: '',
                            username: 'reddit',
                            embeds: [embed],
                        });
                    }
                }).catch((error: any) => {
                    console.log(error);
                });
            }
        }).catch((error) => {
            console.log(error);
        });
        
    }
}
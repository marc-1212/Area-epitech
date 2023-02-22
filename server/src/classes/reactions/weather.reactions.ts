import { WebhookClient, EmbedBuilder } from 'discord.js';
const axios = require('axios');
import { Query } from '../../database';
export class WeatherReactions {
    launch: any;

    constructor() {
        this.building_launcher();
    }

    building_launcher() {
        this.launch = {};
        this.launch["sendWeather"] = this.sendWeather;
    }

    launcher(payload: any) {
        console.log(payload.reaction);
        try {
            this.launch[payload.reaction](payload);
        } catch (error) {
            console.log(error);
        }
    }

    sendWeather(payload: any) {
        console.log('fetching api weather');
        axios.get('https://api.openweathermap.org/data/2.5/weather', { params: { q: payload.city, appid: '8b02c2a27f010498754e9659242da4d9' } }).then((response: any) => {
            const message = response;
            const channel = payload.weatherChannel;
            console.log('sending weather to channel');
            //get the weather main information
            const msg = message.data.weather[0].main;
            if (channel === 'area') {
                let query = 'INSERT INTO log (userId, message, creator) VALUES (?, ?, ?)';
                Query(query, [payload.userId, msg, 'weather-api'])
                    .then((result) => {
                    })
                    .catch((error) => {
                });
            } else {
                const webhookClient = new WebhookClient({ url: `"${channel}"` });
                const embed = new EmbedBuilder()
                    .setTitle(msg)
                    .setColor(0x00FFFF);
                webhookClient.send({
                    content: '',
                    username: 'weather',
                    embeds: [embed],
                });
            }
        }).catch((error: any) => {
            console.log(error);
        });;
    }
}
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const axios = require('axios');
import { Reactions } from '../reactions/reactions';
import { Query } from '../../database'

export class WeatherActions {
    schedule: any;
    job: any;
    launch: any;
    umbrella: any;

    //constructor
    constructor() {
        this.launch = {};
        this.launch["test"] = this.test;
        this.launch["CheckUmbrella"] = this.umbrellaChecker;
        this.launch["CheckSunny"] = this.sunnyChecker;
    }


    static sendCityNotFound(payload:any) 
    {
        console.log("invalid api Key");
        let query = 'INSERT INTO log (userId, message, creator) VALUES (?, ?, ?)';
        Query(query, [payload.userId, "CITY NOT FOUND", "WEATHER"])
        .then((result) => {
        })
        .catch((error) => {
         })
    }
    
    umbrellaChecker(payload: any) {
        let reaction = new Reactions;
        this.schedule = require('node-schedule');
        console.log('fetching api weather');
        console.log(payload.cityAction);
        axios.get('https://api.openweathermap.org/data/2.5/weather', { params: { q: payload.cityAction, appid: '8b02c2a27f010498754e9659242da4d9' } }).then((response: any) => {
            const message = response;
            console.log('sending weather to channel');
            //get the weather main information
            const msg = message.data.weather[0].main;
            if (msg.toLowerCase() === 'rain' || msg.toLowerCase() === 'thunderstorm' || msg.toLowerCase() === 'shower rain' || msg.toLowerCase() === 'drizzle') {
                reaction.launcher(payload);
            }
            console.log('sent message by app')
        }).catch((error: any) => {
            WeatherActions.sendCityNotFound(payload);
            return;
        });
        const freq = " 0 0 0 ? * * *";
        this.job = this.schedule.scheduleJob(freq, function () {
            let query = "SELECT status FROM actioncard WHERE id = ?";
            Query(query, [payload.id]).then((results) => {
                axios.get('https://api.openweathermap.org/data/2.5/weather', { params: { q: payload.cityAction, appid: '8b02c2a27f010498754e9659242da4d9' } }).then((response: any) => {
                    const message = response;
                    console.log('sending weather to channel');
                    //get the weather main information
                    const msg = message.data.weather[0].main;
                    if (msg.toLowerCase() === 'rain' || msg.toLowerCase() === 'thunderstorm' || msg.toLowerCase() === 'shower rain' || msg.toLowerCase() === 'drizzle') {
                        reaction.launcher(payload);
                    }
                    console.log('sent message by app')
                }).catch((error: any) => {
                    console.log(error);
                });
            }).catch((error: any) => {
                console.log(error);
            })
        });
    }

    sunnyChecker(payload: any) {
        let reaction = new Reactions;
        this.schedule = require('node-schedule');
        console.log('fetching api weather');
        axios.get('https://api.openweathermap.org/data/2.5/weather', { params: { q: payload.cityAction, appid: '8b02c2a27f010498754e9659242da4d9' } }).then((response: any) => {
            const message = response;
            console.log('sending weather to channel');
            //get the weather main information
            const msg = message.data.weather[0].main;
            if (msg.toLowerCase() === 'clear') {
                reaction.launcher(payload);
            }
            console.log('sent message by app')
        }).catch((error: any) => {
            if (error.response.data.cod == 404) {
                WeatherActions.sendCityNotFound(payload);
                return;
            }
        });
        const freq = " 0 0 0 ? * * *";
        this.job = this.schedule.scheduleJob(freq, function () {
            let query = "SELECT status FROM actioncard WHERE id = ?";
            Query(query, [payload.id]).then((results) => {
                axios.get('https://api.openweathermap.org/data/2.5/weather', { params: { q: payload.cityAction, appid: '8b02c2a27f010498754e9659242da4d9' } }).then((response: any) => {
            const message = response;
            console.log('sending weather to channel');
            //get the weather main information
            const msg = message.data.weather[0].main;
            if (msg.toLowerCase() === 'clear') {
                reaction.launcher(payload);
            }
            console.log('sent message by app')
            }).catch((error: any) => {
                console.log(error);
            });
            }).catch((error: any) => {
                console.log(error);
            }); 
        });
    }

    cancelTimer(payload:any) {
        this.job.cancel();
    }

    test(payload: any) {
        let reaction  = new Reactions;
        reaction.launcher(payload);
    }

    // launcher
    launcher(payload: any) {
        console.log('discord action')
        try {
            this.launch[payload.action](payload);   
        } catch (error) {
            console.log(error);
            console.log("function doesn't exist");
        }
    }
}
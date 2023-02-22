import { WebhookClient, EmbedBuilder } from 'discord.js';
import axios from 'axios';
import { Query } from '../../database';
import e from 'express';
const https = require('https');
const LaLiga = '140'
const Premier = '39'
const Bundes = '78'
const serieA = '135'


export class FootballReactions {
    launch: any;

    constructor() {
        this.building_launcher();
    }

    building_launcher() {
        this.launch = {};
        this.launch["sendPremierDisc"] = this.sendPremierDisc;
        this.launch["sendBundesDisc"] = this.sendBundesDisc;
        this.launch["sendSerieADisc"] = this.sendSerieADisc;
        this.launch["sendLaLigaDisc"] = this.sendLaLigaDisc;
    }

    static getTeamsClassication(response: any) {
        var teams = new Array()
        let i = 1
        response.data.response[0].league.standings[0].forEach(function (res: any) {
            teams.push(i.toString() + ". ->" + res.team.name)
            i = i + 1
        })
        return teams;
    }




    // Serie A
    static getInfoSerieA = async (): Promise<any> => {
        return await axios.get(`https://v3.football.api-sports.io/standings`, {
            method: 'GET',
            url: 'https://v3.football.api-sports.io/standings',
            headers: {
                'x-rapidapi-key': '308690e496085af65d4557d6726c5bc0',
                'x-rapidapi-host': 'v3.football.api-sports.io'
            },
            params: { league: serieA, season: '2022' }
        }).catch((error: any) => {
            console.log(error);
        });;
    }

    sendSerieADisc = async (payload: any) => {
        console.log('reaction football la liga discord')
        FootballReactions.getInfoSerieA().then((response) => {
            const classification = FootballReactions.getTeamsClassication(response);
            const webhook = payload.channel;
            console.log(classification.join('\n'))
            console.log('sending message to channel');
            if (payload.channel === "area") {
                FootballReactions.sendMsgToLog(payload, classification, 'Serie A')
            }
            else {
                try {
                    const webhookClient = new WebhookClient({ url: `"${webhook}"` });
                    const embed = FootballReactions.configMssgToDisc('Serie A', classification)
                    webhookClient.send({
                        username: 'Serie A',
                        embeds: [embed],
                    })
                }
                catch (error) {
                    console.log(error)
                }
            }
        }).catch((error: any) => {
            console.log(error);
        });;
    }
    //Bundess
    static getInfoBundes = async (): Promise<any> => {
        return await axios.get(`https://v3.football.api-sports.io/standings`, {
            method: 'GET',
            url: 'https://v3.football.api-sports.io/standings',
            headers: {
                'x-rapidapi-key': '308690e496085af65d4557d6726c5bc0',
                'x-rapidapi-host': 'v3.football.api-sports.io'
            },
            params: { league: Bundes, season: '2022' }
        }).catch((error: any) => {
            console.log(error);
        });;
    }

    sendBundesDisc = async (payload: any) => {
        console.log('reaction football la liga discord')
        FootballReactions.getInfoBundes().then((response) => {

            const classification = FootballReactions.getTeamsClassication(response);
            const channel = payload.channel;
            console.log("sdfasfd")
            console.log(classification.join('\n'))
            console.log('sending message to channel');
            if (payload.channel === "area") {
                FootballReactions.sendMsgToLog(payload, classification, 'Bundess')
            }
            else {
                try {
                    const webhookClient = new WebhookClient({ url: `"${channel}"` });
                    const embed = FootballReactions.configMssgToDisc('Bundes', classification)
                    webhookClient.send({
                        username: 'Bundes',
                        embeds: [embed],
                    })
                }
                catch (error) {
                    console.log(error)
                }
            }
        }).catch((error: any) => {
            console.log(error);
        });;
    }
    //premier
    static getInfoPremier = async (): Promise<any> => {
        return await axios.get(`https://v3.football.api-sports.io/standings`, {
            method: 'GET',
            url: 'https://v3.football.api-sports.io/standings',
            headers: {
                'x-rapidapi-key': '308690e496085af65d4557d6726c5bc0',
                'x-rapidapi-host': 'v3.football.api-sports.io'
            },
            params: { league: Premier, season: '2022' }
        }).catch((error: any) => {
            console.log(error);
        });;
    }

    sendPremierDisc = async (payload: any) => {
        console.log('reaction football la liga discord')
        FootballReactions.getInfoPremier().then((response) => {
            const classification = FootballReactions.getTeamsClassication(response);
            const channel = payload.channel;
            console.log(classification.join('\n'))
            console.log('sending message to channel');
            if (payload.channel === "area") {
                FootballReactions.sendMsgToLog(payload, classification, 'Premier')
            }
            else {
                try {
                    const webhookClient = new WebhookClient({ url: `"${channel}"` });
                    const embed = FootballReactions.configMssgToDisc('Premier', classification)
                    webhookClient.send({
                        username: 'Premier',
                        embeds: [embed],
                    })
                }
                catch (error) {
                    console.log(error)
                }
            }
        }).catch((error: any) => {
            console.log(error);
        });;
    }

    // la liga
    static getInfoLaLiga = async (): Promise<any> => {
        return await axios.get(`https://v3.football.api-sports.io/standings`, {
            method: 'GET',
            url: 'https://v3.football.api-sports.io/standings',
            headers: {
                'x-rapidapi-key': '308690e496085af65d4557d6726c5bc0',
                'x-rapidapi-host': 'v3.football.api-sports.io'
            },
            params: { league: LaLiga, season: '2022' }
        }).catch((error: any) => {
            console.log(error);
        });;
    }

    sendLaLigaDisc = async (payload: any) => {
        console.log('reaction football la liga discord')
        FootballReactions.getInfoLaLiga().then((response) => {

            const classification = FootballReactions.getTeamsClassication(response);
            console.log(payload.webhook)
            const channel = payload.channel;
            console.log(classification.join('\n'))
            console.log('sending message to channel');
            if (payload.channel === "area") {
                FootballReactions.sendMsgToLog(payload, classification, 'La Liga')
            }
            else {
                try {
                    const webhookClient = new WebhookClient({ url: `"${channel}"` });
                    const embed = FootballReactions.configMssgToDisc('La liga', classification)
                    webhookClient.send({
                        username: 'La Liga',
                        embeds: [embed],
                    })
                }
                catch (error) {
                    console.log(error)
                }
            }
        }).catch((error: any) => {
            console.log(error);
        });;
    }

    //configMessage to Discord


    static configMssgToDisc(ligue: string, classification: any) {
        const embed = new EmbedBuilder()
            .setTitle(ligue)
            .setDescription(classification.join('\n'))
            .setColor(0x00FFFF);
        return embed
    }

    // message to Log
    static sendMsgToLog = async (payload: any, data: any, ligue: string) => {
        let query = 'INSERT INTO log (userId, message, creator) VALUES (?, ?, ?)';
        let score = data.slice(0, 5)
        Query(query, [payload.userId, score.join('\n'), ligue])
            .then((result) => {
            })
            .catch((error) => {
            })
    }
    launcher(payload: any) {
        console.log("launcher of Fotball react");
        try {
            this.launch[payload.reaction](payload);
        } catch (error) {
            console.log(error);
        }
    }

}
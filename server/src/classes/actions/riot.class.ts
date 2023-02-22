import { Reactions } from '../reactions/reactions';
import axios from 'axios';
import { Query } from '../../database'

export class RiotActions {
    launch: any
    //constructor
    constructor() {
        this.launch = {};
        this.launch["IsPlayingLoL"] = this.IsPlayingLoL;
    }


    static checkIsInMatch(payload: any, summoner: any, schedule: any) {
        schedule.scheduleJob( "*/5 * * * * *", function() {
            let query = "SELECT status FROM actioncard WHERE id = ?";
            Query(query, [payload.id]).then((results) => {
                let id = summoner.data.id;
                console.log(id)
                let url  = `https://euw1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${id}`
                axios.get(url, {
                    method: 'GET',
                    params: {api_key: payload.riotKey}
                }).then((response:any) => {
                    let reaction = new Reactions
                    console.log(response.data.gameType)
                    reaction.launcher(payload)
                }).catch((error:any) => {
                    console.log("not playing")
                });
            }).catch((error: any) => {
                console.log(error);
            });
        });
    }

    static sendAlertApiIsWrong(payload:any) 
    {
        console.log("invalid api Key");
        let query = 'INSERT INTO log (userId, message, creator) VALUES (?, ?, ?)';
        Query(query, [payload.userId, "ALERT: Invalid API KEY!", "RIOT"])
        .then((result) => {
        })
        .catch((error) => {
        })
    }
    static sendAlertPlayerNotExist(payload:any) 
    {
        console.log("invalid player");
        let query = 'INSERT INTO log (userId, message, creator) VALUES (?, ?, ?)';
        Query(query, [payload.userId, "ALERT: Invalid Player!", "RIOT"])
        .then((result) => {
        })
        .catch((error) => {
         })
    }
    //actions
    IsPlayingLoL(payload: any) {     
        let  schedule = require('node-schedule');

        axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${payload.player}`,{
            method: 'GET',
            params: { api_key: payload.riotKey}
        }).then((summoner:any) => {
            RiotActions.checkIsInMatch(payload, summoner, schedule);
        }).catch((error:any) => {
            if (error.response.status == 404)
                    RiotActions.sendAlertPlayerNotExist(payload);
            if (error.response.status === 403)
                    RiotActions.sendAlertApiIsWrong(payload);
        });     
    } 

    // launcher
    launcher(payload: any) {
        try {
            console.log("Hola")
            this.launch[payload.action](payload);
        } catch (error) {
            console.log(error);
        }
    }
}



//https://euw1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/ueKIWpmkG1dbo7v1liiSz7CMDursXDFp68vL_45RUmVd6aQ?api_key=RGAPI-1509e22b-bfeb-4e16-86ac-487760d74c39
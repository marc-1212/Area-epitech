import axios from 'axios';
import { Reactions } from '../reactions/reactions';
import { Query } from '../../database'

export class FootballActions {

    launch: any;

    constructor() {
        this.launch = {};
        this.launch["checkRobery"] = this.checkRobery;
        this.launch["checkBestTeam"] = this.checkBestTeam;
    }

    static whoIsFirst = async (): Promise<any> => {
        return await axios.get(`https://v3.football.api-sports.io/standings`, {
            method: 'GET',
            url: 'https://v3.football.api-sports.io/standings',
            headers: {
                'x-rapidapi-key': '308690e496085af65d4557d6726c5bc0',
                'x-rapidapi-host': 'v3.football.api-sports.io'
            },
            params: { league: '140', season: '2022' }
        });
    }


    //checks if Madrid is first, it is checked every hour
    checkRobery = async (payload: any) => {
        let reaction = new Reactions
        let schedule = require('node-schedule');
        let team = ''
        FootballActions.whoIsFirst().then((response) => {
            console.log(response.data.response[0].league.standings[0][0].team.name);
            if (response.data.response[0].league.standings[0][0].team.name === "Real Madrid") {
                if (team != "Real Madrid") {
                    team = "Real Madrid";
                    reaction.launcher(payload);
                }
            }
        });
        schedule.scheduleJob("* 1 * * *", function () {
            let query = "SELECT status FROM actioncard WHERE id = ?";
            Query(query, [payload.id]).then((results) => {
                FootballActions.whoIsFirst().then((response) => {
                    console.log(response.data.response[0].league.standings[0][0].team.name);
                    if (response.data.response[0].league.standings[0][0].team.name === "Real Madrid") {
                        if (team != "Real Madrid") {
                            team = "Real Madrid";
                            reaction.launcher(payload);
                        }
                    }
                });
            }).catch((error: any) => {
                console.log(error);
            });
        });
    }

    //checks if Barcelona is firsts, it is checked every hour
    checkBestTeam = async (payload: any) => {
        let reaction = new Reactions
        let schedule = require('node-schedule');
        let team = ''
        FootballActions.whoIsFirst().then((response) => {
            console.log(response.data.response[0].league.standings[0][0].team.name);
            if (response.data.response[0].league.standings[0][0].team.name === "Barcelona") {
                if (team != "Barcelona") {
                    team = "Barcelona";
                    reaction.launcher(payload);
                }
            }
        });
        schedule.scheduleJob("* 1 * * *", function () {
            let query = "SELECT status FROM actioncard WHERE id = ?";
            Query(query, [payload.id]).then((results) => {
                FootballActions.whoIsFirst().then((response) => {
                    console.log(response.data.response[0].league.standings[0][0].team.name);
                    if (response.data.response[0].league.standings[0][0].team.name === "Barcelona") {
                        if (team != "Barcelona") {
                            team = "Barcelona";
                            reaction.launcher(payload);
                        }
                    }
                });
            }).catch((error: any) => {
                console.log(error);
            });
        });
    }

    launcher(payload: any) {
        try {
            this.launch[payload.action](payload);
        } catch (error) {
            console.log(error);
        }
    }
}
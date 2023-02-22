import { RedditActions } from './reddit.class';
import  { DiscordActions } from './discord.class'
import { TimerActions } from './timer.class';
import { WeatherActions } from './weather.class';
import  { FootballActions } from './football.class';
import { RiotActions } from './riot.class';
export class Actions {
    action:any;

    constructor() {
        this.building_launcher();
    }

    building_launcher() {
        this.action = {};
        this.action["Discord"] = new DiscordActions;
        this.action["Football"] = new FootballActions;
        this.action["Timer"] = new TimerActions;
        this.action["Reddit"] = new RedditActions;
        this.action["Weather"] = new WeatherActions;
        this.action["Riot"] = new RiotActions;
    }

    launcher(payload:any) {
        console.log(payload.serviceAction);
        this.action[payload.serviceAction].launcher(payload);
    }
}
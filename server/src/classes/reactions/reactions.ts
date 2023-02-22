import { DiscordReactions } from "./discord.reactions";
import { JokeReactions } from "./joke.reactions";
import { WeatherReactions } from "./weather.reactions";
import { FootballReactions } from "./football.reactions";
import { Query } from '../../database'
import { AnimeReactions } from "./anime.reactions";
import { RedditReactions } from "./reddit.reactions";


export class Reactions {
    reaction:any;

    constructor() {
        this.building_launcher();
    }

    building_launcher() {
        this.reaction = {};
        this.reaction["Football"] = new FootballReactions
        this.reaction["Discord"] = new DiscordReactions;
        this.reaction["Joke"] = new JokeReactions;
        this.reaction["Weather"] = new WeatherReactions;
        this.reaction["Anime"] = new AnimeReactions;
        this.reaction["Reddit"] = new RedditReactions;
    }

    launcher(payload:any) {
        let query = "SELECT status FROM actioncard WHERE id = ?";
        Query(query, [payload.id]).then((results) => {
            if (results[0].status === 1) {
                console.log('launching reaction'); 
                this.reaction[payload.serviceReaction].launcher(payload);
            }
        })
        .catch((error) => {
        });
    }
}
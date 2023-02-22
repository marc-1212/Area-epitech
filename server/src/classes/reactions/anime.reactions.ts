import { WebhookClient, EmbedBuilder } from 'discord.js';
const https = require('https');
import axios from 'axios';
import { Query } from '../../database';
export class AnimeReactions {
    launch: any;

    constructor() {
        this.building_launcher();
    }

    building_launcher() {
        this.launch = {};
        this.launch["SendAnimeRandom"] = this.SendAnimeRandom;
    }

    launcher(payload: any) {
        console.log(payload.reaction);
        try {
            this.launch[payload.reaction](payload);
        } catch (error) {
            console.log(error);
        }
    }

    static getAnimeRandomInfo = async (): Promise<any> => {
        let anime: any = {}
        const info = await axios.get("https://api.jikan.moe/v4/random/anime");
        anime.title = info.data.data.title
        anime.score = info.data.data.score
        anime.synopsis = info.data.data.synopsis
        anime.image = info.data.data.images.jpg.image_url
        if (anime.image === null)
            anime.image = "https://c4.wallpaperflare.com/wallpaper/976/117/318/anime-girls-404-not-found-glowing-eyes-girls-frontline-wallpaper-preview.jpg"
        if (anime.score == null)
            anime.score = "not rated"
        return anime
    }

    static configMssgToDisc(anime: any) {
        const embed = new EmbedBuilder()
            .setTitle(anime.title)
            .setDescription(anime.synopsis)
            .addFields(
                { name: 'Score:', value: anime.score.toString() }
            )
            .setImage(anime.image)
            .setColor(0x00FFFF);
        return embed
    }

    SendAnimeRandom = async (payload: any) => {
        AnimeReactions.getAnimeRandomInfo().then((anime) => {
            console.log("payload")
            console.log(payload)
            console.log("anime ->")
            console.log(anime)
            if (payload.channel === "area") {
                let query = 'INSERT INTO log (userId, message, creator) VALUES (?, ?, ?)';
                Query(query, [payload.userId, ('score: ' + anime.score.toString()), anime.title])
                    .then((result) => {
                    })
                    .catch((error) => {
                    });
            } else {
                try {
                    const webhookClient = new WebhookClient({ url: `"${payload.channel}"` });
                    const embed = AnimeReactions.configMssgToDisc(anime)
                    webhookClient.send({
                        username: 'Anime',
                        embeds: [embed],
                    }
                    )
                }
                catch (error) {
                    console.log(error)
                }
            }
        }).catch((error: any) => {
            console.log(error);
        });
    }
}
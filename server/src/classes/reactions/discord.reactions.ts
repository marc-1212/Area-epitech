import { WebhookClient } from 'discord.js';
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
import { TextChannel } from 'discord.js';


export class DiscordReactions {
    launch: any;

    constructor() {
        this.building_launcher();
    }

    building_launcher() {
        this.launch = {};
        this.launch["ss"] = this.print_msg;
        this.launch["SendMessage"] =  this.discord_sendMessage;
    }
    discord_sendMessage(payload: any) {
        const channel = payload.channel;
        const message = payload.message;

        console.log('sending message to channel');
        try {
            const webhookClient = new WebhookClient({ url: `"${channel}"` });
            const embed = new EmbedBuilder()
                .setTitle(message)
                .setColor(0x00FFFF);
            webhookClient.send({
                content: '',
                username: 'area',
                embeds: [embed],
            });
        } catch (error) {
            console.log(error);
        }
    }

    print_msg(payload:any) {
        console.log(payload);
    }

    launcher(payload: any) {
        try {
            this.launch[payload.reaction](payload);
        } catch (error) {
            console.log("reaction not found");
        }
    }
}
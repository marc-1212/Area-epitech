import { WebhookClient } from 'discord.js';
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
import { TextChannel } from 'discord.js';
import { Reactions } from '../reactions/reactions';

export class TimerActions {
    schedule: any;
    job: any;
    launch: any;

    //constructor
    constructor() {
        this.launch = {};
        this.launch["Crono"] = this.timer;
        this.launch["canel_timer"] = this.cancelTimer;
    } 

    // actions
    timer(payload: any) { //message spammer
        let reaction = new Reactions;
        this.schedule = require('node-schedule');
        console.log('timer set up');
        const freq = "*/" + payload.frequency + " * * * * *";
        this.job = this.schedule.scheduleJob(freq, function ()
        { reaction.launcher(payload)});
    }

    cancelTimer(payload:any) {
        this.job.cancel();
    }

    // launcher
    launcher(payload: any) {
        try {
            this.launch[payload.action](payload);   
        } catch (error) {
            console.log(error);
        }
    }
}
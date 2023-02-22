import { Reactions } from '../reactions/reactions';
import axios from 'axios';
import { Query } from '../../database'

export class RedditActions {
    schedule: any;
    job: any;
    launch: any;

    //constructor
    constructor() {
        this.launch = {};
        this.launch["NewPost"] = this.newPost;
        this.launch["NewSubPost"] = this.newSubPost;
    }

    // actions
    static checkPosts = async (url: string): Promise<any> => {
        return await axios.get(url, {
            method: 'GET',
            url: url,
        });
    }

    newPost(payload: any) { //message spammer
        let reaction = new Reactions;
        this.schedule = require('node-schedule');
        console.log('timer set up');    
        const freq = "*/5 * * * * *";
        let ids: Array<string> = [];
        let cancel_job = 0;
        const url = 'https://www.reddit.com/r/AskReddit/new.json'
        this.job = this.schedule.scheduleJob(freq, function () {
            let query = "SELECT status FROM actioncard WHERE id = ?";
            Query(query, [payload.id]).then((results) => {
                if (results[0].status === 1) {
                    console.log('checking new posts');
                    RedditActions.checkPosts(url).then((response) => {
                        if (response) {
                            const posts = response.data.data.children.map((post: any) => post.data);
                            const newPosts = posts.filter((post: any) => ids.includes(post.id) === false)
                            if (newPosts.length > 0) {
                                newPosts.forEach((post: any) => ids.push(post.id));
                                reaction.launcher(payload)
                            }
                        }
                    });
                } else {
                    cancel_job = 1;
                }
            }).catch((error) => {
                console.log(error);
            });
        }).catch((error: any) => {
        });
        if (cancel_job == 0) {
            this.job.cancel();
        }
    }

    newSubPost(payload: any) { //message spammer
        let reaction = new Reactions;
        this.schedule = require('node-schedule');
        console.log('timer set up');
        const freq = "*/5 * * * * *";
        let ids: Array<string> = [];
        const url = "https://www.reddit.com/r/" + payload.subreddit + ".json";
        let cancel_job = 0;
        RedditActions.checkPosts(url).then((response) => {
            if (response) {
                const posts = response.data.data.children.map((post: any) => post.data);
                const newPosts = posts.filter((post: any) => ids.includes(post.id) === false)
                if (newPosts.length > 0) {
                    newPosts.forEach((post: any) => ids.push(post.id));
                }
            }
        });
        this.job = this.schedule.scheduleJob(freq, function () {
            let query = "SELECT status FROM actioncard WHERE id = ?";
            Query(query, [payload.id]).then((results) => {
                if (results[0].status === 1) {
                    RedditActions.checkPosts(url).then((response) => {
                        if (response) {
                            const posts = response.data.data.children.map((post: any) => post.data);
                            const newPosts = posts.filter((post: any) => ids.includes(post.id) === false)
                            if (newPosts.length > 0) {
                                newPosts.forEach((post: any) => ids.push(post.id));
                                reaction.launcher(payload)
                            }
                        }
                    });
                } else {
                    cancel_job = 1;
                }
            }).catch((error) => {
                console.log(error);
            });
        });
        if (cancel_job === 1) {
            this.job.cancel();
        }
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
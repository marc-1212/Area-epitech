import { Request, Response } from 'express';
import moment from 'moment';

export function aboutJson(req: Request, res: Response): Response {
    const json = {
        'client': {
            'host': req.ip.replace('::ffff:','')
        },
        'server': {
            'current_time': moment().unix(),
            'services': [
                {
                    'name': 'Discord',
                    'actions': [
                        {
                            'name': 'FrenchInChat',
                            'description': 'catches french people in your discord server to do with them as you please'
                        },
                        {
                            'name': 'SpecificMessage',
                            'description': 'checks in discord server for anyone who types the message specified'
                        },
                    ],
                    'reactions': [
                        {
                            'name': 'SendMessage',
                            'description': 'sends message to discord channel via webhook'
                        }
                    ]
                },
                {
                    'name': 'Timer',
                    'actions': [
                        {
                            'name': 'Crono',
                            'description': 'executes the reaction at any given frequency'
                        }
                    ],
                    'reactions': []
                },
                {
                    'name': 'Reddit',
                    'actions': [
                        {
                            'name': 'NewPost',
                            'description': 'fetches newest 25 posts on reddit, if there is a new one, it triggers the reaction'
                        },
                        {
                            'name': 'NewSubPost',
                            'description': 'triggers reaction when new post is posted on specific subreddit'
                        },
                    ],
                    'reactions': [
                        {
                            'name': 'createCollection',
                            'description': 'creates a post with a given title and description in a given subreddit'
                        },
                        {
                            'name': 'getKarma',
                            'description': 'fetches the user total karma and sends it to discord or the logs'
                        }
                    ]
                },
                {
                    'name': 'Football',
                    'actions': [
                        {
                            'name': 'checkRobery',
                            'description': 'checks if Madrid is winning La Liga'
                        },
                        {
                            'name': 'checkBestTeam',
                            'description': 'checks if Barcelona is winning La Liga'
                        },
                    ],
                    'reactions': [
                        {
                            'name': 'sendLaLigaDisc',
                            'description': 'sends La Liga classification'
                        },
                        {
                            'name': 'sendBundesDisc',
                            'description': 'sends Bundesliga classification'
                        },
                        {
                            'name': 'sendSerieADisc',
                            'description': 'sends Serie A classification'
                        },
                        {
                            'name': 'sendPremierDisc',
                            'description': 'sends Premier classification'
                        },
                    ]
                },
                {
                    'name': 'Weather',
                    'actions': [
                        {
                            'name': 'CheckUmbrella',
                            'description': 'checks if it is raining on a given city'
                        },
                        {
                            'name': 'CheckSunny',
                            'description': 'check if it is clear on a given city'
                        },
                    ],
                    'reactions': [
                        {
                            'name': 'sendWeather',
                            'description': 'sends weather of given city to logs or discord'
                        }
                    ]
                },
                {
                    'name': 'Riot',
                    'actions': [
                        {
                            'name': 'IsPlayingLoL',
                            'description': 'checks if given player is playing League of Legends'
                        }
                    ],
                    'reactions': []
                },
                {
                    'name': 'Joke',
                    'actions': [],
                    'reactions': [
                        {
                            'name': 'SendJoke',
                            'description': 'sends random joke to discord or to logs'
                        }
                    ]
                },
                {
                    'name': 'Anime',
                    'actions': [],
                    'reactions': [
                        {
                            'name': 'SendAnimeRandom',
                            'description': 'sends random anime series/films with their score to discord or to logs'
                        }
                    ]
                },
            ]
        }
    };
    return res.send('<pre>' + JSON.stringify(json, null, "  ") +'</pre>');
}
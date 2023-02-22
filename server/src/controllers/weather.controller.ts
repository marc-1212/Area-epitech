import { Request, Response } from 'express';

// DB
import { Query } from '../database'

const schedule = require('node-schedule');
let job: any;

export function activateWeather(req: Request, res: Response) {
    
}

export function deactivateWeather(req: Request, res: Response) {
    
}

export function fetchWeatherStatus(req: Request, res: Response) {
    const query = "SELECT connected FROM service WHERE name='weather'";
    Query(query, []).then((results) => {
        if (results == 0) {
            results == null;
        }
        return res.status(200).json({
            results
        });
    })
    .catch((error) => {
        return res.status(200).json({
            message: error.message,
            error
        });
    });
}

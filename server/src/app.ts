import express, { Application } from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Routes
import IndexRoutes from './routes/index.routes'
import DiscordRoutes from './routes/discord.routes'
import TwitterRoutes from './routes/twitter.routes'
import LogsRoutes from './routes/logs.routes'
import CardRoutes from './routes/card.routes'
import AboutRoutes from './routes/about.routes'

export class App {
    app: Application;

    constructor(
        private port?: number | string
    ) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    private settings() {
        this.app.set('port', this.port || 8080);
    }

    private middlewares() {
        const allowedOrigins = ['http://localhost:8081', 'http://localhost:8100', 'http://localhost:8082', 'http://192.168.0.123:8100', 'http://172.18.0.1:8100'];

        const options: cors.CorsOptions = {
            origin:  allowedOrigins,
            credentials: true,
            exposedHeaders: ["set-cookie"],
        }
        this.app.use(cors(options));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
    }

    private routes() {
        this.app.use(IndexRoutes);
        this.app.use('/actions', DiscordRoutes);
        this.app.use('/logs', LogsRoutes);
        this.app.use('/twitter', TwitterRoutes);
        this.app.use('/cards', CardRoutes);
        this.app.use('/about.json', AboutRoutes);
    }

    async listen(): Promise<void> {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }
}
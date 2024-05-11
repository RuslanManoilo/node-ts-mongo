import 'reflect-metadata';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import hpp from 'hpp';
import morgan from 'morgan';
import { redirectToHTTPS } from 'express-http-to-https';
import swaggerUi from 'swagger-ui-express';

import { $env } from '@config';
import { Routes } from '@interfaces/routes.interface';
import { ErrorMiddleware } from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import { swaggerMerge } from '@utils/swaggerMerge';
import swaggerDocument from '../swagger.json';

export class App {
  public app: express.Application;

  constructor(routes: Routes[]) {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeSwagger();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    return this.app.listen($env.PORT, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${$env.NODE_ENV} =======`);
      logger.info(`🚀 App listening on the port ${$env.PORT}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    if ($env.isStage || $env.isProd) {
      this.app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));
    }

    this.app.use(morgan($env.LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: $env.CORS_ORIGIN, credentials: $env.CORS_CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(cookieParser());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      express.json({
        verify: function (req, res, buf) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          req.rawBody = buf;
        },
      }),
    );
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use(route.router);
    });
  }

  private initializeSwagger() {
    swaggerMerge(swaggerDocument);

    swaggerDocument.servers = [
      {
        url: $env.API_URL,
        description: `${$env.NODE_ENV} server`.toUpperCase(),
      },
    ];

    this.app.use(
      '/api-doc',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument),
    );
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);

    this.app.use((req, res) => {
      res.status(404).send('<h1>404! Page not found</h1>');
    });
  }
}

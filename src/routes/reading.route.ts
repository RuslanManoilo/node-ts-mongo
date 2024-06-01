import { Router } from 'express';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { Routes } from '@interfaces/routes.interface';
import { ReadingController } from '@controllers/reading.controller';
import { CreateReadingDto } from '@dtos/reading.dto';
import { UpdateReactionsDto } from '@/dtos/reactions.dto';

export class ReadingRoute implements Routes {
  public path = '/api/readings';
  public router = Router();
  public controller = new ReadingController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.controller.getAll);
    this.router.get(`${this.path}/:id`, this.controller.getOneById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateReadingDto), this.controller.createOne);
    this.router.put(`${this.path}/:id`, ValidationMiddleware(CreateReadingDto, true, true), this.controller.updateOne);
    this.router.put(`${this.path}/reactions/:id`, ValidationMiddleware(UpdateReactionsDto, true, true), this.controller.updateReactions);
    this.router.delete(`${this.path}/:id`, this.controller.deleteOne);
  }
}

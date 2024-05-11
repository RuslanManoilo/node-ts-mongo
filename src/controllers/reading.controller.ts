import { Request, NextFunction, Response } from 'express';
import { Container } from 'typedi';
import { IReading, Reading } from '@models/reading.model';
import { ReadingService } from '@services/reading.service';
import { isValidMongoObjectId } from '@utils/dto';

export class ReadingController {
  public service = Container.get(ReadingService);

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAll = await this.service.findAll();

      res.status(200).json({ data: findAll, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getOneById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;

      isValidMongoObjectId(id);

      const findOne = await this.service.findOneById(id);

      res.status(200).json({ data: findOne, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body: IReading = req.body;
      const createdDoc: Reading = await this.service.createOne(body);

      res.status(201).json({ data: createdDoc, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;

      isValidMongoObjectId(id);

      const body: IReading = req.body;
      const updatedDoc: Reading = await this.service.updateOne(id, body);

      res.status(200).json({ data: updatedDoc, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
  
  public updateReactions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;

      isValidMongoObjectId(id);

      const body: IReading = req.body;
      const updatedDoc: Reading = await this.service.updateReactions(id, body);

      res.status(200).json({ data: updatedDoc, message: 'updated' });
    } catch (error) {
      next(error);
    }
  }

  public deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id: string = req.params.id;

      isValidMongoObjectId(id);

      const deletedDoc: Reading = await this.service.deleteOne(id);

      res.status(200).json({ data: deletedDoc, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

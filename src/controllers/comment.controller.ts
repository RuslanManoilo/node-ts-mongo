import { Request, NextFunction, Response } from 'express';
import { CommentService } from "@/services/comment.service";
import Container from "typedi";
import { isValidMongoObjectId } from '@/utils/dto';
import { Comment, IComment } from '@/models/comment.model';

export class CommentController {
    public service = Container.get(CommentService);

    public getAllById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reading: string = req.params.id;

            isValidMongoObjectId(reading);

            const findAllById = await this.service.findAllById(reading);

            res.status(200).json({ data: findAllById, message: 'findAllById' });
        } catch (error) {
            next(error); 
        }
    }
    
    public createOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reading: string = req.params.id;
            isValidMongoObjectId(reading);

            const body: IComment = { ...req.body, reading };
            const createdDoc: Comment = await this.service.createOne(body);
            
            res.status(201).json({ data: createdDoc, message: 'created' });
        } catch (error) {
            next(error); 
        }
    }

    public updateOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.id;

            isValidMongoObjectId(id);

            const body: IComment = req.body;
            const updatedDoc: Comment = await this.service.updateOne(id, body);

            res.status(200).json({ data: updatedDoc, message: 'updated' });
        } catch (error) {
            next(error); 
        }
        
    }

    public deleteOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.id;

            isValidMongoObjectId(id);

            const deletedDoc: Comment = await this.service.deleteOne(id);

            res.status(200).json({ data: deletedDoc, message: 'deleted' });
        } catch (error) {
            next(error);
        }
    }
};
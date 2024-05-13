import { CommentController } from "@/controllers/comment.controller";
import { CreateCommentDto } from "@/dtos/comment.dto";
import { Routes } from "@/interfaces/routes.interface";
import { ValidationMiddleware } from "@/middlewares/validation.middleware";
import { Router } from "express";

export class CommentRoute implements Routes {
    public path = '/api/comments';
    public router = Router();
    public controller = new CommentController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:id`, this.controller.getAllById);
        this.router.post(`${this.path}/:id`, ValidationMiddleware(CreateCommentDto), this.controller.createOne);
        this.router.put(`${this.path}/:id`, ValidationMiddleware(CreateCommentDto, true, true), this.controller.updateOne);
        this.router.post(`${this.path}/:id/like`, ValidationMiddleware(CreateCommentDto, true, true), this.controller.likeOne);
        this.router.delete(`${this.path}/:id`, this.controller.deleteOne);
    }
}
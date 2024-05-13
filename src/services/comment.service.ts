import { HttpException } from '@/exceptions/httpException';
import { Comment, CommentModel, IComment } from '@/models/comment.model';
import { ReadingModel } from '@/models/reading.model';
import { Types } from 'mongoose';
import { Service } from 'typedi';

@Service()
export class CommentService {
  public async findAllById(id: string): Promise<Comment[]> {
    const result: Comment[] = await CommentModel.find({ reading: new Types.ObjectId(id) });

    if (!result) throw new HttpException(409, "Comment doesn't exist");

    return result;
  }

  public async createOne(data: IComment): Promise<Comment> {
    const reading = await ReadingModel.findById(data.reading);

    if (!reading) throw new HttpException(409, `Reading ${data.reading} doesn't exist`);

    return CommentModel.create(data);
  }

  public async updateOne(id: string, data: IComment): Promise<Comment> {
    const comment = await CommentModel.findById(id);
    if (!comment) throw new HttpException(409, `Comment with id ${id} doesn't exist`);

    const updateOneById: Comment = await CommentModel.findByIdAndUpdate({ _id: new Types.ObjectId(id) }, data, { new: true });

    return updateOneById;
  }

  public async likeOne(id: string, data: IComment): Promise<Comment> {
    const testUser = data.reading; // test User
    const comment = await CommentModel.findById(id);
    if (!comment) throw new HttpException(409, `Comment with id ${id} doesn't exist`);

    const alreadyLiked = comment.likes.some(userId => userId.equals(testUser));
    if (!alreadyLiked) {
      comment.likes.push(testUser);
    } else {
      comment.likes = comment.likes.filter(userId => !userId.equals(testUser));
    }
  
    comment.likesCounter = comment.likes.length;
    comment.save();

    return comment;
  }

  public async deleteOne(id: string): Promise<Comment> { 
    const deleteOneById: Comment = await CommentModel.findByIdAndDelete({ _id: new Types.ObjectId(id) });
    
    if (!deleteOneById) throw new HttpException(409, `Comment with id "${id}" doesn't exist`);

    return deleteOneById;
  }
}

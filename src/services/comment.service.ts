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
    console.log(comment);
    if (!comment) throw new HttpException(409, `Comment ${id} doesn't exist`);
    

    if (data.like && comment.like === false) {
        comment.likeCounter++;
        await comment.save();
    } if (!data.like && comment.like === true) {
        comment.likeCounter--;
        await comment.save();
    }

    const updateOneById: Comment = await CommentModel.findByIdAndUpdate({ _id: new Types.ObjectId(id) }, data, { new: true });
    if (!updateOneById) throw new HttpException(409, `Comment with id "${id}" doesn't exist`);

    return updateOneById;
  }

  public async deleteOne(id: string): Promise<Comment> {
    const deleteOneById: Comment = await CommentModel.findByIdAndDelete({ _id: new Types.ObjectId(id) });
    
    if (!deleteOneById) throw new HttpException(409, `Comment with id "${id}" doesn't exist`);

    return deleteOneById;
  }
}

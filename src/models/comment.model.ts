import { HydratedDocument, Model, Schema, Types, model, models } from 'mongoose';
import { IPropCreatedAt, IPropUpdatedAt } from '@interfaces/common.interface';
import { ReadingModel } from './reading.model';

export interface IComment extends IPropCreatedAt, IPropUpdatedAt {
  username: string;
  text: string;
  reading: Types.ObjectId;
  likes: Types.ObjectId[];
  likesCounter: number;
  avatarUrl: string;
}

export type ICommentModel = Model<IComment, {}>;

export type Comment = HydratedDocument<IComment>;

const CommentSchema: Schema = new Schema<IComment, ICommentModel>(
  {
    username: {
      required: true,
      type: String,
    },
    text: {
      required: true,
      type: String,
    },
    reading: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: ReadingModel,
    },
    likes: {
      required: true,
      type: [Schema.Types.ObjectId],
      default: []
    },
    likesCounter: {
      required: true,
      type: Number,
      default: 0,
      validate: {
        validator: Number.isInteger,
        message: prop => `propPath: ${prop.path}; propValue:${prop.value}; Is not an integer value!`,
      },
    },
    avatarUrl: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const CommentModel: ICommentModel = models.Comment ?? model<IComment, ICommentModel>('comment', CommentSchema);

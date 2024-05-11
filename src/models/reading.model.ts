import { model, Model, Schema, HydratedDocument, models, Types } from 'mongoose';
import { IPropCreatedAt, IPropUpdatedAt } from '@interfaces/common.interface';
import { LevelModel } from './level.model';

export interface IReading extends IPropCreatedAt, IPropUpdatedAt {
  name: string;
  description: string;
  level: Types.ObjectId;
  genre: string;
  task: string;
  text: string;
  textLength: number;
  imageUrl: string;
  audioUrl: string;
  likesCounter?: number;
  heartsCounter?: number;
  firesCounter?: number;
  explosionsCounter?: number;
  commentsCounter?: number;
}

export type IReadingModel = Model<IReading, {}>;

export type Reading = HydratedDocument<IReading>;

const ReadingSchema: Schema = new Schema<IReading, IReadingModel>(
  {
    name: {
      required: true,
      unique: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    level: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: LevelModel,
    },
    genre: {
      required: true,
      type: String,
    },
    task: {
      required: true,
      type: String,
    },
    text: {
      required: true,
      type: String,
    },
    textLength: {
      required: true,
      type: Number,
    },
    imageUrl: {
      type: String,
    },
    audioUrl: {
      type: String,
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
    heartsCounter: {
      required: true,
      type: Number,
      default: 0,
      validate: {
        validator: Number.isInteger,
        message: prop => `propPath: ${prop.path}; propValue:${prop.value}; Is not an integer value!`,
      },
    },
    firesCounter: {
      required: true,
      type: Number,
      default: 0,
      validate: {
        validator: Number.isInteger,
        message: prop => `propPath: ${prop.path}; propValue:${prop.value}; Is not an integer value!`,
      },
    },
    explosionsCounter: {
      required: true,
      type: Number,
      default: 0,
      validate: {
        validator: Number.isInteger,
        message: prop => `propPath: ${prop.path}; propValue:${prop.value}; Is not an integer value!`,
      },
    },
    commentsCounter: {
      required: true,
      type: Number,
      default: 0,
      validate: {
        validator: Number.isInteger,
        message: prop => `propPath: ${prop.path}; propValue:${prop.value}; Is not an integer value!`,
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const ReadingModel: IReadingModel = models.Reading ?? model<IReading, IReadingModel>('Reading', ReadingSchema);

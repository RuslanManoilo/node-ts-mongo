import { model, Model, Schema, HydratedDocument, models } from 'mongoose';
import { IPropCreatedAt, IPropUpdatedAt } from '@interfaces/common.interface';

export interface ILevel extends IPropCreatedAt, IPropUpdatedAt {
  name: string;
  sortNumber: number;
}

export type ILevelModel = Model<ILevel, {}>;

export type Level = HydratedDocument<ILevel>;

const LevelSchema: Schema = new Schema<ILevel, ILevelModel>(
  {
    name: {
      required: true,
      unique: true,
      type: String,
    },
    sortNumber: {
      required: true,
      type: Number,
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

export const LevelModel: ILevelModel = models.Level ?? model<ILevel, ILevelModel>('Level', LevelSchema);

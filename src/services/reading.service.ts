import { Types } from 'mongoose';
import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { LevelModel } from '@models/level.model';
import { ReadingModel, Reading, IReading } from '@models/reading.model';

@Service()
export class ReadingService {
  public async findAll(): Promise<Reading[]> {
    const result: Reading[] = await ReadingModel.find();
    return result;
  }

  public async findOneById(id: string): Promise<Reading> {
    const findOne: Reading = await ReadingModel.findOne({ _id: new Types.ObjectId(id) });
    if (!findOne) {
      throw new HttpException(409, "Reading doesn't exist");
    }

    return findOne;
  }

  public async createOne(data: IReading): Promise<Reading> {
    const level = await LevelModel.findById(data.level);
    if (!level) {
      throw new HttpException(409, `Level ${data.level} doesn't exist`);
    }

    if (data.text) {
      data.textLength = data.text.split(' ').length;
    }

    return ReadingModel.create(data);
  }

  public async updateOne(id: string, data: IReading): Promise<Reading> {
    if (data.level) {
      const level = await LevelModel.findById(data.level);
      if (!level) {
        throw new HttpException(409, `Level ${data.level} doesn't exist`);
      }
    }

    if (data.text) {
      data.textLength = data.text.split(' ').length;
    }

    const updateOneById: Reading = await ReadingModel.findByIdAndUpdate({ _id: new Types.ObjectId(id) }, data, { new: true });
    if (!updateOneById) {
      throw new HttpException(409, `Reading with id "${id}" doesn't exist`);
    }

    return updateOneById;
  }

  public async updateReactions(id: string, data: IReading): Promise<Reading> {
    if (data.level) {
      const level = await LevelModel.findById(data.level);
      if (!level) {
        throw new HttpException(409, `Level ${data.level} doesn't exist`);
      }
    }

    const reading = await ReadingModel.findById(id);

    data.likesCounter = data.likesCounter || reading.likesCounter;
    data.heartsCounter = data.heartsCounter || reading.heartsCounter;
    data.firesCounter = data.firesCounter || reading.firesCounter;
    data.explosionsCounter = data.explosionsCounter || reading.explosionsCounter;

    const updateReactionsById: Reading = await ReadingModel.findByIdAndUpdate({ _id: new Types.ObjectId(id) }, data, { new: true });
    if (!updateReactionsById) {
      throw new HttpException(409, `Reading with id "${id}" doesn't exist`);
    }

    return updateReactionsById;
  }

  public async deleteOne(id: string): Promise<Reading> {
    const deleteOneById: Reading = await ReadingModel.findByIdAndDelete({ _id: new Types.ObjectId(id) });
    if (!deleteOneById) {
      throw new HttpException(409, `Reading with id "${id}" doesn't exist`);
    }

    return deleteOneById;
  }
}

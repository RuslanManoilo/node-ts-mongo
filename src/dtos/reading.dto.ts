import { Types } from 'mongoose';
import { IsString, IsNotEmpty, IsUrl, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { toMongoObjectId } from '@utils/dto';
import { IReading } from '@models/reading.model';

export class CreateReadingDto
  implements
    Required<
      Omit<
        IReading,
        | 'likesCounter'
        | 'heartsCounter'
        | 'firesCounter'
        | 'explosionsCounter'
        | 'commentsCounter'
        | 'textLength'
        | 'createdAt'
        | 'updatedAt'
      >
    >
{
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  public description: string;

  @IsNotEmpty()
  @Transform(toMongoObjectId)
  public level: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  public genre: string;

  @IsNotEmpty()
  @IsString()
  public task: string;

  @IsNotEmpty()
  @IsString()
  public text: string;

  @IsOptional()
  @IsUrl()
  public imageUrl: string;

  @IsOptional()
  @IsUrl()
  public audioUrl: string;
}

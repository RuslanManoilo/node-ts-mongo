import { IsOptional, IsNumber } from 'class-validator';
import { IReading } from '@models/reading.model';

export class UpdateReactionsDto
  implements
    Required<
      Omit<
        IReading,
        | 'name'
        | 'description'
        | 'level'
        | 'genre'
        | 'task'
        | 'text'
        | 'imageUrl'
        | 'audioUrl'
        | 'commentsCounter'
        | 'textLength'
        | 'createdAt'
        | 'updatedAt'
      >
    >
{
  @IsOptional()
  @IsNumber()
  public likesCounter: number;

  @IsOptional()
  @IsNumber()
  public heartsCounter: number;

  @IsOptional()
  @IsNumber()
  public firesCounter: number;

  @IsOptional()
  @IsNumber()
  public explosionsCounter: number;

}

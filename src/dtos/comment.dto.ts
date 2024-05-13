import { IComment } from '@/models/comment.model';
import { toMongoObjectId } from '@/utils/dto';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { Types } from 'mongoose';


export class CreateCommentDto 
    implements 
        Required<
            Omit<
                IComment, 
                | 'likes' 
                | 'likesCounter' 
                | 'avatarUrl'
                | 'createdAt' 
                | 'updatedAt' 
            >
        > 
{
  @IsNotEmpty()
  @IsString()
  public username: string;

  @IsNotEmpty()
  @IsString()
  public text: string;

  @IsNotEmpty()
  @Transform(toMongoObjectId)
  public reading: Types.ObjectId;

  @IsOptional()
  @IsUrl()
  public avatarUrl: string;

}

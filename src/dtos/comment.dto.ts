import { IComment } from '@/models/comment.model';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';


export class CreateCommentDto 
    implements 
        Required<
            Omit<
                IComment, 
                | 'reading' 
                | 'likeCounter' 
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
  @IsBoolean()
  public like: boolean = false;

  @IsOptional()
  @IsUrl()
  public avatarUrl: string;

}

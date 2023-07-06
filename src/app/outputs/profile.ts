import { TypeId } from '../interfaces';

export interface LikeOutput {
  petId: TypeId;
  like: boolean;
}

export interface RemoveProfileCommentOutput {
  commentId: TypeId;
  profileId: TypeId;
  deleted: boolean;
}

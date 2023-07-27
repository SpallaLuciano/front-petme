import { Profile, TypeId } from '../interfaces';

export interface LikeOutput {
  petId: TypeId;
  like: boolean;
}

export interface CommentOutput {
  recipient: Profile;
  author: Profile;
}

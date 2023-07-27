import { TypeId } from '../interfaces';

export interface ProfileFormInput {
  name: string;
  lastname: string;
  birthdate: string;
}

export interface ProfileCommentInput {
  profileId: TypeId;
  rating: number;
  comment?: string;
}

export interface LikeInput {
  petId: TypeId;
}

export interface RemoveProfileCommentInput {
  commentId: TypeId;
}

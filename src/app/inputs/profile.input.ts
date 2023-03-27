export interface ProfileFormInput {
  name: string;
  lastname: string;
  birthdate: string;
}

export interface ProfileCommentInput {
  profileId: number;
  rating: number;
  comment?: string;
}

export interface LikeInput {
  petId: number;
}

export interface RemoveProfileCommentInput {
  commentId: number;
}

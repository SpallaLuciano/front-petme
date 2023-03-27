export interface LikeOutput {
  petId: number;
  like: boolean;
}

export interface RemoveProfileCommentOutput {
  commentId: number;
  profileId: number;
  deleted: boolean;
}

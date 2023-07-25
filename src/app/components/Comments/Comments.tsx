import { List } from '@mui/material';
import { FC } from 'react';
import { useAppSelector } from '../../state';
import { Comment } from './Comment';
import { TypeId } from '../../interfaces';

export const Comments: FC<{ profileId: TypeId }> = ({ profileId }) => {
  const comments = useAppSelector((state) => state.profile.profiles[profileId].comments || []);

  const mapComments = comments.map((comment) => <Comment comment={comment} />);

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>{mapComments}</List>
  );
};

import {
  Avatar,
  Chip,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material';
import { FC } from 'react';
import { Comment as InternalComment } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../state';
import { getFullName, getLongDate } from '../../utils';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeRateProfile } from '../../state/profile/profile.action-creators';

export const Comment: FC<{ comment: InternalComment }> = ({
  comment: { comment, datetime, author, rating, id }
}) => {
  const dispatch = useAppDispatch();
  const { fullName, img, isCurrentUser } = useAppSelector((state) => {
    const user = state.profile.profiles[author];
    const fullName = getFullName(user.name, user.lastname);
    const isCurrentUser = state.auth.auth.user === author;

    return {
      fullName,
      img: user.image?.url || '',
      isCurrentUser
    };
  });

  const secondaryText = (
    <>
      <Typography variant="body1">
        <Chip label={rating} />
        {comment}
      </Typography>
      <Typography variant="caption">{getLongDate(datetime)}</Typography>
    </>
  );

  const handleDelete = () => {
    dispatch(removeRateProfile({ commentId: id }));
  };

  const deleteButton = (
    <IconButton onClick={handleDelete}>
      <DeleteIcon />
    </IconButton>
  );

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={fullName} src={img} />
      </ListItemAvatar>
      <ListItemText primary={fullName} secondary={secondaryText} />
      {isCurrentUser ? deleteButton : undefined}
    </ListItem>
  );
};

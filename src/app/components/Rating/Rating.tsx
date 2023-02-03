import { FC } from 'react';
import { Chip, Rating as RatingMUI } from '@mui/material';
import { rateProfile, useAppDispatch, useAppSelector } from '../../state';
import style from './Rating.module.scss';

interface Props {
  profileId: number;
}

export const Rating: FC<Props> = ({ profileId }) => {
  const rating = useAppSelector((state) => state.profile.profiles[profileId]?.rating || 0);
  const dispatch = useAppDispatch();

  const handleRate = (event: React.SyntheticEvent<Element, Event>, rate: number | null) => {
    if (typeof rate === 'number') {
      dispatch(rateProfile({ profileId, rate }));
    }
  };

  return (
    <div className={style.Rating}>
      <RatingMUI value={rating} precision={0.5} onChange={handleRate} size="large" />
      <Chip label={rating} size="medium" />
    </div>
  );
};

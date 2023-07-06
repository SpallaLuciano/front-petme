import { FC, useState } from 'react';
import { Button, Chip, Rating as RatingMUI, TextField } from '@mui/material';
import { rateProfile, useAppDispatch, useAppSelector } from '../../state';
import style from './Rating.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProfileCommentInput } from '../../inputs';
import { rateValidationSchema } from '../../validation-schema/profile.validation-schema';
import { TypeId } from '../../interfaces';

interface Props {
  profileId: TypeId;
}

export const Rating: FC<Props> = ({ profileId }) => {
  const rating = useAppSelector((state) => state.profile.profiles[profileId]?.rating || 0);
  const [rate, setRate] = useState(rating);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ProfileCommentInput>({
    resolver: yupResolver(rateValidationSchema),
    defaultValues: {
      profileId
    }
  });

  const handleRate = (event: React.SyntheticEvent<Element, Event>, rate: number | null) => {
    if (typeof rate === 'number') {
      setRate(rate);
    }
  };

  const onSubmit = (commentInput: ProfileCommentInput) => {
    commentInput.rating = rate;

    dispatch(rateProfile(commentInput));
  };

  return (
    <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit(onSubmit)}>
      <div className={style.Rating}>
        <RatingMUI value={rate} precision={0.5} onChange={handleRate} size="large" />
        <Chip label={rating} size="medium" />
      </div>
      <TextField
        label="Comentario"
        id="comment"
        type="text"
        variant="filled"
        {...register('comment')}
        error={Boolean(errors.comment)}
        helperText={errors.comment && errors.comment.message}
      />
      <Button type="submit">Enviar</Button>
    </form>
  );
};

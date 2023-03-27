import { createAsyncThunk } from '@reduxjs/toolkit';
import { PROFILES } from '../../mocks/profile.mock';
import { Comment, Image, Profile } from '../../interfaces';
import { setAlert } from '../alert';
import { LikeInput, ProfileCommentInput, RemoveProfileCommentInput } from '../../inputs';
import { AxiosResponse } from 'axios';
import { RootState } from '../store';
import { LikeOutput, RemoveProfileCommentOutput } from '../../outputs';

interface ProfileInput {
  name: string;
  lastname: string;
  birthdate: string;
}

export const fetchProfiles = createAsyncThunk<
  Profile[],
  void,
  {
    rejectValue: string;
  }
>('profile/fetch', async (input, { rejectWithValue }) => {
  try {
    const { data } = await Promise.resolve({ data: PROFILES });

    return data;
  } catch (error) {
    return rejectWithValue('error');
  }
});

export const createProfile = createAsyncThunk<
  Profile,
  ProfileInput,
  {
    rejectValue: string;
  }
>('profile/create', async (input, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await Promise.resolve({ data: PROFILES[0] });

    dispatch(
      setAlert({
        severity: 'success',
        title: 'Creación de perfil',
        message: 'Se creó con éxito el perfil'
      })
    );

    return data;
  } catch (error) {
    dispatch(
      setAlert({
        severity: 'error',
        title: 'Creación de perfil',
        message: 'Hubo un problema al crear el perfil'
      })
    );

    return rejectWithValue('error');
  }
});

export const updateProfile = createAsyncThunk<
  Profile,
  Partial<Profile>,
  {
    rejectValue: string;
  }
>('profile/update', async (input, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await Promise.resolve({ data: { ...PROFILES[0], ...input } });

    dispatch(
      setAlert({
        severity: 'success',
        title: 'Actialización de perfil',
        message: 'Se actualizó con éxito el perfil'
      })
    );

    return data;
  } catch (error) {
    dispatch(
      setAlert({
        severity: 'error',
        title: 'Actialización de perfil',
        message: 'Hubo un problema al actualizar el perfil'
      })
    );

    return rejectWithValue('error');
  }
});

export const updateImageProfile = createAsyncThunk<
  Image,
  FormData,
  {
    rejectValue: string;
  }
>('profile/imageUpdate', async (image, { rejectWithValue, dispatch }) => {
  try {
    if (PROFILES[0].image) {
      const { data } = await Promise.resolve({ data: { ...PROFILES[0].image } });

      dispatch(
        setAlert({
          severity: 'success',
          title: 'Actialización de imagen de perfil',
          message: 'Se actualizó con éxito el imagen de perfil'
        })
      );

      return data;
    } else {
      throw new Error();
    }
  } catch (error) {
    dispatch(
      setAlert({
        severity: 'error',
        title: 'Actialización de imagen de perfil',
        message: 'Hubo un problema al actualizar el imagen de perfil'
      })
    );

    return rejectWithValue('error');
  }
});

export const removeImageProfile = createAsyncThunk<
  string,
  void,
  {
    rejectValue: string;
  }
>('profile/imageRemove', async (arg, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await Promise.resolve({ data: 'Remove fulfilled' });

    dispatch(
      setAlert({
        severity: 'success',
        title: 'Eliminado de imagen de perfil',
        message: 'Se eliminó con éxito el imagen de perfil'
      })
    );

    return data;
  } catch (error) {
    dispatch(
      setAlert({
        severity: 'error',
        title: 'Eliminado de imagen de perfil',
        message: 'Hubo un problema al actualizar el imagen de perfil'
      })
    );

    return rejectWithValue('error');
  }
});

export const likeProfile = createAsyncThunk<
  LikeOutput,
  LikeInput,
  {
    rejectValue: string;
  }
>('profile/like', async ({ petId }, { rejectWithValue, dispatch, getState }) => {
  let title = '';
  let message = '';

  try {
    const like = !(getState() as RootState).profile.profile?.favs.includes(petId);

    const { data } = await Promise.resolve<AxiosResponse<LikeOutput>>({
      data: {
        petId,
        like
      }
    } as AxiosResponse);

    if (data.like) {
      title = 'Agregar a favoritos';
      message = 'Se agregó con éxito la mascota a favoritos';
    } else {
      title = 'Eliminar de favoritos';
      message = 'Se eliminó con éxtio la mascota de favotiros';
    }

    dispatch(
      setAlert({
        severity: 'success',
        title,
        message
      })
    );

    return data;
  } catch (error) {
    dispatch(
      setAlert({
        severity: 'error',
        title: 'Favoritos',
        message: 'Hubo un problema al modificar los favoritos'
      })
    );

    return rejectWithValue('error');
  }
});

export const rateProfile = createAsyncThunk<
  Comment,
  ProfileCommentInput,
  {
    rejectValue: string;
  }
>(
  'profile/rateProfile',
  async ({ profileId, rating, comment }, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await Promise.resolve<AxiosResponse<Comment>>({
        data: {
          id: 2,
          from: (getState() as RootState).auth.auth.user,
          to: profileId,
          rating,
          comment,
          datetime: new Date().toISOString()
        }
      } as AxiosResponse);

      dispatch(
        setAlert({
          severity: 'success',
          title: 'Creación de comentario',
          message: 'Se creó con éxito el comentario de perfil'
        })
      );

      return data;
    } catch (error) {
      dispatch(
        setAlert({
          severity: 'error',
          title: 'Creación de comentario',
          message: 'Hubo un problema al crear el comentario de perfil'
        })
      );

      return rejectWithValue('error');
    }
  }
);

export const removeRateProfile = createAsyncThunk<
  RemoveProfileCommentOutput,
  RemoveProfileCommentInput,
  {
    rejectValue: string;
  }
>('profile/removeRate', async ({ commentId }, { getState, dispatch, rejectWithValue }) => {
  try {
    const profiles = (getState() as RootState).profile.profiles;

    const profile: Profile | undefined = Object.values(profiles).find((profile) =>
      profile.comments.find((comment) => comment.id === commentId)
    );

    if (!profile) throw new Error('Not found');

    const { data } = await Promise.resolve<AxiosResponse<RemoveProfileCommentOutput>>({
      data: {
        profileId: profile.id,
        commentId,
        deleted: true
      }
    } as AxiosResponse);

    dispatch(
      setAlert({
        severity: 'success',
        title: 'Eliminación de comentario',
        message: 'Se eliminó con éxito el comentario de perfil'
      })
    );

    return data;
  } catch (error) {
    dispatch(
      setAlert({
        severity: 'error',
        title: 'Eliminación de comentario',
        message: 'Hubo un problema al eliminar el comentario de perfil'
      })
    );

    return rejectWithValue('error');
  }
});

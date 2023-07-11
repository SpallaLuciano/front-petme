import { createAsyncThunk } from '@reduxjs/toolkit';
import { Comment, Profile } from '../../interfaces';
import { setAlert } from '../alert';
import {
  LikeInput,
  ProfileCommentInput,
  ProfileFormInput,
  RemoveProfileCommentInput
} from '../../inputs';
import { LikeOutput } from '../../outputs';
import { get, post, put, remove, RequestError } from '../../utils';

const endpoint = 'profiles';

export const fetchProfiles = createAsyncThunk<
  Profile[],
  void,
  {
    rejectValue: string;
  }
>('profile/fetch', async (_input, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await get<Profile[]>(endpoint, dispatch);

    return data;
  } catch (error) {
    if (!(error instanceof RequestError)) {
      dispatch(
        setAlert({
          title: 'Error al cargar perfiles',
          message: 'Hubo un problema al cargar los perfiles'
        })
      );
    }

    return rejectWithValue('error');
  }
});

export const createProfile = createAsyncThunk<
  Profile,
  ProfileFormInput,
  {
    rejectValue: string;
  }
>('profile/create', async (input, { rejectWithValue, dispatch }) => {
  try {
    const { data, status } = await post<Profile>(endpoint, input, dispatch);

    dispatch(
      setAlert({
        severity: status,
        title: 'Creación de perfil',
        message: 'Se creó con éxito el perfil'
      })
    );

    return data;
  } catch (error) {
    if (!(error instanceof RequestError)) {
      dispatch(
        setAlert({
          title: 'Creación de perfil',
          message: 'Hubo un problema al crear el perfil'
        })
      );
    }

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
    if (input.birthdate) {
      input.birthdate = new Date(input.birthdate).toISOString();
    }
    const { data, status } = await put<Profile>(endpoint, input, dispatch);

    dispatch(
      setAlert({
        severity: status,
        title: 'Actialización de perfil',
        message: 'Se actualizó con éxito el perfil'
      })
    );

    return data;
  } catch (error) {
    if (!(error instanceof RequestError)) {
      dispatch(
        setAlert({
          title: 'Actialización de perfil',
          message: 'Hubo un problema al actualizar el perfil'
        })
      );
    }

    return rejectWithValue('error');
  }
});

export const updateImageProfile = createAsyncThunk<
  Profile,
  FormData,
  {
    rejectValue: string;
  }
>('profile/imageUpdate', async (input, { rejectWithValue, dispatch }) => {
  try {
    const { data, status } = await post<Profile>(`${endpoint}/image`, input, dispatch);

    dispatch(
      setAlert({
        severity: status,
        title: 'Actialización de imagen de perfil',
        message: 'Se actualizó con éxito el imagen de perfil'
      })
    );

    return data;
  } catch (error) {
    if (!(error instanceof RequestError)) {
      dispatch(
        setAlert({
          title: 'Actialización de imagen de perfil',
          message: 'Hubo un problema al actualizar el imagen de perfil'
        })
      );
    }

    return rejectWithValue('error');
  }
});

export const removeImageProfile = createAsyncThunk<
  Profile,
  void,
  {
    rejectValue: string;
  }
>('profile/imageRemove', async (_arg, { rejectWithValue, dispatch }) => {
  try {
    const { data, status } = await remove<Profile>(`${endpoint}/image`, dispatch);

    dispatch(
      setAlert({
        severity: status,
        title: 'Eliminado de imagen de perfil',
        message: 'Se eliminó con éxito el imagen de perfil'
      })
    );

    return data;
  } catch (error) {
    if (!(error instanceof RequestError)) {
      dispatch(
        setAlert({
          title: 'Eliminado de imagen de perfil',
          message: 'Hubo un problema al actualizar el imagen de perfil'
        })
      );
    }

    return rejectWithValue('error');
  }
});

export const likeProfile = createAsyncThunk<
  LikeOutput,
  LikeInput,
  {
    rejectValue: string;
  }
>('profile/like', async ({ petId }, { rejectWithValue, dispatch }) => {
  let title = '';
  let message = '';

  try {
    const { data, status } = await get<LikeOutput>(`pet/like/${petId}`, dispatch);

    if (data.like) {
      title = 'Agregar a favoritos';
      message = 'Se agregó con éxito la mascota a favoritos';
    } else {
      title = 'Eliminar de favoritos';
      message = 'Se eliminó con éxtio la mascota de favotiros';
    }

    dispatch(
      setAlert({
        severity: status,
        title,
        message
      })
    );

    return data;
  } catch (error) {
    if (!(error instanceof RequestError)) {
      dispatch(
        setAlert({
          title: 'Favoritos',
          message: 'Hubo un problema al modificar los favoritos'
        })
      );
    }

    return rejectWithValue('error');
  }
});

export const rateProfile = createAsyncThunk<
  Comment,
  ProfileCommentInput,
  {
    rejectValue: string;
  }
>('profile/rateProfile', async (input, { rejectWithValue, dispatch }) => {
  try {
    const { data, status } = await post<Comment>('comments', input, dispatch);

    dispatch(
      setAlert({
        severity: status,
        title: 'Creación de comentario',
        message: 'Se creó con éxito el comentario de perfil'
      })
    );

    return data;
  } catch (error) {
    if (!(error instanceof RequestError)) {
      dispatch(
        setAlert({
          title: 'Creación de comentario',
          message: 'Hubo un problema al crear el comentario de perfil'
        })
      );
    }

    return rejectWithValue('error');
  }
});

export const removeRateProfile = createAsyncThunk<
  Comment,
  RemoveProfileCommentInput,
  {
    rejectValue: string;
  }
>('profile/removeRate', async ({ commentId }, { dispatch, rejectWithValue }) => {
  try {
    const { data, status } = await remove<Comment>(`comments/${commentId}`, dispatch);

    dispatch(
      setAlert({
        severity: status,
        title: 'Eliminación de comentario',
        message: 'Se eliminó con éxito el comentario de perfil'
      })
    );

    return data;
  } catch (error) {
    if (!(error instanceof RequestError)) {
      dispatch(
        setAlert({
          title: 'Eliminación de comentario',
          message: 'Hubo un problema al eliminar el comentario de perfil'
        })
      );
    }

    return rejectWithValue('error');
  }
});

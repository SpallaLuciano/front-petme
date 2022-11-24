import { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { SignIn } from '../pages/SignIn';
import { useAppDispatch, useAppSelector, isValidToken } from '../state';

export const AuthWrapper: FC = () => {
  const dispatch = useAppDispatch();

  const validToken = useAppSelector((state) => {
    return state.auth.auth.validToken;
  });

  useEffect(() => {
    dispatch(isValidToken());
  }, []);

  return validToken
    ? <Outlet/>
    : <SignIn />;
};

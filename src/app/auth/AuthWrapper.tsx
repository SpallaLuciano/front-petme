import { FC, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isValidToken, useAppDispatch, useAppSelector } from '../state';

export const AuthWrapper: FC = () => {
  const dispatch = useAppDispatch();

  const validToken = useAppSelector((state) => {
    return state.auth.auth.validToken;
  });

  useEffect(() => {
    dispatch(isValidToken());
  }, []);

  return validToken ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

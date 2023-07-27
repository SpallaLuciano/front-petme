import { FC, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../state';
import { isValidToken } from '../state/auth/auth.slice';

export const AuthWrapper: FC = () => {
  const dispatch = useAppDispatch();

  const { validToken, token } = useAppSelector((state) => {
    return { validToken: state.auth.auth.validToken, token: state.auth.auth.token };
  });

  useEffect(() => {
    dispatch(isValidToken());
  }, [token]);

  return validToken ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

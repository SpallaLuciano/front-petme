import { FC, useEffect, useState } from 'react';
import { AlertColor, Alert as AlertMui, AlertTitle, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../state';
import { GeneralStatus } from '../../enums';
import { clearAlert } from '../../state/alert';

export const Alert: FC = () => {
  const dispatch = useAppDispatch();
  const { alert, showAlert } = useAppSelector((state) => {
    const alert = state.alert.alert;
    const status = state.alert.status;
    const showAlert =
      !(status === GeneralStatus.IDLE || status === GeneralStatus.LOADING) &&
      (alert.severity === 'ERROR' || alert.severity === 'SUCCESS' || alert.severity === 'WARNING');

    return {
      alert,
      showAlert
    };
  });
  const [open, setOpen] = useState(showAlert);
  const [stateAlert, setAlert] = useState(alert);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (showAlert) {
      setAlert(alert);
      setOpen(true);
      dispatch(clearAlert());
    }
  });

  const { message, severity, title } = stateAlert;

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <AlertMui
        onClose={handleClose}
        severity={(severity?.toLowerCase() as AlertColor) || undefined}
        sx={{ width: '100%' }}
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
      </AlertMui>
    </Snackbar>
  );
};

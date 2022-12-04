import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { FC, forwardRef, ReactElement } from 'react';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  title: string;
  description: string;
  open: boolean;
  onConfirmation: () => void;
  onClose: () => void;
}

export const ConfirmationDialog: FC<Props> = ({
  title,
  description,
  open,
  onConfirmation,
  onClose
}) => {
  return(
    <Dialog
      open={open}
      onClose={onClose}
      keepMounted
      TransitionComponent={Transition}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onConfirmation}>Confirmar</Button>
      </DialogActions>
    </Dialog>
  );
};

import { AppBar, Dialog, IconButton, Slide, Toolbar, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { FC, forwardRef, ReactElement, ReactNode, Ref } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import style from './PetDialog.module.scss';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  label: string;
  open: boolean;
  children?: ReactNode;
  onClose: () => void;
}

export const PetDialog: FC<Props> = ({ label, open, onClose, children }) => {
  return (
    <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
      <AppBar className={style.AppBar}>
        <Toolbar className={style.Toolbar}>
          <div className={style.LeftSide}>
            <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" component="div">
              {label}
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <div className={style.Container}>{children}</div>
    </Dialog>
  );
};

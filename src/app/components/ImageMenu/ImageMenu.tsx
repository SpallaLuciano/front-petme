import { Menu, MenuItem } from '@mui/material';
import { ChangeEvent, FC } from 'react';
import { useAppDispatch } from '../../state';
import {
  removeImageProfile,
  updateImageProfile
} from '../../state/profile/profile.action-creators';

interface Props {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
}

export const ImageMenu: FC<Props> = ({ open = false, onClose, anchorEl }) => {
  const dispatch = useAppDispatch();
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];

      const data = new FormData();

      data.append('file', file);

      dispatch(updateImageProfile(data));
      onClose();
    }
  };

  const handleFileRemove = () => {
    dispatch(removeImageProfile());
    onClose();
  };

  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <MenuItem key="update-image" component="label">
        Cambiar Imagen
        <input accept="image/*" hidden id="upload-photo" type="file" onChange={handleFileUpload} />
      </MenuItem>
      <MenuItem key="remove-image" onClick={handleFileRemove}>
        Quitar Imagen
      </MenuItem>
    </Menu>
  );
};

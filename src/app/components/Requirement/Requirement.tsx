import {
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import { FC } from 'react';
import { Requirement as Req } from '../../interfaces';

export const Requirement: FC<{
  id: number;
  requirement: Req;
  checked: boolean;
  setChecked: () => void;
}> = ({ id, requirement: { required, requirement }, checked, setChecked }) => {
  const labelId = `label:${id}`;

  return (
    <ListItem key={id} disablePadding>
      <ListItemButton role={undefined} dense onClick={setChecked}>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </ListItemIcon>
        <ListItemText
          id={labelId}
          primary={
            <Typography variant="body1" style={{ fontWeight: required ? 'bold' : 'normal' }}>
              {required ? '*' : undefined} {requirement}
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

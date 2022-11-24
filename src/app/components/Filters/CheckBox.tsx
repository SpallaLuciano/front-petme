import { Checkbox } from '@mui/material';
import { FC } from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

interface Props {
  value: boolean;
  label: string;
  onClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const CheckBox: FC<Props> = ({ value, label, onClick }) => {
  
  return <>
    <Checkbox
      checked={value}
      icon={<CircleOutlinedIcon />}
      checkedIcon={<CircleIcon />}
      onChange={onClick}
    /> {label}
  </>;
};

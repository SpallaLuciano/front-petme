import { Button } from '@mui/material';
import { ChangeEvent, FC, ReactNode, useState } from 'react';
import { ConfirmationDialog } from '../ConfirmationDialog';

interface Props {
  description: string,
  title: string,
  multiple: boolean,
  buttonChildren: ReactNode,
  imageUpload: (image: FormData) => void
}

export const ImagePetForm: FC<Props> = ({
  description,
  title,
  multiple,
  buttonChildren,
  imageUpload
}) => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<FormData>();
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const data = new FormData();
  
      data.append('file', file);
  
      setOpen(true);
      setImage(data);
    }
  };

  const onConfirmation = () => {
    setOpen(false);
    if (image) {
      imageUpload(image);
    }
  };

  return <div>
    <Button variant="contained" component="label">
      {buttonChildren}
      <input
        hidden
        id="upload-photo"
        type="file"
        onChange={handleFileUpload}
        accept="image/*"
        multiple={multiple}
      />
    </Button>
    <ConfirmationDialog
      open={open}
      onClose={() => setOpen(false)}
      onConfirmation={onConfirmation}
      title={title}
      description={description}
    />
  </div>;
};

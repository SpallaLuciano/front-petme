import { FC, ReactNode } from 'react';
import ReactCarousel, { ControlProps } from 'nuka-carousel';
import { IconButton } from '@mui/material';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import style from './Carousel.module.scss';

interface Props {
  children?: ReactNode | ReactNode[];
  rightButton?: (props: ControlProps) => ReactNode;
}

const renderLeftButton = ({ previousSlide }: ControlProps) => (
  <IconButton color="primary" onClick={previousSlide}>
    <ArrowCircleLeftIcon className={style.Button} fontSize="large" />
  </IconButton>
);

const renderRightButton = ({ nextSlide }: ControlProps) => (
  <IconButton color="primary" onClick={nextSlide} >
    <ArrowCircleRightIcon className={style.Button} fontSize="large" />
  </IconButton>
);

export const Carousel: FC<Props> = ({children, rightButton}) => {
  return <ReactCarousel
    slidesToShow={1}
    wrapAround={true}
    renderCenterLeftControls={renderLeftButton}
    renderCenterRightControls={renderRightButton}
    renderBottomRightControls={rightButton}
  >
    {children}
  </ReactCarousel>;
};

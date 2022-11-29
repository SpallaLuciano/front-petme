import { FC, ReactNode } from 'react';
import ReactCarousel from 'nuka-carousel';

interface Props {
  children?: ReactNode | ReactNode[]
}

export const Carousel: FC<Props> = ({children}) => {
  return <ReactCarousel slidesToShow={1} cellAlign="center" defaultControlsConfig={{
    nextButtonText: '>',
    prevButtonText: '<'
  }}>
    {children}
  </ReactCarousel>;
};

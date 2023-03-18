import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { EventsList } from '../../components';
import style from './Events.module.scss';

export const Events: FC = () => {
  const { petId } = useParams();

  return (
    <div className={style.Container}>
      <h1>Listado de eventos</h1>
      <div className={style.ListCenter}>
        <EventsList petId={Number(petId)} />
      </div>
    </div>
  );
};

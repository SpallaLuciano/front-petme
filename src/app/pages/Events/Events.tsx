import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Backward, EventsList } from '../../components';
import style from './Events.module.scss';

export const Events: FC = () => {
  const { petId } = useParams();

  return (
    <div className={style.Container}>
      <div className={style.Backward}>
        <Backward />
        <h1>Listado de eventos</h1>
      </div>
      <div className={style.ListCenter}>
        <EventsList petId={Number(petId)} />
      </div>
    </div>
  );
};

import { Button, Typography } from '@mui/material';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Cell, Tooltip, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { Backward, HealthInfo, VisitCard } from '../../components';
import { visitProps } from '../../enums';
import { useAppSelector } from '../../state';
import { sortVisitsByDate } from '../../utils';
import style from './Health.module.scss';

export const Health: FC = () => {
  const navigate = useNavigate();
  const { petId } = useParams();
  const {
    pet: { name },
    health: { visits }
  } = useAppSelector((state) => {
    const pet = state.pet.pets[String(petId)];
    const health = state.health.health[String(petId)];

    return {
      pet,
      health
    };
  });
  const acc: {
    [key: string]: {
      name: string;
      value: number;
      color: string;
    };
  } = {};

  const orderedVisits = visits.slice().sort(sortVisitsByDate);

  const amount = visits.reduce((acc, { type }) => {
    const { color, label } = visitProps[type];
    acc[type] ??= {
      name: label,
      value: 0,
      color: color
    };
    acc[type].value += 1;

    return acc;
  }, acc);

  const arrayAmount = Object.values(amount);

  const lastVisit = <VisitCard isOwner={false} visit={orderedVisits[0]} />;

  const pieChart = (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {Object.entries(visitProps).map(([type, visit]) => (
          <div style={{ backgroundColor: visit.color, padding: '8px' }}>
            {visit.label}: {amount[type]?.value}
          </div>
        ))}
      </div>
      <ResponsiveContainer>
        <PieChart>
          <Tooltip />
          <Pie
            dataKey="value"
            data={arrayAmount}
            animationBegin={100}
            animationDuration={1000}
            innerRadius="40%"
          >
            {arrayAmount.map((value, index) => (
              <Cell key={`cell-${index}`} fill={value.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  );

  return (
    <div className={style.Container}>
      <div className={style.Header}>
        <Backward />
        <h1>Salud de {name}</h1>
      </div>
      <div className={style.Dashboard}>
        <HealthInfo petId={Number(petId)} />
        <div>
          <Typography variant="h5" style={{ marginBottom: '8px' }}>
            Última visita a veterinaria{' '}
            <Button
              variant="contained"
              onClick={() => navigate('visits')}
              style={{ backgroundColor: '#2E8B57' }}
            >
              Ir a visitas
            </Button>
          </Typography>
          {orderedVisits[0] ? lastVisit : 'No tiene visitas cargadas'}
        </div>
        <div className={style.PieContainer}>
          <Typography variant="h5">Cantidad de visitas por tipo</Typography>
          {arrayAmount.length ? pieChart : 'No tiene visitas cargadas'}
        </div>
      </div>
    </div>
  );
};

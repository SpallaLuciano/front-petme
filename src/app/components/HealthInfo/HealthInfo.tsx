import { FC } from 'react';
import { GeneralInfo } from './GeneralInfo';
import { Vaccines } from './Vaccines';

export const HealthInfo: FC<{ petId: number }> = ({ petId }) => {
  return (
    <div>
      <GeneralInfo petId={petId} />
      <Vaccines petId={petId} />
    </div>
  );
};

import { FC } from 'react';
import { GeneralInfo } from './GeneralInfo';
import { Vaccines } from './Vaccines';
import { TypeId } from '../../interfaces';

export const HealthInfo: FC<{ petId: TypeId }> = ({ petId }) => {
  return (
    <div>
      <GeneralInfo petId={petId} />
      <Vaccines petId={petId} />
    </div>
  );
};

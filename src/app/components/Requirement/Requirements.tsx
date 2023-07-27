import { List } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useAppSelector } from '../../state';
import { Requirement } from './Requirement';

export const Requirements: FC<{
  petId: number;
  setAllRequired: (allRequired: boolean) => void;
}> = ({ petId, setAllRequired }) => {
  const [checks, setChecks] = useState<boolean[]>([]);
  const { required, requirements } = useAppSelector((state) => {
    const requirements = state.pet.pets[petId].requirements;
    const required = requirements
      .map(({ required }, index) => (required ? index : undefined))
      .filter((req) => !!req);

    return {
      requirements,
      required
    };
  });

  useEffect(() => {
    const allRequired = required.every((req) => checks[req || -1]);

    setAllRequired(allRequired);
  }, [checks]);

  const handleCheck = (id: number) => {
    const newChecks = [...checks];

    newChecks[id] = newChecks[id] ? false : true;

    setChecks(newChecks);
  };

  const mapRequirements = requirements.map((requirement, index) => {
    return (
      <Requirement
        key={index}
        id={index}
        requirement={requirement}
        checked={!!checks[index]}
        setChecked={() => handleCheck(index)}
      />
    );
  });

  return <List>{mapRequirements}</List>;
};

import { FC, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { PetCard } from '../../components';
import { Pet } from '../../interfaces';
import { useAppSelector } from '../../state';

export const MyPets: FC = () => {
  const { pets, profile, coordinates } = useAppSelector((state) => {
    return {
      pets: state.pet.pets,
      coordinates: state.coordinates.coordinates,
      profile: {
        pets: state.profile.profile?.pets
      }
    };
  });

  const [profilePets, setProfilePets] = useState<Pet[]>([]);

  useEffect(() => {
    if (profile && profile.pets && Object.keys(pets).length) {
      const mapPets: Pet[] = [];
      
      profile?.pets.forEach((id: number) => {
        const pet = pets[id];
        if (pet) {
          mapPets.push(pet);
        }
      });

      setProfilePets(mapPets);
    } else {
      setProfilePets([]);
    }
  }, [profile?.pets]);


  if (!profile) {
    return (<div>Debe iniciar sesión para acceder a esta sección</div>);
  } else if (!profilePets.length) {
    return (<div>No tiene mascotas cargadas en este momento: Cargar Mascota</div>);
  } else {
    return (
      <div>
        <Grid container spacing={4}>
          {
            profilePets.map((pet, key) => 
              <PetCard key={key} pet={pet} coordinates={coordinates}></PetCard>
            )
          }
        </Grid>
      </div>
    );
  }
};

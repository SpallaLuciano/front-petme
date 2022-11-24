import { FC, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import {
  AgeBetweenFilter,
  GenderFilter,
  KindFilter,
  OrderByFilter,
  SizeFilter,
} from '../Filters';
import { FilterSummary } from '../FilterSummary';
import style from './PetFilters.module.scss';

export const PetFilters: FC = () => {

  const [expanded, setExpanded] = useState('');

  const handleExanded = (bool: boolean, value: string) => {
    if (bool) {
      setExpanded(value);
    } else {
      setExpanded('');
    }
    console.log(expanded);
  };

  return (
    <div className={style.Container}>
      <h2>Filtros</h2>
      <div>
        <FilterSummary />
      </div>
      <form className={style.Form}>
        <Accordion
          expanded={'age' === expanded}
          onChange={(event, bool) => handleExanded(bool, 'age')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Edades</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AgeBetweenFilter />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={'kind' === expanded}
          onChange={(event, bool) => handleExanded(bool, 'kind')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Especies</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <KindFilter />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={'gender' === expanded}
          onChange={(event, bool) => handleExanded(bool, 'gender')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Géneros</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <GenderFilter />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={'size' === expanded}
          onChange={(event, bool) => handleExanded(bool, 'size')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Tamaños</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <SizeFilter />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={'orderBy' === expanded}
          onChange={(event, bool) => handleExanded(bool, 'orderBy')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Ordenar Publicaciones</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <OrderByFilter />
          </AccordionDetails>
        </Accordion>
      </form>
    </div>
  );
};

import { ContinentIcon } from './ContinentIcon';

export const difficulties = [1, 2, 3, 4, 5];
export const seasons = ['Summer', 'Autumn', 'Winter', 'Spring'];
export const duration = [
  {
    label: '1:00 hour',
    value: 1,
  },
  {
    label: '2:00 hour',
    value: 2,
  },
  {
    label: '3:00 hour',
    value: 3,
  },
  {
    label: '4:00 hour',
    value: 4,
  },
  {
    label: '5:00 hour',
    value: 5,
  },
  {
    label: '6:00 hour',
    value: 6,
  },
  {
    label: 'Full day',
    value: 24,
  },
];
export const reg_ex = /^[A-Za-z ]+$/;

export const imgNotFoundurl =
  'https://reparaciondeordenadoresadomicilio.es/wp-content/uploads/2021/01/error404.png';

export const imgNA = 'https://cdn-icons-png.flaticon.com/512/2072/2072193.png';
export const imgANT = 'https://cdn-icons-png.flaticon.com/128/4051/4051408.png';
export const imgAS = 'https://cdn-icons-png.flaticon.com/512/2072/2072187.png';
export const imgSA = 'https://cdn-icons-png.flaticon.com/128/2072/2072212.png';
export const imgOCE = 'https://cdn-icons-png.flaticon.com/512/2072/2072178.png';
export const imgEUO = 'https://cdn-icons-png.flaticon.com/512/2072/2072174.png';
export const imgAFR = 'https://cdn-icons-png.flaticon.com/512/2072/2072205.png';
export const sqrmetters =
  'https://cdn-icons-png.flaticon.com/512/5194/5194031.png';
export const location = 'https://cdn-icons-png.flaticon.com/512/584/584517.png';
export const imgcontinents =
  'https://cdn-icons-png.flaticon.com/512/869/869198.png';

export const continents = {
  AFRICA: {
    value: 'Africa',
    icon: <ContinentIcon img={imgAFR} />,
  },
  ANTARTICA: {
    value: 'Antartica',
    icon: <ContinentIcon img={imgANT} />,
  },
  ASIA: {
    value: 'Asia',
    icon: <ContinentIcon img={imgAS} />,
  },
  EUROPE: {
    value: 'Europe',
    icon: <ContinentIcon img={imgEUO} />,
  },
  NORTH_AMERICA: {
    value: 'North America',
    icon: <ContinentIcon img={imgNA} />,
  },
  OCEANIA: {
    value: 'Oceania',
    icon: <ContinentIcon img={imgOCE} />,
  },
  SOUTH_AMERICA: {
    value: 'South America',
    icon: <ContinentIcon img={imgSA} />,
  },
  All: {
    value: 'All',
  },
};

export const setContinentImg = {
  [continents.ASIA.value]: continents.ASIA.icon,
  [continents.EUROPE.value]: continents.EUROPE.icon,
  [continents.AFRICA.value]: continents.AFRICA.icon,
  [continents.OCEANIA.value]: continents.OCEANIA.icon,
  [continents.ANTARTICA.value]: continents.ANTARTICA.icon,
  [continents.NORTH_AMERICA.value]: continents.NORTH_AMERICA.icon,
  [continents.SOUTH_AMERICA.value]: continents.SOUTH_AMERICA.icon,
};

export const setPopulation = (totalPopulation) => {
  const populationIntervals = {
    IDLE: 0,
    XS: 1,
    S: 2,
    M: 3,
    L: 4,
    XL: 5,
  };

  const populationRange = {
    [populationIntervals.IDLE]: [0, 0],
    [populationIntervals.XS]: [1, 1000000],
    [populationIntervals.S]: [1000001, 10000000],
    [populationIntervals.M]: [10000001, 100000000],
    [populationIntervals.L]: [100000001, 1000000000],
    [populationIntervals.XL]: [1000000001, 10000000000],
  };

  const populationIconIndicator = {
    [populationIntervals.IDLE]: `💀`,
    [populationIntervals.XS]: `🙋‍♂️`,
    [populationIntervals.S]: `🙋‍♂️🙋‍♂️`,
    [populationIntervals.M]: `🙋‍♂️🙋‍♂️🙋‍♂️`,
    [populationIntervals.L]: `🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️`,
    [populationIntervals.XL]: `🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️🙋‍♂️`,
  };

  for (const range of Object.keys(populationRange)) {
    let currentRange = populationRange[range];
    if (
      totalPopulation >= currentRange[0] &&
      totalPopulation <= currentRange[1]
    ) {
      return populationIconIndicator[range];
    }
  }
};

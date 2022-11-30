import { Switch } from 'react-router-dom';
import {
  GET_COUNTRIES,
  VIEW_ACTIVITY,
  DELETE_ACTIVITY,
  CREATE_ACTIVITY,
  CONTINENT_ORDER,
  GET_COUNTRY_NAME,
  GET_ALL_ACTIVITIES,
  ALPHABETIC_ORDER_ASC,
  POPULATION_ORDER_ASC,
  GET_DETAIL_COUNTRIES,
  ALPHABETIC_ORDER_DESC,
  POPULATION_ORDER_DESC,
} from '../actions/index.actions';

const initialState = {
  countries: [],
  countryDetail: [],
  activities: [],
};

const alphabeticOrder = (a, b) => {
  if (a.name < b.name) return -1;
  if (b.name < a.name) return 1;
  return 0;
};

const populationOrder = (a, b) => {
  return a.population - b.population;
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      };
    case GET_DETAIL_COUNTRIES:
      return {
        ...state,
        countryDetail: action.payload,
      };
    case GET_COUNTRY_NAME:
      return {
        ...state,
        countries: [action.payload],
      };
    case VIEW_ACTIVITY:
      return {
        ...state,
        countries: state.countries.filter((c) => {
          return c.activities.some((a) => a.name === action.payload);
        }),
      };
    case DELETE_ACTIVITY:
      return {
        ...state,
        activities: state.activities.filter(
          (activity) => activity.name !== action.payload
        ),
      };
    case CREATE_ACTIVITY:
      return {
        ...state,
        activities: [...state.activities, action.payload],
      };
    case GET_ALL_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };

    case ALPHABETIC_ORDER_ASC: {
      return {
        ...state,
        countries: state.countries.slice().sort(alphabeticOrder),
      };
    }

    case ALPHABETIC_ORDER_DESC: {
      return {
        ...state,
        countries: state.countries.slice().sort(alphabeticOrder).reverse(),
      };
    }

    case POPULATION_ORDER_ASC: {
      return {
        ...state,
        countries: state.countries.slice().sort(populationOrder).reverse(),
      };
    }

    case POPULATION_ORDER_DESC: {
      return {
        ...state,
        countries: state.countries.slice().sort(populationOrder),
      };
    }
    case CONTINENT_ORDER: {
      return {
        ...state,
        countries: state.countries.filter(
          (c) => c.continent === action.payload
        ),
      };
    }

    default:
      return {
        ...state,
      };
  }
}

export default rootReducer;

import axios from 'axios';
import { duration as durationOptions } from '../../components/utils';

export const GET_COUNTRIES = 'GET_COUNTRIES';
export const VIEW_ACTIVITY = 'VIEW_ACTIVITY';
export const CREATE_ACTIVITY = 'CREATE_ACTIVITY';
export const DELETE_ACTIVITY = 'DELETE_ACTIVITY';
export const CONTINENT_ORDER = 'CONTINENT_ORDER';
export const GET_COUNTRY_NAME = 'GET_COUNTRY_NAME';
export const GET_ALL_ACTIVITIES = 'GET_ALL_ACTIVITIES';
export const GET_DETAIL_COUNTRIES = 'GET_DETAIL_COUNTRIES';
export const ALPHABETIC_ORDER_ASC = 'ALPHABETIC_ORDER_ASC';
export const POPULATION_ORDER_ASC = 'POPULATION_ORDER_ASC';
export const ALPHABETIC_ORDER_DESC = 'ALPHABETIC_ORDER_DESC';
export const POPULATION_ORDER_DESC = 'POPULATION_ORDER_DESC';

export function getCountries() {
  return async (dispatch) => {
    try {
      let response = await axios.get('/countries');
      return dispatch({
        type: GET_COUNTRIES,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDetailCountry(id) {
  return async (dispatch) => {
    let response = await axios.get(`/countries/${id}`);
    return dispatch({ type: GET_DETAIL_COUNTRIES, payload: response.data });
  };
}

export function getCountryName(name) {
  return async (dispatch) => {
    try {
      let response = await axios.get(`/countries?name=${name}`);
      return dispatch({
        type: GET_COUNTRY_NAME,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const createActivity = (values) => {
  return async function (dispatch) {
    try {
      console.log(values);
      await axios.post('/activities', values);
      // return dispatch({ type: CREATE_ACTIVITY, payload: body });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteActivity = (id) => {
  return async function (dispatch) {
    await axios.delete('/activities', { data: { id } });
    return dispatch({ type: DELETE_ACTIVITY, payload: id });
  };
};

export const getAllActivities = () => {
  return async function (dispatch) {
    let response = await axios.get('/activities');
    return dispatch({ type: GET_ALL_ACTIVITIES, payload: response.data });
  };
};

export const viewActivity = (payload) => {
  return {
    type: VIEW_ACTIVITY,
    payload,
  };
};

export function alphabeticOrderASC() {
  return {
    type: ALPHABETIC_ORDER_ASC,
  };
}

export function alphabeticOrderDESC() {
  return {
    type: ALPHABETIC_ORDER_DESC,
  };
}

export function populationOrderASC() {
  return {
    type: POPULATION_ORDER_ASC,
  };
}

export function populationOrderDESC() {
  return {
    type: POPULATION_ORDER_DESC,
  };
}

export const continentOrder = (payload) => {
  return {
    type: CONTINENT_ORDER,
    payload,
  };
};

import { SET_FOODS, SET_BRANDS } from './actions';
import Model from '../models/Model';

const initialState = {
  foods: [],
  brands: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FOODS:
      return {
        ...state,  
        foods: action.foods
      };
    case SET_BRANDS:
      return {
        ...state,  
        brands: action.brands
      };
    default:
      return state;
  }
};

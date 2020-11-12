import { SET_FOODS, SET_BRANDS, SET_CHEMICALS } from './actions';

const initialState = {
  foods: [],
  brands: [],
  chemicals: []
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
    case SET_CHEMICALS:
      return {
        ...state,  
        chemicals: action.chemicals
      };
    default:
      return state;
  }
};

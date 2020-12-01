import { SET_FOODS, SET_BRANDS, SET_CHEMICALS, GET_FROM_BARCODE } from './actions';

const initialState = {
  foods: [],
  brands: [],
  chemicals: [],
  barcode : {}
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
    case GET_FROM_BARCODE:
      return {
        ...state,  
        barcode: action.barcode
      };
    default:
      return state;
  }
};

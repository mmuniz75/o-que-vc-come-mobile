import { SET_FOODS, SET_BRANDS, SET_CHEMICALS, GET_FROM_BARCODE, SET_ALL_CHEMICALS, SET_ALL_BRANDS } from './actions';

const initialState = {
  foods: [],
  brands: [],
  all_brands: [],
  chemicals: [],
  all_chemicals: [],
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
    case SET_ALL_BRANDS:
      return {
        ...state,  
        all_brands: action.allBrands
      };
    case SET_CHEMICALS:
      return {
        ...state,  
        chemicals: action.chemicals
      };
    case SET_ALL_CHEMICALS:
      return {
        ...state,  
        all_chemicals: action.allChemicals
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

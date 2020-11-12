import { SET_FOODS } from './actions';
import Model from '../models/Model';

const initialState = {
  foods: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FOODS:
      return {
        ...state,  
        foods: action.foods
      };
    default:
      return state;
  }
};

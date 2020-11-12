import ENV from '../env'

export const SET_FOODS = 'SET_FOODS';
export const SET_BRANDS = 'SET_BRANDS';

export const fetchFoods = () => {
  return async dispatch => {
    try {
      const response = await fetch(`${ENV().server}/foods`);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();

      dispatch({ type: SET_FOODS, foods: resData });
    } catch (err) {
      console.log(err); 
    }
  };
};

export const getBrands = (foodId) => {
    return async dispatch => {
      try {
        const response = await fetch(`${ENV().server}/foods/${foodId}/brands`);
  
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
  
        const resData = await response.json();
  
        dispatch({ type: SET_BRANDS, brands: resData });
      } catch (err) {
        console.log(err); 
      }
    };
  };

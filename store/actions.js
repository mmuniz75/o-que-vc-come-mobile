export const SET_FOODS = 'SET_FOODS';

export const fetchFoods = () => {
  return async dispatch => {
    try {
      const response = await fetch(
        'https://bwnhvraxhc.execute-api.sa-east-1.amazonaws.com/v1/foods'
      );

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

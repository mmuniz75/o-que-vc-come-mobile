import ENV from '../env'

export const SET_FOODS = 'SET_FOODS';
export const SET_BRANDS = 'SET_BRANDS';
export const SET_CHEMICALS = 'SET_CHEMICALS';
export const GET_FROM_BARCODE = 'GET_FROM_BARCODE';

export const fetchFoods = () => {
  return async dispatch => {
    const response = await fetch(`${ENV().server}/foods`);
    const resData = await response.json();
      if (!response.ok) 
        throwError(resData, response.status)

    dispatch({ type: SET_FOODS, foods: resData });

  };
};

export const getBrands = (foodId) => {
    return async dispatch => {
      const response = await fetch(`${ENV().server}/foods/${foodId}/brands`);
      const resData = await response.json();
      if (!response.ok) 
        throwError(resData, response.status)

      dispatch({ type: SET_BRANDS, brands: resData });

    };
  };

  export const getChemcals = (foodId, brandId) => {
    return async dispatch => {
      const response = await fetch(`${ENV().server}/brands/${brandId}/foods/${foodId}/chemicals`);
      const resData = await response.json();
      if (!response.ok) 
        throwError(resData, response.status)

      dispatch({ type: SET_CHEMICALS, chemicals: resData });
    };
  };
  
  export const getFromBarcode = (barcode) => {
    return async dispatch => {
      const response = await fetch(`${ENV().server}/brands/foods/${barcode}`);
      const resData = await response.json();
      if (!response.ok) 
         throwError(resData, response.status)
            
      dispatch({ type: GET_FROM_BARCODE, barcode: resData });
    };
  };

  const throwError = (data, status) => {
    if(status != 404 && status != 409 && status != 412)
      console.log(data)
    
    const message = data && data.message ? data.message : "Erro interno"
    throw new Error(message);
  }
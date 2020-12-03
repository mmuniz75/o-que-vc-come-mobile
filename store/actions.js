import ENV from '../env'

export const SET_FOODS = 'SET_FOODS';
export const SET_BRANDS = 'SET_BRANDS';
export const SET_CHEMICALS = 'SET_CHEMICALS';
export const SET_ALL_CHEMICALS = 'SET_ALL_CHEMICALS';
export const SET_ALL_BRANDS = 'SET_ALL_BRANDS';
export const GET_FROM_BARCODE = 'GET_FROM_BARCODE';
export const ADD_FOOD_BRAND = 'ADD_FOOD_BRAND';

export const fetchFoods = () => {
  return async dispatch => {
    const response = await fetch(`${ENV().server}/foods`);
    const resData = await response.json();
      if (!response.ok) 
        throwError(resData, response.status)

    dispatch({ type: SET_FOODS, foods: resData });

  };
};

export const fetchBrands = () => {
  return async dispatch => {
    const response = await fetch(`${ENV().server}/brands`);
    const resData = await response.json();
      if (!response.ok) 
        throwError(resData, response.status)
        
    dispatch({ type: SET_ALL_BRANDS, allBrands: resData });

  };
};

export const fetchChemicals = () => {
  return async dispatch => {
    const response = await fetch(`${ENV().server}/chemicals`);
    const resData = await response.json();
      if (!response.ok) 
        throwError(resData, response.status)
        
    dispatch({ type: SET_ALL_CHEMICALS, allChemicals: resData });

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

  export const createBrandFood = (brandId, foodId, barcode, chemicals) => {
    return async dispatch => {
      const response = await fetch(`${ENV().server}/brands/${brandId}/foods/${foodId}`,
                                    {
                                      method: 'POST',
                                      headers: {
                                        'Content-Type': 'application/json'
                                      },
                                      body: JSON.stringify({
                                        chemicals,
                                        "bar-code" : barcode
                                       }
                                      )
                                      }
                                  )      
      const resData = await response.json();
      if (!response.ok) 
        throwError(resData, response.status)

      dispatch({ type: ADD_FOOD_BRAND });
    };
  };
  

  const throwError = (data, status) => {
    if(status != 404 && status != 409 && status != 412)
      console.log(data)
    
    const message = data && data.message ? data.message : "Erro interno"
    throw new Error(message);
  }
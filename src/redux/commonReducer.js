const initialState = {
  loading: false,
  app_color: 'black',
};

export const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.loading,
      };
    case 'SET_APP_COLOR':
      return {
        ...state,
        app_color: action.color,
      };
    default:
      return state;
  }
};

export const setLoading = loading => ({type: 'SET_LOADING', loading});

export const setAppColor = color => ({type: 'SET_APP_COLOR', color});

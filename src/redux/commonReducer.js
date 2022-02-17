const initialState = {
  loading: false,
};

export const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export const setLoading = loading => ({type: 'SET_LOADING', loading});

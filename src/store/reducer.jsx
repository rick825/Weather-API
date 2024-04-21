const initialState = {
  cities: [],
};

export default function weatherReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET':
      return {
        ...state,
        cities: [...state.cities, action.payload],
      };

    case 'DELETE':
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };

    case 'REFRESH':
      return {
        ...state,
        cities: state.cities.map((city) =>
          city.id === action.payload.id ? action.payload : city
        ),
      };
    default:
      return state;
  }
}

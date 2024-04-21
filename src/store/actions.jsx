export const get = (city) => ({
  type: 'GET',
  payload: city,
});

export const del = (deleteId) => ({
  type: 'DELETE',
  payload: deleteId,
});

export const refresh = (refreshedCity) => ({
  type: 'REFRESH',
  payload: refreshedCity,
});

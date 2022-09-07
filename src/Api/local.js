export const updateLocalStorage = (key, value) => {
  const data = JSON.stringify(value);
  localStorage.setItem(key, data);
};

export const getLocalStorage = (key) => {
  const data = JSON.parse(localStorage.getItem(key));
  return data;
};

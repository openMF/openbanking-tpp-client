export const SET_DATA = "SET_DATA";

export const setQrData = data => ({
  type: SET_DATA,
  payload: {
    data: data
  }
});
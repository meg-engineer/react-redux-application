import axios from "axios";
export const READ_EVENTS = "READ_EVENTS";
export const READ_EVENT = "READ_EVENT";
export const CREATE_EVENT = "CREATE_EVENT";
export const UPDATE_EVENT = "UPDATE_EVENT";
export const DELETE_EVENT = "DELETE_EVENT";

const ROOT_URL = "https://udemy-utils.herokuapp.com/api/v1";
const QUERYSTRING = "?token=token123";
//actionを定義してactionをreturnするactionクリエーターをexport
//action creatorはpureなobjectを返す＝関数返せない（非同期処理実行できない）→実行できるようにするのがredux-thunk
//redux-thunkを使用するためには、reduxからapplyMiddlewareをインポートする
export const readEvents = () => async (dispath) => {
  //関数を返す
  const response = await axios.get(`${ROOT_URL}/events${QUERYSTRING}`);
  // console.log(response);
  dispath({ type: READ_EVENTS, response }); //関数の中でdispath
};

export const postEvent = (values) => async (dispath) => {
  const response = await axios.post(`${ROOT_URL}/events${QUERYSTRING}`, values);
  dispath({ type: CREATE_EVENT, response });
};

export const putEvent = (values) => async (dispath) => {
  const response = await axios.put(
    `${ROOT_URL}/events/${values.id}${QUERYSTRING}`,
    values
  );
  dispath({ type: UPDATE_EVENT, response });
};

export const getEvent = (id) => async (dispath) => {
  const response = await axios.get(`${ROOT_URL}/events/${id}${QUERYSTRING}`);
  dispath({ type: READ_EVENT, response });
};

export const deleteEvent = (id) => async (dispath) => {
  await axios.delete(`${ROOT_URL}/events/${id}${QUERYSTRING}`);
  dispath({ type: DELETE_EVENT, id });
};

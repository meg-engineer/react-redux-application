import axios from "axios";
export const READ_EVENTS = "READ_EVENTS";

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

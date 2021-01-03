import _ from "lodash"; //配列を整理する
import {
  CREATE_EVENT,
  READ_EVENTS,
  READ_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
} from "../actions";

export default (events = {}, action) => {
  switch (action.type) {
    case READ_EVENTS:
      // console.log(action.response.data); このままだと見づらい配列なので
      return _.mapKeys(action.response.data, "id"); //idで抽出してkeyにし、整列する
    case CREATE_EVENT:
    case READ_EVENT:
    case UPDATE_EVENT:
      // console.log(action.response.data);
      const data = action.response.data; //actionから渡ってきた更新されたイベント情報
      return { ...events, [data.id]: data }; //idをkeyにして、更新されたものはdataにする
    case DELETE_EVENT:
      delete events[action.id]; //actionから渡ってきたidのイベントを削除
      return { ...events }; //新しいメモリ空間上の（更新された）events情報を返す

    default:
      return events;
  }
};

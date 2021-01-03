import _ from "lodash"; //配列を整理する
import { READ_EVENTS, DELETE_EVENT } from "../actions";

export default (events = {}, action) => {
  switch (action.type) {
    case READ_EVENTS:
      // console.log(action.response.data); このままだと見づらい配列なので
      return _.mapKeys(action.response.data, "id"); //idで抽出してkeyにし、整列する

    case DELETE_EVENT:
      delete events[action.id]; //actionから渡ってきたidのイベントを削除
      return { ...events }; //新しいメモリ空間上の（更新された）events情報を返す

    default:
      return events;
  }
};

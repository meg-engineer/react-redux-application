import _ from "lodash"; //配列を整理する
import { READ_EVENTS } from "../actions";

export default (events = {}, action) => {
  switch (action.type) {
    case READ_EVENTS:
      // console.log(action.response.data); このままだと見づらい配列なので
      return _.mapKeys(action.response.data, "id"); //idで抽出してkeyにし、整列する
    default:
      return events;
  }
};

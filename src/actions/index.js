export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";

//actionを定義してactionをreturnするactionクリエーターをexport
export const increment = () => ({
  type: INCREMENT,
});

export const decrement = () => ({
  type: DECREMENT,
});

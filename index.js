const { createStore, combineReducers } = require("redux");

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

// action creator 是一个函数，总是返回一个 action
function buyCake() {
  // action 是一个对象，必须包含一个 type 属性
  return {
    type: BUY_CAKE,
    info: "first redux action",
  };
}

function buyIceCream() {
  return {
    type: BUY_ICECREAM,
  };
}

// reducer 的初始状态
const initialCakeState = {
  numOfCake: 10,
};

// reducer 是一个函数，函数接受两个参数：preState 和 action
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCake: state.numOfCake - 1,
      };

    default:
      return state;
  }
};

const initialIceCreamState = {
  numOfIceCream: 20,
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numOfIceCream: state.numOfIceCream - 1,
      };

    default:
      return state;
  }
};

// 创建 store，createStore 接受 reducer 作为参数
// 调用 createStore 时，会执行 reducer 初始化状态

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});
const store = createStore(rootReducer);

// store 暴露一个方法 getState() 用来获取 store 中的状态
console.log("Initail state: ", store.getState());

// store 暴露一个方法 subscribe(listener) 用来订阅一个监听器
// 每当 store 中的 state 发生变化，就会调用监听器
const unsubscribe = store.subscribe(() =>
  console.log("Update state: ", store.getState())
);

// store 暴露一个方法 dispatch(action) 用来分发一个 action
// actin 是通过 action creator 产生的
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

// 取消订阅
unsubscribe();
// store.dispatch({ type: BUY_CAKE });
// console.log(store.getState());

// src/context/count.context.jsx
const { createContext, useReducer } = require("react")

// 실제적으로 components가 사용할 value와 method이다.
export const CountContext = createContext({
  currentCount: null,
  setCurrentCount: () => null,
})

// action을 줄때 포함할 types이다.
export const COUNT_ACTION_TYPES = {
  ADD_CURRENT_COUNT: "ADD_CURRENT_COUNT", // count를 1 증가할때
  SUBTRACT_CURRENT_COUNT: "SUBTRACT_CURRENT_COUNT", // count를 1 감소할때
}

// currentCount를 업데이트 하기 위해서 reducer를 통한다.
const countReducer = (state, action) => {
  console.log("Dispatched count")
  console.log("action : ", action)
  // action에 있는 type와 payload를 변수로 설정
  const { type, payload } = action

  // switch문을 이용하여 해당되는 case에 state를 return
  switch (type) {
    case COUNT_ACTION_TYPES.ADD_CURRENT_COUNT:
      return {
        ...state,
        currentCount: state.currentCount + 1,
      }
    case COUNT_ACTION_TYPES.SUBTRACT_CURRENT_COUNT:
      return {
        ...state,
        currentCount: state.currentCount - 1,
      }
    default: // 적용할수 없는 타입일시 에러를 반환한다.
      throw new Error(`해당 ${type}는 사용되지 않습니다.`)
  }
}

// currentCount의 초기값을 설정한다.
const INITIAL_STATE = {
  currentCount: 0,
}

export const CountProvider = ({ children }) => {
  // useReducer를 이용하여 currentCount, dispatch을 설정하고 currentNum의 초기값을 0(INITIAL_STATE)으로 한다
  const [{ currentCount }, dispatch] = useReducer(countReducer, INITIAL_STATE)

  // component에서 요청한 Action을 dispatch 한다.
  const countAction = (type) => {
    dispatch({ type })
  }

  // components에서 해당 값과 메소드를 사용할수 있도록 value값을 추가한다.
  const value = { currentCount, countAction }

  return <CountContext.Provider value={value}>{children}</CountContext.Provider>
}

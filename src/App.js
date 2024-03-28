import { useContext } from "react"
import "./App.css"
import { COUNT_ACTION_TYPES, CountContext } from "./context/count.context"

function App() {
  // CountContext에서 currentCount(현재 count)와 이를 변경할 countAction을 불러온다.
  const { currentCount, countAction } = useContext(CountContext)

  // 해당 타입을 Distruction한다.
  const { ADD_CURRENT_COUNT, SUBTRACT_CURRENT_COUNT } = COUNT_ACTION_TYPES

  // count를 더할시 해당 메소드를 사용
  const handleAddCount = () => {
    countAction(ADD_CURRENT_COUNT)
  }

  // count를 뺄시 해당 메소드를 사용
  const handleSubCount = () => {
    countAction(SUBTRACT_CURRENT_COUNT)
  }

  return (
    <div>
      <h1>Test : {currentCount}</h1>
      <button onClick={handleAddCount}>Up</button>
      <button onClick={handleSubCount}>Down</button>
    </div>
  )
}

export default App

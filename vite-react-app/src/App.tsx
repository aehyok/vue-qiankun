import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { Button } from 'antd';
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <Button type="primary">测试antd按钮</Button>
      </header>
    </div>
  )
}

export default App

// import { useState } from 'react'
// import logo from './logo.svg'
// import './App.css'
// import { Button } from 'antd';
// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>Hello Vite + React!</p>
//         <p>
//           <button type="button" onClick={() => setCount((count) => count + 1)}>
//             count is: {count}
//           </button>
//         </p>
//         <p>
//           Edit <code>App.tsx</code> and save to test HMR updates.
//         </p>
//         <Button type="primary">测试antd按钮</Button>
//       </header>
//     </div>
//   )
// }

// export default App



import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom'

import Detail from '../src/pages/detail'
import List from '../src/pages/list'
import Index from '../src/pages/home/index'

const menusList = [
  {
    name: '首页',
    path: '/index'
  },
  {
    name: '列表',
    path: '/list'
  },
  {
    name: '详情',
    path: '/detail'
  },
]
const index = () => {
  return <div >
    <div >

      <Router  >
        <div>{
          /* link 路由跳转 */
          menusList.map(router => <Link key={router.path} to={router.path} >
            <span className="routerLink" >{router.name}</span>
          </Link>)
        }</div>
        <Routes>
          <Route path={'/index'} element={<Index />} ></Route>
          <Route path={'/list'} element={<List />} ></Route>
          <Route path={'/detail'} element={<Detail />} ></Route>
          {/*  路由不匹配，重定向到/index  */}
          <Route path="*" element={<Navigate to="/list" />} />
        </Routes>
      </Router>
    </div>
  </div>
}

export default index
import styles from './index.less';
import { Link, history } from 'umi';
import { Button} from 'antd';
import { useState, useEffect } from 'react'


export default function IndexPage() {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('0')
  const routerClick = () => {
    history.push('/home')
  }
  const [on, setOn] = useState(false);

  // 默认情况下，它在第一次渲染之后和每次更新之后都会执行。
  useEffect(() => {
     setTitle(`You clicked ${count} times`)
  });
  const lightOn = () => {
    setCount(count + 1)
    setTimeout(() => {
      setOn(true);
    }, 5000);
  }

  const lightOff = () => setOn(false);
  return (
    <div>
      <div>{title}</div>
      <div className={on ? styles.bulbon : styles.bulboff} />
      <button onClick={lightOn}>useState开灯</button>
      <button onClick={lightOff}>useState关灯</button>
      <h1 className={styles.title}>Page index</h1>
      <Link to="/home">Go to list page</Link>
      <Button  type="primary" onClick={routerClick}>Go to list page</Button>
    </div>
  );
}

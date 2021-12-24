import styles from './index.less';
import { Link, history } from 'umi';
import { Button} from 'antd';
import { useState } from 'react'


export default function IndexPage() {
  const routerClick = () => {
    history.push('/home')
  }
  const [on, setOn] = useState(false);

  const lightOn = () => setOn(true);
  const lightOff = () => setOn(false);
  return (
    <div>
      <div className={on ? styles.bulbon : styles.bulboff} />
      <button onClick={lightOn}>开灯</button>
      <button onClick={lightOff}>关灯</button>
      <h1 className={styles.title}>Page index</h1>
      <Link to="/home">Go to list page</Link>
      <Button  type="primary" onClick={routerClick}>Go to list page</Button>
    </div>
  );
}

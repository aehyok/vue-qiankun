import styles from './index.less';
import { Link, history } from 'umi';
import { Button} from 'antd';


export default function IndexPage() {
  const routerClick = () => {
    history.push('/home')
  }
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Link to="/home">Go to list page</Link>
      <Button onClick={routerClick}>Go to list page</Button>
    </div>
  );
}

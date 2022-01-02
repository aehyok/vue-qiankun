import { createBrowserHistory } from 'history';
import React from 'react';

// import useStore from '../store';

const Authority: React.FC = ({ children }) => {
  const history = createBrowserHistory();
  // const user = useStore((state) => state.user);
  // console.log('Authority', user);

  if (!localStorage.getItem('vite-react-ts-antd-token')) {
    history.push('/user/login');
  }
  // if (!user?.token) {
  //   history.push('/user/login');
  // }

  return <>{children}</>;
};

export default Authority;
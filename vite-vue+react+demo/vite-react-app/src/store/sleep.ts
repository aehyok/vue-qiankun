import useStore from './index';

export const sleep = (timeout: number) => {
  const { setLoading } = useStore.getState();

  return new Promise((resolve) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      resolve(true);
    }, timeout);
  });
};
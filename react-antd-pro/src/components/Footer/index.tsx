import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '珩行科技出品',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'aehyok',
          title: 'aehyok',
          href: 'https://github.com/aehyok',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/aehyok/vueqiankun',
          blankTarget: true,
        },
        {
          key: 'junjin',
          title: '掘金',
          href: 'https://juejin.cn/user/2242659452477016/posts',
          blankTarget: true,
        },
      ]}
    />
  );
};

import React, { useState , useEffect } from 'react';
import { Tree, Input } from 'antd';

import { GetChildGuideLines } from '@/services/guideline/api'
const { Search } = Input
interface DataNode {
  title: string;
  key: string;
  isLeaf?: boolean;
  children?: DataNode[];
}


const initTreeData: DataNode[] = [
  { title: '1Expand to load', key: '0' },
  { title: '2Expand to load', key: '1' },
  { title: 'Tree Node', key: '2', isLeaf: true },
];

// It's just a simple demo. You can use tree map to optimize update perf.
function updateTreeData(list: DataNode[], key: React.Key, children: DataNode[]): DataNode[] {
  return list.map(node => {
    if (node.key === key) {
      return {
        ...node,
        children,
      };
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }
    return node;
  });
}

const GuidelineTree= (props: any) => {
  const {setDefault} = props
  const [treeData, setTreeData] = useState(initTreeData);


  const loadTreeList = async (id: any = "1", type: any ="one") => {
    console.log(id, 'id')
    const response = await GetChildGuideLines(id)
    const list: DataNode[] = response.data.map((item: { id: any; guideLineName: any; }) => {
      return {
        key: item.id,
        title: item.guideLineName,
      }
    })
    console.log(list, '--list--')
    if(type === 'one') {
      setTreeData(list)
      setDefault([list[0].key])
    } else {
      setTreeData(origin => {
        console.log(origin, '原始的数据')
        return updateTreeData(origin, id, [
          ...list
        ]);
      });
    }
  }

  useEffect(() => {
    loadTreeList()
  },[])
  const onLoadData = async({ key, children }: any) => {
    console.log(key, children, 'onloaddata')
    new Promise<void>(resolve => {
      // children字节点有值直接返回，代表已经加载过
      if (children) {
        resolve();
        return;
      }

      loadTreeList(key,'two')
      resolve();
    });
  }

  const onSelectClick = (selectedKeys: any) => {
    setDefault(selectedKeys)
  }

  return (
    <>
      <Search style={{ marginBottom: 8 }} placeholder="Search" />
      <Tree loadData={onLoadData} treeData={treeData} onSelect = { onSelectClick } />
    </>
  )
};

export default GuidelineTree;



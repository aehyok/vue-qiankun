import { request } from 'umi';
import type { CardListItemDataType } from './data';

export async function queryFakeList(params: {
  count: number;
}): Promise<{ data: { list: CardListItemDataType[] } }> {
  return request('/api/card_fake_list', {
    params,
  });
}

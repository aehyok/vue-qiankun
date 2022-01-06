import { request } from 'umi';

/** 获取当前的用户 GET /api/currentUser */
export async function GetChildGuideLines(id: string) {
  return request(`/so/api/mddefine/GetChildGuideLines?FatherGuildLineID=${id}`, {
    method: 'POST',
  });
}

import { request } from 'umi';

/** 获取当前指标下的下一级指标列表 */
export async function GetChildGuideLines(id: string) {
  return request(`/so/api/mddefine/GetChildGuideLines?FatherGuildLineID=${id}`, {
    method: 'POST',
  });
}

export async function GetGuidelineDefine(id: string) {
  return request(`/so/api/mdquery/GetGuidelineDefine?guideLineId=${id}`, {
    method: 'POST',
  });
}

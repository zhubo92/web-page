import request from '@/utils/request';
import { ILearnRecord, IRecentStudyRecord } from '@/types/user.d';
import { ISearchResult } from '@/types/search.d';

/**
 * 搜索
 */
export function searchContent(text: string) {
  return request<{ name: string }[]>({
    url: `/teacher-lib/home/search/${text}`,
    method: 'GET'
  });
}

/**
 * 搜索分页列表
 */
export function searchContentByPageRequest(page: number, text: string) {
  return request<{
    entityList: ISearchResult[];
    total: number;
    assistData: null;
    currentPage: number;
    pageSize: number;
  }>({
    url: `/teacher-lib/home/search/${page}/10/${text}`,
    method: 'GET'
  });
}

/**
 * 删除全部学习记录
 */
export function deleteBrowserHistory(userId: string) {
  return request({
    url: `/teacher-lib/browserHistory/delete/records/${userId}`,
    method: 'GET'
  });
}

/**
 * 查询学习记录
 */
export function queryBrowsingRecords(data: {
  updateTime: string;
  userId: string | number;
  page: number;
  pageSize: number;
}) {
  return request<{ entityList: ILearnRecord[] }>({
    url: `/teacher-lib/browserHistory/queryBrowsingRecords`,
    method: 'POST',
    data
  });
}

/**
 * 查询最近的一条浏览二级记录
 */
export function queryBrowsingRecordsLast(data: { userId: string | number }) {
  return request<IRecentStudyRecord>({
    url: `/teacher-lib/browserHistory/queryBrowsingRecords/last`,
    method: 'PUT',
    data
  });
}

/**
 * 删除某一条学习记录
 */
export function deleteOneBrowserHistory(recordId: string | number) {
  return request({
    url: `/teacher-lib/browserHistory/delete/records/one/${recordId}`,
    method: 'GET'
  });
}

/**
 *  0：查询学科列表  其他：查询课件列表
 */
export function queryCategoryListRequest(parentId: number) {
  return request({
    url: `/teacher-lib/category/query/Category/${parentId}`,
    method: 'GET'
  });
}

/**
 * 查询首页权限
 */
export function getHomeAuthListRequest() {
  return request({
    url: '/teacher-lib/home/checkUserAuth',
    method: 'GET'
  });
}

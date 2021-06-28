import RequestProxy from '@/utils/axios/index'

export const getSystemList = () => RequestProxy('/api/getSystemList')

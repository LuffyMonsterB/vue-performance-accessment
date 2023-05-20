import request from '@/utils/request'

export function genDepartmentQuarterAssessData() {
  return request({
    url: '/vue-admin-template/department-assess/quarterly',
    method: 'get'
  })
}

export function genDepartmentAnnualAssessData() {
  return request({
    url: '/vue-admin-template/department-assess/annual',
    method: 'get'
  })
}


export function queryDepartmentQuarterAssessDataByDepartment(department) {
  return request({
    url: '/vue-admin-template/department-assess/query-quarterly',
    method: 'get',
    params: { department }
  })
}

export function queryDepartmentAnnualAssessDataByDepartment(department) {
  return request({
    url: '/vue-admin-template/department-assess/query-annual',
    method: 'get',
    params: { department }
  })
}

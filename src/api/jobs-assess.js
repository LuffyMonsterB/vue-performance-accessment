import request from '@/utils/request'

export function getJobsMonthlyAssessData() {
  return request({
    url: '/vue-admin-template/jobs-assess/monthly',
    method: 'get'
  })
}

export function getJobsAnnualAssessData() {
  return request({
    url: '/vue-admin-template/jobs-assess/annual',
    method: 'get'
  })
}

export function queryJobsMonthlyAssessDataByName(name){
  return request({
    url: '/vue-admin-template/jobs-assess/query-monthly',
    method: 'get',
    params:{ name }
  })
}

export function queryJobsAnnualAssessDataByName(name){
  return request({
    url: '/vue-admin-template/jobs-assess/query-annual',
    method: 'get',
    params:{ name }
  })
}
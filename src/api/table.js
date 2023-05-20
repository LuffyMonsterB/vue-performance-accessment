import request from "@/utils/request";

export function getList(params) {
  return request({
    url: "/vue-admin-template/table/list",
    method: "get",
    params
  });
}

export function getZMSData() {
  return request({
    url: "/vue-admin-template/table/zms",
    method: "get"
  });
}
export function getJCZDData() {
  return request({
    url: "/vue-admin-template/table/jczd",
    method: "get"
  });
}

export function getSCBData() {
  return request({
    url: "/vue-admin-template/table/scb",
    method: "get"
  });
}

export function queryZMSData(name) {
  return request({
    url: "/vue-admin-template/table/query-zms",
    method: "get",
    params: { name }
  });
}

export function queryJCZDData(name) {
  return request({
    url: "/vue-admin-template/table/query-jczd",
    method: "get",
    params: { name }
  });
}

export function querySCBData(name) {
  return request({
    url: "/vue-admin-template/table/query-scb",
    method: "get",
    params: { name }
  });
}

import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/api/v1/login/login_auth",
    method: "post",
    data,
  });
}

export function getInfo(token) {
  return request({
    url: "/api/v1/login/getInfo",
    method: "get",
    params: { token },
  });
}

export function logout() {
  return request({
    url: "/api/v1/login/logout",
    method: "get",
  });
}

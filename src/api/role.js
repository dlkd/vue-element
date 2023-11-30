import request from "@/utils/request";

export function getRoutes() {
  return request({
    url: "/vue-element-admin/routes",
    method: "get",
  });
}

export function getRoles() {
  return request({
    url: "/vue-element-admin/roles",
    method: "get",
  });
}

export function addRole(data) {
  return request({
    url: "/vue-element-admin/role",
    method: "post",
    data,
  });
}

export function updateRole(id, data) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: "put",
    data,
  });
}

export function deleteRole(id) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: "delete",
  });
}

// 分页查询角色列表
export function listRole(query) {
  return request({
    url: "/test/employee/list",
    method: "get",
    params: query,
  });
}

// 查询所有角色列表
export function listRoles(query) {
  return request({
    url: "/test/employee/export",
    method: "get",
    params: query,
  });
}

// 查询角色详细
export function getRole(roleId) {
  return request({
    url: "/test/employee/" + roleId,
    method: "get",
  });
}

// 新增角色
export function addRoles(data) {
  return request({
    url: "/test/employee",
    method: "post",
    data: data,
  });
}

// 修改角色
export function updateRoles(data) {
  return request({
    url: "/test/employee",
    method: "put",
    data: data,
  });
}

// 角色数据权限
export function dataScope(data) {
  return request({
    url: "/system/role/dataScope",
    method: "put",
    data: data,
  });
}

// 角色状态修改
export function changeRoleStatus(roleId, status) {
  const data = {
    roleId,
    status,
  };
  return request({
    url: "/system/role/changeStatus",
    method: "put",
    data: data,
  });
}

// 删除角色
export function delRoles(roleId) {
  return request({
    url: "/test/employee/" + roleId,
    method: "delete",
  });
}

// 删除角色
export function getDeptNames() {
  return request({
    url: "/test/employee/getDept",
    method: "get",
  });
}
// 查询角色已授权用户列表
export function allocatedUserList(query) {
  return request({
    url: "/system/role/authUser/allocatedList",
    method: "get",
    params: query,
  });
}

// 查询角色未授权用户列表
export function unallocatedUserList(query) {
  return request({
    url: "/system/role/authUser/unallocatedList",
    method: "get",
    params: query,
  });
}

// 取消用户授权角色
export function authUserCancel(data) {
  return request({
    url: "/system/role/authUser/cancel",
    method: "put",
    data: data,
  });
}

// 批量取消用户授权角色
export function authUserCancelAll(data) {
  return request({
    url: "/system/role/authUser/cancelAll",
    method: "put",
    params: data,
  });
}

// 授权用户选择
export function authUserSelectAll(data) {
  return request({
    url: "/system/role/authUser/selectAll",
    method: "put",
    params: data,
  });
}

// 根据角色ID查询部门树结构
export function deptTreeSelect(roleId) {
  return request({
    url: "/system/role/deptTree/" + roleId,
    method: "get",
  });
}

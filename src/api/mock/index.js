import { http } from "@/utils/http";

export function payInr(code) {
  return http.request({
    url: "/pay/inr/" + code,
    method: "post",
  });
}
export function statusTnr(code) {
  return http.request({
    url: "/status/inr/" + code,
    method: "post",
  });
}
export function getListApiError(params) {
  return http.request({
    url: "/list/error",
    method: "post",
    params
  });
}

import axios from "axios";

const src = "/cron/apply";

export async function getList(params) {
  return await axios.get(src, { params });
}

export async function get(payload) {
  return await axios.get(src + "/" + payload);
}

export async function post(payload) {
  return await axios.post(src, payload);
}

export async function put(payload) {
  return await axios.put(src, payload);
}

export async function remove(payload) {
  return await axios.delete(src + "/" + payload);
}

export async function running(payload) {
  return await axios.put(src + "/running/" + payload);
}
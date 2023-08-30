import axios from "axios";

const src = "/cron";

export async function getTaskType() {
  return await axios.get(src + "/common/task/type" );
}

export async function getTaskCompare() {
  return await axios.get(src + "/common/task/compare");
}
export async function getTaskKeyword() {
  return await axios.get(src + "/common/task/email/keyword");
}


export async function getSystem() {
  return await axios.get(src + "/system");
}

export async function postSystem(payload) {
  return await axios.post(src + "/system",payload);
}


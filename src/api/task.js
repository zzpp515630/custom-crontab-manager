import axios from "axios";

const src = "/cron";

export async function getTaskList(params) {
  return await axios.get(src + "/task", {params});
}

export async function postTask(payload) {
  return await axios.post(src + "/task", payload);
}

export async function putTask(payload) {
  return await axios.put(src + "/task", payload);
}

export async function removeTask(taskId) {
  return await axios.delete(src + "/task/"+ taskId);
}

export async function getTask(taskId) {
  return await axios.get(src + "/task/" + taskId);
}

export async function putTaskExecute(taskId) {
  return await axios.put(src + "/task/execute/" + taskId);
}

export async function putTaskRunning(taskId) {
  return await axios.put(src + "/task/running/" + taskId);
}

export async function getCronAnalysis(params) {
  return await axios.get(src + "/task/cron/analysis", {params});
}

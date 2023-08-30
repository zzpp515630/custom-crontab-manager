import axios from "axios";

const src = "/cron";

export async function getLogList(params) {
  return await axios.get(src + "/log", {params});
}

export async function getLog(logId) {
  return await axios.get(src + "/log/" + logId);
}

export async function getCronAnalysis(params) {
  return await axios.get(src + "/task/cron/analysis", {params});
}

export async function cleanLog(logId) {
  return await axios.put(src + "/log/clean/" + logId);
}


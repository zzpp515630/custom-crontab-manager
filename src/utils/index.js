import router from "../router";

/**
 * 路由返回
 * @param delta
 */
export function goBack(delta = -1) {
  router.go(delta);
}

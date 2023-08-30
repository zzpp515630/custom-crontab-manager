<template>
  <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link flex-center">
      <img
        v-if="loginInfo.userAvatar"
        class="user-avatar double-mr"
        :src="loginInfo.userAvatar"
      />
      {{ loginInfo ? loginInfo.openid || loginInfo.userAccount : "" }}
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="personalCenter">个人中心</el-dropdown-item>
      <el-dropdown-item command="resetPwd">修改密码</el-dropdown-item>
      <el-dropdown-item command="logout" divided>退出</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { getLogout } from "@/api/userInfo";
import { mapGetters } from "vuex";

export default {
  name: "UserInfo",
  computed: {
    ...mapGetters(["loginInfo"]),
  },
  methods: {
    /**
     * 下拉菜单
     */
    handleCommand(val) {
      if (val === "logout") {
        this.logout();
      } else if (val === "personalCenter") {
        this.$router.push("/personalCenter");
      } else if (val === "resetPwd") {
        this.$router.push("/changePassword");
      }
    },
    /**
     * 退出登录
     * @return {Promise<void>}
     */
    logout() {
      this.$confirm("确定退出登录?", "提示")
        .then(async () => {
          let res = await getLogout();
          if (res.code === 200) {
            this.$store.commit("setLogout");
            window.location.reload()
          }
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>

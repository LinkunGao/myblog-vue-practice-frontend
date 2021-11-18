<template>
  <div class="userlist">
    <div v-if="userList.length > 0" class="user-content">
      <div v-for="user in userList" :key="user.id" class="user">
        <img :src="base_url + user.icon" alt="" />
        <p>{{ user.nickName }}</p>
        <button @click="deleteUser(user.id)">Delete</button>
      </div>
    </div>
    <p v-else>Oops, on users right now!</p>
  </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";

export default {
  data() {
    return {
      userList: [],
      menuId: 1,
      base_url: "http://127.0.0.1:9000/upload/",
    };
  },
  // 用户在看到页面之前，最后vue提供的一次函数执行
  mounted() {
    const token = window.localStorage.getItem("token");
    const flag = !!token;
    if (flag) {
      this.getUserData(this.menuId);
    }
  },
  // 监听
  watch: {
    $route(to) {
      this.menuId = to.query.menuId;
      this.getUserData(this.menuId);
    },
  },
  methods: {
    getUserData(id) {
      axios({
        url: "http://127.0.0.1:9000/get-user-list/",
        type: "json",
        method: "get",
        params: {
          id,
        },
      }).then((res) => {
        this.userList = res.data;
      });
    },
    deleteUser(id) {
      axios({
        url: "http://127.0.0.1:9000/get-user-list/",
        type: "json",
        method: "delete",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: Qs.stringify({
          id,
        }),
      }).then((res) => {
        if (res.data == "ok") {
          this.getUserData(this.menuId);
        }
      });
    },
  },
};
</script>

<style></style>

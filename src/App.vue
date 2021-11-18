<template>
  <div id="home">
    <div>
      <button v-if="loginType == false" @click="showSignPage(1)">
        Sign in
      </button>
      <button v-if="loginType == false" @click="showSignPage(2)">
        Sign up
      </button>
      <button v-if="loginType">Individule profile</button>
      <button v-if="loginType" @click="showSignPage(3)">Update</button>
      <button v-if="loginType" @click="logout">Logout</button>
      <div class="header">
        <h4>{{ siteinfo.sitename }}</h4>
        <img :src="siteinfo.icon" alt="" />
      </div>
      <hr />
      <div class="content">
        <div class="menu">
          <div v-for="c in menuList" :key="c.id" class="item">
            <div v-if="choosed == c.id" style="background: #777; color: #fff">
              <a style="color: #fff">{{ c.text }}</a>
            </div>
            <div v-else @click="chooseMenu(c.id)">
              <a style="color: #000">{{ c.text }}</a>
            </div>
          </div>
        </div>

        <div>
          <div>{{ choosed_text }}</div>
          <hr />

          <router-view />
        </div>
      </div>
      <hr />
    </div>
    <LoginBox
      v-if="box_target"
      :target="box_target"
      @hideBox="hideSignPage"
    ></LoginBox>
    <div class="foot">Copyright © 2021 Skycoco</div>
  </div>
</template>

<script>
import axios from "axios";
import LoginBox from "../src/components/LoginBox.vue";

export default {
  components: {
    LoginBox,
  },
  data() {
    return {
      menuList: [],
      choosed: 1,
      choosed_text: "",
      box_target: 0,
      siteinfo: {},
      loginType: false,
    };
  },
  mounted() {
    try {
      const token = window.localStorage.getItem("token");
      console.log(!!token);
      const flag = !!token;
      if (flag) {
        this.loginType = true;
      }
    } catch (error) {
      console.log(error);
    }
    this.getMenuList();
  },
  methods: {
    getMenuList() {
      axios({
        url: "http://127.0.0.1:9000/get-menu-list",
        type: "json",
        method: "get",
      }).then((res) => {
        // console.log(res.data);
        this.menuList = res.data.menu_data;
        console.log(this.menuList);
        this.choosed_text = this.menuList[0].text;
        this.siteinfo = res.data.siteinfo;
      });
    },
    chooseMenu(id) {
      this.choosed = id;
      this.choosed_text = this.menuList[id - 1].text;
      // 路由传参
      this.$router.push({ path: "/", query: { menuId: id } });
    },
    // 展示登陆注册页面
    showSignPage(target) {
      // flag ? (this.box_target = false) : (this.box_target = true);
      this.box_target = target;
    },
    // 在父组件隐藏子组件
    hideSignPage() {
      this.box_target = 0;
    },
    logout() {
      // 清除所有的local storage
      // windon.localStorge.removeItem('token')
      window.localStorage.clear();
      window.location.reload();
    },
  },
};
</script>

<style></style>

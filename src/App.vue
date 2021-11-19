<template>
  <div id="home">
    <div>
      <button @click="toHome">Home</button>
      <button v-if="loginType == false" @click="showSignPage(1)">
        Sign in
      </button>
      <button v-if="loginType == false" @click="showSignPage(2)">
        Sign up
      </button>
      <button v-if="loginType" @click="toUserInfo">Individule profile</button>
      <button v-if="loginType" @click="showSignPage(3)">Update</button>
      <button v-if="loginType" @click="logout">Logout</button>
      <div class="header">
        <h4>{{ siteinfo.sitename }}</h4>
        <img :src="siteinfo.icon" alt="" />
      </div>
      <!-- 绑定传值， 父向子，通过v-bind 绑定父级变量，再通过props传向子组件 -->
      <Test :setName="editTestUsername" />
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

          <router-view
            @editTestName="editName"
            @hideBox="hideSignPage"
            @changeUI="changeLoginType"
          />
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
import Test from "../src/components/test.vue";
export default {
  components: {
    LoginBox,
    Test,
  },
  data() {
    return {
      menuList: [],
      choosed: 1,
      choosed_text: "",
      box_target: 0,
      siteinfo: {},
      loginType: false,
      editTestUsername: "",
    };
  },
  mounted() {
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
      this.changeLoginType();
      this.$router.push({ path: "/" });
      // window.location.reload();
    },
    toUserInfo() {
      this.$router.push({ path: "/userinfo" });
    },
    toHome() {
      this.$router.push({ path: "/" });
    },
    changeLoginType(info) {
      console.log(info);
      try {
        const token = window.localStorage.getItem("token");
        console.log("token: " + !!token);
        const flag = !!token;
        if (flag) {
          this.loginType = true;
        } else {
          this.loginType = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    editName(name) {
      this.editTestUsername = name;
      console.log(this.editTestUsername);
    },
  },
};
</script>

<style></style>

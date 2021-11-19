<template>
  <div id="login" @click.self="hideSelf()">
    <div id="loginbox">
      <div class="form">
        <div v-if="target == 1 || target == 2" class="item">
          <label> Username:</label>
          <input
            v-model="username"
            type="text"
            placeholder="Please input your username"
          />
        </div>
        <div v-if="target == 1 || target == 2" class="item">
          <label> Password: </label>
          <input
            v-model="password"
            type="text"
            placeholder="Please input your password"
          />
        </div>
        <div v-if="target == 2" class="item">
          <label> Confirm Password: </label>
          <input
            v-model="confirm_password"
            type="text"
            placeholder="Please input your password again"
          />
        </div>
        <div v-if="target == 3" class="item">
          <label> WebPage Name: </label>
          <input
            v-model="webname"
            type="text"
            placeholder="Please input the web name"
          />
        </div>
        <div v-if="target == 3" class="item">
          <label> Icon: </label>
          <input id="icon_update" type="file" @change="uploadIcon($event)" />
        </div>
        <div v-if="target == 3 && previewIcon != ''" class="item">
          <img :src="previewIcon" alt="" />
        </div>
        <button v-if="target == 1" @click="toSignIn">Sign in</button>
        <button v-if="target == 2" @click="toRegister">Sign up</button>
        <button v-if="target == 3" @click="toUpdate">Update</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";
export default {
  name: "LoginBox",
  props: ["target"],
  data() {
    return {
      username: "",
      password: "",
      confirm_password: "",
      webname: "",
      previewIcon: "",
      base_url: "http://127.0.0.1:9000/",
    };
  },
  mounted() {
    console.log(this.target);
  },
  methods: {
    hideSelf() {
      this.$emit("hideBox");
    },
    toSignIn() {
      var username = this.username;
      var password = this.password;
      if (!!username && !!password) {
        axios({
          url: this.base_url + "login/",
          data: Qs.stringify({
            username,
            password,
          }),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          method: "post",
        }).then((res) => {
          switch (res.data) {
            case "successful":
              console.log("successful sign in");
              break;
            case "fail":
              console.log("wrong password");
              break;
            case "none":
              console.log("no user");
              break;
            default:
              console.log("successful login");
              console.log(res.data);
              window.localStorage.setItem("token", res.data.token);
              //   window.location.reload();
              //   开始使用vuex存储用户的个人信息
              var userinfo = res.data.userinfo;
              console.log(userinfo);
              this.$store.commit("editUserInfo", userinfo);
              if (this.$router.path != "/userinfo") {
                this.$router.push({ path: "/userinfo" });
              }
          }
        });
      } else {
        console.log("cannot be empty");
      }
    },
    toRegister() {
      const username = this.username;
      const password = this.password;
      const repassword = this.confirm_password;
      if (!!password && !!username && !!repassword) {
        if (password == repassword) {
          axios({
            url: this.base_url + "register/",
            data: Qs.stringify({
              username,
              password,
            }),
            method: "post",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }).then((res) => {
            console.log(res.data);
            switch (res.data) {
              case "same_user":
                console.log("there are a same username");
                break;

              default:
                break;
            }
          });
        }
      }
    },
    toUpdate() {
      const webname = this.webname;
      const icon = this.previewIcon;
      if (webname.length > 0 && icon.length > 0) {
        axios({
          url: this.base_url + "upload_icon/",
          method: "put",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: Qs.stringify({
            webname,
            icon,
          }),
        }).then((res) => {
          console.log(res);
          if (res.data == "ok") {
            window.location.reload();
          }
        });
      } else {
        console.log("no new information");
      }
    },
    uploadIcon(e) {
      const icon = e.target.files[0];
      //   上传图片
      const Icon_img = new FormData();
      Icon_img.append("icon", icon);
      axios({
        url: this.base_url + "upload_icon/",
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: Icon_img,
      }).then((res) => {
        if (res.data) {
          this.previewIcon = this.base_url + "upload/" + res.data.img;
        }
      });
    },
  },
};
</script>

<style>
#login {
  width: 700px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  background: #00000020;
}
#loginbox {
  width: 430px;
  height: 300px;
  border: 1px solid black;
  background: #00000090;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
#loginbox .form .item {
  font-weight: 700;
  margin: 10px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>

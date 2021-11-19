<template>
  <div>
    <h3>Individule Information</h3>
    <img :src="url + userinfo.icon" alt="" />
    <div>{{ userinfo.nickName }}</div>
    <input v-model="changeNikeName" type="text" name="" id="" />
    <button @click="changeAllNike">update</button>
  </div>
</template>

<script>
import { eventBus } from "../main";

export default {
  data() {
    return {
      userinfo: {},
      url: "",
      changeNikeName: "",
    };
  },
  mounted() {
    this.getUserInfo();
    // changeUI执行外层子组件的绑定函数，true为绑定函数中传的值
    this.changePageUI();
  },
  methods: {
    getUserInfo() {
      console.log("loading");
      this.userinfo = this.$store.state.userinfo;
      this.url = this.$store.state.base_url + "upload/";
      console.log(this.userinfo);
      console.log(this.url);
    },
    changePageUI() {
      this.$emit("changeUI", "changetypehaha");
      this.$emit("hideBox");
    },
    changeAllNike() {
      var nickName = this.changeNikeName;
      this.userinfo.nickName = nickName;
      //   通过app父组件来实现子组件之间的交互
      this.$emit("editTestName", nickName);

      //   通过事件总线来实现子组件之间的信息传递
      eventBus.$emit("changeTestSrc", this.userinfo.icon);
    },
  },
};
</script>

<style></style>

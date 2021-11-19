<template>
  <div id="login-userinfo">
    <img :src="url" alt="" />
    <p>{{ setName }}</p>
  </div>
</template>

<script>
import { eventBus } from "../main";
export default {
  props: ["setName"],
  data() {
    return {
      nickName: "",
      url: "",
    };
  },
  mounted() {
    eventBus.$on("changeTestSrc", (data) => {
      console.log("子组件通过eventBus交互： " + data);
      this.url = this.$store.state.base_url + "upload/" + data;
    });
  },
};
</script>

<style></style>

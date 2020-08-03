<template>
  <div class="login">
    <Register v-if="isToogle"/>
    <Login :client="client" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Login from "@/components/Login";
import Register from "@/components/Register";

export default {
  name: "home",
  data() {
    return {
      client: {
        ap: "",
        mac: "",
        ssid: ""
      }
    };
  },
  created() {
    this.client.ap = this.$route.query.ap;
    this.client.mac = this.$route.query.id;
    this.client.ssid = this.$route.query.ssid;
  },
  components: {
    Login,
    Register
  },
  computed: {
    ...mapGetters({
      isToogle: "toogle/isToogle"
    })
  }
};
</script>

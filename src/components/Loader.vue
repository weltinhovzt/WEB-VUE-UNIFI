<template>
  <div class="loadingData" v-bind:class="{ active: isLoading }">
    <img class="loading-circle" src="../assets/img/load-circle.svg" />
    <img class="loading-logo" src="../assets/img/load-logo.svg" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Loader",
  computed: {
    ...mapGetters({
      isLoading: "loader/isLoading"
    })
  }
};
</script>
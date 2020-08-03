<template>
  <div id="app">
    <div class="welcome">
      <h1 class="wow fadeInLeft">
        <span>Olá</span>
        <p>
          Vocé está no
          <span>
            <strong>Wifi</strong>
          </span> do Sicoob Credivaz.
        </p>
      </h1>
    </div>
    <router-view />
    <Loader/>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";

export default {
  name: "app",
  components: {
    Loader
  }
};
</script>
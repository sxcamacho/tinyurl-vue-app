<template>
  <div class="hero-form newsletter-form field field-grouped is-revealing">
    <div class="control control-expanded">
      <input class="input" type="url" name="url" placeholder="Enter your url" v-model="url">
    </div>
    <div class="control">
      <button
        id="button-reduce"
        class="button button-primary button-block button-shadow"
        :class="{ 'disable-reduce': !isUrlValid }"
        @click="onClickReduceButton"
        :disabled="!isUrlValid"
      >{{buttonText}}</button>
    </div>
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: "ReducerBox",
  data: () => {
    return {
      url: ""
    };
  },
  computed: {
    loading() {
      return store.state.loading;
    },
    buttonText() {
      return this.loading ? "Reducing..." : "Reduce";
    },
    isUrlValid() {
      var regex =
        "^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$";
      var result = this.url.match(regex, "g");
      return result == null ? false : true;
    }
  },
  methods: {
    onClickReduceButton() {
      if (this.isUrlValid) {
        store.dispatch("reduceUrl", this.url);
      }
    }
  }
};
</script>

<style>
#button-reduce {
  width: 150px;
  -webkit-transition: opacity 0.3s ease-in-out;
  -moz-transition: opacity 0.3s ease-in-out;
  -ms-transition: opacity 0.3s ease-in-out;
  -o-transition: opacity 0.3s ease-in-out;
  transition: opacity 0.3s ease-in-out;
}
.disable-reduce {
  filter: alpha(opacity=30);
  opacity: 0.3;
}
</style>

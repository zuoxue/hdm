<template>
  <div v-if="!isclose">
    <div class="allscreen"></div>
    <div class="funcmodule" :style="{width:width}">
      <header class="overlay-header">
        {{title}}
        <user-close @clickclose="close" :width="width"></user-close>
      </header>
      <slot name="body"></slot>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import userClose from "./userclose";
export default {
  name: "useroverlay",
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    isclose: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: "0px"
    }
  },
  components: {
    userClose
  },
  methods: {
    close(show) {
      // this.isclose = show;
      this.$emit("update:isclose", show);
    }
  }
};
</script>

<style scoped lang='scss'>
.allscreen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(55, 55, 55, 0.6);
  z-index: 10;
  transition: all 0.25s ease-out;
}
.funcmodule {
  position: absolute;
  top: 0;
  right: 0px;
  height: 100vh;
  z-index: 20;
  background-color: #fff;
  .overlay-header {
    border-bottom: 1px solid #efefef;
    padding: 0 24px;
    line-height: 60px;
    height: 60px;
    position: relative;
    font-size: 18px;
  }
}
</style>

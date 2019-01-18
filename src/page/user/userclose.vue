<template>
  <div @click="close" class="close">
    <span>
      <i class="el-icon-close"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: "userclose",
  methods: {
    close() {
      this.$emit("clickclose", true);
    }
  }
};
</script>

<style scoped>
.close {
  float: right;
  cursor: pointer;
}
</style>

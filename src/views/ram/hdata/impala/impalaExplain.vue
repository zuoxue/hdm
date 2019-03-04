<template>
  <div>
    <!-- <pre>{{explainResult}}</pre> -->
    <json-viewer :value="explainResult" :expand-depth="5" copyable boxed sort></json-viewer>
  </div>
</template>

<script>
export default {
  name: "impalaExplain",
  data() {
    return {
      alldata: ""
    };
  },
  props: ["explainResult"]
  // watch: {
  //   explainResult() {
  //     this.alldata = JSON.parse(this.explainResult);
  //   }
  // }
};
</script>

<style>
</style>

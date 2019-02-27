<template>
  <div>
    <pre>{{explainResult}}</pre>
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

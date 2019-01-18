<template>
  <div class="usergroup">
    <header class="usergroup-header">
      <h3>{{recement}}</h3>
    </header>
    <article>
      <header>
        <el-tabs v-model="activeName2" type="card" value="first" class="el-tabs--wrapper">
          <el-tab-pane label="安全设置" name="first">
            <overviewsavesetting/>
          </el-tab-pane>
          <el-tab-pane label="高级设置" name="second">
            <overviewseniorsetting></overviewseniorsetting>
          </el-tab-pane>
        </el-tabs>
      </header>
      <main></main>
    </article>
  </div>
</template>

<script>
import overviewsavesetting from "./overviewsavesetting";
import overviewseniorsetting from "./overviewseniorsetting";

export default {
  name: "overviewsetting",
  props: ["recement"],
  data() {
    return {
      activeName2: "first"
    };
  },
  methods: {},
  computed: {},
  components: {
    overviewsavesetting,
    overviewseniorsetting
  }
};
</script>

<style lang="scss" scoped>
.usergroup {
  text-align: left;
  .usergroup-header {
    height: 40px;
    line-height: 40px;
    margin-bottom: 16px;
    h3 {
      font-size: 28px;
    }
  }
  .el-tabs--wrapper {
    /deep/ .el-tabs__header {
      margin-bottom: 0px;
    }
  }
}
</style>

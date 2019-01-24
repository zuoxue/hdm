<template>
  <div>
    <el-container>
      <el-header>
        <el-tabs type="border-card">
          <el-tab-pane label="所有资源">
            <all-resource></all-resource>
          </el-tab-pane>
          <el-tab-pane label="已分配资源">
            <acess-resource></acess-resource>
          </el-tab-pane>
        </el-tabs>
      </el-header>
    </el-container>
  </div>
</template>

<script>
import allResource from "./allResource";
import acessResource from "./acessResource";
export default {
  name: "resourceManage",
  data() {
    return {};
  },
  components: {
    allResource,
    acessResource
  }
};
</script>

<style>
</style>

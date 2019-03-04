<template>
  <div>
    <el-container>
      <el-header>
        <el-tabs type="border-card">
          <el-tab-pane label="所有资源">
            <all-resource @getresource="getResource" :clickshow.sync="clickshow"></all-resource>
            <div class="divider"></div>
            <acess-resource v-if="clickshow" :resourceData="resourceData"></acess-resource>
          </el-tab-pane>
          <!-- <el-tab-pane label="已分配资源">

          </el-tab-pane>-->
        </el-tabs>
      </el-header>
    </el-container>
  </div>
</template>

<script>
import allResource from "./allResource";
import acessResource from "./acessResource";
import { getUserByResource } from "@/api/ram/resourceManage";
export default {
  name: "resourceManage",
  data() {
    return {
      clickshow: false,
      resourceid: "",
      resourceData: []
    };
  },
  components: {
    allResource,
    acessResource
  },
  methods: {
    getResource(id) {
      this.resourceid = id;
      this.getuserbyresource();
      this.clickshow = true;
    },
    getuserbyresource() {
      let query = {
        id: this.resourceid
      };
      getUserByResource(query, {}, res => {
        if (res.data.code == 0) {
          this.resourceData = res.data.data;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.divider {
  height: 40px;
  width: calc(100vw - 70px);
  background: #f5f7fa;
  position: relative;
  left: -15px;
}
</style>

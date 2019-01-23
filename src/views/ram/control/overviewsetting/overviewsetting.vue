<template>
  <div class="usergroup">
    <header class="usergroup-header">
      <h3>{{recement}}</h3>
    </header>
    <article>
      <header>
        <el-tabs v-model="activeName2" type="card" value="first" class="el-tabs--wrapper">
          <el-tab-pane label="安全设置" name="first">
            <overviewsavesetting
              :isclose.sync="isclose"
              :width.sync="width"
              :editstatus.sync="editstatus"
              :userstatus.sync="userstatus"
              :title.sync="overlayTitle"
            />
          </el-tab-pane>
          <el-tab-pane label="高级设置" name="second">
            <overviewseniorsetting
              :isclose.sync="isclose"
              :width.sync="width"
              :title.sync="overlayTitle"
              :domainstatus.sync="domainstatus"
            ></overviewseniorsetting>
          </el-tab-pane>
        </el-tabs>
      </header>
      <main></main>
    </article>
    <useroverlay :title="overlayTitle" :isclose.sync="isclose" :width="width" style="height:100vh;">
      <div slot="body" class="popaside">
        <savesettingedit v-if="editstatus && activeName2 == 'first'" :isclose.sync="isclose"></savesettingedit>
        <!--密码编辑 -->
        <savesettinguser v-if="userstatus && activeName2 == 'first'" :isclose.sync="isclose"></savesettinguser>
        <!--用户编辑 -->
        <updatedomain v-if="domainstatus==1 && activeName2 == 'second'" :isclose.sync="isclose"></updatedomain>
        <!--域名更新 -->
        <createdomain v-if="domainstatus==2 && activeName2 == 'second'" :isclose.sync="isclose"></createdomain>
        <!--创建域别名 -->
        <loginset v-if="domainstatus==3 && activeName2 == 'second'" :isclose.sync="isclose"></loginset>
        <!--sso登录设置-->
      </div>
    </useroverlay>
  </div>
</template>

<script>
import overviewsavesetting from "./overviewsavesetting";
import overviewseniorsetting from "./overviewseniorsetting";
import useroverlay from "@/page/user/useroverlay";
import savesettingedit from "./savesettingedit";
import savesettinguser from "./savesettinguser";

import updatedomain from "./updatedomain";
import createdomain from "./createdomain";
import loginset from "./loginset";

export default {
  name: "overviewsetting",
  props: ["recement"],
  data() {
    return {
      activeName2: "first",

      isclose: true,
      width: "0px",
      editstatus: false,
      userstatus: false,
      overlayTitle: "",
      domainstatus: 0
    };
  },
  created() {
    document.addEventListener(
      "keyup",
      ev => {
        ev.preventDefault();
        if (ev.keyCode == 27) {
          this.isclose = true;
        }
        return;
      },
      true
    );
  },
  methods: {},
  computed: {},
  components: {
    overviewsavesetting,
    overviewseniorsetting,
    useroverlay,
    savesettingedit,
    savesettinguser,
    updatedomain,
    createdomain,
    loginset
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

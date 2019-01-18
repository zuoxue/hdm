<template>
  <main class="savesetting-wrapper">
    <section>
      <header>
        <h4 class="savesetting-header">密码强度设置</h4>
        <span class="savesetting-header--span" @click="editpass">
          <i class="el-icon-edit"></i>编辑密码规则
        </span>
      </header>
      <main>
        <el-row v-for="(key,index) in options" :key="index" class="savesetting-rule">
          <el-col :span="12" v-for="(child,index) in key" :key="index">
            <div style="width:300px;">
              <el-row>
                <el-col :span="12" class="savesetting-rule--gray">{{child.name}}</el-col>
                <el-col :span="12">{{child.prop}}</el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </main>
    </section>

    <!-- 用户安全设置 -->
    <section>
      <header>
        <h4 class="savesetting-header">用户安全设置</h4>
        <span class="savesetting-header--span" @click="edituser">
          <i class="el-icon-edit"></i>修改 RAM 用户安全设置
        </span>
      </header>
      <main>
        <el-row v-for="(key,index) in savedatas" :key="index" class="savesetting-rule">
          <el-col :span="12" v-for="(child,index) in key" :key="index">
            <div style="width:300px;">
              <el-row>
                <el-col :span="12" class="savesetting-rule--gray">{{child.name}}</el-col>
                <el-col :span="12">{{child.prop}}</el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </main>
    </section>

    <useroverlay :title="overlayTitle" :isclose.sync="isclose" :width="width">
      <div slot="body">
        <savesettingedit v-if="editstatus"></savesettingedit>
        <!--密码编辑 -->
        <savesettinguser v-if="userstatus"></savesettinguser>
        <!--用户编辑 -->
      </div>
    </useroverlay>
  </main>
</template>

<script>
import useroverlay from "@/page/user/useroverlay";
import savesettingedit from "./savesettingedit";
import savesettinguser from "./savesettinguser";

export default {
  name: "overviewsavesetting",
  data() {
    return {
      options: [
        [
          {
            name: "密码长度",
            prop: "8-12位"
          },
          {
            name: "密码中必须包含",
            prop: ""
          }
        ],
        [
          {
            name: "密码有效期",
            prop: "0 天"
          },
          {
            name: "密码过期后不可登录",
            prop: "否"
          }
        ],
        [
          {
            name: "历史密码检查策略",
            prop: "禁止使用前 0 次密码"
          },
          {
            name: "密码重试约束",
            prop: "一小时内使用错误密码最大尝试 0 次登录"
          }
        ]
      ],
      savedatas: [
        [
          {
            name: "密码长度",
            prop: "8-12位"
          },
          {
            name: "密码中必须包含",
            prop: ""
          }
        ],
        [
          {
            name: "密码有效期",
            prop: "0 天"
          },
          {
            name: "密码过期后不可登录",
            prop: "否"
          }
        ],
        [
          {
            name: "历史密码检查策略",
            prop: "禁止使用前 0 次密码"
          },
          {
            name: "密码重试约束",
            prop: "一小时内使用错误密码最大尝试 0 次登录"
          }
        ]
      ],
      overlayTitle: "编辑密码规则",
      width: "620px",
      isclose: true,
      editstatus: false,
      userstatus: false
    };
  },
  components: {
    useroverlay,
    savesettingedit,
    savesettinguser
  },
  methods: {
    editpass() {
      this.isclose = false;
      this.overlayTitle = "编辑密码规则";
      this.width = "620px";
      this.editstatus = true;
      this.userstatus = false;
    },
    edituser() {
      this.isclose = false;
      this.overlayTitle = "修改 RAM 用户安全设置";
      this.width = "400px";
      this.editstatus = false;
      this.userstatus = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.savesetting-wrapper {
  height: calc(100vh - 165px);
  font-size: 14px;
  .savesetting-header {
    display: inline-block;
    margin-right: 40px;
    height: 32px;
    line-height: 32px;
  }
  .savesetting-header--span {
    color: #0070cc;
    height: 32px;
    line-height: 32px;
    cursor: pointer;
  }
  .savesetting-rule {
    height: 20px;
    line-height: 20px;
    margin-bottom: 8px;
    .savesetting-rule--gray {
      color: #8c8c8c;
    }
  }
}
</style>

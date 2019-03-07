<template>
  <div>
    <header class="usergroup-header">
      <h3>
        <i class="el-icon-back back-cursor" @click="back"></i>
        新建自定义权限策略
      </h3>
    </header>
    <section class="overviewuser-new">
      <el-row>
        <el-col :span="12">
          <div>
            <p>策略名称</p>
            <el-input v-model="regname"></el-input>
          </div>
          <div>
            <p>备注</p>
            <el-input v-model="regremark"></el-input>
          </div>
        </el-col>
      </el-row>
    </section>

    <section class="footer">
      <el-button type="primary" size="small" @click="createPolicy">确认</el-button>
      <el-button @click="back">取消</el-button>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  getVersion,
  getAllAuth,
  createRamPolicy,
  getALlPolicys,
  modifyPolicyStatus,
  getSingleStrategy
} from "@/api/ram/strategy";
export default {
  name: "createNewAuth",
  data() {
    return {
      regname: "",
      regremark: ""
    };
  },
  methods: {
    back() {
      this.$emit("update:isadd", false);
      this.$emit("updateAuth");
    },
    // 新建策略
    createPolicy() {
      let name = this.regname;
      let comment = this.regremark;
      let ownerId = this.userId;
      let createBy = this.userInfo.username;

      if (name == "" || comment == "") {
        this.$message({
          type: "error",
          message: "请填写信息完整"
        });
        return false;
      }
      let data = {
        name,
        comment,
        createBy,
        ownerId
      };
      createRamPolicy(data, res => {
        if (res.data.data) {
          this.$message({
            type: "success",
            message: "新建策略成功"
          });
          this.isadd = false;
          this.regname = "";
          this.regremark = "";
          // this.getallpolicys();
          return;
        }
        this.$message({
          type: "error",
          message: "新建策略失败"
        });
        return;
      });
      return;
    }
  },
  computed: {
    ...mapGetters(["userId", "userInfo"]),
    newLenArray() {
      var arr = new Array(this.adduser);
      return arr;
    }
  }
};
</script>

<style lang="scss" scoped>
.usergroup-header {
  height: 40px;
  line-height: 40px;
  margin-bottom: 16px;
  h3 {
    font-size: 28px;
  }
  .back-cursor {
    cursor: pointer;
  }
}
.overviewuser-new {
  .el-radio {
    display: block;
    margin-bottom: 8px;
    & + .el-radio {
      margin-left: 0px;
    }
    /deep/ .el-radio__label {
      color: #262626;
    }
  }
}
.pager {
  text-align: right;
  margin-right: 20px;
  margin-top: 10px;
}
.footer {
  margin-top: 10px;
}
</style>

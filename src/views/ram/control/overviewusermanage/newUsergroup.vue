<template>
  <div>
    <el-form :model="rules" :rules="rule1" ref="form1" status-icon style="margin:auto 30px;">
      <el-form-item label prop="usergroupname">
        <p>
          <span class="star">*</span>用户组名称
        </p>
        <el-input type="text" v-model="rules.usergroupname" autocomplete="off"></el-input>
        <p class="useroverlay-font--default">不超过64个字符，允许英文字母、数字，或"-"</p>
      </el-form-item>
      <!-- <el-form-item prop="dispname">
        <p>
          <span class="star">*</span>显示名称
        </p>
        <el-input type="text" v-model="rules.dispname" autocomplete="off"></el-input>
        <p class="useroverlay-font--default">最大长度24个字符或汉字</p>
      </el-form-item>-->
      <el-form-item prop="remark">
        <p>备注</p>
        <el-input type="textarea" v-model="rules.remark"></el-input>
        <p class="useroverlay-font--default">最大长度128个字符</p>
      </el-form-item>
    </el-form>
    <div class="useroverlay-footer">
      <el-button type="plain" size="small" class="confirm" @click="createUsergroup">确定</el-button>
      <el-button type="plain" size="small" @click="close">关闭</el-button>
    </div>
  </div>
</template>

<script>
import { createUsergroupChild } from "@/api/ram/user";
import { mapGetters } from "vuex";
export default {
  name: "newUsergroup",
  props: ["recement", "isclose"],
  data() {
    var checkgroup = function(rule, value, callback) {
      let reg = /[\da-zA-Z-]+/;
      if (value === "") {
        callback(new Error("不能为空"));
      }
      if (value.length > 64) {
        callback(new Error("不能超过64个字符"));
      }
      if (!reg.test(value)) {
        callback(new Error("不符合要求"));
      }
      callback();
    };
    var remarks = function(rule, value, callback) {
      if (value != "" && value.length > 128) {
        callback(new Error("超过最大字符数"));
      }
      callback();
    };
    return {
      rules: {
        usergroupname: "",
        dispname: "",
        remark: ""
      },
      rule1: {
        usergroupname: [
          { validator: checkgroup, required: true, trigger: ["blur", "change"] }
        ],
        remark: [{ validator: remarks, trigger: ["blur", "change"] }]
      }
    };
  },
  methods: {
    close() {
      this.$emit("update:isclose", true);
    },
    createUsergroup() {
      if (!this.rules.usergroupname) {
        this.$message({
          type: "error",
          message: "请完成组名"
        });
        return false;
      }
      let data = {
        access_token: this.access_token,
        ownerId: this.userId,
        groupName: this.rules.usergroupname,
        comment: this.rules.remark
      };
      createUsergroupChild(data, res => {
        if (res.data == 1) {
          this.$message({
            type: "success",
            message: "创建组成功！",
            duration: 1500
          });
          // this.getAllTableData();
        }
        this.rules.usergroupname = "";
        this.rules.remark = "";
        if (res.data != 1) {
          this.$message({
            type: "error",
            message: "创建组失败！",
            duration: 1500
          });
        }
        return;
      });
    }
  },
  computed: {
    ...mapGetters(["access_token", "userId"])
  }
};
</script>

<style scoped lang="scss">
.useroverlay-font--default {
  color: #cdcdcd;
  height: 18px;
  line-height: 1.5;
  margin-top: 4px;
}
.star {
  color: #f15533;
  margin-right: 4px;
}
.useroverlay-footer {
  background: #fff;
  width: 100%;
  border-top: 1px solid #efefef;
  overflow: hidden;
  padding: 0 24px;
  height: 64px;
  line-height: 64px;
  // position: absolute;
  // bottom: 0;
  .confirm {
    background: #00c1de;
    color: #fff;
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>

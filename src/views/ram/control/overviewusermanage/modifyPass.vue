<template>
  <div class="modifyPass-wrapper">
    <el-form :model="passList" :rules="rule1" label-width="80px">
      <el-form-item prop="newpass" label="新密码">
        <el-input placeholder="请输入密码" v-model="passList.newpass" size="small" type="password"></el-input>
      </el-form-item>
      <el-form-item prop="renewpass" label="重复密码">
        <el-input placeholder="请输入密码" v-model="passList.renewpass" size="small" type="password"></el-input>
      </el-form-item>
    </el-form>
    <div class="aligncenter">
      <el-button type="success" size="small" @click="submitPass" :disabled="isDisabled">提交</el-button>
      <el-button size="small" @click="close">取消</el-button>
    </div>
  </div>
</template>

<script>
import { modifyPass } from "@/api/ram/user";

export default {
  name: "modifyPass",
  data() {
    var passValid = (rule, value, callback) => {
      var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
        regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
      if (regEn.test(value) || regCn.test(value)) {
        this.$store.commit("SET_PASS_DIS", true);
        callback(new Error("名称不能包含特殊字符.."));
        return;
      }
      if (value.length < 8 || value.length > 8) {
        this.$store.commit("SET_PASS_DIS", true);
        callback(new Error("密码长度必须为8位.."));
        return;
      }
      this.$store.commit("SET_PASS_DIS", false);
      callback();
    };
    return {
      passList: {
        newpass: "",
        renewpass: ""
      },
      rule1: {
        newpass: [
          { validator: passValid, required: true, trigger: ["blur", "change"] }
        ],
        renewpass: [
          {
            required: true,
            message: "不能为空...",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  props: ["isclose", "userId"],
  computed: {
    isDisabled() {
      return this.$store.state.user.passDisabled;
    }
  },
  methods: {
    close() {
      this.$store.commit("SET_PASS_DIS", true);
      this.$emit("update:isclose", true);
    },
    submitPass() {
      if (this.passList.newpass == "") {
        this.$message({
          type: "error",
          message: "新密码不能为空.."
        });
        return false;
      }
      if (this.passList.newpass != this.passList.renewpass) {
        this.$message({
          type: "error",
          message: "两次密码不同.."
        });
        return false;
      }

      const data = {
        userId: this.userId,
        password: this.passList.newpass
      };

      modifyPass(data, res => {
        if (res.data.data) {
          this.$message({
            type: "success",
            message: "密码修改成功！"
          });
          this.passList.newpass = "";
          this.passList.renewpass = "";
          this.$store.commit("SET_PASS_DIS", true);
          this.$emit("update:isclose", true);
        } else {
          this.$message({
            type: "error",
            message: "密码修改失败！"
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.modifyPass-wrapper {
  padding-left: 10px;
  text-align: center;
  margin-top: 30px;
}
</style>

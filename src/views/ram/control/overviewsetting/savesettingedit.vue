<template>
  <div class="edit-setting">
    <el-form :rules="rule1">
      <el-form-item class="el-form-items--patch" prop="len">
        <p>密码长度</p>
        <span class="next-input">
          <input type="text" class="input-setting" v-model="passlen">
        </span>
        <span>至 32位（至少8位）</span>
      </el-form-item>
      <el-form-item>
        <p>密码中必须包含元素</p>
        <el-checkbox-group v-model="checkboxList">
          <el-checkbox :label="ck" v-for="ck in checkboxLabel" :key="ck" class="ck-block"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item prop="period">
        <p>密码有效期</p>
        <span class="next-input">
          <input type="text" class="input-setting" v-model="passperiod">
        </span>
        <span>天（最多1095天，输入0表示永不过期）</span>
      </el-form-item>
      <el-form-item>
        <p>密码过期后</p>
        <el-radio-group v-model="radioValue">
          <el-radio :label="ck" v-for="ck in radioLabel" :key="ck" class="ck-block"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="el-form-items--patch" prop="regiter">
        <p>历史密码检查策略</p>
        <span>历史密码检查策略</span>
        <span class="next-input">
          <input type="text" class="input-setting" v-model="passcheck">
        </span>
        <span>次密码 （最大设置为24，0表示不启用历史密码检查策略）</span>
      </el-form-item>

      <el-form-item class="el-form-items--patch" prop="restrain">
        <p>密码重试约束</p>
        <span>一小时内使用错误密码最多尝试登录</span>
        <span class="next-input">
          <input type="text" class="input-setting" v-model="passrestrict">
        </span>
        <span>次 （最大设置为32，0表示不启用密码重试约束）</span>
      </el-form-item>
    </el-form>
    <div slot="footer" class="useroverlay-footer">
      <el-button type="plain" size="small" class="confirm">确定</el-button>
      <el-button type="plain" size="small" @click="close">关闭</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "savesettingedit",
  data() {
    var validatorlen = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("不能为空"));
      }
      if (typeof value != "number") {
        callback(new Error("请输入数字"));
      }
      var p = paraseInt(value, 10);
      if (p < 0) {
        callback(new Error("请输入正整数"));
      }
      if (p < 8) {
        callback(new Error("至少为8位"));
      }
      if (p > 32) {
        callback(new Error("至多为32位"));
      }
      callback();
    };
    return {
      checkboxLabel: ["大写字母", "小写字母", "数字", "符号"],
      radioLabel: ["不可登陆", "不限制登录"],
      checkboxList: [],
      radioValue: "",
      passlen: 8,
      passperiod: 0,
      passcheck: 0,
      passrestrict: 0,

      rule1: {
        len: [
          {
            validator: validatorlen,
            trigger: "blue"
          }
        ]
      }
    };
  },
  props: ["isclose"],
  methods: {
    close() {
      this.$emit("update:isclose", true);
    }
  }
};
</script>

<style lang="scss" scoped>
.edit-setting {
  width: 100%;
  padding: 0px 24px;
  font-size: 12px;
  margin-top: 8px;
  .el-form-items--patch {
    height: 58px;
  }
  p,
  span {
    font-size: 12px;
    margin: 0px;
  }
  p {
    height: 26px;
    line-height: 26px;
  }
  .ck-block {
    display: block;
    margin-left: 0px;
    line-height: 20px;
    height: 20px;
    margin-top: 4px;
    margin-bottom: 8px;
    /deep/ .el-checkbox__label {
      font-size: 12px;
    }
    /deep/ .el-radio__label {
      font-size: 12px;
    }
  }
  .next-input {
    height: 24px;
    line-height: 24px;
    border-radius: 0;
    width: 10%;
    vertical-align: middle;
    display: inline-table;
    border-collapse: separate;
    font-size: 0;
    border-spacing: 0;
    -webkit-transition: all 0.3s ease-out;
    transition: all 0.3s ease-out;
    border: 1px solid #e5e5e5;
    background-color: #fff;
    .input-setting {
      width: 100%;
      border: none;
      outline: none;
      padding: 0;
      margin: 0;
      font-weight: 400;
      vertical-align: middle;
      background-color: transparent;
      color: #595959;
      margin-left: 6px;
    }
  }
  .useroverlay-footer {
    background: #fff;
    width: 100%;
    border-top: 1px solid #efefef;
    overflow: hidden;
    height: 64px;
    line-height: 64px;
    .confirm {
      background: #00c1de;
      color: #fff;
      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>

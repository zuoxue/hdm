<template>
  <div class="auth-setting">
    <el-form :rules="rule1">
      <el-form-item class="el-form-items--patch" prop="appname">
        <p>
          <span class="star">*</span>应用名称
        </p>
        <el-input v-model="appname" size="small">
          <div slot="suffix">@app.1424731304604773.onaliyun.com</div>
        </el-input>
      </el-form-item>
      <el-form-item class="el-form-items--patch" prop="appnamedisp">
        <p>
          <span class="star">*</span>应用名称显示
        </p>
        <el-input v-model="appname" size="small"></el-input>
      </el-form-item>
      <el-form-item>
        <p>应用类型</p>
        <el-radio-group v-model="apptype">
          <el-radio :label="ck" v-for="ck in radioLabel" :key="ck" class="ck-block"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="visittoken">
        <p>
          <span class="star">*</span>访问令牌有效期
        </p>
        <span>
          <input type="text" v-model="visittoken">
        </span>
        <span>秒</span>
      </el-form-item>
      <el-form-item prop="refreshtoken">
        <p>
          <span class="star">*</span>刷新令牌有效期
        </p>
        <span>
          <input type="text" v-model="refreshtoken">
        </span>
        <span>秒</span>
      </el-form-item>
      <el-form-item prop="calladdress">
        <p>回调地址</p>
        <span>
          <el-input type="textarea" v-model="calladdress" :rows="2"></el-input>
        </span>
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
  name: "authNew",
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
      appname: "",
      radioLabel: ["WebApp", "NativeApp"],
      radioValue: "",
      appname: "",
      apptype: "",
      appnamedisp: "",
      refreshtoken: "",
      visittoken: "",
      calladdress: "",
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
.auth-setting {
  width: 100%;
  padding: 0px 24px;
  font-size: 12px;
  margin-top: 8px;
  .star {
    color: #f15533;
    margin-right: 4px;
  }
  .el-form-items--patch {
    height: 58px;
    width: 340px;
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
    font-size: 0;
    border: 1px solid #e5e5e5;
    background-color: #fff;
    .input-setting {
      width: 100%;
      height: 100%;
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
  .el-textarea {
    /deep/ textarea {
      width: 338px;
      border-radius: 0px;
      resize: none;
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

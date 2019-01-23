<template>
  <el-scrollbar style="height:100%;">
    <div class="edit-setting">
      <el-form :rules="rule1">
        <el-form-item v-for="(radio,index) in radioList" :key="index">
          <p>{{radio["label"]}}</p>
          <el-radio-group v-model="valmodel[radio.prop]">
            <el-radio :label="1" class="ck-block">允许</el-radio>
            <el-radio :label="2" class="ck-block">不允许</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="el-form-items--patch" prop="logindate">
          <p>登录session过期时间</p>
          <span class="next-input">
            <input type="text" class="input-setting" v-model="logindate">
          </span>
          <span>小时 （有效值区间为6-24小时）</span>
        </el-form-item>

        <el-form-item>
          <p>登录掩码设置</p>
          <textarea name id cols="30" rows="5" v-model="logincodeset"></textarea>
          <div class="logindecript">{{logincodesetdesp}}</div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="useroverlay-footer">
        <el-button type="plain" size="small" class="confirm">确定</el-button>
        <el-button type="plain" size="small" @click="close">关闭</el-button>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
export default {
  name: "savesettinguser",
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
      radioList: [
        {
          label: "保存MFA登录状态7天",
          prop: "savestatus",
          name: "savestatus"
        },
        {
          label: "自主管理密码",
          prop: "managepass",
          name: "managepass"
        },
        {
          label: "自主管理AccessKey",
          prop: "managekey",
          name: "managekey"
        },
        {
          label: "自主管理多因素设备",
          prop: "manageset",
          name: "manageset"
        }
      ],
      valmodel: {
        savestatus: "",
        managepass: "",
        managekey: "",
        manageset: ""
      },
      logindate: "",
      logincodeset: "",
      logincodesetdesp:
        "网络掩码决定哪些IP地址会受到登录控制台的影响，包括密码登录和SSO登录，但使用AccessKey发起的API访问并不受影响。如果指定掩码，子用户必须只能从指定的IP地址进行登录。如果不指定任何掩码，登录控制台功能将适用于整个网络。当需要配置多个掩码时，请使用分号来分隔掩码，例如：42.120.66.0/24;42.120.74.98",
      rule1: {
        logindate: [
          {
            validator: validatorlen,
            trigger: "blur"
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
    .logindecript {
      line-height: 14px;
      font-size: 12px;
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

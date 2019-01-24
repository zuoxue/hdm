<template>
  <div class="auth-setting">
    <el-form>
      <div>
        <p>权限效力</p>
        <el-radio-group v-model="authorPeriod" class="auth-radios--block">
          <el-radio label="first">允许</el-radio>
          <el-radio label="second">拒绝</el-radio>
        </el-radio-group>
      </div>
      <div class="mb10">
        <p>选择产品服务</p>
        <el-select
          v-model="selService"
          placeholder="请选择"
          class="el-select--service"
          popper-class="el-select--setwrap"
        >
          <el-option
            v-for="(item,index) in options"
            :key="index"
            :value="item"
            :label="item"
          >{{item}}</el-option>
        </el-select>
      </div>
      <div class="mb10">
        <p>操作名称</p>
        <el-radio-group v-model="handleName">
          <el-radio label="first">所有操作</el-radio>
          <el-radio label="second">特定操作</el-radio>
        </el-radio-group>
      </div>
      <div class="mb10">
        <p>资源</p>
        <el-radio-group v-model="source">
          <el-radio label="first">所有资源</el-radio>
          <el-radio label="second">特定资源</el-radio>
        </el-radio-group>
      </div>
      <div class="mb10">
        <p>限制条件</p>
        <template v-if="res_conditions.length>0">
          <el-row v-for="(row,index) in res_conditions" :key="index" :gutter="10">
            <el-col :span="8">
              <el-select v-model="row.resVal" popper-class="el-select--setwrap" placeholder="条件关键字">
                <el-option v-for="(k,index) in res_keys" :key="index" :label="k" :value="k"></el-option>
              </el-select>
            </el-col>
            <el-col :span="8">
              <el-select v-model="row.resWord" popper-class="el-select--setwrap" placeholder="限定词">
                <el-option v-for="(k,index) in res_words" :key="index" :label="k" :value="k"></el-option>
              </el-select>
            </el-col>
            <el-col :span="3">
              <el-input v-model="row.resHand" placeholder="值"></el-input>
            </el-col>
            <el-col :span="1">
              <div @click="deleteRes(index)" class="deleteIcon">X</div>
            </el-col>
          </el-row>
        </template>
        <p>
          <a href="javascript:;" @click="addRes" class="default_a">
            <i class="el-icon-plus"></i>
            <span>&nbsp;&nbsp;添加限制条件</span>
          </a>
        </p>
      </div>
    </el-form>
    <div slot="footer" class="useroverlay-footer">
      <el-button type="plain" size="small" class="confirm">确定</el-button>
      <el-button type="plain" size="small" @click="close">关闭</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "authorModule",
  data() {
    return {
      authorPeriod: "",
      selService: "",
      options: ["ECS", "SLB", "RDS", "VPC", "Redis"],
      handleName: "",
      source: "",
      res_conditions: [],
      res_keys: ["ace:currentTime", "ace:currentTime"],
      res_words: ["StringEquals"]
    };
  },
  props: ["isclose"],
  methods: {
    close() {
      this.$emit("update:isclose", true);
    },
    deleteRes(index) {
      this.res_conditions.splice(index, 1);
    },
    addRes() {
      this.res_conditions.push({
        resVal: "",
        resWord: "",
        resHand: ""
      });
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
  color: #262626;
  p {
    font-size: 12px;
    margin: 0px;
    height: 32px;
    line-height: 32px;
    margin-bottom: 6px;
  }
  .auth-radios--block {
    .el-radio {
      display: block;
      margin-left: 0px;
      line-height: 20px;
      height: 20px;
      margin-top: 4px;
      margin-bottom: 8px;
    }

    /deep/ .el-radio__label {
      font-size: 12px;
      color: #262626;
    }
  }

  .el-radio {
    /deep/ .el-radio__label {
      font-size: 12px;
      color: #262626;
    }
    /deep/ .el-radio__inner {
      border-color: #ccc;
    }
  }
  .el-select--service {
    width: 540px !important;
  }
  .mb10 {
    margin-bottom: 16px;
    .deleteIcon {
      height: 38px;
      line-height: 38px;
      display: inline-block;
      font-size: 14px;
      font-weight: 400;
      cursor: pointer;
    }
  }
  .useroverlay-footer {
    position: absolute;
    bottom: 10px;
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
  .default_a {
    color: #0070cc;
    &:active,
    &:visited {
      color: #0070cc;
      border: none;
    }
  }
}
</style>

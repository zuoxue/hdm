<template>
  <div class="auth-setting">
    <el-form>
      <div>
        <p>权限效力</p>
        <el-radio-group v-model="authorPeriod" class="auth-radios--block">
          <el-radio label="0">允许</el-radio>
          <el-radio label="1">拒绝</el-radio>
        </el-radio-group>
      </div>
      <div>
        <p>
          策略版本:
          <span v-if="editList.version">&nbsp;&nbsp;&nbsp;&nbsp;{{editList.version}}</span>
        </p>
        <el-row>
          <el-col :span="12">
            <el-input v-model="policyVersion" placeholder="空值默认为1" v-if="!editList.version"></el-input>
          </el-col>
        </el-row>
      </div>
      <div>
        <p>
          产品服务
          <i class="el-icon-plus plus" @click="addService"></i>
        </p>
        <template>
          <el-row v-for="service in allservice" :key="service.index">
            <el-col :span="12">
              <el-input v-model="service.value"></el-input>
            </el-col>
            <el-col :span="2" v-if="service.index>0">
              <i class="iconfont1 icon-font-close deleteIcon" @click="delService(service.index)"></i>
            </el-col>
          </el-row>
        </template>
      </div>
      <div>
        <p>
          资源
          <i class="el-icon-plus plus" @click="addresource"></i>
        </p>
        <template>
          <el-row v-for="resource in allresource" :key="resource.index">
            <el-col :span="12">
              <el-input v-model="resource.value"></el-input>
            </el-col>
            <el-col :span="2" v-if="resource.index>0">
              <i class="iconfont1 icon-font-close deleteIcon" @click="delresource(resource.index)"></i>
            </el-col>
          </el-row>
        </template>
      </div>
    </el-form>
    <div slot="footer" class="useroverlay-footer">
      <el-button type="plain" size="small" class="confirm" @click="submitAuth">确定</el-button>
      <el-button type="plain" size="small" @click="close">关闭</el-button>
    </div>
  </div>
</template>

<script>
import { addAuthParam, updateAuthParam } from "@/api/ram/strategy";
export default {
  name: "authorModule",
  data() {
    return {
      authorPeriod: this.isobjbull()
        ? ""
        : this.editList.validty == "允许"
        ? "0"
        : "1",
      selService: "",
      options: ["ECS", "SLB", "RDS", "VPC", "Redis"],
      handleName: "",
      source: "",
      res_conditions: [],
      res_keys: ["ace:currentTime", "ace:currentTime"],
      res_words: ["StringEquals"],
      policyVersion: "",
      allservice: this.isobjbull()
        ? [
            {
              index: 0,
              value: ""
            }
          ]
        : this.switchData(this.editList.service),
      allresource: this.isobjbull()
        ? [
            {
              index: 0,
              value: ""
            }
          ]
        : this.switchData(this.editList.resource)
    };
  },
  props: ["isclose", "editList", "rowId", "policyid"],
  methods: {
    isobjbull() {
      return this.editList.version == "" ? true : false;
    },
    switchData(d) {
      let obj = [];
      let index = 0;
      let ds = d.split("、");

      ds.forEach(function(item) {
        obj.push({
          index: index++,
          value: item
        });
      });
      return obj;
    },
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
    },
    addService() {
      const index =
        this.allservice.length == 0 ? 0 : this.allservice.length - 1;
      const pos = this.allservice[index].index + 1;
      this.allservice.push({
        index: pos,
        value: ""
      });
    },
    delService(index) {
      this.allservice.splice(index, 1);
    },

    addresource() {
      const index =
        this.allresource.length == 0 ? 0 : this.allresource.length - 1;
      const pos = this.allresource[index].index + 1;
      this.allresource.push({
        index: pos,
        value: ""
      });
    },
    delresource(index) {
      this.allresource.splice(index, 1);
    },
    submitAuth() {
      var service = this.allservice
        .map(function(item) {
          if (item.value != "") {
            return item.value;
          }
        })
        .filter(function(item) {
          return item != undefined;
        });
      var resource = this.allresource
        .map(function(item) {
          if (item.value != "") {
            return item.value;
          }
        })
        .filter(function(item) {
          return item != undefined;
        });
      if (
        service.length == 0 ||
        resource.length == 0 ||
        this.authorPeriod == ""
      ) {
        this.$message({
          type: "error",
          message: "请填写完整..."
        });
        return;
      }
      let version = this.editList.version
        ? this.editList.version
        : this.policyVersion
        ? this.policyVersion
        : 1;
      let data = {
        version: version,
        effect: this.authorPeriod,
        action: JSON.stringify(service),
        resourcePrinciple: JSON.stringify(resource),
        policyId: this.policyid,
        id: this.rowId
      };

      if (this.isobjbull()) {
        addAuthParam(data, res => {
          if (res.data) {
            this.$message({
              type: "success",
              message: "添加成功"
            });
            return;
          }
          this.$message({
            type: "error",
            message: "添加失败"
          });
        });
      } else {
        data["policyId"] = this.editList.policyId;
        updateAuthParam(data, res => {
          if (res.data.data) {
            this.$message({
              type: "success",
              message: "修改成功"
            });
            this.$emit("update:isclose", true);
            return;
          }
          if (!res.data.data) {
            this.$message({
              type: "error",
              message: "修改失败"
            });
            return;
          }
        });
      }
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
  .deleteIcon {
    height: 38px;
    line-height: 38px;
    display: inline-block;
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
    padding-left: 5px;
  }
  .plus {
    cursor: pointer;
    font-weight: 600;
    &:hover {
      color: #37d1d3;
    }
  }
  .mb10 {
    margin-bottom: 16px;
    // .deleteIcon {
    //   height: 38px;
    //   line-height: 38px;
    //   display: inline-block;
    //   font-size: 14px;
    //   font-weight: 400;
    //   cursor: pointer;
    // }
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

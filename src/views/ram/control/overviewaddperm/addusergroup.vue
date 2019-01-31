<template>
  <div class="perm-setting">
    <el-form :rules="rule1">
      <el-form-item>
        <p>用户</p>
        <!-- <el-input placeholder="请选择" size="small" v-model="roleval"></el-input> -->
        <dropsearch :selData="selData"></dropsearch>
      </el-form-item>
      <el-form-item>
        <p>用户组</p>
        <div class="table-container">
          <el-row :gutter="15">
            <el-col :span="15">
              <el-row>
                <el-col :span="24">
                  <el-input v-model="registerval" size="small" @change="changeReg">
                    <div slot="suffix" class="suffix-search">
                      <i class="el-icon-search"></i>
                    </div>
                  </el-input>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <div class="perm-disp">
                <p>已选择（{{selectedPerm}}）</p>
                <p @click="clearPerm">
                  <a href="javascript:;">清除</a>
                </p>
              </div>
            </el-col>
          </el-row>
          <el-row class="mt10">
            <el-col class="perm-aside" :span="15">
              <el-scrollbar style="height:100%;">
                <el-row>
                  <el-col :span="9" class="perm-aside--header">名称</el-col>
                  <el-col :span="15" class="perm-aside--header">备注</el-col>
                </el-row>
                <template v-if="regdata.length > 0">
                  <el-row
                    v-for="(item,index) in showdata"
                    :key="index"
                    :class="item.sel?'perm-active':''"
                    @click.native="selToggle(item,index)"
                  >
                    <el-col
                      :span="9"
                      class="perm-aside--td"
                      :class="selectedPerm>=5&&!item.sel?'disabled':''"
                    >{{item.name}}</el-col>
                    <el-col
                      :span="15"
                      class="perm-aside--td"
                      :class="selectedPerm>=5&&!item.sel?'disabled':''"
                    >{{item.remark}}</el-col>
                  </el-row>
                </template>
                <template v-else>
                  <div style="color:#8c8c8c;text-align:center;">没有数据</div>
                </template>
              </el-scrollbar>
            </el-col>
            <el-col class="perm-aside" :span="8">
              <el-scrollbar style="height:100%;">
                <div class="perm-aside-right" v-for="(item,index) in regselList" :key="index">
                  <div>{{item.name}}</div>
                  <div @click="deleteItem(item,index)">X</div>
                </div>
              </el-scrollbar>
            </el-col>
          </el-row>
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="useroverlay-footer">
      <el-button type="plain" size="small" class="confirm" @click="adduser">确定</el-button>
      <el-button type="plain" size="small" @click="close">关闭</el-button>
    </div>
  </div>
</template>

<script>
import dropsearch from "@/page/user/dropsearch";
import { submitMethod } from "@/api/ram/user";
export default {
  name: "addusergroup",
  data() {
    return {
      roleval: "",
      selval: "系统权限策略",
      sels: ["系统权限策略", "自定义权限策略"],
      registerval: "",
      selectedPerm: 0,
      regdata: [],
      showdata: [],
      regselList: [],
      selectedIndex: [], //选中的索引
      ruls1: {}
    };
  },
  created() {
    // for (var i = 0; i < 100; i++) {
    //   this.regdata.push({
    //     name: `AdministratorAccess${i}`,
    //     remark: "管理所有阿里云资源的权限",
    //     sel: false,
    //     index: i
    //   });
    // }
  },
  mounted() {
    this.regdata = this.userData.map((item, index) => {
      item.sel = false;
      item.index = index;
      return item;
    });
    this.showdata = this.regdata;
  },
  props: ["isclose", "userData", "gid", "submitAddress", "selData"],
  components: {
    dropsearch
  },
  methods: {
    selToggle(item, index) {
      if (this.regselList.includes(item)) {
        this.selectedPerm--;
        // this.regdata[index].sel = false;
        this.showdata[index].sel = false;
        var pos = item.index;
        this.regselList = this.regselList.filter(item => {
          if (item.index != pos) {
            return item;
          }
        });
        this.selectedIndex = this.selectedIndex.filter(item => {
          if (item != pos) {
            return item;
          }
        });
        // this.selectedIndex.splice(index, 1);
      } else {
        if (this.selectedPerm >= 5 && item.sel == false) {
          return;
        }
        this.selectedPerm++;
        this.showdata[index].sel = true;
        this.regselList.push(item);
        this.selectedIndex.push(index);
      }
    },
    close() {
      this.$emit("update:isclose", true);
    },
    clearPerm() {
      this.regselList.map(item => {
        this.regdata[item.index].sel = false;
      });
      this.regselList = [];
      this.selectedIndex = [];
      this.selectedPerm = 0;
    },
    deleteItem(item, index) {
      // var pos = this.regselList.indexOf(item);
      var regdIndex = item.index;
      this.selectedPerm--;
      this.regdata[regdIndex].sel = false;

      this.regselList.splice(index, 1);
      this.selectedIndex.splice(index, 1);
    },
    changeReg(value) {
      let d = this.regdata;
      this.showdata = d.filter(item => {
        return item.name.indexOf(value) > -1;
      });
    },
    adduser() {
      let reg = this.regselList;
      if (reg.length <= 0) {
        this.$message({
          type: "error",
          message: "条件不足，请补充完整！",
          duration: 1500
        });
        return false;
      }

      let data = {
        url: "/ram" + this.submitAddress,
        method: "POST"
      };

      let query = [];
      reg.forEach(item => {
        query.push({
          groupId: this.gid,
          userId: item.userId
        });
      });
      submitMethod(data, query, res => {
        if (res.data == query.length) {
          this.$message({
            type: "success",
            message: "添加成功！",
            duration: 1500
          });
          this.$emit("update:isclose", true);
        } else {
          this.$message({
            type: "success",
            message: "添加失败！",
            duration: 1500
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.perm-setting {
  padding: 0px 24px;
  font-size: 12px;
  margin-top: 8px;
  .table-container {
    width: 100%;
    .suffix-search {
      height: 32px;
      line-height: 32px;
      width: 58px;
      border-left: 1px solid #aaa;
      position: relative;
      top: 4px;
      font-size: 18px;
      color: #595959;
      cursor: pointer;
    }
    .mt10 {
      margin-top: 8px;
    }
    .perm-aside {
      height: 438px;
      border: 1px solid #ccc;
      overflow-y: auto;
      box-sizing: border-box;
      .el-col {
        margin-bottom: 0px !important;
      }
      &:last-child {
        margin-left: 10px;
      }
      .perm-aside--header {
        padding-left: 15px;
        background: #f2f2f2;
        font-size: 12px;
        border-bottom: 1px solid #ccc;
        &:last-child {
          border-left: 1px solid #ccc;
        }
      }
      .perm-aside--td {
        padding-left: 15px;
        font-size: 12px;
        height: 40px;
        cursor: pointer;
        border-bottom: 1px solid #ccc;
        &:last-child {
          border-left: 1px solid #ccc;
        }
      }
      .perm-active {
        background: #f2fbfd;
      }

      .perm-aside-right {
        width: 225px;
        border: 1px solid #ccc;
        border-radius: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0 10px;
        margin: 14px auto;
        height: 28px;
        line-height: 28px;
        background: #ebecec;
        color: #595959;
        cursor: pointer;
        &:hover {
          background: #ffffff;
        }
      }
    }
  }
  .perm-disp {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    p {
      height: 40px;
      line-height: 40px;
      a {
        text-decoration: none;
        color: #0070cc;
      }
    }
  }
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

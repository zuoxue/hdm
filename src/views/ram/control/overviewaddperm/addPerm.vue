<template>
  <div class="perm-setting">
    <el-form>
      <el-form-item>
        <p>被授权主体</p>
        <!-- <el-input placeholder="请选择" size="small" v-model="roleval"></el-input> -->
        <dropsearch v-if="!isdropmulty" :selData="selData"></dropsearch>
        <drop-multy
          v-else
          :userList="userList"
          :groupList="groupList"
          :userval.sync="userval"
          :groupval.sync="groupval"
        ></drop-multy>
      </el-form-item>
      <el-form-item>
        <p>选择权限</p>
        <div class="table-container">
          <el-row :gutter="15">
            <el-col :span="15">
              <el-row>
                <el-col :span="6">
                  <el-select v-model="selval" size="small">
                    <el-option v-for="(val,index) in sels" :key="index" :label="val" :value="val"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="18">
                  <el-input v-model="registerval" size="small" @input="searchPolicy">
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
                  <el-col :span="9" class="perm-aside--header">权限策略名称</el-col>
                  <el-col :span="15" class="perm-aside--header">备注</el-col>
                </el-row>
                <template v-if="regdata.length > 0">
                  <el-row
                    v-for="(item,index) in regdata"
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
                    >{{item.comment}}</el-col>
                  </el-row>
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
      <el-button type="plain" size="small" class="confirm" @click="confirm">确定</el-button>
      <el-button type="plain" size="small" @click="close">关闭</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import dropsearch from "@/page/user/dropsearch";
import dropMulty from "@/page/user/dropMulty";
import { getAllUsergroupChild, getAllUserChild } from "@/api/ram/user";
import { getALlPolicys, inserUserOrGroupPolicy } from "@/api/ram/strategy";

export default {
  name: "addPerm",
  data() {
    return {
      roleval: "",
      selval: "权限策略名称",
      sels: ["权限策略名称", "备注"],
      registerval: "",
      selectedPerm: 0,
      regdata: [],
      regselList: [],
      selectedIndex: [], //选中的索引
      rule1: {},
      userList: [],
      groupList: [],
      userval: "",
      groupval: "",
      allpolicys: [],
      searchPolicy: ""
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
  props: {
    isclose: {
      type: Boolean
    },
    isdropmulty: {
      type: Boolean,
      default: false
    },
    selData: {
      type: String,
      default: ""
    },
    selType: {
      type: Number,
      default: 0
    },
    userunid: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters(["userId"])
  },
  components: {
    dropsearch,
    dropMulty
  },
  mounted() {
    if (this.isdropmulty) {
      this.initUserOrGroup();
    }
    this.getallpolicys();
  },
  methods: {
    initUserOrGroup() {
      let query = {
        ownerId: this.userId * 1
      };
      getAllUsergroupChild(query, res => {
        if (res.data.length > 0) {
          this.groupList = res.data;
        }
      });
      getAllUserChild(query, res => {
        if (res.data.length > 0) {
          this.userList = res.data;
        }
      });
    },
    //获取所有策略
    getallpolicys() {
      let query = {
        owner_id: this.userId
      };
      getALlPolicys({}, query, res => {
        if (res.data.code == 0) {
          this.allpolicys = res.data.data;
          this.regdata = res.data.data.map((item, index) => {
            item.sel = false;
            item.index = index;
            return item;
          });
        }
      });
    },
    selToggle(item, index) {
      if (this.regselList.includes(item)) {
        this.selectedPerm--;
        this.regdata[index].sel = false;
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
        this.regdata[index].sel = true;
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
    // 提交权限
    confirm() {
      let data = {};
      let url = "";
      if (this.isdropmulty) {
        data = {
          uglist: [],
          policyIds: []
        };
        url = "policy/inserUserOrGroupPolicy";
        if (this.groupval == "" && this.userval == "") {
          this.$message({
            type: "error",
            message: "请选中用户或用户组！"
          });
          return false;
        }
        if (this.groupval) {
          data.uglist.push({
            ifUserOrGroup: 1,
            userOrGroupId: this.groupval
          });
        }
        if (this.userval) {
          data.uglist.push({
            ifUserOrGroup: 0,
            userOrGroupId: this.userval
          });
        }
        data.policyIds = this.regselList.map(item => {
          return item.id;
        });
      } else {
        data = [];
        if (this.selType == 0) {
          url = "/policy/inserUser";
          this.regselList.map(item => {
            data.push({
              policyId: item.id,
              userId: this.userunid
            });
          });
        } else {
          url = "/policy/inserGroup";
          this.regselList.map(item => {
            data.push({
              policyId: item.id,
              groupId: this.userunid
            });
          });
        }
      }

      if (this.regselList.length == 0) {
        this.$message({
          type: "error",
          message: "请选择策略"
        });
        return false;
      }

      // 提交
      inserUserOrGroupPolicy(url, data, res => {
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "成功添加权限"
          });
          this.$emit("update:isclose", true);
        } else {
          this.$message({
            type: "error",
            message: "添加权限失败"
          });
        }
        return;
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
        margin-bottom: 0px;
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

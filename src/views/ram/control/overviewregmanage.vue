<template>
  <div class="usergroup">
    <header class="usergroup-header" v-if="!isadd && !isshow">
      <h3>{{recement}}</h3>
    </header>
    <article class="usergroup-article" v-if="!isadd && !isshow">
      <section class="usergroup-section--s">
        <transition name="fade">
          <section class="usergroup-section--info" v-if="topisshow">
            {{info}}
            <div class="overview-close" @click="closeInfo">x</div>
          </section>
        </transition>
        <el-button
          type="primary"
          size="mini"
          class="usergroup-section--s-btn"
          @click="showoverlay"
        >新建权限策略</el-button>
        <div class="usergroup-section--s-input">
          <el-input v-model="input" placeholder="输入策略名或备注" @input="handleIconClick">
            <i class="el-icon-search" slot="suffix" @click="handleIconClick"></i>
          </el-input>
        </div>
        <div class="usergroup-section--s-select">
          <span>策略类型：</span>
          <el-select v-model="selection" placeholder="全部">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </section>

      <section>
        <el-table :data="selData" style="width:100%;">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            v-for="(col,index) in columns"
            :key="index"
            :prop="col.val"
            :label="col.label"
          ></el-table-column>
          <el-table-column label="启用">
            <template slot-scope="scope">
              <el-switch
                v-model="allstatus[scope.row.index]"
                @change="changeStatus($event,scope.row.id)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="showAuth($event,scope.row)">授权语句</el-button>
              <el-button type="primary" size="mini" @click="deleteAuth(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pager" v-if="selPageAll>pagesizeSel">
          <el-pagination
            layout="prev, pager, next,total"
            :total="selPageAll"
            :page-size="pagesizeSel"
            :current-page="currentPageSel"
            @current-change="changeSelPage"
          ></el-pagination>
        </div>
      </section>
    </article>

    <!-- 新建策略 -->
    <createNewAuth v-if="isadd" :isadd.sync="isadd" @updateAuth="getallpolicys"></createNewAuth>
    <authstate v-if="isshow" :isshow.sync="isshow" :row="rowdata"></authstate>
  </div>
</template>

<script>
import createNewAuth from "./overviewaddperm/createNewAuth";
import authstate from "./overviewaddperm/authstate";

import {
  getVersion,
  getAllAuth,
  createRamPolicy,
  getALlPolicys,
  modifyPolicyStatus,
  getSingleStrategy,
  deletePolicy
} from "@/api/ram/strategy";
import { mapGetters } from "vuex";

export default {
  name: "overviewregmanage",
  props: ["recement"],
  data() {
    return {
      info:
        "通过用户组对职责相同的RAM用户进行分类并授权，可以更加高效地管理用户及其权限。对一个用户组进行授权后，用户组内的所有用户会自动继承该用户组的权限。如果一个用户被加入到多个用户组，那么该用户将会继承多个用户组的权限。",
      selection: "",
      input: "",
      options: [
        {
          value: "全部",
          label: "全部",
          index: 1
        },
        {
          value: "系统策略",
          label: "系统策略",
          index: 2
        },
        {
          value: "自定义策略",
          label: "自定义策略",
          index: 3
        }
      ],
      columns: [
        {
          label: "权限策略名称",
          val: "name"
        },
        {
          label: "备注",
          val: "comment"
        },
        {
          label: "策略类型",
          val: "type"
        }
        // {
        //   label: "被引用次数",
        //   val: "cite"
        // },
        // {
        //   label: "操作",
        //   val: "handle"
        // }
      ],

      authordata: [],
      allData: [],
      data: [],
      selData: [],
      tempData: [],
      selPageAll: 0,
      currentPageSel: 1,
      pagesizeSel: 7,

      isclose: true,
      isadd: false,
      adduser: 1,
      topisshow: true,
      subdata: [
        {
          loginname: "",
          dispname: ""
        }
      ],
      controlpass: "",
      resetpass: "",
      multifactors: "",
      checklist: [],

      assettype: "",

      isinsert: false,
      allstatus: [],
      expandsList: [],
      isshow: false,
      rowdata: null
    };
  },
  components: {
    createNewAuth,
    authstate
  },

  mounted() {
    const t = localStorage.getItem("triggerComp") || null;
    if (t && t == "overviewregmanage") {
      this.isadd = true;
    }
    // var vm = this;
    // localStorage.removeItem("triggerComp");
    this.getallpolicys();
  },
  methods: {
    // 获取所有策略
    getallpolicys() {
      let query = {
        owner_id: this.userId
      };
      this.allstatus = [];
      getALlPolicys({}, query, res => {
        let vm = this;
        this.data = res.data.data.map(function(item, index) {
          if (item.type == 0) {
            item.type = "系统策略";
          } else {
            item.type = "自定义策略";
          }
          item["index"] = index;
          vm.allstatus.push(item.status == 1 ? true : false); //修改switch状态
          return item;
        });
        this.tempData = this.data;
        this.selData = this.tempData.slice(0, this.pagesizeSel);
        this.selPageAll = this.tempData.length;
      });
    },
    //策略搜索
    handleIconClick() {
      this.tempData = this.data.filter(item => {
        if (
          item.name.indexOf(this.input) != -1 ||
          item.comment.indexOf(this.input) != -1
        ) {
          return item;
        }
      });
      this.selData = this.tempData.slice(0, this.pagesizeSel);
      this.selPageAll = this.tempData.length;
      this.currentPageSel = 1;
      return;
    },
    showoverlay() {
      // this.getallauth();
      this.isadd = true;
    },
    //获取所有权限语句
    getallauth() {
      getAllAuth({}, res => {
        let data = res.data;
        let start = 0;
        let end = start + this.pagesize;
        this.allData = [];
        if (data) {
          let maxVersion = Math.max.apply(
            null,
            data.map(function(item) {
              return item.version * 1;
            })
          );
          data.forEach(item => {
            this.allData.push({
              policyId: item.policyId,
              validty: item.effect == 0 ? "允许" : "拒绝",
              service: JSON.parse(item.action).join("、"),
              resource: JSON.parse(item.resourcePrinciple).join("、"),
              version: item.version,
              handle: item.version == maxVersion ? true : false
            });
          });

          this.authordata = this.allData.slice(start, end);
          this.totalsize = this.allData.length;
          this.currentPage = 1;
        }
      });
    },
    // back last level
    // back() {
    //   this.isadd = false;
    // },
    // autodel
    autodel(index) {
      this.subdata.splice(index, 1);
      this.adduser--;
    },
    autoadd() {
      this.subdata.push({
        loginname: "",
        dispname: ""
      });
      this.adduser++;
    },
    closeInfo() {
      this.topisshow = false;
    },

    // 新建策略语句，判断版本号未使用过
    async showAuth(ev, row) {
      this.isshow = true;
      this.rowdata = row;
      // let v = this.version;
      // let vs = [];
      // let reg = /^\d+$/;
      // if (v == "" || !reg.test(v)) {
      //   this.$message({
      //     type: "error",
      //     message: "请正确填写版本号！",
      //     duration: 1500
      //   });
      //   this.$refs.version.focus();
      //   return;
      // }
      // await getVersion({}, res => {
      //   if (res.data && res.data.length > 0) {
      //     var data = new Promise(resolve => {
      //       vs = res.data;
      //       resolve(res.data);
      //     });
      //   }
      // });
      // if (vs.indexOf(v) > -1) {
      //   this.$message({
      //     type: "error",
      //     message: "版本号已存在",
      //     duration: 1500
      //   });
      //   this.$refs.version.focus();
      //   return;
      // }
    },

    // 删除策略
    deleteAuth(row) {
      let data = {
        id: row.id
      };
      deletePolicy(data, res => {
        if (res.data.data) {
          this.$message({
            type: "success",
            message: "删除成功"
          });
          this.getallpolicys();
        } else {
          this.$message({
            type: "error",
            message: "删除失败"
          });
        }
      });
    },
    //改变策略启用状态
    changeStatus(ev, id) {
      // let data = {
      //   id: JSON.stringify(id),
      //   status: ev ? "1" : "0"
      // };
      // modifyPolicyStatus(data, res => {
      //   if (res.data.data) {
      //     this.$message({
      //       type: ev == 1 ? "success" : "info",
      //       message: ev == 1 ? "已启用" : "已禁用"
      //     });
      //   }
      // });

      let data = {
        id: id,
        status: ev ? "1" : "0"
      };
      modifyPolicyStatus(data, res => {
        if (res.data.data) {
          this.$message({
            type: ev == 1 ? "success" : "info",
            message: ev == 1 ? "已启用" : "已禁用"
          });
        }
      });
    },

    // 策略分页
    changeSelPage(page) {
      let start = (page - 1) * this.pagesizeSel;
      let end = page * this.pagesizeSel;
      this.currentPageSel = page;
      this.selData = this.tempData.slice(start, end);
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
.usergroup {
  text-align: left;
  .el-checkbox {
    /deep/ .el-checkbox__inner {
      border-color: #ccc !important;
    }
  }
  .el-radio {
    /deep/ .el-radio__inner {
      border-color: #ccc !important;
    }
  }

  .usergroup-header {
    height: 40px;
    line-height: 40px;
    margin-bottom: 16px;
    h3 {
      font-size: 28px;
    }
  }
  .usergroup-article {
    margin-bottom: 10px;
    .usergroup-section--info {
      background: #fafafa;
      border: 1px solid #e5e5e5;
      padding: 16px;
      margin-bottom: 16px;
      font-size: 12px;
      position: relative;
    }
    .usergroup-section--s {
      margin-bottom: 10px;
      .usergroup-section--s-btn {
        height: 38px;
        vertical-align: top;
      }
      .usergroup-section--s-select {
        display: inline-block;
        margin-left: 16px;
        .el-select {
          width: auto !important;
        }
      }
      .usergroup-section--s-input {
        display: inline-block;
        margin-left: 10px;
        /deep/ .el-input__suffix {
          width: 30px;
          line-height: 38px;
          border-left: 1px solid #ccc;
          cursor: pointer;
        }
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
  .el-table {
    /deep/ .el-button {
      margin-left: 5px;
      margin-top: 5px;
      width: 82px;
    }
  }
}
</style>

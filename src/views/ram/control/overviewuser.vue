<template>
  <div class="usergroup">
    <header class="usergroup-header">
      <h3>
        <i class="el-icon-back back-cursor" v-if="isadd" @click="back"></i>
        {{isadd?"新建用户":recement}}
      </h3>
    </header>
    <article class="usergroup-article">
      <transition name="fade">
        <section class="usergroup-section--info" v-if="topisshow">
          {{info}}
          <div class="overview-close" @click="closeInfo">x</div>
        </section>
      </transition>
      <section class="usergroup-section--s" v-if="!isadd">
        <el-button
          type="primary"
          size="mini"
          class="usergroup-section--s-btn"
          @click="showoverlay"
        >新建用户</el-button>
        <div class="usergroup-section--s-select">
          <el-select v-model="selection" placeholder="用户登陆名称">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="usergroup-section--s-input">
          <el-input v-model="input" @input.native="handleIconClick">
            <i class="el-icon-search" slot="suffix" @click="handleIconClick"></i>
          </el-input>
        </div>
      </section>
      <section v-if="!isadd">
        <el-table :data="tableData" style="width:100%;">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            v-for="(col,index) in columns"
            :key="index"
            :prop="col.val"
            :label="col.label"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="addusergroup(scope.row)">添加到用户组</el-button>
              <el-button type="text" @click="addPerm(scope.row)">添加权限</el-button>
              <el-button type="text" @click="modifyPassword(scope.row)">修改密码</el-button>
              <el-button type="text" @click="deleteuser(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="alignright mt10" v-if="data.length>0">
          <el-pagination
            layout="total,prev,pager,next,jumper"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            :total="totalNums"
          ></el-pagination>
        </div>
      </section>
      <div v-if="isadd">
        <section class="overviewuser-new">
          <p>
            <span>*</span>用户账户信息
          </p>
          <el-row>
            <el-col :span="13">
              <p>
                <span class="star">*</span>登录名称
              </p>
            </el-col>
            <el-col :span="10">
              <p>
                <span class="star">*</span>显示名称
              </p>
            </el-col>
          </el-row>
          <el-row v-for="(item,index) in newLenArray" :key="index" class="mb10">
            <el-col :span="13">
              <el-input v-model="subdata[index].loginname" placeholder class="el-input--addwrapper">
                <!-- <span slot="suffix">@123456213151121551.onali.com</span> -->
              </el-input>
            </el-col>
            <el-col :span="10">
              <el-input v-model="subdata[index].dispname" placeholder></el-input>
            </el-col>
            <el-col :span="1" v-if="index>0" class="el-icon-plus--wrapper">
              <div @click="autodel(index)">
                <i class="el-icon-close"></i>
              </div>
            </el-col>
          </el-row>
          <!-- <div>
            <el-button icon="el-icon-plus" type="text" @click="autoadd">添加用户</el-button>
          </div>-->
        </section>
        <!-- <section>
          <p>访问方式</p>
          <div>
            <div>
              <el-checkbox-group v-model="checklist">
                <div>
                  <el-checkbox label="控制台密码登录"></el-checkbox>
                </div>
                <div>
                  <el-checkbox label="编程访问"></el-checkbox>
                </div>
              </el-checkbox-group>
            </div>
            <div v-show="checklist.includes('控制台密码登录')">
              <div>
                <p>控制台密码</p>
                <div>
                  <el-radio v-model="controlpass" :label="1">自动生成默认密码</el-radio>
                </div>
                <div>
                  <el-radio v-model="controlpass" :label="2">自定义登录密码</el-radio>
                </div>
              </div>
              <div>
                <p>要求重置密码</p>
                <div>
                  <el-radio v-model="resetpass" :label="1">用户在下次登录时必须重置密码</el-radio>
                </div>
                <div>
                  <el-radio v-model="resetpass" :label="2">无需重置</el-radio>
                </div>
              </div>
              <div>
                <p>多因素认证</p>
                <div>
                  <el-radio v-model="multifactors" :label="1">要求开启MFA认证</el-radio>
                </div>
                <div>
                  <el-radio v-model="multifactors" :label="2">不要求</el-radio>
                </div>
              </div>
            </div>
          </div>
        </section>-->
        <section class="footer">
          <el-button type="primary" @click="createUser">确认</el-button>
          <el-button @click="back">取消</el-button>
        </section>
      </div>
    </article>
    <!-- overlay -->
    <useroverlay :title="overlayTitle" :isclose.sync="isaddperm" :width="width">
      <el-scrollbar slot="body" class="popaside">
        <div>
          <add-perm :isclose.sync="isaddperm"></add-perm>
        </div>
      </el-scrollbar>
    </useroverlay>

    <!-- overlay -->
    <useroverlay :title="overlayTitle" :isclose.sync="isaddusergroup" :width="width">
      <el-scrollbar slot="body" class="popaside">
        <div>
          <addusergroup
            :isclose.sync="isaddusergroup"
            :userData="userdata"
            :gid="seluserId"
            :submitAddress="submitAddress"
            :selData="selData"
            type="user"
            :infos="infos"
          ></addusergroup>
        </div>
      </el-scrollbar>
    </useroverlay>

    <!-- 修改密码  -->
    <useroverlay :title="overlayTitle" :isclose.sync="ismodifypass" :width="width">
      <div slot="body">
        <modifyPass :isclose.sync="ismodifypass" :userId="userIdunique"/>
      </div>
    </useroverlay>
  </div>
</template>

<script>
import useroverlay from "@/page/user/useroverlay";
import addPerm from "./overviewaddperm/addPerm";
import addusergroup from "./overviewaddperm/addusergroup";
import modifyPass from "./overviewusermanage/modifyPass";

import {
  createUserChild,
  getAllUserChild,
  deleteUserChild,
  getAllUsergroupChild,
  getUsergroupByUser
} from "@/api/ram/user";
import { mapGetters } from "vuex";

export default {
  name: "overviewuser",
  props: ["recement"],
  data() {
    return {
      info:
        "通过用户组对职责相同的RAM用户进行分类并授权，可以更加高效地管理用户及其权限。对一个用户组进行授权后，用户组内的所有用户会自动继承该用户组的权限。如果一个用户被加入到多个用户组，那么该用户将会继承多个用户组的权限。",
      selection: "",
      input: "",
      options: [
        {
          value: "用户登陆名称",
          label: "用户登陆名称",
          index: 1
        }
        // {
        //   value: "AccessKeyID",
        //   label: "AccessKeyID",
        //   index: 2
        // }
      ],
      columns: [
        {
          label: "用户名称",
          val: "name"
        },
        {
          label: "显示名称",
          val: "dispname"
        },
        {
          label: "创建时间",
          val: "createtime"
        }
      ],
      data: [],
      tableData: [],
      isclose: true,
      topisshow: true,
      isadd: false,
      adduser: 1,
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
      isaddperm: true,
      isaddusergroup: true,
      width: "880px",
      overlayTitle: "添加权限",
      currentPage: 1,
      pageSize: 10,
      totalNums: 0,
      usergroupdata: [],
      seluserId: "",
      userIdunique: "",
      selData: [],
      userdata: [],
      submitAddress: "/groupUser/saveGroupUserList",
      infos: {
        title: "用户",
        header: "用户组"
      },
      ismodifypass: true
    };
  },
  created() {
    document.addEventListener("keyup", ev => {
      ev.preventDefault();
      if (ev.keyCode == 27) {
        this.isaddperm = true;
        this.isaddusergroup = true;
      }
      return;
    });
  },
  mounted() {
    const t = localStorage.getItem("triggerComp") || null;

    if (t && t == "overviewuser") {
      this.isadd = true;
    }
    localStorage.removeItem("triggerComp");
    this.getAllTableData();
  },
  methods: {
    getAllTableData() {
      const data = {
        ownerId: this.userId
      };
      this.data = [];
      getAllUserChild(data, res => {
        let d = res.data;
        d.forEach(item => {
          this.data.push({
            name: item.username,
            dispname: item.displayname ? item.displayname : "",
            createtime: item.createTime.split(" ")[0],
            userId: item.userId
          });
        });
        this.tableData = this.data.slice(0, this.pageSize);
        this.totalNums = this.data.length;
      });
    },
    handleIconClick() {
      let s = this.input;
      this.tableData = this.data.filter(item => {
        return item.name.indexOf(s) > -1 || item.dispname.indexOf(s) > -1;
      });
      this.totalNums = this.tableData.length;
      return;
    },
    showoverlay() {
      this.isadd = true;
    },
    // back last level
    back() {
      this.getAllTableData();
      this.isadd = false;
    },
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
    addPerm(row) {
      this.isaddperm = false;
      this.overlayTitle = "添加权限";
    },
    addusergroup(row) {
      this.overlayTitle = "添加到用户组";

      const data = {
        ownerId: this.userId
      };
      this.seluserId = row.userId;
      this.userdata = [];
      getAllUsergroupChild(data, res => {
        let d = res.data;
        let acessData = [];
        getUsergroupByUser(
          {
            ownerId: row.userId
          },
          cb => {
            let exists = cb.data.map(item => {
              return item.groupId;
            });
            d = d.filter(item => {
              return !exists.includes(item.groupId);
            });
            d.forEach(item => {
              acessData.push({
                name: item.groupName,
                dispname: item.displayname ? item.displayname : "",
                userId: item.groupId
              });
            });
            this.userdata = acessData;
            this.selData = row.name;
            this.isaddusergroup = false;
          }
        );

        //
      });
    },
    createUser() {
      if (!this.subdata[0].loginname || !this.subdata[0].dispname) {
        this.$message({
          type: "error",
          message: "创建用户失败！",
          duration: 1500
        });
        return;
      }
      const data = {
        access_token: this.access_token,
        ownerId: this.userId,
        username: this.subdata[0].loginname,
        displayname: this.subdata[0].dispname,
        flag: 0
      };

      createUserChild(data, res => {
        if (res.data == 1) {
          this.$message({
            type: "success",
            message: "创建用户成功！",
            duration: 1500
          });
        }
        this.subdata[0].loginname = "";
        this.subdata[0].dispname = "";
        if (res.data != 1) {
          this.$message({
            type: "error",
            message: "创建用户失败！",
            duration: 1500
          });
        }
      });
    },
    handleCurrentChange(page) {
      let start = (page - 1) * this.pageSize;
      let end = page * this.pageSize;
      this.tableData = this.data.slice(start, end);
    },
    deleteuser(row) {
      let d = {
        userId: row.userId
      };
      let query = {
        data: {}
      };
      deleteUserChild(d, query, res => {
        this.getAllTableData();
      });
    },
    modifyPassword(row) {
      this.overlayTitle = "修改密码";
      this.width = "400px";
      this.ismodifypass = false;
      this.userIdunique = row.userId;
      return;
    }
  },
  components: {
    addPerm,
    useroverlay,
    addusergroup,
    modifyPass
  },
  computed: {
    ...mapGetters(["access_token", "userId"]),
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
    .back-cursor {
      cursor: pointer;
    }
  }
  .usergroup-article {
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
        width: 200px;
        display: inline-block;
        margin-left: 16px;
      }
      .usergroup-section--s-input {
        display: inline-block;
        /deep/ .el-input__suffix {
          width: 30px;
          line-height: 38px;
          border-left: 1px solid #ccc;
          cursor: pointer;
        }
      }
    }
    .overviewuser-new {
      width: 600px;
      .el-input--addwrapper {
        /deep/ .el-input__suffix-inner {
          height: 40px;
          line-height: 40px;
        }
      }
      .mb10 {
        margin-bottom: 10px;
        .el-icon-plus--wrapper {
          height: 40px;
          line-height: 40px;
          font-weight: bolder;
        }
      }
    }
    .footer {
      margin-top: 10px;
    }
    .star {
      color: #f15533;
      margin-right: 4px;
    }
  }
}
</style>

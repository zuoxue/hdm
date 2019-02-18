<template>
  <div class="usergroup">
    <header class="usergroup-header">
      <h3>{{recement}}</h3>
    </header>
    <article class="usergroup-article">
      <section class="usergroup-section--s">
        <el-button
          type="primary"
          size="mini"
          class="usergroup-section--s-btn"
          @click="showoverlay"
        >新增授权</el-button>
        <div class="usergroup-section--s-select">
          <el-select v-model="selection" placeholder="被授权主体">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="usergroup-section--s-input">
          <el-input v-model="input" @input="searchPolicys">
            <i class="el-icon-search" slot="suffix" @click="searchPolicys"></i>
          </el-input>
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
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="editPolicy(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
      <section class="footer alignright">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pagesize"
          layout="prev, pager, next, total"
          :total="totalsize"
        ></el-pagination>
      </section>
    </article>

    <!-- overlay -->
    <useroverlay :title="overlayTitle" :isclose.sync="isclose" :width="width">
      <el-scrollbar slot="body" class="popaside">
        <div>
          <add-perm
            :isclose.sync="isclose"
            :isdropmulty="isdropmulty"
            :selData="selName"
            :selType="selType"
            :userunid="userunid"
          ></add-perm>
        </div>
      </el-scrollbar>
    </useroverlay>
  </div>
</template>

<script>
import useroverlay from "@/page/user/useroverlay";
import addPerm from "./overviewaddperm/addPerm";
import { getPolicyGroupAndUser } from "@/api/ram/strategy";
import { mapGetters } from "vuex";

export default {
  name: "overviewaddperm",
  props: ["recement"],
  data() {
    var checkgroup = function(rule, value, callback) {
      if (value === "") {
        callback(new Error("不能为空"));
      }
      callback();
    };
    var checkdispname = function(rule, value, callback) {
      if (value === "") {
        callback(new Error("不能为空"));
      }
      callback();
    };
    return {
      info:
        "通过用户组对职责相同的RAM用户进行分类并授权，可以更加高效地管理用户及其权限。对一个用户组进行授权后，用户组内的所有用户会自动继承该用户组的权限。如果一个用户被加入到多个用户组，那么该用户将会继承多个用户组的权限。",
      selection: "1",
      input: "",
      options: [
        {
          value: "1",
          label: "被授权主体",
          index: 1
        },
        {
          value: "2",
          label: "策略名称",
          index: 2
        }
      ],
      columns: [
        {
          label: "用户类型",
          val: "ifUserOrGroup"
        },
        {
          label: "被授权主体",
          val: "userName"
        },
        {
          label: "权限策略名称",
          val: "name"
        },
        {
          label: "权限策略类型",
          val: "type"
        },
        {
          label: "备注",
          val: "comments"
        }
      ],
      data: [],
      selData: [],
      tempData: [],
      width: "880px",
      overlayTitle: "添加权限",
      isclose: true,
      rules: {
        usergroupname: "",
        dispname: "",
        remark: ""
      },
      rule1: {
        usergroupname: [
          { validator: checkgroup, required: true, trigger: ["blur", "change"] }
        ],
        dispname: [
          {
            validator: checkdispname,
            required: true,
            trigger: ["blur", "change"]
          }
        ]
      },
      currentPage: 1,
      pagesize: 7,
      totalsize: 0,
      isdropmulty: false,
      selName: "",
      selType: "",
      userunid: ""
    };
  },
  created() {
    document.addEventListener(
      "keyup",
      ev => {
        ev.preventDefault();
        if (ev.keyCode == 27) {
          this.isclose = true;
        }
        return;
      },
      true
    );
  },
  mounted() {
    this.initPolicy();
  },
  methods: {
    // 初始化数据
    initPolicy() {
      let query = {
        user_id: this.userId
      };
      getPolicyGroupAndUser({}, query, res => {
        this.data = res.data.data.map(item => {
          if (item.ifUserOrGroup) {
            item.ifUserOrGroup = "用户组";
          } else {
            item.ifUserOrGroup = "子用户";
          }
          if (item.type) {
            item.type = "系统策略";
          } else {
            item.type = "自定义策略";
          }
          return item;
        });
        this.tempData = this.data;
        this.selData = this.tempData.slice(0, this.pagesize);
        this.totalsize = this.tempData.length;
      });
    },
    //搜索策略
    searchPolicys() {
      let search = this.selection == 1 ? "userName" : "name";
      let inp = this.input.toLowerCase().trim();
      this.tempData = this.data.filter(item => {
        let s = item[search].toLowerCase().trim();
        return s.indexOf(inp) >= 0;
      });
      this.selData = this.tempData.slice(0, this.pagesize);
      this.totalsize = this.tempData.length;
    },
    showoverlay() {
      this.isdropmulty = true;
      this.isclose = false;
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      let start = (page - 1) * this.pagesize;
      let end = start + this.pagesize;
      this.selData = this.tempData.slice(start, end);
    },
    editPolicy(row) {
      this.isdropmulty = false;
      this.isclose = false;
      this.selName = row.userName;
      this.selType = row.ifUserOrGroup == "子用户" ? 0 : 1;
      this.userunid = row.userId * 1;
    }
  },

  components: {
    useroverlay,
    addPerm
  },
  computed: {
    ...mapGetters(["userId"])
  },
  watch: {
    isclose() {
      this.initPolicy();
    }
  }
};
</script>

<style lang="scss" scoped>
.usergroup {
  .usergroup-header {
    height: 40px;
    line-height: 40px;
    margin-bottom: 16px;
    h3 {
      font-size: 28px;
    }
  }
  .usergroup-article {
    .usergroup-section--info {
      background: #fafafa;
      border: 1px solid #e5e5e5;
      padding: 16px;
      margin-bottom: 16px;
      font-size: 12px;
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
  }
}
</style>

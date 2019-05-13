<template>
  <div>
    <header class="usergroup-header">
      <h3>
        <i class="el-icon-back back-cursor" @click="back"></i>
        授权详情
      </h3>
    </header>
    <hr>
    <section>
      <el-button size="mini" type="primary" @click="createAuth">新增授权语句</el-button>
    </section>
    <section>
      <el-table :data="authordata" size="mini">
        <el-table-column
          v-for="item in authorheader"
          :key="item.index"
          :prop="item.prop"
          :label="item.name"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope" v-if="scope.row.handle">
            <el-button type="text" size="small" @click="getRowData(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteRowData(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <section class="pager" v-if="totalsize>pagesize">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pagesize"
          layout="prev, pager, next, total"
          :total="totalsize"
        ></el-pagination>
      </section>
    </section>

    <!-- overlay -->
    <useroverlay :title="overlayTitle" :isclose.sync="showside" :width="width">
      <el-scrollbar slot="body" class="popaside">
        <div>
          <author-module
            :isclose.sync="showside"
            :editList="editList"
            :policyid="row.id"
            :rowId="rowId"
          ></author-module>
        </div>
      </el-scrollbar>
    </useroverlay>
  </div>
</template>

<script>
import useroverlay from "@/page/user/useroverlay";
import authorModule from "./authorModule";
import { mapGetters } from "vuex";
import {
  getVersion,
  getAllAuth,
  createRamPolicy,
  getALlPolicys,
  modifyPolicyStatus,
  getSingleStrategy,
  deletestrategy
} from "@/api/ram/strategy";
export default {
  name: "authstate",
  data() {
    return {
      showside: true,
      editList: {},
      overlayTitle: "添加授权语句",
      width: "620px",
      authordata: [],
      allData: [],
      // version: "",
      currentPage: 1,
      pagesize: 7,
      totalsize: 0,
      rowId: 0,
      authorheader: [
        {
          name: "权限效力",
          index: 0,
          prop: "validty"
        },
        {
          name: "产品/服务",
          index: 1,
          prop: "service"
        },
        {
          name: "资源",
          index: 2,
          prop: "resource"
        },
        {
          name: "版本",
          index: 3,
          prop: "version"
        }
        // {
        //   name: "操作",
        //   index: 4,
        //   prop: "handle"
        // }
      ]
    };
  },
  props: ["row"],
  watch: {
    showside(newvalue) {
      if (newvalue) {
        this.getauth(this.row);
      }
    }
  },
  mounted() {
    this.getauth(this.row);
  },
  methods: {
    // 获取策略
    getauth(row) {
      let data1 = {
        id: row.id
      };
      this.allData = [];
      this.authordata = [];
      this.totalsize = 0;
      getSingleStrategy(data1, res => {
        if (res.data.code == 0 && res.data.data.length > 0) {
          let data = res.data.data;
          let start = 0;
          let end = start + this.pagesize;
          // this.allData = [];
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
                handle: item.version == maxVersion ? true : false,
                strategyId: item.id
              });
            });

            this.authordata = this.allData.slice(start, end);
            this.totalsize = this.allData.length;
            this.currentPage = 1;
          }
        }
      });
    },
    // 删除策略语句
    deleteRowData(row) {
      let data = {
        id: row.strategyId
      };
      deletestrategy(data, res => {
        if (res.data.data) {
          this.$message({
            type: "success",
            message: "删除成功"
          });
          this.getauth(this.row);
        } else {
          this.$message({
            type: "error",
            message: "删除失败"
          });
        }
      });
    },
    // 策略语句进入编辑页
    getRowData(row) {
      this.editList = row;
      this.showside = false;
      this.rowId = row.strategyId;
    },
    // 策略语句分页变化
    handleCurrentChange(page) {
      this.currentPage = page;
      let start = (page - 1) * this.pagesize;
      let end = start + this.pagesize;
      this.authordata = this.allData.slice(start, end);
    },
    // 返回上一页
    back() {
      this.$emit("update:isshow", false);
      // this.$emit("updateAuth");
    },
    createAuth() {
      this.editList = {
        handle: false,
        resource: "",
        service: "",
        validty: "",
        version: ""
      }; //去除编辑状态
      this.showside = false;
    }
  },
  computed: {
    ...mapGetters(["userId", "userInfo"]),
    newLenArray() {
      var arr = new Array(this.adduser);
      return arr;
    }
  },
  created() {
    document.addEventListener(
      "keyup",
      ev => {
        ev.preventDefault();
        if (ev.keyCode == 27) {
          this.showside = true;
        }
        return;
      },
      true
    );
  },
  components: {
    authorModule,
    useroverlay
  }
};
</script>

<style scoped lang="scss">
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
</style>

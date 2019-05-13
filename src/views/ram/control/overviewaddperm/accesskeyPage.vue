<template>
  <div class="usergroup">
    <header class="usergroup-header">
      <h3>
        <i class="el-icon-back back-cursor" @click="back"></i>
        accesskey管理
      </h3>
    </header>
    <article>
      <el-form label-width="50px">
        <el-form-item label="搜索:">
          <el-input
            placeholder="口令id"
            v-model="search"
            size="small"
            style="width:300px;text-align:left"
          >
            <!-- <template slot="append">
              <div @click="searchData">
                <i class="el-icon-search"></i>
              </div>
            </template>-->
          </el-input>
          <el-button type="primary" size="small" @click="searchData" style="margin-left:18px;">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" style="width:100%;">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          v-for="(col,index) in columns"
          :key="index"
          :prop="col.val"
          :label="col.label"
        ></el-table-column>
        <el-table-column :label="type=='manage'?'启用':'授权'">
          <template slot-scope="scope">
            <el-switch
              v-if="type=='manage'"
              v-model="authList[scope.$index]"
              active-color="#13ce66"
              @change="changeAuth(scope.row,scope.$index)"
            ></el-switch>
            <el-switch
              v-if="type=='district'"
              v-model="authList[scope.$index]"
              active-color="#13ce66"
              @change="changeAuth(scope.row,scope.$index)"
            ></el-switch>
          </template>
        </el-table-column>
      </el-table>
      <section class="footer alignright">
        <el-pagination
          @current-change="handleCurrentChange"
          @size-change="changePagesize"
          :current-page="currentPage"
          :page-size="pagesize"
          layout="total,prev, pager, next,sizes"
          :total="totalsize"
        ></el-pagination>
      </section>
    </article>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  getAllAccesskey,
  updateAccesskey,
  getAllDistrictAccesskey,
  createAccesskeyHandler
} from "@/api/ram/user";
export default {
  name: "accesskeyPage",
  props: ["type", "childUserId"],
  data() {
    return {
      tableData: [],
      columns: [
        {
          label: "口令id",
          val: "access_key_id"
        },
        {
          label: "创建时间",
          val: "create_time"
        },
        {
          label: "结束时间",
          val: "end_time"
        },
        {
          label: "口令描述",
          val: "description"
        }
      ],
      authList: [],
      currentPage: 1,
      pagesize: 10,
      totalsize: 0,
      search: ""
    };
  },
  computed: {
    ...mapGetters(["userId"])
  },
  mounted() {
    this.initData(1);
  },
  methods: {
    initData(page, id = "", nums = 10) {
      let data = {
        userId: this.userId,
        current: page,
        size: nums,
        accessKeyId: id
      };
      let usemethod = null;
      if (this.type == "manage") {
        usemethod = getAllAccesskey;
      } else {
        data.userId = this.childUserId;
        usemethod = getAllDistrictAccesskey;
      }
      usemethod(data, res => {
        if (res.data.code == 0) {
          this.tableData = res.data.data.list;
          this.currentPage = res.data.data.pageNum;
          this.pagesize = res.data.data.pageSize;
          this.totalsize = res.data.data.total;

          this.authList = res.data.data.list.map(item => {
            let result = true;
            if (this.type == "manage") {
              result = item.status == 0 ? true : false;
            } else {
              result = item.distribution == 0 ? false : true;
            }
            return result;
          });
        } else {
          this.$message({
            type: "error",
            message: "数据获取失败"
          });
        }
      });
    },
    back() {
      this.$emit("update:accesskeyshow", false);
    },
    changeAuth(row, index) {
      console.log(row);
      let data = {};
      let usemethod = null;
      if (this.type == "manage") {
        data = {
          accessKeyId: row.access_key_id,
          status: this.authList[index] ? "0" : "1"
        };
        usemethod = updateAccesskey;
      } else {
        data = {
          userId: this.childUserId,
          accessKeySecret: row.access_key_secret,
          endData: row.end_time,
          status: this.authList[index] ? "1" : "0"
        };
        if (data.status == "0") {
        }
        usemethod = createAccesskeyHandler;
      }
      usemethod(data, res => {
        if (res.data.msg == "success") {
          if (data.status == "0") {
            let message = this.type == "manage" ? "已启用" : "已取消授权";
            let type = this.type == "manage" ? "success" : "error";
            this.$message({
              type: type,
              message: message
            });
          } else {
            let message = this.type == "manage" ? "已禁用" : "已授权";
            let type = this.type == "manage" ? "error" : "success";
            this.$message({
              type: type,
              message: message
            });
          }
          return;
        }
        this.$message({
          type: "error",
          message: "设置失败"
        });
      });
    },
    // 切换页面
    handleCurrentChange(page) {
      this.initData(page, "", this.pagesize);
    },

    // 修改页大小
    changePagesize(num) {
      this.pagesize = num;
      this.initData(1, "", num);
    },

    searchData() {
      this.initData(1, this.search, this.pagesize);
    }
  }
};
</script>

<style lang="scss" scoped>
.usergroup {
  margin-top: -30px;
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
}
</style>

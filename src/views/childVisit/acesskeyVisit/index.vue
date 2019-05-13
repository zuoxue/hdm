<template>
  <div class="resource-visit--wrapper">
    <el-header class="el-header--rsource">
      <div class="resource_service--header">
        <h2>accesskey</h2>
      </div>

      <hr style="opacity:.5;">
    </el-header>
    <div class="resource-table--wrapper">
      <el-table :data="tableData" size="mini" :stripe="true">
        <el-table-column
          v-for="(col,index) in headers"
          :key="index"
          :prop="col.val"
          :label="col.label"
        ></el-table-column>
      </el-table>

      <el-footer>
        <el-pagination
          :page-size="pageSize"
          :current-page="currentPage"
          layout="total,prev,pager,next,sizes"
          :total="totalsize"
          @current-change="currentChange"
          @size-change="changePagesize"
        ></el-pagination>
      </el-footer>
    </div>
  </div>
</template>

<script>
import { getAllAccesskey } from "@/api/ram/user";
import { mapGetters } from "vuex";
export default {
  name: "acesskeyVisit",
  data() {
    return {
      tableData: [],
      headers: [
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
      pageSize: 10,
      currentPage: 1,
      totalsize: 0,
      resourceDict: [],
      resourceTemp: [],
      resourceSel: []
    };
  },
  mounted() {
    this.initData(1);
  },
  methods: {
    initData(page, id = "", nums = 10) {
      let data = {
        userId: this.userId,
        current: page,
        size: nums
      };
      getAllAccesskey(data, res => {
        if (res.data.code == 0) {
          this.tableData = res.data.data.list;
          this.currentPage = res.data.data.pageNum;
          this.pagesize = res.data.data.pageSize;
          this.totalsize = res.data.data.total;
        } else {
          this.$message({
            type: "error",
            message: "数据获取失败"
          });
        }
      });
    },
    // 修改页大小
    changePagesize(num) {
      this.pagesize = num;
      this.initData(1, "", num);
    },
    currentChange(page) {
      this.initData(page, "", this.pagesize);
    }
  },

  computed: {
    ...mapGetters(["userId"])
  }
};
</script>

<style lang="scss" scoped>
.resource-visit--wrapper {
  .resource-table--wrapper {
    margin: 0 20px;
  }
  .el-footer {
    text-align: right;
    padding-top: 20px;
    background: #ffffff;
  }
  .el-header--rsource {
    height: 80px !important;
    padding: 0 20px;
    margin-bottom: 20px;
  }
  .resource_service--header {
    display: flex;
    justify-content: space-between;
  }
}
</style>

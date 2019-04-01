<template>
  <div class="log">
    <basic-container>
      <avue-crud
        ref="crud"
        :page="page"
        :data="tableData"
        :table-loading="tableLoading"
        :option="tableOption"
        @search-change="searchChange"
        @refresh-change="refreshChange"
        @row-del="rowDel"
        @current-change="currentChange"
        @size-change="sizeChange"
        @search-reset="resetData"
      >
        <template slot-scope="scope" slot="menu">
          <el-button
            type="text"
            v-if="permissions.sys_log_del"
            icon="el-icon-delete"
            size="mini"
            @click="handleDel(scope.row,scope.index)"
          >删除</el-button>
        </template>
        <template slot="search">
          <el-form-item label="审计动作">
            <el-input v-model="search" placeholder="审计动作" size="small"/>
          </el-form-item>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import { delObj, fetchList } from "@/api/admin/safeAudit";
import { tableOption } from "@/const/crud/admin/safeAudit";
import { mapGetters } from "vuex";

export default {
  name: "safeAudit",
  data() {
    return {
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20 // 每页显示多少条
      },
      tableLoading: false,
      tableOption: tableOption,
      search: ""
    };
  },
  created() {},
  mounted: function() {
    this.getList();
  },
  computed: {
    ...mapGetters(["permissions"])
  },
  methods: {
    getList() {
      this.tableLoading = true;
      let query = {
        page: this.page.currentPage,
        pageSize: this.page.pageSize,
        action: this.search
      };
      fetchList(query).then(response => {
        this.tableData = response.data.data.list;
        this.page.total = response.data.data.total;
        this.tableLoading = false;
      });
    },
    handleDel(row, index) {
      this.$refs.crud.rowDel(row, index);
    },
    rowDel: function(row, index) {
      var _this = this;
      this.$confirm('是否确认删除ID为"' + row.id + '"的日志?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return delObj(row.id);
        })
        .then(data => {
          this.getList(this.page);
          _this.$message({
            showClose: true,
            message: "删除成功",
            type: "success"
          });
        })
        .catch(function(err) {});
    },
    /**
     * 搜索回调
     */
    searchChange(form) {
      this.page.currentPage = 1;
      this.getList();
    },
    /**
     * 刷新回调
     */
    refreshChange() {
      this.getList();
    },

    // 切页
    currentChange(page) {
      this.page.currentPage = page;
      this.getList();
    },

    // 显示数变化时
    sizeChange(pageNums) {
      this.page.pageSize = pageNums;
      this.page.currentPage = 1;
      this.getList();
    },
    resetData() {
      this.search = "";
      this.page.currentPage = 1;
      this.getList();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

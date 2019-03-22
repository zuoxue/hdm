<template>
  <el-container class="table-wrapper">
    <el-header>
      <div style="display:flex;">
        <h3>HBase 管理</h3>
        <div class="tb-add">
          <el-button size="small" type="primary" @click="addCluster">新增表空间</el-button>
        </div>
      </div>
      <hr>
    </el-header>
    <el-main>
      <el-tabs
        tab-position="left"
        @tab-click="getTables"
        v-model="initTable"
        :closable="true"
        @tab-remove="deleteCluster"
      >
        <el-tab-pane v-for="tab in tabs" :key="tab.index" :label="tab.label" :name="tab.name">
          <table-list :tab="tab" :allList="allList" @updateList="getTables"></table-list>
        </el-tab-pane>
      </el-tabs>
    </el-main>

    <!-- 新增表空间弹框 -->
    <el-dialog title="新增表空间" :visible.sync="isshowcluster" width="500px" :show-close="true">
      <div class="cluster-body">
        <div class="cluster-body--np" style="width:80px;">命名空间:</div>
        <el-input v-model="namespace" size="small" ref="namespace"></el-input>
      </div>
      <div slot="footer">
        <el-button type="primary" size="mini" @click="confirmCluster">确定</el-button>
        <el-button type="info" size="mini" @click="close">取消</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import tableList from "./tableList";
import * as hbase from "@/api/ram/hbase";

export default {
  name: "hbase",
  data() {
    return {
      tabs: [],
      initTable: "default",
      isshowcluster: false,
      namespace: "",
      allList: {}
    };
  },
  mounted() {
    this.initTableCluster();
    this.getTables();
  },
  methods: {
    message(type, message) {
      this.$message({ type, message });
    },
    // 初始化列出集群
    initTableCluster() {
      hbase.tableClusterList({}, res => {
        if (res.data.code == 0) {
          let d = res.data.data;
          this.tabs = [];
          d.map((item, index) => {
            this.tabs.push({
              label: item,
              name: item,
              index: index
            });
          });
          if ((d, length > 0)) {
            this.initTable = this.tabs[0].name;
          }
        }
      });
    },

    // 删除表空间
    deleteCluster(row) {
      this.$msgbox({
        title: `删除${row}`,
        message: "您确定要删除吗？",
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(res => {
          hbase.tableClusterDelete(
            {
              namespace: row
            },
            res => {
              if (res.data.code == 0 && res.data.data) {
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
                this.initTableCluster();
                return;
              }
              this.$message({
                type: "error",
                message: "删除失败"
              });
            }
          );
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 新增表空间
    addCluster() {
      this.isshowcluster = true;
    },
    close() {
      this.isshowcluster = false;
    },

    confirmCluster() {
      let data = {
        namespace: this.namespace
      };
      if (this.namespace == "") {
        this.$message({
          type: "info",
          message: "namespace不能为空"
        });
        this.$refs.namespace.focus();
        return;
      }
      hbase.tableClusterCreate(data, res => {
        if (res.data.code == 0) {
          this.message("success", "新建表空间成功");
          this.isshowcluster = false;
          this.initTableCluster();
          this.namespace = "";
        }
      });
    },

    // 列出表
    getTables() {
      let data = {
        namespace: this.initTable
      };
      hbase.tableList(data, res => {
        if (res.data.code == 0) {
          this.allList = res.data.data;
          return;
        }
        this.message("error", "表获取失败");
      });
      return;
    }
  },
  components: {
    tableList
  }
};
</script>

<style scoped lang="scss">
.table-wrapper {
  .tb-add {
    height: 60px;
    line-height: 60px;
    margin-left: 30px;
  }
  .el-main {
    margin-top: 20px;
    /deep/ .el-tabs__header {
      width: 200px;
      border-right: 1px solid #ccc;
      height: calc(100vh - 192px);
    }
  }
  .cluster-body {
    display: flex;
    .cluster-body--np {
      height: 32px;
      line-height: 32px;
      margin-right: 15px;
    }
  }
  /deep/ .el-dialog__header {
    background: #f1efef;
    border-bottom: 1px solid #dcdcdc;
  }
}
</style>

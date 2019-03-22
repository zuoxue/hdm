<template>
  <el-container class="menu-wrapper">
    <el-header>
      <div style="display:flex;">
        <h3>菜单权限管理</h3>
      </div>
    </el-header>
    <div class="divider"></div>
    <el-scrollbar v-if="!ishandle">
      <div class="menu-search">
        <el-button type="primary" size="mini" style="margin-left:5px;" @click="add">新增</el-button>
        <el-input
          v-model="searchValue"
          placeholder="请输入查询字段"
          size="mini"
          class="menu-search--inp"
          @input="searchMenu"
        >
          <template>
            <el-button slot="append" class="el-icon-search" @click="searchMenu"></el-button>
          </template>
        </el-input>
      </div>
      <el-main style="margin:0px 20px;">
        <el-table
          :data="tableData"
          size="mini"
          :header-row-style="{fontSize:'12px',color:'#646a77',fontWeight:'normal!important'}"
        >
          <el-table-column
            v-for="header in headers"
            :key="header.index"
            :prop="header.prop"
            :label="header.label"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" class="btn" @click="edit(scope.row)">修改</el-button>
              <el-button type="danger" size="mini" class="btn" @click="deleteMenu(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="footer">
          <el-pagination
            layout="prev,pager,next,total"
            @current-change="handleChange"
            :total="page.total"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
          ></el-pagination>
        </div>
      </el-main>
    </el-scrollbar>

    <add-menu v-if="ishandle" :ishandle.sync="ishandle" :edit="editList" :type="manageType"></add-menu>
  </el-container>
</template>

<script>
import { getAllMenuManager, deleteMenuManager } from "@/api/ram/formAuth";
import addMenu from "./addMenu";

export default {
  name: "menuManage",
  data() {
    return {
      ishandle: false,
      allData: [],
      tempData: [],
      tableData: [],
      manageType: "",
      editList: {},
      searchValue: "",
      headers: [
        {
          index: 0,
          prop: "name",
          label: "菜单名称"
        },
        {
          index: 1,
          prop: "permission",
          label: "权限标识"
        },
        {
          index: 2,
          prop: "path",
          label: "前端url"
        },
        {
          index: 3,
          prop: "type",
          label: "菜单类型"
        },
        {
          index: 4,
          prop: "typeName",
          label: "菜单类型名称"
        }
      ],
      page: {
        currentPage: 1,
        total: 100,
        pageSize: 10
      }
    };
  },
  watch: {
    ishandle(value) {
      if (!value) {
        this.searchValue = "";
        this.initData(1);
      }
    }
  },
  components: {
    addMenu
  },
  mounted() {
    this.initData(1);
  },
  methods: {
    // 初始化请求查询数据
    initData(page) {
      getAllMenuManager({}, res => {
        if (res.data.code == 0) {
          this.allData = res.data.data;
          this.tempData = this.allData.slice();
          let start = (page - 1) * this.page.pageSize;
          let end = page * this.page.pageSize;
          this.tableData = this.tempData.slice(start, end);
          this.page.currentPage = page;
          this.page.total = this.tempData.length;
        }
      });
    },

    // 分页切换
    handleChange(page) {
      let start = (page - 1) * this.page.pageSize;
      let end = page * this.page.pageSize;
      this.tableData = this.tempData.slice(start, end);
      this.page.currentPage = page;
    },

    // 新增
    add() {
      this.ishandle = true;
      this.manageType = "add";
      this.editList = {
        name: "",
        permission: "",
        path: "",
        typeName: "",
        type: ""
      };
    },

    //编辑
    edit(row) {
      this.editList = row;
      this.manageType = "edit";
      this.ishandle = true;
    },

    //删除
    deleteMenu(row) {
      let data = { id: row.id };

      this.$confirm(`确认删除${row.name}权限吗？`, "删除权限", {
        cancelButtonText: "放弃",
        confirmButtonText: "删除"
      })
        .then(() => {
          deleteMenuManager(data, res => {
            if (res.data.code == 0 && res.data.data == true) {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.initData(1);
            }
          });
        })
        .catch(action => {});
    },

    // 搜索
    searchMenu() {
      let s = this.searchValue.toLowerCase().trim();
      this.tempData = this.allData.filter(item => {
        let name = item.name ? item.name.toLowerCase().trim() : "";
        let path = item.path ? item.path.toLowerCase().trim() : "";
        let permission = item.permission.toLowerCase().trim();
        let typeName = item.typeName.toLowerCase().trim();
        if (
          name.indexOf(s) != -1 ||
          permission.indexOf(s) != -1 ||
          path.indexOf(s) != -1 ||
          typeName.indexOf(s) != -1
        ) {
          return item;
        }
      });
      this.tableData = this.tempData.slice(0, this.page.pageSize);
      this.page.total = this.tempData.length;
      this.page.currentPage = 1;
    }
  }
};
</script>

<style scoped lang="scss">
.menu-wrapper {
  .divider {
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    margin-left: 20px;
    margin-right: 20px;
  }
  .menu-search {
    margin-left: 20px;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
    .menu-search--inp {
      margin-left: 10px;
      width: 300px;
    }
  }
  .el-table {
    .btn {
      margin-top: 5px;
      margin-left: 5px;
    }
  }
  .footer {
    float: right;
    margin-top: 10px;
    margin-right: 20px;
    margin-bottom: 20px;
    .el-pagination {
      /deep/ .number {
        background-color: rgb(240, 242, 245) !important;
      }
      /deep/ button {
        background-color: rgb(240, 242, 245) !important;
      }
    }
  }
}
</style>

<template>
  <div class="resource">
    <el-container v-if="!ischeck">
      <el-header>
        <p>资源搜索</p>
      </el-header>
      <el-main>
        <el-form size="mini" label-width="100px" inline="true">
          <el-form-item label="资源名称" class="resource-name">
            <el-input v-model="searchList.name" placeholder="资源名称"></el-input>
            <el-button>搜索</el-button>
          </el-form-item>
        </el-form>

        <el-table :data="resourceDict">
          <el-table-column
            v-for="(header,index) in headers"
            :key="index"
            :prop="header.prop"
            :label="header.name"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="showInfo(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>
        <el-pagination
          :page-count="pageCount"
          :page-size="pageSize"
          :current-page="currentPage"
          layout="prev,pager,next,jumper,total"
          :total="totalPages"
          prev-text="上一页"
          next-text="下一页"
        ></el-pagination>
      </el-footer>
    </el-container>

    <el-container v-if="ischeck">
      <el-header>
        <div class="resource-check--header" @click="back">
          <h3>
            <i class="el-icon-arrow-left"></i>
            {{checkRes}}
          </h3>
        </div>
      </el-header>
      <el-main>
        <el-table :data="resourceRange" border>
          <el-table-column
            v-for="(header,index) in resHander"
            :key="index"
            :prop="header.prop"
            :label="header.name"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="modifyres(scope.row)">更改</el-button>
              <el-button type="primary" size="mini" @click="deleteRes(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>
        <el-pagination
          :page-count="res.count"
          :page-size="res.size"
          :current-page="res.currentPage"
          layout="prev,pager,next,jumper,total"
          :total="res.totalPages"
          prev-text="上一页"
          next-text="下一页"
        ></el-pagination>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "allResource",
  data() {
    return {
      searchList: {
        name: ""
      },
      resourceDict: [
        {
          name: "esc",
          access: 5
        },
        {
          name: "ess",
          access: 6
        }
      ],
      headers: [
        {
          name: "资源",
          prop: "name"
        },
        {
          name: "已分配人数",
          prop: "access"
        }
      ],
      pageCount: 100,
      pageSize: 10,
      currentPage: 0,
      totalPages: 10000,
      ischeck: false,
      checkRes: "",
      resourceRange: [
        {
          name: "joe",
          outdate: "2019-5-12"
        },
        {
          name: "peiqi",
          outdate: "2019-6-12"
        }
      ],
      resHander: [
        {
          name: "用户",
          prop: "name"
        },
        {
          name: "过期时间",
          prop: "outdate"
        }
      ],
      res: {
        count: 100,
        size: 10,
        currentPage: 0,
        totalPages: 10000
      }
    };
  },
  methods: {
    showInfo(info) {
      const loading = this.$loading({
        lock: true,
        text: "loading"
      });
      this.ischeck = !this.ischeck;
      this.checkRes = info.name;
      loading.close();
    },
    back() {
      this.ischeck = !this.ischeck;
    }
  }
};
</script>

<style lang="scss" scoped>
.resource {
  .resource-name {
    .el-input {
      width: auto;
    }
  }
  .el-footer {
    text-align: right;
    padding-top: 30px;
  }
  .resource-check--header {
    cursor: pointer;
  }
}
</style>

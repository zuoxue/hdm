<template>
  <div class="resource-visit--wrapper">
    <el-header class="el-header--rsource">
      <div class="resource_service--header">
        <h2>资源</h2>
      </div>

      <hr style="opacity:.5;">
    </el-header>
    <div class="resource-table--wrapper">
      <el-table :data="resourceSel" size="mini">
        <el-table-column
          v-for="(header,index) in headers"
          :key="index"
          :prop="header.prop"
          :label="header.name"
        ></el-table-column>
      </el-table>

      <el-footer>
        <el-pagination
          :page-size="pageSize"
          :current-page="currentPage"
          layout="total,prev,pager,next,sizes"
          :total="totalPages"
          @current-change="currentChange"
          @size-change="sizeChange"
        ></el-pagination>
      </el-footer>
    </div>
  </div>
</template>

<script>
import { getResourceByOwnerId } from "@/api/ram/resourceManage";
import { mapGetters } from "vuex";

export default {
  name: "resourceVisit",
  data() {
    return {
      dataset: [],
      headers: [
        {
          name: "资源",
          prop: "action"
        },
        {
          name: "服务",
          prop: "service"
        },
        {
          name: "备注",
          prop: "comment"
        },
        {
          name: "域名",
          prop: "domain"
        },
        {
          name: "创建时间",
          prop: "createTime"
        },
        {
          name: "过期时间",
          prop: "expirationTime"
        },
        {
          name: "实例名",
          prop: "instanceName"
        },
        {
          name: "版本号",
          prop: "version"
        }
      ],
      pageSize: 10,
      currentPage: 1,
      totalPages: 0,
      resourceDict: [],
      resourceTemp: [],
      resourceSel: []
    };
  },
  mounted() {
    this.initResource();
  },
  methods: {
    currentChange(page) {
      let start = (page - 1) * this.pageSize;
      let end = page * this.pageSize;
      this.resourceSel = this.resourceTemp.slice(start, end);
      this.currentPage = page;
    },
    sizeChange(num) {
      this.pageSize = num;
      this.resourceSel = this.resourceTemp.slice(0, this.pageSize);
      this.currentPage = 1;
    },
    initResource() {
      let query = {
        ownerId: this.userId
      };
      getResourceByOwnerId(query, {}, res => {
        if (res.data.code == 0) {
          this.resourceDict = res.data.data;
          this.resourceTemp = this.resourceDict;
          this.resourceSel = this.resourceTemp.slice(0, this.pageSize);
          this.currentPage = 1;
          this.totalPages = this.resourceTemp.length;
        }
      });
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

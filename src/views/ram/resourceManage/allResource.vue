<template>
  <div class="resource">
    <el-container v-if="!ischeck">
      <el-header style="display:flex;">
        <p>资源搜索</p>
        <p style="margin-left:30px;" v-if="userId==1">
          <el-button type="plain" size="mini" @click="newResourceShow = true">新建资源</el-button>
        </p>
      </el-header>
      <el-main>
        <el-form size="mini" label-width="100px" :inline="true">
          <el-form-item label="资源名称" class="resource-name">
            <el-input v-model="searchName" placeholder="资源名称" @input="searchResouce"></el-input>
            <el-button @click="searchResouce">搜索</el-button>
          </el-form-item>
        </el-form>

        <el-table :data="resourceSel" :stripe="true" size="mini">
          <el-table-column type="expand"></el-table-column>
          <el-table-column
            v-for="(header,index) in headers"
            :key="index"
            :prop="header.prop"
            :label="header.name"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="showDetails(scope.row)">详情</el-button>
              <el-button type="primary" size="mini" @click="showInfo(scope.row)">查看</el-button>
              <el-button type="primary" size="mini" @click="allocateResource(scope.row)">分配用户</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="putawayOrSold(scope.row)"
              >{{scope.row.status==0?"下架":"上架"}}</el-button>
              <el-button type="primary" size="mini" @click="deleteRes(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>
        <el-pagination
          :page-size="pageSize"
          :current-page="currentPage"
          layout="prev,pager,next,total"
          :total="totalPages"
          @current-change="currentChange"
          v-if="totalPages>pageSize"
        ></el-pagination>
      </el-footer>
    </el-container>

    <!-- 资源详情 -->
    <resourceDetail v-if="ischeck" :info="fileInfos" :ischeck.sync="ischeck"></resourceDetail>

    <!-- 更改资源 -->
    <el-dialog
      :title="modifyRe.name"
      :visible.sync="modifyRe.ismodify"
      :append-to-body="true"
      :show-close="true"
      :close-on-click-modal="false"
      width="700px"
    >
      <el-transfer
        :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }"
        filterable
        :data="allRes"
        v-model="ressel"
        filter-placeholder="请输入筛选字段"
        :titles="['未授权人员','已授权人员']"
      ></el-transfer>
      <div slot="footer">
        <el-button type="primary" size="mini" @click="confirm">确认</el-button>
        <el-button @click="modifyRe.ismodify = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 新建资源 -->
    <el-dialog
      title="新建资源"
      :visible.sync="newResourceShow"
      :append-to-body="true"
      :show-close="true"
      :close-on-click-modal="false"
      width="700px"
    >
      <create-resource :isshow.sync="newResourceShow" @initEvent="initResource"></create-resource>
    </el-dialog>
  </div>
</template>

<script>
import {
  getResourceByOwnerId,
  updateResource,
  getUserByNotResource,
  getUserByResource,
  insertResource,
  deleteResource,
  showResourceDetail
} from "@/api/ram/resourceManage";
import createResource from "./createResource";
import resourceDetail from "./resourceDetail";
import { mapGetters } from "vuex";

export default {
  name: "allResource",
  data() {
    return {
      searchName: "",
      resourceDict: [],
      resourceTemp: [],
      resourceSel: [],
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
        }
      ],
      pageSize: 5,
      currentPage: 1,
      totalPages: 0,
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
      resPage: {
        size: 5,
        currentPage: 1,
        totalPages: 0
      },
      modifyRe: {
        name: "",
        ismodify: false
      },
      ressel: [],
      allRes: [],
      allocateId: 0,
      userResourceId: 0,
      newResourceShow: false,
      fileInfos: {
        action: "HBASE:cluster/metrics",
        chain: "HBASE:cluster/metrics;URS:HBASE::1:/hbase",
        comment: "hbase集群状态",
        createBy: "",
        createTime: "2019-01-23 00:30:20",
        delFlag: "0",
        domain: "URS",
        expirationTime: "2021-01-02 08:31:36",
        id: 35,
        instanceName: "/hbase",
        number: null,
        ownerId: 1,
        parentId: 0,
        region: "",
        resourceChain: "URS:HBASE::1:/hbase",
        service: "HBASE",
        size: null,
        status: "0",
        updateTime: "2019-03-08 10:57:00",
        version: 1
      }
    };
  },
  components: {
    createResource,
    resourceDetail
  },
  mounted() {
    this.initResource();
  },
  methods: {
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
    },
    currentChange(page) {
      let start = (page - 1) * this.pageSize;
      let end = page * this.pageSize;
      this.resourceSel = this.resourceTemp.slice(start, end);
      this.currentPage = page;
    },
    // 搜索资源
    searchResouce() {
      let sname = this.searchName.toLowerCase().trim();
      if (sname == "") {
        this.resourceTemp = this.resourceDict;
        this.resourceSel = this.resourceTemp.slice(0, this.pageSize);
        this.currentPage = 1;
        this.totalPages = this.resourceTemp.length;
        return;
      }
      this.resourceTemp = this.resourceDict.filter(item => {
        let action = item.action.toLowerCase();
        return action.indexOf(sname) > -1;
      });
      this.resourceSel = this.resourceTemp.slice(0, this.pageSize);
      this.currentPage = 1;
      this.totalPages = this.resourceTemp.length;
    },
    // 详情
    showDetails(row) {
      let data = {
        id: row.id
      };
      this.ischeck = true;
      // showResourceDetail(data, res => {
      //   console.log(res, 4655);
      // });
    },
    // 查看已分配用户
    showInfo(info) {
      // const loading = this.$loading({
      //   lock: true,
      //   text: "loading"
      // });
      // this.ischeck = !this.ischeck;
      // this.checkRes = info.name;
      // loading.close();
      this.userResourceId = info.id;
      this.$emit("getresource", info.id);
    },
    // 上下架
    putawayOrSold(row) {
      const data = {
        id: row.id,
        status: row.status == 0 ? "1" : "0",
        parentId: row.parentId
      };
      updateResource(data, res => {
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: row.status == 0 ? "下架成功" : "上架成功"
          });
          this.initResource();
        }
      });
    },
    // 分配资源
    allocateResource(row) {
      let query = {
        id: row.id,
        userId: this.userId
      };
      this.allRes = [];
      this.ressel = [];
      getUserByResource(query, {}, res => {
        if (res.data.code == 0) {
          res.data.data.map(item => {
            this.allRes.push({
              key: item.userId,
              label: item.username
            });
            this.ressel.push(item.userId);
          });
        }
      });
      getUserByNotResource(query, {}, res => {
        if (res.data.code == 0) {
          res.data.data.map(item => {
            this.allRes.push({
              key: item.userId,
              label: item.username
            });
          });
        }
      });
      this.modifyRe.name = row.action;
      this.allocateId = row.id;
      this.modifyRe.ismodify = true;
    },
    // 资源分配提交
    confirm() {
      let data = {
        userIds: this.ressel,
        id: this.allocateId
      };
      insertResource(data, res => {
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "资源授权成功"
          });
          this.modifyRe.ismodify = false;
          // 如果是人员表显示，触发更新
          if (this.userResourceId == this.allocateId && this.allocateId != 0) {
            this.$emit("getresource", this.userResourceId);
          }
          return;
        } else {
          this.$message({
            type: "error",
            message: "资源授权失败"
          });
        }
      });
    },
    back() {
      this.ischeck = !this.ischeck;
    },
    modifyres(info) {},

    // 删除资源
    deleteRes(info) {
      deleteResource({ id: info.id }, res => {
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "删除成功"
          });
          this.initResource();
          this.$emit("update:clickshow", false);
          return;
        }
        this.$message({
          type: "error",
          message: "删除失败"
        });
      });
    }
  },
  computed: {
    ...mapGetters(["userId"])
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
/deep/ .el-dialog__header {
  background: #5d5f4e;
  .el-dialog__title {
    color: #fff;
  }
}
/deep/ .el-transfer-panel__body {
  background: #f5f7fa;
}
/deep/ .el-dialog__footer {
  text-align: center;
}
.el-transfer {
  padding: 0 80px;
  /deep/ .el-transfer-panel {
    border-color: #ccc;
  }
}
</style>

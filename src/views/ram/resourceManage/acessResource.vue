<template>
  <div class="resource">
    <el-container v-if="!ischeck">
      <el-header>
        <p>已分配资源</p>
      </el-header>
      <el-main>
        <el-form size="mini" label-width="100px" :inline="true">
          <el-form-item label="资源名称" class="resource-name">
            <el-input v-model="searchName" placeholder="资源名称" @input="searchResouce"></el-input>
            <el-button @click="searchResouce">搜索</el-button>
          </el-form-item>
        </el-form>

        <el-table :data="resourceSel" size="mini" :stripe="true">
          <el-table-column
            v-for="(header,index) in headers"
            :key="index"
            :prop="header.prop"
            :label="header.name"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="modifyRes(scope.row)">详情</el-button>
              <!-- <el-button type="primary" size="mini" @click="modifyRes(scope.row)">分配资源</el-button> -->
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
    <!--
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
              <el-button type="primary" size="mini" @click="deleteRes(index)">删除</el-button>
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
    </el-container>-->
    <!-- 查看人员的资源详情 -->
    <el-dialog
      :title="modifyRe.name"
      :visible.sync="modifyRe.ismodify"
      :append-to-body="true"
      :show-close="true"
      :close-on-click-modal="false"
      width="700px"
      v-if="showdetails"
    >
      <el-table :data="userInfos" size="mini">
        <el-table-column
          v-for="(header,index) in userheaders"
          :key="index"
          :prop="header.prop"
          :label="header.name"
        ></el-table-column>
        <el-table-column label="禁用/启用">
          <template slot-scope="scope">
            <el-switch
              v-model="isactiveList[scope.row['index']]"
              @change="setresourcestatus($event,scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 更改资源 -->
    <!-- <el-dialog
      :title="modifyRe.name"
      :visible.sync="modifyRe.ismodify"
      :append-to-body="true"
      :show-close="true"
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
        :titles="['未授予权限','已授权限']"
      ></el-transfer>
      <div slot="footer">
        <el-button type="primary" size="mini">确认</el-button>
        <el-button @click="modifyRe.ismodify = false">取消</el-button>
      </div>
    </el-dialog>-->
  </div>
</template>

<script>
import {
  getResourceByOwnerId,
  setResourceStatus
} from "@/api/ram/resourceManage";
export default {
  name: "acessResource",
  data() {
    return {
      searchName: "",
      resourceTemp: [],
      resourceSel: [],
      // resourceDict: [
      //   {
      //     name: "马云",
      //     access: 1
      //   },
      //   {
      //     name: "马化腾",
      //     access: 2
      //   }
      // ],
      headers: [
        {
          name: "用户",
          prop: "username"
        },
        {
          name: "创建时间",
          prop: "createTime"
        }
      ],
      userheaders: [
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
      userInfos: [],
      isactiveList: [],
      showdetails: false, //详情页
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
          name: "资源",
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
      },
      modifyRe: {
        name: "eee",
        ismodify: false
      },
      ressel: [2],
      allRes: [
        {
          key: 1,
          label: "esc1",
          disabled: false
        },
        {
          key: 2,
          label: "esc2",
          disabled: false
        }
      ],
      focusUserId: 0
    };
  },
  props: ["resourceData"],
  watch: {
    resourceData() {
      this.resourceTemp = this.resourceData;
      this.resourceSel = this.resourceTemp.slice(0, this.pageSize);
      this.currentPage = 1;
      this.totalPages = this.resourceTemp.length;
    }
  },
  methods: {
    // 分页切换
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
        this.resourceTemp = this.resourceData;
        this.resourceSel = this.resourceTemp.slice(0, this.pageSize);
        this.currentPage = 1;
        this.totalPages = this.resourceTemp.length;
        return;
      }
      this.resourceTemp = this.resourceData.filter(item => {
        let action = item.username.toLowerCase();
        return action.indexOf(sname) > -1;
      });
      this.resourceSel = this.resourceTemp.slice(0, this.pageSize);
      this.currentPage = 1;
      this.totalPages = this.resourceTemp.length;
    },
    showInfo(info) {
      const loading = this.$loading({
        lock: true,
        text: "loading"
      });
      this.ischeck = !this.ischeck;
      this.checkRes = info.name;
      loading.close();
    },
    back(ev) {
      ev.stopPropagation();
      this.ischeck = !this.ischeck;
    },
    modifyRes(info) {
      this.modifyRe.ismodify = true;
      this.modifyRe.name = info.username;
      this.focusUserId = info.userId;
      this.showdetails = true;
      this.userInfos = [];
      let query = {
        ownerId: info.userId
      };
      getResourceByOwnerId(query, {}, res => {
        if (res.data.code == 0) {
          this.isactiveList = [];
          console.log(res.data, 999);
          this.userInfos = res.data.data.map((item, index) => {
            this.isactiveList.push(item.status == "0" ? false : true);
            item["index"] = index;
            return item;
          });
        }
      });
    },
    setresourcestatus(st, row) {
      let data = {
        id: row.id * 1,
        userId: this.focusUserId,
        status: st ? "1" : "0"
      };
      console.log(row, 999);
      setResourceStatus(data, res => {
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message:
              row.action + (data.status == 1 ? " 已启用！" : " 已禁用！"),
            duration: 1500
          });
          return;
        }
        this.$message({
          type: "error",
          message: row.action + "设置失败！",
          duration: 1500
        });
        return;
      });
    },
    deleteRes(index) {}
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
    display: inline-block;
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

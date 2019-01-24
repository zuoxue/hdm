<template>
  <div class="resource">
    <el-container v-if="!ischeck">
      <el-header>
        <p>已分配资源</p>
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
              <!-- <el-button type="primary" size="mini" @click="editInfo(scope.row)">编辑</el-button> -->
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
              <el-button type="primary" size="mini" @click="modifyRes(scope.row)">更改</el-button>
              <!-- <el-button type="primary" size="mini" @click="addRes(scope.row)">新增</el-button> -->
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

    <!-- 更改资源 -->
    <el-dialog
      :title="modifyRe.name"
      :visible.sync="modifyRe.ismodify"
      :append-to-body="true"
      :show-close="true"
      width="700px"
    >
      <el-transfer
        :format="{
        noChecked: '${checked}/${total}',
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
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "acessResource",
  data() {
    return {
      searchList: {
        name: ""
      },
      resourceDict: [
        {
          name: "马云",
          access: 1
        },
        {
          name: "马化腾",
          access: 2
        }
      ],
      headers: [
        {
          name: "用户",
          prop: "name"
        },
        {
          name: "权限",
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
      ]
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
    },
    modifyRes(info) {
      this.modifyRe.ismodify = true;
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
</style>

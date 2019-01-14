<template>
  <div class="resource_service--hdfs">
    <el-container>
      <el-header>
        <div class="resource_service--header">
          <h2>HDFS资源与服务</h2>
          <div>
            <el-button type="default">
              <a href="javascript:;">帮助文档</a>
            </el-button>
          </div>
        </div>
        <hr style="opacity:.5;">
      </el-header>
      <!-- <el-main>
        <el-container>
          <el-header>
            <el-row>
              <el-col :span="4" class="mt8">
                <div class="resource-header">
                  <p>集群：</p>
                  <el-select v-model="selectCluster" placeholder="集群">
                    <el-option
                      v-for="(cluster,index) in clusters"
                      :label="cluster"
                      :value="cluster"
                      :key="index"
                    ></el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="4">
                <el-input v-model="searchCluster">
                  <el-button slot="append" class="el-icon-search"></el-button>
                </el-input>
              </el-col>
              <el-col :span="6"></el-col>
              <el-col :span="10" class="el-resource--icon-pos mt8">
                <el-row :gutter="5">
                  <el-col :span="6" class="el-font--color-b">
                    <el-button icon="el-icon-upload">上传文件</el-button>
                  </el-col>
                  <el-col :span="6" class="el-font--color-b">
                    <el-button icon="el-icon-plus">新建</el-button>
                  </el-col>
                  <el-col :span="6" class="el-font--color-b">
                    <el-button icon="el-icon-delete">删除</el-button>
                  </el-col>
                  <el-col :span="6" class="el-font--color-b">
                    <el-button>返回首页</el-button>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-header>
          <el-main class="el-resource--main_padding">
            <div>路径：{{rootpath}}</div>
            <div>
              <el-table
                :data="tableData"
                border
                style="width:100%"
                :stripe="true"
                :cell-style="cellStyle"
                :header-cell-style="cellStyle"
              >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="名称">
                  <template slot-scope="scope">
                    <div class="cursorStyle">
                      <i :class="scope.row.name.iconfont"></i>
                      <span style="margin-left:5px;">{{scope.row.name.name}}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  :prop="header.prop"
                  v-for="(header,index) in tableHeaders"
                  :key="index"
                  :label="header.name"
                ></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small">重命名</el-button>
                    <el-button type="text" size="small">删除</el-button>
                    <el-button type="text" size="small">配额管理</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-main>
        </el-container>
      </el-main>-->
      <resourceAuthhdfspanel :panel.sync="panel" v-if="panel"/>
      <!-- <el-footer>
        <div class="block">
          <div class="block-info">
            <span>共{{totalnum}}条记录</span>
            <span>共{{totallen}}页</span>
            <span>当前第{{currentPage1}}页</span>
          </div>
          <el-pagination
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            @prev-click="handleCurrentChange"
            @next-click="handleCurrentChange"
            :current-page.sync="currentPage1"
            :page-size="pagenums"
            layout="prev, pager,next,jumper"
            :total="totalnum"
          ></el-pagination>
          <div>
            <el-button type="default" size="mini" class="block-btn">GO</el-button>
      </div>-->
      <!-- </div>
      </el-footer>-->
    </el-container>
  </div>
</template>

<script>
import resourceAuthhdfspanel from "./resourceAuthhdfspanel";

export default {
  name: "resourceAuthhdfs",
  data() {
    return {
      // selectCluster: "",
      // searchCluster: "",
      // clusters: []
      // rootpath: "/",
      // tableData: [],
      // allData: [],
      // totalnum: 0,
      // pagenums: 10,
      // totallen: 0,
      // currentPage1: 1,
      // tableHeaders: [
      //   // {"name":'名称',"prop":"name"},
      //   { name: "大小（字节）", prop: "size" },
      //   { name: "所属用户", prop: "user" },
      //   { name: "所属分组", prop: "group" },
      //   { name: "权限", prop: "permission" },
      //   { name: "配额", prop: "quota" },
      //   { name: "修改时间", prop: "modifytime" }
      // ]
      panel: true,
      edit: false
    };
  },
  components: {
    resourceAuthhdfspanel
  },
  mounted() {
    // this.postData();
  },
  methods: {
    // postData() {
    //   this.axios.post("/hdm/hdfs").then(res => {
    //     console.log(res);
    //     this.allData = res.data.articles;
    //     this.tableData = this.allData.slice(0, this.pagenums);
    //     this.totalnum = this.allData.length;
    //     this.totallen = Math.floor(this.totalnum / this.pagenums);
    //   });
    // },
    // 改变table数据样式居中
    // cellStyle({ row, column, rowIndex, columnIndex }) {
    //   return "text-align:center";
    // },
    // handleCurrentChange(page) {
    //   const start = (page - 1) * this.pagenums;
    //   const end = start + 10;
    //   this.tableData = this.allData.slice(start, end);
    // },
    // // 当前页改变时table显示数据
    // handleSizeChange(page) {
    //   if (page > this.totalnum) {
    //     page = this.totalnum;
    //   }
    //   this.handleCurrentChange(page);
    // }
  }
};
</script>

<style lang="scss" scoped>
.resource_service--hdfs {
  font-size: 16px;
  .resource_service--header {
    display: flex;
    justify-content: space-between;
  }
  .mt8 {
    margin-top: 8px;
  }
  .resource-header {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    p {
      width: 70px;
      line-height: 38px;
      height: 38px;
    }
  }
  .el-font--color-b {
    .el-button {
      color: #00bdf0;
    }
  }
  .el-resource--icon-pos {
    .el-button {
      width: 100%;
    }
  }
  .el-resource--main_padding {
    padding: 0 20px !important;
    .cursorStyle {
      cursor: pointer;
    }
  }
  .block {
    background: rgb(255, 255, 255);
    display: flex;
    justify-content: flex-end;
    .block-info {
      height: 32px;
      line-height: 32px;
      font-size: 13px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
    .block-btn {
      width: 34px;
      height: 28px;
      background: rgba(230, 230, 230, 1);
      border: 1px solid rgba(224, 224, 224, 1);
      border-radius: 2px;
    }
  }
}
</style>

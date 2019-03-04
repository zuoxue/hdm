<template>
  <div class="tableList-wrapper">
    <div>
      <el-row>
        <el-col :span="2" class="tableList-search--title">搜索:</el-col>
        <el-col :span="10">
          <el-input
            type="text"
            v-model="search"
            placeholder="table name"
            size="mini"
            class="el-input--tableList"
            @input="searchTable"
          >
            <template slot="append">
              <div class="cur-p" @click="searchTable">搜索</div>
            </template>
          </el-input>
          <!-- <el-button plain type="info" size="mini" class="cur-p">搜索</el-button> -->
          <el-button size="mini" type="primary" @click="createTable">新建表</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :data="selData" size="mini" :border="true" :stripe="true">
      <el-table-column
        v-for="header in headers"
        :key="header.index"
        :label="header.label"
        :prop="header.prop"
      ></el-table-column>
      <el-table-column label="禁用/启用">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isusing"
            size="mini"
            @change="changeStatus($event,scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="modifyTable(scope.row)">编辑</el-button>
          <el-button size="mini" type="primary" @click="deleteTable(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-table" v-if="totalNums > pageSize">
      <el-pagination
        layout="prev, pager, next,total"
        :total="totalNums"
        :page-size="pageSize"
        @current-change="changePage"
      ></el-pagination>
    </div>

    <!-- 新建表 -->
    <el-dialog :visible.sync="isshowtable" width="600px" :show-close="true">
      <div slot="title" class="table-title-bg">新建表</div>
      <el-row>
        <el-col :span="5" class="table-mini">Table Name:</el-col>
        <el-col :span="16">
          <el-input v-model="tablename" placeholder="enter namespace" size="mini"></el-input>
        </el-col>
      </el-row>
      <el-row v-for="(family,index) in families" :key="family.index">
        <el-col :span="5" class="table-mini" style="position:relative;z-index:11111;">
          <i class="el-icon-close" @click="deleteFamily(index)"></i> Families
        </el-col>
        <!-- <el-col :span="5" class="table-mini" v-else></el-col> -->
        <a
          href="javascript:;"
          @click="addProperty(family)"
          v-if="family.nums == 0"
          class="table-mini"
        >
          <i class="el-icon-plus"></i>
          <span v-if="family.nums == 0">新增属性</span>
        </a>

        <el-col
          :span="16"
          style="display:flex;position:relative;z-index:11111;"
          v-if="family.nums>0"
        >
          <el-select
            v-model="family.selList[0].sel"
            size="mini"
            @change="changeValue(family,0,$event)"
          >
            <el-option
              v-for="(option,index) in options"
              :key="index"
              :label="option.label"
              :value="option.value"
            ></el-option>
          </el-select>
          <el-input
            size="mini"
            v-model="family.selList[0].val"
            @change="changeProperty(family, 0, $event)"
          ></el-input>
          <i class="el-icon-plus table-mini" @click="addProperty(family)"></i>
          <i class="el-icon-minus table-mini" @click="deleteProperty(family,index)"></i>
        </el-col>

        <div v-if="family.nums>1" style="position:relative;z-index:1111;">
          <el-row v-for="i in family.nums-1" :key="i">
            <el-col :span="5" size="mini" class="table-mini" v-if="i>0"></el-col>
            <el-col :span="16" style="display:flex" v-if="i>0">
              <el-select
                v-model="family.selList[i].sel"
                size="mini"
                @change="changeValue(family,i,$event)"
              >
                <el-option
                  v-for="(option,index) in options"
                  :key="index"
                  :label="option.label"
                  :value="option.value"
                ></el-option>
              </el-select>
              <el-input
                size="mini"
                v-model="family.selList[i].val"
                @change="changeProperty(family, i, $event)"
              ></el-input>
              <i class="el-icon-plus table-mini" @click="addProperty(family)"></i>
              <i class="el-icon-minus table-mini" @click="deleteProperty(family,i)"></i>
            </el-col>
          </el-row>
        </div>
      </el-row>
      <el-row>
        <p @click="addFamily" class="cur-p">
          <i class="el-icon-plus"></i>增加一个family
        </p>
      </el-row>
      <div class="footer" slot="footer">
        <el-button type="primary" size="mini" @click="submitTable">确认</el-button>
        <el-button type="info" size="mini" @click="close">取消</el-button>
      </div>
    </el-dialog>

    <!-- 编辑表 -->
    <el-dialog :visible.sync="isshowtableEdit" width="600px" :show-close="true">
      <div slot="title" class="table-title-bg">编辑表</div>
      <el-row>
        <el-col :span="5" class="table-mini">Table Name:</el-col>
        <el-col :span="16">
          <el-input v-model="tablename" placeholder="enter namespace" size="mini"></el-input>
        </el-col>
      </el-row>
      <el-row v-for="(family,index) in families" :key="family.index">
        <el-col :span="5" class="table-mini" style="position:relative;z-index:11111;">
          <i class="el-icon-close" @click="deleteFamily(index)"></i> Families
        </el-col>
        <!-- <el-col :span="5" class="table-mini" v-else></el-col> -->
        <a
          href="javascript:;"
          @click="addProperty(family)"
          v-if="family.nums == 0"
          class="table-mini"
        >
          <i class="el-icon-plus"></i>
          <span v-if="family.nums == 0">新增属性</span>
        </a>

        <el-col
          :span="16"
          style="display:flex;position:relative;z-index:11111;"
          v-if="family.nums>0"
        >
          <el-select
            v-model="family.selList[0].sel"
            size="mini"
            @change="changeValue(family,0,$event)"
          >
            <el-option
              v-for="(option,index) in options"
              :key="index"
              :label="option.label"
              :value="option.value"
            ></el-option>
          </el-select>
          <el-input
            size="mini"
            v-model="family.selList[0].val"
            @input="changeProperty(family, 0, $event)"
          ></el-input>
          <i class="el-icon-plus table-mini" @click="addProperty(family)"></i>
          <i class="el-icon-minus table-mini" @click="deleteProperty(family,index)"></i>
        </el-col>

        <div v-if="family.nums>1" style="position:relative;z-index:1111;">
          <el-row v-for="i in family.nums-1" :key="i">
            <el-col :span="5" size="mini" class="table-mini" v-if="i>0"></el-col>
            <el-col :span="16" style="display:flex" v-if="i>0">
              <el-select
                v-model="family.selList[i].sel"
                size="mini"
                @change="changeValue(family,i,$event)"
              >
                <el-option
                  v-for="(option,index) in options"
                  :key="index"
                  :label="option.label"
                  :value="option.value"
                ></el-option>
              </el-select>
              <el-input
                size="mini"
                v-model="family.selList[i].val"
                @input="changeProperty(family, i, $event)"
              ></el-input>
              <i class="el-icon-plus table-mini" @click="addProperty(family)"></i>
              <i class="el-icon-minus table-mini" @click="deleteProperty(family,i)"></i>
            </el-col>
          </el-row>
        </div>
      </el-row>
      <el-row>
        <p @click="addFamily" class="cur-p">
          <i class="el-icon-plus"></i>增加一个family
        </p>
      </el-row>
      <div class="footer" slot="footer">
        <el-button type="primary" size="mini" @click="submitTable">确认</el-button>
        <el-button type="info" size="mini" @click="close">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as hbase from "@/api/ram/hbase";
import { mapGetters } from "vuex";

export default {
  name: "tableList",
  data() {
    return {
      allData: [],
      tempData: [],
      selData: [],
      pageSize: 2,
      totalNums: 0,
      headers: [
        {
          index: 1,
          label: "table",
          prop: "table"
        }
      ],
      families: [],
      options: [
        {
          label: "blockCacheEnabled",
          value: "blockCacheEnabled"
        },
        {
          label: "blocksize",
          value: "blocksize"
        },
        {
          label: "bloomFilterType",
          value: "bloomFilterType"
        },
        {
          label: "compressionType",
          value: "compressionType"
        },
        {
          label: "dataBlockEncoding",
          value: "dataBlockEncoding"
        },
        {
          label: "familyName",
          value: "familyName"
        },
        {
          label: "inMemory",
          value: "inMemory"
        },
        {
          label: "maxVersions",
          value: "maxVersions"
        },
        {
          label: "timeToLive",
          value: "timeToLive"
        }
      ],
      // 默认值
      defaultValue: {
        blockCacheEnabled: false,
        blocksize: 8192,
        bloomFilterType: "ROW",
        compressionType: "NONE",
        dataBlockEncoding: "NONE",
        familyName: "f",
        inMemory: false,
        maxVersions: 10,
        timeToLive: 100
      },
      defaultValueList: [],
      search: "",
      isshowtable: false,
      isshowtableEdit: false,
      tablename: "",
      falColumn: "",
      eidtData: {}
    };
  },
  computed: {
    ...mapGetters(["access_token"])
  },
  mounted() {
    this.initPage();
  },
  watch: {
    allList() {
      this.initPage();
    }
  },
  props: ["tab", "allList"],
  methods: {
    initPage() {
      let keys = Object.keys(this.allList);
      this.allData = keys.map((item, index) => {
        let key = Object.keys(item);
        let d = item.split(":")[1];
        return {
          table: d,
          index: index,
          isusing: this.allList[item]
        };
      });
      this.tempData = this.allData;
      this.selData = this.tempData.slice(0, this.pageSize);
      this.totalNums = this.tempData.length;
    },
    message(type, message) {
      this.$message({ type, message });
    },

    // 弹出新建表
    createTable() {
      this.isshowtable = true;
      this.families = [];
      this.tablename = "";
      return;
    },
    // 增加family
    addFamily() {
      let len =
        this.families.length > 0
          ? this.families[this.families.length - 1].index + 1
          : 0;
      this.families.push({
        blockCacheEnabled: false,
        blocksize: 8192,
        bloomFilterType: "ROW",
        compressionType: "NONE",
        dataBlockEncoding: "NONE",
        familyName: "f",
        inMemory: false,
        maxVersions: 10,
        timeToLive: 100,
        index: len,
        nums: 0,
        selList: []
      });
    },

    // 增加属性
    addProperty(family) {
      family.nums += 1;
      family.selList.push({ sel: "familyName", val: "f" });
    },

    // 删除一个属性
    deleteProperty(family, k) {
      family.nums -= 1;
      if (this.isshowtableEdit) {
        family[family.selList[k].sel] = this.defaultValueList[
          family.selList[k].sel
        ];
      } else {
        family[family.selList[k].sel] = this.defaultValue[
          family.selList[k].sel
        ];
      }

      family.selList.splice(k, 1);
    },

    // 退出新建弹框
    close() {
      this.isshowtable = false;
      this.isshowtableEdit = false;
      this.families = [];
    },

    // 删除family
    deleteFamily(index) {
      this.families.splice(index, 1);
    },

    // select 切换时值变动
    changeValue(family, index, ev) {
      family.selList[index].val =
        typeof family[ev] == "boolean" ? family[ev].toString() : family[ev];
    },

    changeProperty(family, index, ev) {
      family[family.selList[index].sel] = ev;
    },
    // 提交创建表
    submitTable() {
      if (this.tablename.trim() == "") {
        this.message("error", "表名不能为空");
        return;
      }
      let families =
        this.families.length != 0
          ? this.families
          : [
              {
                blockCacheEnabled: "false",
                blocksize: 8192,
                bloomFilterType: "ROW",
                compressionType: "NONE",
                dataBlockEncoding: "NONE",
                familyName: "f",
                inMemory: "false",
                maxVersions: 10,
                timeToLive: 100
              }
            ];

      // 筛选属性不为空的family
      if (this.families.length > 1) {
        this.families = this.families.filter(item => {
          return item.num > 0;
        });
      }
      let data = {
        columnFamilies: families,
        namespace: this.tab.name,
        tableSubname: this.tablename
      };
      if (this.isshowtable) {
        hbase.tableCreate(data, res => {
          if (res.data.data) {
            this.message("success", "新建表成功");
            this.isshowtable = false;
            this.$emit("updateList");
            return;
          }
          this.message("error", "新建表失败");
        });
      } else {
        hbase.tableModify(data, res => {
          if (res.data.data) {
            this.message("success", "编辑表成功");
            this.isshowtableEdit = false;
            return;
          }
          this.message("error", "编辑表失败");
        });
      }
    },

    //删除表
    deleteTable(row) {
      let data = {
        tablename: `${this.tab.name}:${row.table}`
      };
      hbase.tableDelete(data, res => {
        if (res.data.code == 0) {
          this.message("success", "删除成功");
          this.$emit("updateList");
          return;
        }
      });
    },

    // 换页
    changePage(page) {
      let start = (page - 1) * this.pageSize;
      let end = page * this.pageSize;
      this.tempData = this.allData;
      this.selData = this.tempData.slice(start, end);
      this.totalNums = this.tempData.length;
    },

    // 切换启用状态
    changeStatus(status, row) {
      let runMethod = status ? hbase.tableuse : hbase.tabledisable;
      let data = {
        tablename: `${this.tab.name}:${row.table}`
      };
      runMethod(data, res => {
        if (res.data.code == 0 && res.data.data) {
          this.message("success", "操作成功");
          return;
        }
        this.message("error", "状态修改失败");
      });
    },

    // 搜索表
    searchTable() {
      let search = this.search.toLowerCase().trim();
      this.tempData = this.allData.filter(item => {
        let name = item.table.toLowerCase().trim();
        return name.indexOf(search) != -1;
      });
      this.selData = this.tempData.slice(0, this.pageSize);
      this.totalNums = this.tempData.length;
    },

    //编辑表
    modifyTable(row) {
      let data = {
        tablename: `${this.tab.name}:${row.table}`
      };
      hbase.tableInfos(data, res => {
        if (res.data.code == 0) {
          this.families = JSON.parse(
            JSON.stringify(res.data.data.columnFamilies)
          );
          this.defaultValueList = JSON.parse(
            JSON.stringify(res.data.data.columnFamilies)
          );
          this.families = this.families.map((item, index) => {
            item["index"] = index;
            item["nums"] = this.options.length;
            let selList = this.options.map(m => {
              return {
                sel: m.value,
                val:
                  typeof item[m.value] == "boolean"
                    ? item[m.value].toString()
                    : item[m.value]
              };
            });
            // item["selList"] = selList;

            Vue.set(item, "selList", selList);
            return item;
          });
          this.eidtData = {
            columnFamilies: this.families,
            namespace: this.tab.name,
            tableSubname: res.data.data.tablename.split(":")[1]
          };
          this.tablename = row.table;
          this.isshowtableEdit = true;
          return;
        } else {
          this.message("error", "获取数据失败");
          return;
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.tableList-wrapper {
  padding: 0 20px;
  .tableList-search--title {
    width: 50px;
  }
  .el-input--tableList {
    max-width: 200px;
    min-width: 100px;
    margin-right: 20px;
  }
  /deep/ .el-dialog__header {
    background: #f1efef;
    border-bottom: 1px solid #dcdcdc;
  }
  .table-mini {
    height: 28px;
    line-height: 28px;
  }
  .footer {
    margin-top: 20px;
    text-align: center;
  }
  [class^="el-icon-"] {
    cursor: pointer;
  }
  .pagination-table {
    text-align: right;
    margin-top: 20px;
    margin-right: 30px;
    /deep/ .btn-prev,
    /deep/ .btn-next,
    /deep/ .number {
      background: none !important;
    }
  }
}
</style>

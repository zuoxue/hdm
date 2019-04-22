<template>
  <div>
    <el-tabs v-model="hiveShow" type="border-card" @tab-click="changeTab">
      <el-tab-pane label="表" name="table">
        <div>
          <el-select v-model="select" size="mini" placeholder="请选择" @change="getTable">
            <el-option label="请选择" value=" "></el-option>
            <el-option v-for="(opt,index) in options" :key="index" :value="opt" :label="opt"></el-option>
          </el-select>
          <el-table size="mini" :data="tableData">
            <el-table-column label="序号" prop="keyIndex"></el-table-column>
            <el-table-column label="列名" prop="columnName"></el-table-column>
            <el-table-column label="值" prop="columnValue"></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="表操作" name="tablehandle">
        <el-row :gutter="30">
          <el-col :span="16" style="width:300px;">
            <el-input v-model="tableName" size="mini" placeholder="请输入表名"></el-input>
          </el-col>
          <el-col :span="6" style="width:100px;">
            <el-button @click="generatorTable" type="primary" size="mini">生成表</el-button>
          </el-col>
        </el-row>
        <el-table :data="paramsTable" size="mini" @selection-change="selectionChange">
          <el-table-column type="selection" label="序号"></el-table-column>
          <el-table-column
            v-for="(property,index) in properties"
            :key="index"
            :label="property.name"
            :prop="property.prop"
          ></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  showHiveTable,
  showHiveTableData,
  showHiveTableProperty,
  generatorTable
} from "@/api/ram/hdata";
export default {
  name: "hiveHandle",
  data() {
    return {
      hiveShow: "table",
      tabs: [],
      select: "",
      options: [],
      tableData: [],
      paramsTable: [],
      selections: [],
      tableName: "",
      properties: [
        {
          name: "属性名",
          prop: "col_name"
        },
        {
          name: "属性类型",
          prop: "data_type"
        }
      ]
    };
  },
  props: ["showTable"],
  mounted() {
    showHiveTable({ table: this.showTable }, res => {
      if (res.data.msg == "success") {
        let d = res.data.data;
        this.options = d.map(item => {
          return item.tab_name;
        });
      }
    });
  },
  methods: {
    changeTab(item) {
      this.hiveShow = item.name;
      if (this.hiveShow == "tablehandle") {
        if (this.select == "") {
          this.paramsTable = [];
          return;
        }
        this.getTableProperty();
      }
      return;
    },

    getTableProperty() {
      showHiveTableProperty(
        { database: this.showTable, table: this.select },
        res => {
          if (res.data.msg == "success") {
            this.paramsTable = res.data.data;
          }
        }
      );
    },
    selectionChange(row) {
      this.selections = row.map(item => {
        return item.col_name;
      });
    },

    generatorTable() {
      const query = {
        viewName: this.tableName,
        table: this.select,
        cloums: this.selections.join(","),
        database: this.showTable
      };
      if (this.tableName == "") {
        this.$message({
          type: "error",
          message: "请先填写一个表名"
        });
        return;
      }
      if (this.selections.length == 0) {
        this.$message({
          type: "error",
          message: "请先选择一个表字段"
        });
        return;
      }

      generatorTable(query, res => {
        if (res.data.msg == "success") {
          this.selections = [];
          this.tabName = "";
          this.$message({
            type: "success",
            message: "创建成功"
          });
          return;
        }
      });
    },
    getTable() {
      if (this.select == " ") {
        this.tableData = [];
        return;
      }
      showHiveTableData(
        { database: this.showTable, table: this.select },
        res => {
          if (res.data.msg == "success") {
            let d = res.data.data;
            console.log(d);
            this.tableData = d.map((item, index) => {
              return {
                keyIndex: index + 1,
                columnName: item.name,
                columnValue: item.value
              };
            });
            return d;
          }
        }
      );
      return;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

<template>
  <article class="hive-wrapper">
    <section>
      <el-row>
        <el-col :span="2" class="hive-run">
          <el-button size="mini" type="primary" @click="run">执行</el-button>
          <el-button size="mini" type="primary" @click="explain">Explain</el-button>
          <el-button size="mini" type="primary" @click="format">format</el-button>
          <el-button size="mini" type="primary" @click="clear">clear</el-button>
        </el-col>
        <el-col :span="22" class="hive-query">
          <el-input
            type="textarea"
            :rows="6"
            resize="none"
            placeholder="Example: SELECT * FROM tablename, or press CTRL + space"
            v-model="query"
          ></el-input>
        </el-col>
      </el-row>
      <el-row v-if="err" class="red">
        <el-col>{{hiveError}}</el-col>
      </el-row>
    </section>
    <section class="hive-result"></section>
    <section class="hive-history">
      <el-tabs v-model="hiveHistory" type="border-card" @tab-click="selTab">
        <el-tab-pane
          v-for="item in tabs"
          :key="item.index"
          :label="item.label"
          :name="item.name"
          v-if="item.show"
        >
          <component
            :is="currentTab"
            :query.sync="query"
            :queryResult="queryResult"
            :explainResult="explainResult"
          ></component>
        </el-tab-pane>
      </el-tabs>
    </section>
  </article>
</template>

<script>
import hiveHistory from "./hiveHistory";
import hiveResult from "./hiveResult";
import hiveExplain from "./hiveExplain";
import { mapActions } from "vuex";
import * as hdata from "@/api/ram/hdata";

export default {
  name: "hive",
  data() {
    return {
      err: false,
      hiveError: "",
      query: "",
      tabs: [
        {
          name: "hiveHistory",
          index: 1,
          label: "query history",
          show: true
        },
        {
          name: "hiveResult",
          index: 2,
          label: "query result",
          show: false
        },
        {
          name: "hiveExplain",
          index: 3,
          label: "Explain",
          show: false
        }
      ],
      currentTab: "hiveHistory",
      hiveHistory: "hiveHistory",
      queryResult: [],
      explainResult: []
    };
  },
  components: {
    hiveHistory,
    hiveResult,
    hiveExplain
  },

  methods: {
    ...mapActions(["SetHiveLogs"]),

    // 运行
    run() {
      this.err = false;
      if (this.query == "") {
        return;
      }
      let query = {
        sql: this.query
      };
      // 调用hive查询接口
      hdata.queryHive(query, res => {
        if (res.data.code == 0) {
          this.tabs[1].show = true;
          this.tabs[2].show = false;
          this.selTab({ name: this.tabs[1].name });
          this.hiveHistory = this.tabs[1].name;
          // this.queryResult = res.data.data.map(item => {
          //   let key = Object.keys(item)[0];
          //   let value = item[key];
          //   return { name: key, value: value };
          // });
          this.queryResult = res.data.data;

          let t = new Date();
          let d = [
            t.getFullYear(),
            t.getMonth(),
            t.getDate(),
            t.getHours(),
            t.getMinutes(),
            t.getSeconds()
          ];
          let ist = res.data.code == "0" ? "true" : "false";

          // 保存数据在vuex和localstorage
          this.SetHiveLogs(JSON.stringify([d, ist, this.query])).then(res => {
            return {};
          });
          return;
        }

        this.err = true;
        this.hiveError = res.data.msg;
      });
    },

    // 语句解析
    explain() {
      this.err = false;
      if (this.query == "") {
        return;
      }
      let query = {
        sql: this.query
      };
      // 调用hive语句解析接口
      hdata.explainHiveFunc(query, res => {
        if (res.data.code == 0) {
          this.tabs[2].show = true;
          this.selTab({ name: this.tabs[2].name });
          this.hiveHistory = this.tabs[2].name;

          this.explainResult = res.data.data;
          return;
        }

        this.err = true;
        this.hiveError = res.data.msg;
        return;
      });
    },

    // 查询格式化
    format() {
      if (this.query == "") {
        return;
      }
      let query = {
        sql: this.query
      };
      // 调用hive语句解析接口
      hdata.formatHiveFunc(query, res => {
        if (res.data.code == 0) {
          this.query = res.data.data;
          return;
        }

        this.err = true;
        this.hiveError = res.data.msg;
      });
    },

    clear() {
      this.query = "";
      this.tabs[1].show = false;
      this.tabs[2].show = false;
      // this.currentTab = "hiveHistory";
      // this.selTab({ name: this.tabs[0].name });
    },
    // 切换tab内容
    selTab(item) {
      this.currentTab = item.name;
    }
  }
};
</script>

<style scoped lang="scss">
.hive-wrapper {
  .hive-run {
    text-align: center;
    button:not(:first-child) {
      margin-top: 7px;
    }
  }
  .hive-run {
    width: 100px;
  }
  .hive-history {
    padding: 20px;
  }
}
</style>

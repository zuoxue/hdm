<template>
  <div>
    <el-table :data="historyRecords" size="mini" :show-header="false" empty-text="无历史查询记录">
      <el-table-column
        v-for="header in headers"
        :key="header.index"
        :width="header.width"
        :show-overflow-tooltip="header.tooltip"
        align="left"
        :prop="header.prop"
      ></el-table-column>
      <el-table-column label="result">
        <template slot-scope="scope">
          <a href="javscript:;" @click="selectQuesy(scope.row)">{{scope.row.result}}</a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";

export default {
  name: "hiveHistory",
  data() {
    return {
      historyRecords: [
      ],
      headers: [
        {
          index: 1,
          width: "100px",
          tooltip: false,
          prop: "time"
        },
        {
          index: 2,
          width: "100px",
          tooltip: false,
          prop: "issuccess"
        }
        // {
        //   index: 3,
        //   width: "",
        //   tooltip: true,
        //   // prop: "result"
        // }
      ]
    };
  },

  methods: {
    selectQuesy(row) {
      this.$emit("update:query", row.result);
    }
  },
  mounted() {
    moment.locale("zh-cn");
    let data = this.hivelogs.split(";").reverse();
    data.map(item=>{
      let i = JSON.parse(item);
      let d = {
        time: moment(i[0]).fromNow(),
        issuccess: i[1],
        result: i[2]
      };
      this.historyRecords.push(d);
    })
  },
  computed: {
    ...mapGetters(["impalalogs", "hivelogs"])
  }
};
</script>

<style>
</style>

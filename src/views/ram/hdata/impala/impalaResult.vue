<template>
  <div>
    <!-- <el-table size="mini" :data="queryResult" :show-header="false">
      <el-table-column
        v-for="header in headers"
        :key="header.index"
        :label="header.name"
        :prop="header.prop"
      ></el-table-column>
    </el-table>-->
    <pre>{{queryResult}}</pre>
  </div>
</template>

<script>
export default {
  name: "impalaResult",
  props: ["queryResult"],
  data() {
    return {
      // headers: [
      //   {
      //     name: "prop",
      //     prop: "name",
      //     index: 1
      //   },
      //   {
      //     name: "val",
      //     prop: "value",
      //     index: 2
      //   }
      // ]
    };
  }
};
</script>

<style>
</style>

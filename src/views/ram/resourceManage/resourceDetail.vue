<template>
  <div>
    <el-table :data="customInfo" size="mini">
      <el-table-column v-for="(d,index) in headers" :key="index" :prop="d.prop" :label="d.name"></el-table-column>
    </el-table>
    <div class="footer">
      <el-button type="primary" size="mini" @click="back">返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "resourceDetail",
  data() {
    return {
      headers: [
        {
          prop: "key",
          name: "属性"
        },
        {
          prop: "value",
          name: "属性值"
        }
      ]
    };
  },
  props: ["info"],
  mounted() {},
  computed: {
    customInfo() {
      let keys = Object.keys(this.info);
      let infos = keys.map(item => {
        return {
          key: item,
          value: this.info[item] == null ? "" : this.info[item]
        };
      });
      return infos;
    }
  },
  methods: {
    back() {
      this.$emit("update:ischeck", false);
    }
  }
};
</script>

<style scoped lang="scss">
.footer {
  text-align: center;
  margin-top: 20px;
}
</style>

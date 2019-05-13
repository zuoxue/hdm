<template>
  <div class="domain-wrapper">
    <el-form>
      <el-form-item>
        <p class="domain-name">域名称</p>
        <el-input size="small" v-model="domainName">
          <div slot="suffix" class="suffix-right">.onaliyun.com</div>
        </el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="useroverlay-footer">
      <el-button type="plain" size="small" class="confirm">确定</el-button>
      <el-button type="plain" size="small" @click="close">关闭</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "updatedomain",
  data() {
    return {
      domainName: ""
    };
  },
  props: ["isclose"],
  methods: {
    close() {
      this.$emit("update:isclose", true);
    }
  }
};
</script>

<style lang="scss" scoped>
.domain-wrapper {
  padding: 0px 24px;
  font-size: 12px;
  .domain-name {
    height: 32px;
    line-height: 32px;
    margin: 0px;
    font-size: 12px;
  }
  .suffix-right {
    margin-right: 10px;
  }
  .useroverlay-footer {
    background: #fff;
    width: 100%;
    border-top: 1px solid #efefef;
    overflow: hidden;
    height: 64px;
    line-height: 64px;
    .confirm {
      background: #00c1de;
      color: #fff;
      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>

<template>
  <div class="prelook-wrapper">
    <p class="prelook-header">
      <span @click="back" class="back">
        <i class="el-icon-back"></i>
        <span>返回</span>
      </span>
      <span class="prelook-header-lspan">{{title}}</span>
    </p>
    <hr>
    <div>
      <el-container>
        <el-aside width="200px">
          <div @click="download">下载</div>
        </el-aside>
        <el-main>
          <pre>
            {{endData}}
          </pre>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import * as hdfs from "@/api/urs/hdfs";
export default {
  name: "prelook",
  props: ["endData", "title", "path"],
  data() {
    return {};
  },
  methods: {
    back() {
      this.$emit("update:prelook", false);
    },
    download() {
      hdfs.download({ path: this.path }).then(res => {
        let data = res.data;
        if (!data) {
          return;
        }
        let url = window.URL.createObjectURL(new Blob([data]));
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.setAttribute("download", this.title);

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  }
};
</script>

<style scoped lang="scss">
.prelook-wrapper {
  .prelook-header {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    align-items: center;
    .back {
      cursor: pointer;
      padding-left: 30px;
      font-size: 28px;
      letter-spacing: 10px;
      width: 200px;
    }
    span {
      display: inline-block;
    }
    .prelook-header-lspan {
      text-align: center;
      width: calc(100% - 200px);
    }
  }
  .el-aside {
    div {
      text-align: center;
      color: #37d1d3;
      font-size: 18px;
      border-right: 1px solid #ccc;
      cursor: pointer;
      &:hover {
        color: darken(#37d1d3, 10%);
      }
    }
  }
  .el-main {
    padding: 20px !important;
  }
}
</style>

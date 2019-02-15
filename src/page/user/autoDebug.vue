<template>
  <div class="f-debug">
    <div v-if="!tabisnull">
      <span @click="addTab" class="f-tab">
        <i class="el-icon-plus f-tab-icon"></i>
      </span>
    </div>
    <el-tabs
      v-model="activeTab"
      closable
      @tab-remove="removeTab"
      tab-position="left"
      v-if="!tabisnull"
    >
      <el-tab-pane
        v-for="(item, index) in editableTabs"
        :key="index"
        :label="item.title"
        :name="item.name"
      >
        <el-row style="margin-bottom: 30px;">
          <el-col :span="1"></el-col>
          <el-col :span="4" class="f-tab-header">
            <p>methods:</p>
          </el-col>
          <el-col :span="10">
            <el-select v-model="item.method" size="small">
              <el-option value="GET" label="GET">GET</el-option>
              <el-option value="POST" label="POST">POST</el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="1"></el-col>
          <el-col :span="10">Key</el-col>
          <el-col :span="10">Value</el-col>
          <el-col :span="2"></el-col>
        </el-row>
        <el-row
          v-for="(param,index1) in item.params"
          :key="index1"
          :gutter="10"
          :class="index1!=item.params.length-1?'f-row':''"
        >
          <el-col :span="1"></el-col>

          <el-col :span="10">
            <span>
              <input type="text" v-model="param.name" @keyup="addParam(index,index1)">
            </span>
          </el-col>
          <el-col :span="10">
            <span>
              <input type="text" v-model="param.value" @keyup="addParam(index,index1)">
            </span>
          </el-col>
          <el-col :span="2">
            <span class="f-close" @click="removeItem(index,index1)">
              <i class="el-icon-close"></i>
            </span>
          </el-col>
        </el-row>
        <div class="f-footer">
          <el-button type="primary" size="small">send</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="f-plus--null el-button--primary" @click="addTab" v-else>
      <div>
        <i class="el-icon-plus"></i>
      </div>
    </div>

    <el-dialog title="新增测试地址" :visible.sync="outervisible" append-to-body>
      <el-row :gutter="10">
        <el-col :span="4" class="f-a-label">
          <span>新增地址：</span>
        </el-col>
        <el-col :span="16">
          <el-input v-model="newAddress"></el-input>
        </el-col>
      </el-row>
      <div slot="footer" style="text-align:center;">
        <el-button type="primary" size="small" @click="confirmAddress">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "autoDebug",
  data() {
    return {
      activeTab: "url1",
      editableTabs: [
        {
          uri: "http://www.baidusdsds.com/dsdsdsssssssss",
          params: [
            {
              name: "",
              value: ""
            }
          ],
          name: "url1",
          method: "GET",
          title: "http://www.baidusdsds.com/dsdsdsssssssss"
        }
      ],
      outervisible: false,
      newAddress: "",
      tabisnull: false
    };
  },
  methods: {
    addTab() {
      this.outervisible = true;
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let active = this.activeTab;
      if (targetName == active) {
        tabs.forEach(function(tab, index) {
          if (active == tab.name) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              active = nextTab.name;
            }
          }
        });
      }
      this.activeTab = active;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      if (this.editableTabs.length == 0) {
        this.tabisnull = true;
      }
    },
    addParam(index, index1) {
      const len = this.editableTabs[index].params;
      if (index1 == len.length - 1) {
        this.editableTabs[index].params.push({
          name: "",
          value: ""
        });
      }
    },
    removeItem(index, index1) {
      this.editableTabs[index].params.splice(index1, 1);
    },
    confirmAddress() {
      var urlreg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
      if (urlreg.test(this.newAddress)) {
        var newtab = {
          uri: this.newAddress,
          params: [
            {
              name: "",
              value: ""
            }
          ],
          name: `tab${new Date()}`,
          title: this.newAddress,
          method: "GET"
        };
        this.editableTabs.push(newtab);
      } else {
        this.$message({
          type: "error",
          message: "创建失败"
        });
        return;
      }

      if (this.tabisnull) {
        this.tabisnull = false;
        this.activeTab = this.editableTabs[0].name;
      }

      this.outervisible = false;
      this.newAddress = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.f-debug {
  height: 100%;
  .f-tab {
    position: relative;
    left: 190px;
    border: 1px solid #ccc;
    top: 5px;
    display: inline-block;
    padding: 2px;
    margin-right: 5px;
    cursor: pointer;
    &:hover {
      color: #409eff;
      border-color: #c6e2ff;
      background-color: #ecf5ff;
    }
  }
  .f-tab-header {
    height: 32px;
    line-height: 32px;
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 400;
  }
  .f-close {
    visibility: hidden;
  }
  .f-row {
    &:hover {
      .f-close {
        visibility: visible;
        cursor: pointer;
      }
    }
  }
  .f-footer {
    text-align: center;
    margin-top: 20px;
  }
  .el-tabs {
    height: 100%;
    /deep/ .el-tabs__item {
      white-space: normal;
      word-break: break-all;
      text-align: left;
      height: auto !important;
      line-height: 1.5;
      padding-bottom: 10px;
      padding-top: 10px;
      border-bottom: 1px solid #ccc;
    }
    /deep/ .el-tabs__header {
      height: 100%;
      width: 230px;
      border-right: 1px solid #ccc;
    }
  }
}
.f-a-label {
  height: 40px;
  line-height: 40px;
  text-align: right;
}
.f-plus--null {
  text-align: center;
  font-size: 60px;
  height: 120px;
  line-height: 2;
  border: 1px solid #000;
  width: 120px;
  // box-shadow: 5px 5px 5px 1px #ccc, -5px -5px 5px 1px #ccc;
  border-radius: 50%;
  // background: rgb(10, 156, 255);
  color: #fff;
  font-weight: 400;
  margin-top: 50%;
  margin-left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
</style>

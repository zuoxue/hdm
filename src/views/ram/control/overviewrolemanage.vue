<template>
  <div class="usergroup">
    <header class="usergroup-header">
      <h3>{{recement}}</h3>
    </header>
    <article class="usergroup-article">
      <section class="usergroup-section--info">{{info}}</section>
      <section class="usergroup-section--s">
        <el-button
          type="primary"
          size="mini"
          class="usergroup-section--s-btn"
          @click="showoverlay"
        >新建RAM角色</el-button>

        <div class="usergroup-section--s-input">
          <el-input v-model="input">
            <i
              class="el-icon-search"
              slot="suffix"
              @click="handleIconClick"
              placeholder="输入颜色名称或备注"
            ></i>
          </el-input>
        </div>
      </section>
      <section>
        <el-table :data="data" style="width:100%;">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            v-for="(col,index) in columns"
            :key="index"
            :prop="col.val"
            :label="col.label"
          ></el-table-column>
        </el-table>
      </section>
    </article>

    <!-- overlay -->
    <useroverlay :title="overlayTitle" :isclose.sync="isclose" :width="width">
      <div slot="body">
        <el-form :rules="rule1" ref="form1" status-icon label-width="100px">
          <el-form-item label="用户组名称" prop="usergroupname">
            <el-input type="text" v-model="rules.usergroupname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="显示名称" prop="dispname">
            <el-input type="text" v-model="rules.dispname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="rules.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="useroverlay-footer">
        <el-button type="plain" size="small">确定</el-button>
        <el-button type="plain" size="small">关闭</el-button>
      </div>
    </useroverlay>
  </div>
</template>

<script>
import useroverlay from "@/page/user/useroverlay";
export default {
  name: "overviewusergroup",
  props: ["recement"],
  data() {
    var checkgroup = function(rule, value, callback) {
      if (value === "") {
        callback(new Error("不能为空"));
      }
      callback();
    };
    var checkdispname = function(rule, value, callback) {
      if (value === "") {
        callback(new Error("不能为空"));
      }
      callback();
    };
    return {
      info:
        "通过用户组对职责相同的RAM用户进行分类并授权，可以更加高效地管理用户及其权限。对一个用户组进行授权后，用户组内的所有用户会自动继承该用户组的权限。如果一个用户被加入到多个用户组，那么该用户将会继承多个用户组的权限。",
      selection: "",
      input: "",
      options: [
        {
          value: "用户组名称",
          label: "用户组名称",
          index: 1
        }
      ],
      columns: [
        {
          label: "RAM角色名称",
          val: "name"
        },
        {
          label: "备注",
          val: "remark"
        },
        {
          label: "创建时间",
          val: "createtime"
        },
        {
          label: "操作",
          val: "handle"
        }
      ],
      data: [],
      width: "400px",
      overlayTitle: "RAM角色管理",
      isclose: true,
      rules: {
        usergroupname: "",
        dispname: "",
        remark: ""
      },
      rule1: {
        usergroupname: [
          { validator: checkgroup, required: true, trigger: ["blur", "change"] }
        ],
        dispname: [
          {
            validator: checkdispname,
            required: true,
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    handleIconClick() {
      return;
    },
    showoverlay() {
      this.isclose = false;
    }
  },

  components: {
    useroverlay
  }
};
</script>

<style lang="scss" scoped>
.usergroup {
  .usergroup-header {
    height: 40px;
    line-height: 40px;
    margin-bottom: 16px;
    h3 {
      font-size: 28px;
    }
  }
  .usergroup-article {
    .usergroup-section--info {
      background: #fafafa;
      border: 1px solid #e5e5e5;
      padding: 16px;
      margin-bottom: 16px;
      font-size: 12px;
    }
    .usergroup-section--s {
      .usergroup-section--s-btn {
        height: 38px;
        vertical-align: top;
      }
      .usergroup-section--s-select {
        width: 200px;
        display: inline-block;
        margin-left: 16px;
      }
      .usergroup-section--s-input {
        display: inline-block;
        /deep/ .el-input__suffix {
          width: 30px;
          line-height: 38px;
          border-left: 1px solid #ccc;
          cursor: pointer;
        }
      }
    }
  }
}
</style>

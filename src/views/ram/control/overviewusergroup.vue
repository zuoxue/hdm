<template>
  <div class="usergroup">
    <header class="usergroup-header">
      <h3>{{recement}}</h3>
    </header>
    <article class="usergroup-article">
      <transition name="fade">
        <section class="usergroup-section--info" v-if="topisshow">
          {{info}}
          <div class="overview-close" @click="closeInfo">x</div>
        </section>
      </transition>
      <section class="usergroup-section--s">
        <el-button
          type="primary"
          size="mini"
          class="usergroup-section--s-btn"
          @click="showoverlay"
        >新建用户组</el-button>
        <div class="usergroup-section--s-select">
          <el-select v-model="selection" placeholder="用户组名称">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="usergroup-section--s-input">
          <el-input v-model="input">
            <i class="el-icon-search" slot="suffix" @click="handleIconClick"></i>
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
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="addusergroup(scope.row)">添加组成员</el-button>
              <el-button type="text" @click="addPerm(scope.row)">添加权限</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
    </article>

    <!-- overlay -->
    <useroverlay
      :title="overlayTitle"
      :isclose.sync="isclose"
      :width="width"
      class="useroverlay-font"
    >
      <el-scrollbar slot="body" class="popaside">
        <div>
          <el-form :rules="rule1" ref="form1" status-icon style="margin:auto 30px;">
            <el-form-item label prop="usergroupname">
              <p>
                <span class="star">*</span>用户组名称
              </p>
              <el-input type="text" v-model="rules.usergroupname" autocomplete="off"></el-input>
              <p class="useroverlay-font--default">不超过64个字符，允许英文字母、数字，或"-"</p>
            </el-form-item>
            <el-form-item prop="dispname">
              <p>
                <span class="star">*</span>显示名称
              </p>
              <el-input type="text" v-model="rules.dispname" autocomplete="off"></el-input>
              <p class="useroverlay-font--default">最大长度24个字符或汉字</p>
            </el-form-item>
            <el-form-item>
              <p>备注</p>
              <el-input type="textarea" v-model="rules.remark"></el-input>
              <p class="useroverlay-font--default">最大长度128个字符</p>
            </el-form-item>
          </el-form>
          <div class="useroverlay-footer">
            <el-button type="plain" size="small" class="confirm">确定</el-button>
            <el-button type="plain" size="small" @click="isclose=true">关闭</el-button>
          </div>
        </div>
      </el-scrollbar>
    </useroverlay>

    <!-- overlay -->
    <useroverlay :title="overlayTitle" :isclose.sync="isaddperm" :width="width">
      <el-scrollbar slot="body" class="popaside">
        <div>
          <add-perm :isclose.sync="isaddperm"></add-perm>
        </div>
      </el-scrollbar>
    </useroverlay>

    <!-- overlay -->
    <useroverlay :title="overlayTitle" :isclose.sync="isaddusergroup" :width="width">
      <el-scrollbar slot="body" class="popaside">
        <div>
          <addusergroup :isclose.sync="isaddusergroup"></addusergroup>
        </div>
      </el-scrollbar>
    </useroverlay>
  </div>
</template>

<script>
import useroverlay from "@/page/user/useroverlay";
import addPerm from "./overviewaddperm/addPerm";
import addusergroup from "./overviewaddperm/addusergroup";
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
          label: "用户组名称/显示名称",
          val: "name"
        },
        {
          label: "备注",
          val: "remark"
        },
        {
          label: "创建时间",
          val: "createtime"
        }
      ],
      data: [
        {
          name: "sss",
          remark: "ssssd",
          createtime: "2018-10-12"
        }
      ],
      width: "400px",
      overlayTitle: "新建用户组",
      isclose: true,
      topisshow: true,
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
      },
      isaddperm: true,
      isaddusergroup: true
    };
  },
  created() {
    document.addEventListener(
      "keyup",
      ev => {
        ev.preventDefault();
        if (ev.keyCode == 27) {
          this.isclose = true;
        }
        return;
      },
      true
    );
  },
  methods: {
    handleIconClick() {
      return;
    },
    showoverlay() {
      this.isclose = false;
    },
    closeInfo() {
      this.topisshow = false;
    },
    addPerm(row) {
      this.isaddperm = false;
      this.overlayTitle = "添加权限";
      this.width = "880px";
    },
    addusergroup(row) {
      this.isaddusergroup = false;
      this.overlayTitle = "添加组成员";
      this.width = "880px";
    }
  },

  components: {
    addPerm,
    useroverlay,
    addusergroup
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
      position: relative;
    }
    .usergroup-section--s {
      margin-bottom: 10px;
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
  .useroverlay-font {
    p {
      font-size: 12px;
      height: 32px;
      margin: 0px auto;
    }
    .useroverlay-font--default {
      color: #cdcdcd;
      height: 18px;
      line-height: 1.5;
      margin-top: 4px;
    }
    .star {
      color: #f15533;
      margin-right: 4px;
    }
    .useroverlay-footer {
      background: #fff;
      width: 100%;
      border-top: 1px solid #efefef;
      overflow: hidden;
      padding: 0 24px;
      height: 64px;
      line-height: 64px;
      // position: absolute;
      // bottom: 0;
      .confirm {
        background: #00c1de;
        color: #fff;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
}
</style>

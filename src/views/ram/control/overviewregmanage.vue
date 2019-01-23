<template>
  <div class="usergroup">
    <header class="usergroup-header">
      <h3>
        <i class="el-icon-back back-cursor" v-if="isadd" @click="back"></i>
        {{isadd?"新建自定义权限策略":recement}}
      </h3>
    </header>
    <article class="usergroup-article">
      <section class="usergroup-section--s" v-if="!isadd">
        <transition name="fade">
          <section class="usergroup-section--info" v-if="topisshow">
            {{info}}
            <div class="overview-close" @click="closeInfo">x</div>
          </section>
        </transition>
        <el-button
          type="primary"
          size="mini"
          class="usergroup-section--s-btn"
          @click="showoverlay"
        >新建权限策略</el-button>
        <div class="usergroup-section--s-input">
          <el-input v-model="input">
            <i class="el-icon-search" slot="suffix" @click="handleIconClick" placeholder="输入策略名或备注"></i>
          </el-input>
        </div>
        <div class="usergroup-section--s-select">
          <span>策略类型：</span>
          <el-select v-model="selection" placeholder="全部">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </section>

      <section v-if="!isadd">
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
      <div v-if="isadd">
        <section class="overviewuser-new">
          <el-row>
            <el-col :span="12">
              <div>
                <p>策略名称</p>
                <el-input v-model="regname"></el-input>
              </div>
              <div>
                <p>备注</p>
                <el-input v-model="regremark"></el-input>
              </div>
              <div>
                <p>配置模式</p>
                <el-radio-group v-model="assettype">
                  <el-radio label="first"></el-radio>
                  <el-radio label="second"></el-radio>
                </el-radio-group>
              </div>
              <div>
                <p>策略内容</p>
                <el-button type="primary" size="small" @click="showAuth">添加授权语句</el-button>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-table :data="authordata">
                <el-table-column
                  v-for="item in authorheader"
                  :key="item.index"
                  :prop="item.prop"
                  :label="item.name"
                ></el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </section>
        <section class="footer">
          <el-button type="primary" size="small">确认</el-button>
          <el-button @click="back">取消</el-button>
        </section>
      </div>
    </article>
    <!-- overlay -->
    <useroverlay :title="overlayTitle" :isclose.sync="showside" :width="width">
      <el-scrollbar slot="body" class="popaside">
        <div>
          <author-module :isclose.sync="showside"></author-module>
        </div>
      </el-scrollbar>
    </useroverlay>
  </div>
</template>

<script>
import useroverlay from "@/page/user/useroverlay";
import authorModule from "./overviewaddperm/authorModule";

export default {
  name: "overviewuser",
  props: ["recement"],
  data() {
    return {
      info:
        "通过用户组对职责相同的RAM用户进行分类并授权，可以更加高效地管理用户及其权限。对一个用户组进行授权后，用户组内的所有用户会自动继承该用户组的权限。如果一个用户被加入到多个用户组，那么该用户将会继承多个用户组的权限。",
      selection: "",
      input: "",
      options: [
        {
          value: "全部",
          label: "全部",
          index: 1
        },
        {
          value: "系统策略",
          label: "系统策略",
          index: 2
        },
        {
          value: "自定义策略",
          label: "自定义策略",
          index: 3
        }
      ],
      columns: [
        {
          label: "权限策略名称",
          val: "name"
        },
        {
          label: "备注",
          val: "remark"
        },
        {
          label: "策略类型",
          val: "regtype"
        },
        {
          label: "被引用次数",
          val: "cite"
        },
        {
          label: "操作",
          val: "handle"
        }
      ],
      authorheader: [
        {
          name: "权限效力",
          index: 0,
          prop: "validty"
        },
        {
          name: "产品/服务",
          index: 1,
          prop: "service"
        },
        {
          name: "操作名称",
          index: 2,
          prop: "hname"
        },
        {
          name: "资源",
          index: 3,
          prop: "resource"
        },
        {
          name: "限制条件",
          index: 4,
          prop: "restrict"
        },
        {
          name: "操作",
          index: 5,
          prop: "handle"
        }
      ],
      authordata: [],
      data: [],
      overlayTitle: "添加授权语句",
      isclose: true,
      showside: true,
      isadd: false,
      adduser: 1,
      topisshow: true,
      subdata: [
        {
          loginname: "",
          dispname: ""
        }
      ],
      controlpass: "",
      resetpass: "",
      multifactors: "",
      checklist: [],
      regname: "",
      regremark: "",
      assettype: "",
      width: "620px"
    };
  },
  components: {
    authorModule,
    useroverlay
  },
  created() {
    document.addEventListener(
      "keyup",
      ev => {
        ev.preventDefault();
        if (ev.keyCode == 27) {
          this.showside = true;
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
      this.isadd = true;
    },
    // back last level
    back() {
      this.isadd = false;
    },
    // autodel
    autodel(index) {
      this.subdata.splice(index, 1);
      this.adduser--;
    },
    autoadd() {
      this.subdata.push({
        loginname: "",
        dispname: ""
      });
      this.adduser++;
    },
    closeInfo() {
      this.topisshow = false;
    },
    showAuth() {
      this.showside = false;
    }
  },
  computed: {
    newLenArray() {
      var arr = new Array(this.adduser);
      return arr;
    }
  }
};
</script>

<style lang="scss" scoped>
.usergroup {
  text-align: left;
  .el-checkbox {
    /deep/ .el-checkbox__inner {
      border-color: #ccc !important;
    }
  }
  .el-radio {
    /deep/ .el-radio__inner {
      border-color: #ccc !important;
    }
  }
  .usergroup-header {
    height: 40px;
    line-height: 40px;
    margin-bottom: 16px;
    h3 {
      font-size: 28px;
    }
    .back-cursor {
      cursor: pointer;
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
        display: inline-block;
        margin-left: 16px;
        .el-select {
          width: auto !important;
        }
      }
      .usergroup-section--s-input {
        display: inline-block;
        margin-left: 10px;
        /deep/ .el-input__suffix {
          width: 30px;
          line-height: 38px;
          border-left: 1px solid #ccc;
          cursor: pointer;
        }
      }
    }
    .overviewuser-new {
      .el-radio {
        display: block;
        margin-bottom: 8px;
        & + .el-radio {
          margin-left: 0px;
        }
      }
    }
    .footer {
      margin-top: 10px;
    }
  }
}
</style>

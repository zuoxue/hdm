<template>
  <div class="usergroup">
    <header class="usergroup-header">
      <h3>
        <i class="el-icon-back back-cursor" v-if="isadd" @click="back"></i>
        {{isadd?"新建用户":recement}}
      </h3>
    </header>
    <article class="usergroup-article">
      <section class="usergroup-section--info">{{info}}</section>
      <section class="usergroup-section--s" v-if="!isadd">
        <el-button
          type="primary"
          size="mini"
          class="usergroup-section--s-btn"
          @click="showoverlay"
        >新建用户</el-button>
        <div class="usergroup-section--s-select">
          <el-select v-model="selection" placeholder="用户登陆名称">
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
          <p>
            <span>*</span>用户账户信息
          </p>
          <el-row>
            <el-col :span="13">
              <p>登录名称</p>
            </el-col>
            <el-col :span="10">
              <p>显示名称</p>
            </el-col>
          </el-row>
          <el-row v-for="(item,index) in newLenArray" :key="index" class="mb10">
            <el-col :span="13">
              <el-input v-model="subdata[index].loginname" placeholder class="el-input--addwrapper">
                <span slot="suffix">@123456213151121551.onali.com</span>
              </el-input>
            </el-col>
            <el-col :span="10">
              <el-input v-model="subdata[index].dispname" placeholder></el-input>
            </el-col>
            <el-col :span="1" v-if="index>0" class="el-icon-plus--wrapper">
              <div @click="autodel(index)">
                <i class="el-icon-close"></i>
              </div>
            </el-col>
          </el-row>
          <div>
            <el-button icon="el-icon-plus" type="text" @click="autoadd">添加用户</el-button>
          </div>
        </section>
        <section>
          <p>访问方式</p>
          <div>
            <div>
              <el-checkbox-group v-model="checklist">
                <div>
                  <el-checkbox label="控制台密码登录"></el-checkbox>
                </div>
                <div>
                  <el-checkbox label="编程访问"></el-checkbox>
                </div>
              </el-checkbox-group>
            </div>
            <div>
              <div>
                <p>控制台密码</p>
                <div>
                  <el-radio v-model="controlpass" :label="1">自动生成默认密码</el-radio>
                </div>
                <div>
                  <el-radio v-model="controlpass" :label="2">自定义登录密码</el-radio>
                </div>
              </div>
              <div>
                <p>要求重置密码</p>
                <div>
                  <el-radio v-model="resetpass" :label="1">用户在下次登录时必须重置密码</el-radio>
                </div>
                <div>
                  <el-radio v-model="resetpass" :label="2">无需重置</el-radio>
                </div>
              </div>
              <div>
                <p>多因素认证</p>
                <div>
                  <el-radio v-model="multifactors" :label="1">要求开启MFA认证</el-radio>
                </div>
                <div>
                  <el-radio v-model="multifactors" :label="2">不要求</el-radio>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="footer">
          <el-button>确认</el-button>
          <el-button @click="back">取消</el-button>
        </section>
      </div>
    </article>
  </div>
</template>

<script>
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
          value: "用户登陆名称",
          label: "用户登陆名称",
          index: 1
        },
        {
          value: "AccessKeyID",
          label: "AccessKeyID",
          index: 2
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
        },
        {
          label: "操作",
          val: "handle"
        }
      ],
      data: [],
      overlayTitle: "新建用户",
      isclose: true,
      isadd: false,
      adduser: 1,
      subdata: [
        {
          loginname: "",
          dispname: ""
        }
      ],
      controlpass: "",
      resetpass: "",
      multifactors: "",
      checklist: []
    };
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
    .overviewuser-new {
      width: 600px;
      .el-input--addwrapper {
        /deep/ .el-input__suffix-inner {
          height: 40px;
          line-height: 40px;
        }
      }
      .mb10 {
        margin-bottom: 10px;
        .el-icon-plus--wrapper {
          height: 40px;
          line-height: 40px;
          font-weight: bolder;
        }
      }
    }
  }
}
</style>

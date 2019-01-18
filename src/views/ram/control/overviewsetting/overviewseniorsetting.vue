<template>
  <main class="savesetting-wrapper">
    <section>
      <header>
        <h4 class="savesetting-header">域名管理</h4>
      </header>
      <main>
        <el-row class="savesetting-rule" :gutter="20">
          <el-col :span="12" class="savesetting-rule--domain">
            <span>默认域名</span>
            <span class="savesetting-rule--delunder">
              <a href="javascript:;" @click="updatedomain">更新</a>
            </span>
          </el-col>
          <el-col :span="12" class="savesetting-rule--domain">
            <span>域别名</span>
            <span class="savesetting-rule--delunder">
              <a href="javascript:;" @click="createdomain">创建域别名</a>
            </span>
          </el-col>
        </el-row>
        <el-row v-for="(key,index) in options" :key="index" class="savesetting-rule">
          <el-col :span="12" v-for="(child,index) in key" :key="index">
            <div style="width:300px;">
              <el-row>
                <el-col :span="12" class="savesetting-rule--gray">{{child.name}}</el-col>
                <el-col :span="12">{{child.prop}}</el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </main>
    </section>

    <!-- 用户安全设置 -->
    <section>
      <header>
        <h4 class="savesetting-header">SSO登录设置</h4>
        <span class="savesetting-header--span" @click="loginset">
          <i class="el-icon-edit"></i>编辑 SSO 登录设置
        </span>
      </header>
      <main>
        <el-row class="savesetting-rule">
          <el-col>您可以上传由外部身份提供商(IdP)提供的元数据文档并开启SSO登录功能（支持SAML 2.0标准）。通过设置SSO功能可以实现从企业本地账号系统登录到阿里云，从而满足企业的统一用户登录认证要求。</el-col>
        </el-row>
        <el-row v-for="(key,index) in savedatas" :key="index" class="savesetting-rule">
          <el-col :span="12" v-for="(child,index) in key" :key="index">
            <div style="width:300px;">
              <el-row>
                <el-col :span="12" class="savesetting-rule--gray">{{child.name}}</el-col>
                <el-col :span="12">{{child.prop}}</el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </main>
    </section>

    <useroverlay :title="overlayTitle" :isclose.sync="isclose" :width="width">
      <div slot="body">
        <updatedomain v-if="domainstatus==1"></updatedomain>
        <!--域名更新 -->
        <createdomain v-if="domainstatus==2"></createdomain>
        <!--创建域别名 -->
        <loginset v-if="domainstatus==3"></loginset>
        <!--sso登录设置-->
      </div>
    </useroverlay>
  </main>
</template>

<script>
import useroverlay from "@/page/user/useroverlay";
import updatedomain from "./updatedomain";
import createdomain from "./createdomain";
import loginset from "./loginset";

export default {
  name: "overviewsavesetting",
  data() {
    return {
      options: [
        [
          {
            name: "密码长度",
            prop: "8-12位"
          },
          {
            name: "密码中必须包含",
            prop: ""
          }
        ],
        [
          {
            name: "密码有效期",
            prop: "0 天"
          },
          {
            name: "密码过期后不可登录",
            prop: "否"
          }
        ],
        [
          {
            name: "历史密码检查策略",
            prop: "禁止使用前 0 次密码"
          },
          {
            name: "密码重试约束",
            prop: "一小时内使用错误密码最大尝试 0 次登录"
          }
        ]
      ],
      savedatas: [
        [
          {
            name: "密码长度",
            prop: "8-12位"
          },
          {
            name: "密码中必须包含",
            prop: ""
          }
        ],
        [
          {
            name: "密码有效期",
            prop: "0 天"
          },
          {
            name: "密码过期后不可登录",
            prop: "否"
          }
        ],
        [
          {
            name: "历史密码检查策略",
            prop: "禁止使用前 0 次密码"
          },
          {
            name: "密码重试约束",
            prop: "一小时内使用错误密码最大尝试 0 次登录"
          }
        ]
      ],
      overlayTitle: "更新默认域名",
      width: "400px",
      isclose: true,
      domainstatus: 0
    };
  },
  components: {
    useroverlay,
    updatedomain,
    createdomain,
    loginset
  },
  methods: {
    updatedomain() {
      this.isclose = false;
      this.overlayTitle = "更新默认域名";
      this.domainstatus = 1;
    },
    createdomain() {
      this.isclose = false;
      this.overlayTitle = "创建域别名";
      this.domainstatus = 2;
    },
    loginset() {
      this.isclose = false;
      this.overlayTitle = "编辑 SSO 登录设置";
      this.domainstatus = 3;
    }
  }
};
</script>

<style lang="scss" scoped>
.savesetting-wrapper {
  height: calc(100vh - 165px);
  font-size: 14px;
  .savesetting-header {
    display: inline-block;
    margin-right: 40px;
    height: 32px;
    line-height: 32px;
  }
  .savesetting-header--span {
    color: #0070cc;
    height: 32px;
    line-height: 32px;
    cursor: pointer;
  }
  .savesetting-rule {
    height: 20px;
    line-height: 20px;
    margin-bottom: 8px;
    .savesetting-rule--gray {
      color: #8c8c8c;
    }
    .savesetting-rule--domain {
      display: flex;
      justify-content: space-between;
      .savesetting-rule--delunder {
        margin-right: 40px;
        a {
          text-decoration: none;
          color: #0070cc;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>

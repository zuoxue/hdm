<template>
  <div>
    <el-row :gutter="16">
      <el-col :span="14">
        <div>
          <div class="next-card">
            <div class="next-card--account">我的账户</div>
            <avue-data-display :option="option"></avue-data-display>
          </div>
          <div class="next-card">
            <div class="next-card--account">安全检查</div>
            <el-collapse>
              <el-collapse-item v-for="item in collapse" :key="item.index">
                <template slot="title">{{item.title}}</template>
                <div>{{item.body}}</div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="next-card pd16">
          <div class="next-card--account">账号设置</div>
          <div class="badge">主账号</div>
          <div>
            <p class="next-card--user">用户登录地址</p>
            <p class="next-card--url">
              <a :href="url">{{url}}</a>
              <el-popover placement="bottom" width="200" trigger="click" :content="clippercontent">
                <el-button
                  slot="reference"
                  v-clipboard:copy="url"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                  type="text"
                  size="mini"
                  icon="iconfont icon-fuzhi"
                >复制</el-button>
              </el-popover>
            </p>
          </div>
          <div>
            <el-button size="mini">更新默认签名</el-button>
          </div>
        </div>
        <div class="next-card clearcard pd16">
          <div class="next-card--account">快速入口</div>
          <div class="next-card--tail">
            <router-link
              tag="div"
              v-for="item in btns"
              :to="item.path"
              :key="item.index"
            >{{item.name}}</router-link>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      option: {
        data: [
          {
            count: 100,
            title: "日活跃数",
            href: "https://avue.top",
            target: "_blank",
            index: 1
          },
          {
            count: "3,000",
            title: "月活跃数",
            href: "https://avue.top",
            target: "_blank",
            index: 2
          },
          {
            count: "20,000",
            title: "年活跃数",
            href: "https://avue.top",
            target: "_blank",
            index: 3
          },
          {
            count: "40,000",
            title: "周活跃数",
            href: "https://avue.top",
            target: "_blank",
            index: 4
          }
        ]
      },
      collapse: [
        {
          index: 1,
          title: "title",
          body: "ssss"
        },
        {
          index: 2,
          title: "title",
          body: "ssss"
        },
        {
          index: 3,
          title: "title",
          body: "ssss"
        },
        {
          index: 4,
          title: "title",
          body: "ssss"
        }
      ],
      btns: [
        {
          show: false,
          name: "新建用户组",
          index: 1
        },
        {
          show: false,
          name: "新建用户",
          index: 2
        },
        {
          show: false,
          name: "添加授权",
          index: 3
        },
        {
          show: false,
          name: "新建用户自定义策略",
          index: 4
        },
        {
          show: false,
          name: "修改RAM角色",
          index: 5
        },
        {
          show: false,
          name: "修改用户RAM安全",
          index: 6
        }
      ], //快速入口列表
      url: "https://signin.aliyun.com/1424731304604773.onaliyun.com/login.htm",
      clippercontent: ""
    };
  },
  methods: {
    onCopy() {
      this.clippercontent = "复制成功";
    },
    onError() {
      this.clippercontent = "复制失败";
    }
  }
};
</script>

<style lang="scss" scoped>
.el-main--mg {
  margin-left: 16px;
  margin-right: 16px;
  .el-main--header {
    height: 48px;
    line-height: 48px;
    .el-main--header-pre {
      display: inline-block;
      color: #595959;
      text-decoration: none;
      height: 16px;
      min-width: 16px;
      font-size: 12px;
      line-height: 16px;
    }
    .el-main--header-next {
      font-size: 12px;
      color: #adadad;
      display: inline-block;
      text-decoration: none;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 16px;
      height: 16px;
      vertical-align: middle;
    }
  }
  div.pd16 {
    padding-bottom: 20px;
  }
  div.clearcard {
    margin-top: -16px;
    border-top-width: 0px;
  }
  .next-card {
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid #d8d8d8;
    padding: 0 16px;
    margin-bottom: 16px;
    font-size: 12px;
    .next-card--account {
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 80%;
      height: 40px;
      line-height: 40px;
      color: #262626;
      font-size: 14px;
      font-weight: 600;
    }
    .badge {
      background: #edf3f7 !important;
      color: #628099 !important;
      height: 24px;
      line-height: 24px;
      vertical-align: middle;
      border-radius: 12px;
      font-size: 12px;
      width: 40px;
      position: relative;
      top: -14px;
      left: 7px;
    }
    .next-card--user {
      color: #ccc;
    }
    .next-card--url {
      word-break: break-all;
      a {
        color: #0070cc;
      }
    }
    .next-card--tail {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      flex-wrap: wrap;

      div {
        width: 45%;
        height: 30px;
        border: 1px solid #ccc;
        text-align: center;
        line-height: 30px;
        border-radius: 1px;
        background: #fff;
        margin-bottom: 8px;
        cursor: pointer;
        color: #262626;
      }
    }
  }
}
</style>

<template>
  <div>
    <el-container class="el-caontainer--wrapper">
      <el-aside
        style="width:160px;"
        class="el-aside--overview"
        :class="isshowaside?'el-aside--left':''"
      >
        <el-scrollbar>
          <p class="el-side--p">RAM访问控制</p>
          <el-menu class="el-menu-vertical-demo">
            <div v-for="item in submenus" :key="item.index">
              <el-submenu v-if="item.children.length>0" :index="item.index">
                <template slot="title">
                  <span slot="title">{{item.name}}</span>
                </template>
                <el-menu-item-group v-if="item.children.length>0" :index="item.index">
                  <el-menu-item
                    v-for="child in item.children"
                    :key="child.index"
                    :index="child.index"
                    :class="active==child.index?'active':''"
                    @click="switchmenu(child.index,child.tag,child.name)"
                  >{{child.name}}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item
                :class="active==item.index?'active':''"
                @click="switchmenu(item.index,item.tag,item.name)"
                :index="item.index"
                v-else
              >{{item.name}}</el-menu-item>
            </div>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <div
        class="wind-console-menu-bar"
        :class="{'pullleft':!isshowaside}"
        @click="isshowaside=!isshowaside"
      >
        <svg
          version="1.1"
          id="图层_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="12px"
          height="12px"
          viewBox="0 0 16 16"
          enable-background="new 0 0 16 16"
          xml:space="preserve"
          v-if="!isshowaside"
        >
          <title>angle-double-left</title>
          <desc>Created with Sketch.</desc>
          <g id="angle-double-left">
            <polygon
              id="Combined-Shape"
              fill="#373D41"
              points="3.851,8.5 8.84,13.556 7.415,15 1,8.5 7.415,2 8.84,3.444"
            ></polygon>
            <polygon
              id="Combined-Shape_1_"
              fill="#8C8C8C"
              points="10.011,8.5 15,13.556 13.574,15 7.16,8.5 13.574,2 15,3.444"
            ></polygon>
          </g>
        </svg>

        <svg
          version="1.1"
          id="图层_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="12px"
          height="12px"
          viewBox="0 0 16 16"
          enable-background="new 0 0 16 16"
          xml:space="preserve"
          v-else
        >
          <title>angle-double-right</title>
          <desc>Created with Sketch.</desc>
          <g id="angle-double-right">
            <polygon
              fill="#373D41"
              points="12.149,8.5 7.16,3.444 8.585,2 15,8.5 8.585,15 7.16,13.556  "
            ></polygon>
            <polygon
              id="Combined-Shape"
              fill="#8C8C8C"
              points="5.989,8.5 1,3.444 2.426,2 8.84,8.5 2.426,15 1,13.556"
            ></polygon>
          </g>
        </svg>
      </div>
      <el-main class="el-main--mg">
        <el-scrollbar style="height:100%;">
          <div class="el-main--header">
            <div class="el-main--header-pre">
              <a href="/">RAM访问控制</a>
            </div>
            <div class="el-main--header-next">
              <span>/</span>
              <span>{{recement}}</span>
            </div>
          </div>
          <!-- <overviewMain :recement="recement"/> -->
          <!-- 动态组件，侧边栏点击显示不同组件 -->
          <component :is="tagmenu" :recement="recement"></component>

          <!-- <usergroup :recement="recement"></usergroup> -->
        </el-scrollbar>
      </el-main>
    </el-container>
    <useroverlay :title="overlayTitle" :isclose="isclose" :width="width">
      <component :is=""></component>
    </useroverlay>

  </div>
</template>

<script>
import useroverlay from "@/page/user/useroverlay";
import overviewMain from "./overviewMain";
import overviewuser from "./overviewuser";
import overviewsetting from "./overviewsetting/overviewsetting";
import overviewaddperm from "./overviewaddperm";
import overviewusergroup from "./overviewusergroup";
import overviewregmanage from "./overviewregmanage";
import overviewrolemanage from "./overviewrolemanage";
import overviewoauth from "./overviewoauth";

export default {
  name: "overview",
  data() {
    return {
      submenus: [
        {
          index: "1",
          name: "概览",
          children: [],
          tag: "overviewMain"
        },
        {
          index: "2",
          name: "人员管理",
          children: [
            {
              index: "2-1",
              name: "用户组",
              tag: "overviewusergroup"
            },
            {
              index: "2-2",
              name: "用户",
              tag: "overviewuser"
            },
            {
              index: "2-3",
              name: "设置",
              tag: "overviewsetting"
            }
          ]
        },
        {
          index: "3",
          name: "权限管理",
          children: [
            {
              index: "3-1",
              name: "授权",
              tag: "overviewaddperm"
            },
            {
              index: "3-2",
              name: "权限策略管理",
              tag: "overviewregmanage"
            }
          ]
        },
        {
          index: "4",
          name: "RAM角色管理",
          children: [],
          tag: "overviewrolemanage"
        },
        {
          index: "5",
          name: "OAuth应用管理",
          children: [],
          tag: "overviewoauth"
        }
      ],
      active: "1",
      isshowaside: false,

      overlayTitle: "新建用户组",
      isclose: true,
      width: "400px",
      recement: "概览",
      tagmenu: "overviewMain"
    };
  },
  components: {
    useroverlay,
    overviewMain,
    overviewusergroup,
    overviewsetting,
    overviewuser,
    overviewaddperm,
    overviewregmanage,
    overviewrolemanage,
    overviewoauth
  },
  methods: {
    switchmenu(index, tag, name) {
      this.active = index;
      this.tagmenu = tag;
      this.recement = name;
    }
  }
};
</script>
<style>
.el-caontainer--wrapper .el-table th {
  font-weight: 400 !important;
  background: #f2f2f2 !important;
  color: #262626 !important;
  font-size: 12px;
}
</style>

<style lang="scss" scoped>
.el-caontainer--wrapper {
  background: #fff;
  height: 100%;
  .active {
    color: #00c1de !important;
    background-color: rgba(0, 193, 222, 0.1);
  }
  .pullleft {
    left: 160px;
  }
  .el-aside--left {
    position: relative;
    left: -148px;
    // width: 20px !important;
    width: 0px !important;
    & + .wind-console-menu-bar {
      // left: 0px !important;
      right: 0px;
      left: 2px;
    }
  }
  .el-menu {
    /deep/ .el-menu-item {
      height: 40px;
      line-height: 40px;
      font-size: 12px;
      &:hover {
        color: #00c1de;
      }
    }
    /deep/ .el-submenu {
      .el-submenu__title {
        height: 40px;
        line-height: 40px;
        font-size: 12px;
      }
      .el-menu-item-group__title {
        padding: 0px;
      }
    }
    li.is-active {
      color: #303133;
    }
  }
  .el-aside--overview {
    border-right: 1px solid #e5e5e5;
    height: 100%;
    transition: all 0.5s ease-in-out;
    text-align: left;
    .el-scrollbar {
      height: 100%;
    }
    .el-side--p {
      font-size: 14px;
      font-weight: 600;
      color: #262626;
      height: 48px;
      line-height: 48px;
      border-bottom: 1px solid #e5e5e5;
      padding-left: 16px;
      margin: 0px auto;
    }
  }
  .wind-console-menu-bar {
    width: 0;
    height: 64px;
    position: absolute;
    top: 46%;
    right: -12px;
    border-right: 8px solid transparent;
    border-left: 12px solid #e5e5e5;
    border-top: 9px solid transparent;
    border-bottom: 9px solid transparent;
    cursor: pointer;
    transition: all 0.5s ease;
    &:hover {
      border-left-width: 11px;
      right: -16px;
    }
    &:after {
      content: "";
      display: inline-block;
      position: absolute;
      left: -13px;
      top: -8px;
      border-right: 8px solid transparent;
      border-left: 12px solid #fff;
      border-top: 9px solid transparent;
      border-bottom: 9px solid transparent;
      height: 62px;
    }
    svg {
      position: absolute;
      left: -16px;
      top: 16px;
      z-index: 1;
    }
  }
  .el-main--mg {
    // margin-left: 16px;
    // margin-right: 16px;
    padding: 0px 16px !important;
    text-align: left;
    font-size: 12px;
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
}
</style>

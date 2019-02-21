<template>
  <div class="wel-wrapper">
    <!-- <basic-container>
      <div class="banner-text">
        <span>
          <a href="https://avue.top/#/pay" target="_blank">
            <img src="https://img.shields.io/badge/Avue-原子弹-green.svg" alt="Build Status">
          </a>
          <img
            src="https://img.shields.io/badge/Spring%20Boot-2.0.7.RELEASE-yellowgreen.svg"
            alt="Downloads"
          >
          <img
            src="https://img.shields.io/badge/Spring%20Cloud-Finchley.SR2-blue.svg"
            alt="Coverage Status"
          >
        </span>
        <br>
        <span>
          <el-collapse v-model="activeNames">
            <el-collapse-item title="完整的微服务架构" name="1">
              <div>基于Spring Cloud Gateway</div>
              <div>基于Spring Cloud Finchley.SR2</div>
              <div>基于Spring Boot 2.0.7.RELEASE</div>
            </el-collapse-item>
            <el-collapse-item title="完善的权限控制" name="2">
              <div>基于Spring Security OAuth实现鉴权体系；</div>
              <div>深度定制，支持全流程的登录授权，Server Resource</div>
            </el-collapse-item>
            <el-collapse-item title="完美的容器化支持" name="3">
              <div>支持docker部署</div>
              <div>支持Rancher2 + Kubernetes部署</div>
              <div>支持企业Pass Rainbond 部署</div>
            </el-collapse-item>
            <el-collapse-item title="最终一致性分布式事务" name="4">
              <div>基于开源LCN 分布式事务解决方案深度定制</div>
              <div>完美兼容2.X，优化集群部署，提升性能</div>
            </el-collapse-item>
            <el-collapse-item title="SAAS多租户" name="5">
              <div>扩展Spring Cache无缝兼容</div>
              <div>支持开发过程无感知</div>
            </el-collapse-item>
            <el-collapse-item title="Activiti工作流" name="6">
              <div>基于activiti5.22整合OAuth2</div>
              <div>支持在线流程设计</div>
            </el-collapse-item>
            <el-collapse-item title="动态路由" name="7">
              <div>支持数据库存储SCG路由信息</div>
              <div>支持前端动态编辑</div>
            </el-collapse-item>
            <el-collapse-item title="其他功能" name="8">
              <div>单点登录</div>
              <div>扩展SBA支持服务监听事件redis保存</div>
              <div>扩展Turbine,定制展示UI</div>
              <div>扩展ResourceServer完全屏蔽实现细节开发更简单</div>
            </el-collapse-item>
          </el-collapse>
        </span>
      </div>
    </basic-container>-->
    <basic-container>
      <!-- <el-row>
        <el-col :xl="6" :lg="5" :md="4" :sm="3" :xs="2" v-for="(d,index) in allData" :key="index">

        </el-col>
      </el-row>-->
      <div class="wel-container">
        <el-card
          :body-style="bodyStyle"
          class="el-card--autoinfo"
          v-for="(d,index) in allData"
          :key="index"
        >
          <img :src="d.img" :alt="d.name">
          <p>{{d.name}}</p>
          <p class="card-mode">{{d.mode}}</p>
          <p>使用人数({{d.num}})</p>
          <div class="card-type">{{d.type}}</div>
          <div class="card-mt">
            <p v-for="fun in d.methods" :key="fun">{{fun}}</p>
          </div>
        </el-card>
      </div>
    </basic-container>
    <div>
      <p @click="debug=!debug">
        <a href="javascript:;">自动调试</a>
      </p>
    </div>

    <useroverlay
      :title="overlayTitle"
      :isclose.sync="debug"
      :width="width"
      class="useroverlay-font"
    >
      <el-scrollbar slot="body" class="popaside">
        <auto-debug :isclose.sync="debug"></auto-debug>
      </el-scrollbar>
    </useroverlay>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import useroverlay from "@/page/user/useroverlay";
import autoDebug from "@/page/user/autoDebug";
import { wels } from "@/const/mockmenu/wel";

export default {
  name: "wel",
  data() {
    return {
      // activeNames: ["1", "2", "3", "4"],
      // DATA: [],
      // text: "",
      // actor: "",
      // count: 0,
      // isText: false,

      overlayTitle: "自动调试",
      width: "900px",
      debug: true,
      bodyStyle: {
        padding: "5px",
        "text-align": "center",
        "font-size": "14px",
        margin: "5px"
      }
    };
  },
  computed: {
    ...mapGetters(["website"]),
    allData() {
      let d = [];
      for (var i = 0; i < 100; i++) {
        d.push(wels[0]);
      }
      return d;
    }
  },
  components: {
    useroverlay,
    autoDebug
  },
  mounted() {
    console.log(wels, 111);
  },
  methods: {
    // getData() {
    //   if (this.count < this.DATA.length - 1) {
    //     this.count++;
    //   } else {
    //     this.count = 0;
    //   }
    //   this.isText = true;
    //   this.actor = this.DATA[this.count];
    // },
    // setData() {
    //   let num = 0;
    //   let count = 0;
    //   let active = false;
    //   let timeoutstart = 5000;
    //   let timeoutend = 1000;
    //   let timespeed = 10;
    //   setInterval(() => {
    //     if (this.isText) {
    //       if (count == this.actor.length) {
    //         active = true;
    //       } else {
    //         active = false;
    //       }
    //       if (active) {
    //         num--;
    //         this.text = this.actor.substr(0, num);
    //         if (num == 0) {
    //           this.isText = false;
    //           setTimeout(() => {
    //             count = 0;
    //             this.getData();
    //           }, timeoutend);
    //         }
    //       } else {
    //         num++;
    //         this.text = this.actor.substr(0, num);
    //         if (num == this.actor.length) {
    //           this.isText = false;
    //           setTimeout(() => {
    //             this.isText = true;
    //             count = this.actor.length;
    //           }, timeoutstart);
    //         }
    //       }
    //     }
    //   }, timespeed);
    // }
  }
};
</script>

<style scoped="scoped" lang="scss">
.wel-contailer {
  position: relative;
}

.banner-text {
  position: relative;
  padding: 0 20px;
  font-size: 20px;
  text-align: center;
  color: #333;
}

.banner-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  display: none;
}

.actor {
  height: 250px;
  overflow: hidden;
  font-size: 18px;
  color: #333;
}

.actor:after {
  content: "";
  width: 3px;
  height: 25px;
  vertical-align: -5px;
  margin-left: 5px;
  background-color: #333;
  display: inline-block;
  animation: blink 0.4s infinite alternate;
}

.typeing:after {
  animation: none;
}

@keyframes blink {
  to {
    opacity: 0;
  }
}

.wel-wrapper {
  .wel-container {
    display: flex;
    flex-direction: row;
    justify-content: start;
    flex-wrap: wrap;
    p {
      margin: 0px;
      margin-bottom: 10px;
      color: #606060;
    }
    .el-card--autoinfo {
      width: 200px;
      // height: 200px;
      cursor: pointer;
      border: 1px solid #e5e5e5 !important;
      margin: 10px;
      img {
        width: 60px;
        height: 60px;
        background: 100%;
      }
      .card-mode {
        color: #1dd7b2;
        font-size: 18px;
        margin-bottom: 20px;
      }
      .card-type {
        background: #f5ba37;
        color: #fff;
        font-size: 16px;
        margin-bottom: 10px;
        display: inline-block;
        padding: 2px 10px;
      }
      .card-mt {
        display: flex;
        flex-direction: row;
        justify-content: center;
        p {
          padding: 2px 6px;
          color: #02cfd4;
          border: 1px solid;
          margin-right: 8px;
          font-style: 12px;
        }
      }
      &:hover {
        border-color: #02cfd4 !important;
      }
    }
  }
}
</style>

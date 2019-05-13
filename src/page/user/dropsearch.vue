<template>
  <div class="dropsearch">
    <div class="inp-wrapper" @click="inpfocus" :class="changeBorder?'borderBlue':''">
      <!-- <span v-for="(em,index) in emailList" :key="index" class="search-sel--style">
        {{selData}}
        <i class="el-icon-close error-cus" @click="deleteemail($event,index)"></i>
      </span>-->
      <span class="search-sel--style">
        {{selData}}
        <i class="el-icon-close error-cus"></i>
      </span>
      <input type="text" class="text" ref="inp">
    </div>
    <div class="dropsearch-blur--wrapper" v-if="isshow">
      <ul>
        <li v-if="searchListNull" style="color:#8c8c8c;">尝试输入 ID，名称 进行模糊搜索</li>
        <template v-else>
          <li
            v-for="(search,index) in searchlist"
            :key="index"
            @click="seluser($event,index)"
            class="search-item"
          >
            <el-row>
              <el-col :span="3">
                <span class="search-badge">{{search.credit}}</span>
              </el-col>
              <el-col :span="9">{{search.email}}</el-col>
              <el-col :span="12">{{search.name}}</el-col>
            </el-row>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "dropsearch",
  data() {
    return {
      searchlist: [
        {
          credit: "用户",
          email: "haige@12121545455.ali.com",
          name: "haige"
        },
        {
          credit: "用户",
          email: "haige@12121545455.ali.com",
          name: "haige"
        },
        {
          credit: "用户",
          email: "haige@12121545455.ali.com",
          name: "haige"
        },
        {
          credit: "用户",
          email: "haige@12121545455.ali.com",
          name: "haige"
        }
      ],
      emailList: [],
      searchListNull: false,
      isshow: false,
      changeBorder: false
    };
  },
  props: ["selData"],
  mounted() {
    document.addEventListener("click", () => {
      this.changeBorder = false;
      this.isshow = false;
    });
  },
  methods: {
    inpfocus(event) {
      // event.stopPropagation();
      // this.changeBorder = true;
      // this.isshow = true;
      // this.$refs.inp.focus();
      // if (this.searchlist.length == 0) {
      //   this.searchListNull = true;
      // }
    },
    seluser(event, index) {
      // event.stopPropagation();
      // this.emailList.push(this.searchlist[index].email);
      // this.searchlist.splice(index, 1);
      // if (this.searchlist.length == 0) {
      //   this.isshow = false;
      // }
    },
    deleteemail(ev, index) {
      // ev.stopPropagation();
      // this.emailList.splice(index, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.dropsearch {
  position: relative;
  z-index: 22;
  .borderBlue {
    border-color: #00bcd8 !important;
  }
  .inp-wrapper {
    height: 30px;
    border: 1px solid #e5e5e5;
    position: relative;
    .text {
      border: none;
      font-size: 12px;
      height: 24px;
      padding: 2px 10px;
      cursor: text;
      position: relative;
      bottom: 5px;
    }
    .search-sel--style {
      color: #595959;
      border-color: #e5e5e5;
      background-color: #e5e5e5;
      border-radius: 10px;
      margin: 0 5px;
      padding: 4px 6px;
      position: relative;
      bottom: 4px;
    }
    .error-cus {
      font-size: 16px;
      line-height: 18px;
      cursor: pointer;
    }
  }
  .dropsearch-blur--wrapper {
    position: absolute;
    z-index: 23;
    width: 100%;
    text-align: left;
    color: #262626;
    ul {
      list-style: none;
      border: 1px solid #e5e5e5;
      padding: 8px 0px 8px 10px;
      margin: 0;
      box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.1);
      background: #fff;
      line-height: 32px;
      font-size: 12px;
      li.search-item {
        height: 32px;
        line-height: 32px;
        background-color: #f2f2f2;
        cursor: pointer;
        .search-badge {
          padding: 0 8px;
          border-radius: 10px;
          display: inline-block;
          line-height: 22px;
          color: #fff;
          background: #999999;
          margin-left: 10px;
        }
        .el-row {
          height: 100%;
          line-height: 100%;
          .el-col {
            height: 32px;
            line-height: 32px;
          }
        }
        & + li {
          margin-top: 4px;
        }
      }
    }
  }
}
</style>

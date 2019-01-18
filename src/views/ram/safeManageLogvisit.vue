<template>
 <div>
   <el-container>
     <el-header class="removeHeight">
       <h2>访问日志</h2>
     </el-header>
     <el-main>
       <el-container>
         <el-header>
           <div class="inp-modify">
                <el-input
                  placeholder="姓名"
                  v-model="username"
                  >
                </el-input>
                <el-input
                  placeholder="资源名称"
                  v-model="resourceName"
                  class="el-input--addwidth"
                  >
                  <el-button slot="append" icon="el-icon-search" @click="filterMethod"></el-button>
                </el-input>
            </div>
         </el-header>
         <el-main class="removePadding">
           <el-table
            :data="tableData"
            :border="true"
            :stripe="true"
            :cell-style="cellStyle"
            :header-cell-style="cellStyle"
           >
            <el-table-column
              :prop="header.prop"
              v-for="(header,index) in tableHeaders"
              :key="index"
              :label="header.name"
            ></el-table-column>
           </el-table>
         </el-main>
       </el-container>
     </el-main>
     <el-footer>
       <div class="block">
          <div class="block-info">
            <span>共{{totalnum}}条记录</span>
            <span>共{{totallen}}页</span>
            <span>当前第{{currentPage1}}页</span>
          </div>
          <el-pagination
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            @prev-click="handleCurrentChange"
            @next-click="handleCurrentChange"
            :current-page.sync="currentPage1"
            :page-size="pagenums"
            layout="prev, pager,next,jumper"
            :total="totalnum">
          </el-pagination>
          <!-- <div>
            <el-button type="default" size="mini" class="block-btn">GO</el-button>
          </div> -->
        </div>
      </el-footer>
   </el-container>
 </div>
</template>

<script>
export default {
  name:'safeManageLogvisit',
  data (){
    return {
      tableHeaders:[
        {"name":'用户',"prop":"user"},
        {"name":'资源类型',"prop":"type"},
        {"name":'资源名称',"prop":"name"},
        {"name":'服务类型',"prop":"serviceType"},
        {"name":'访问类型',"prop":"visitType"},
        {"name":'时间',"prop":"date"},
        {"name":'结果',"prop":"result"},
        {"name":'客户端ip',"prop":'ip'}
      ],
      totalnum:0,
      pagenums:10,
      totallen:0,
      currentPage1:0,
      tableData:[],
      allData:[],
      filterData:[],
      username:'',
      resourceName:''
    }
  },
  mounted (){
    this.postData();
  },
  methods: {
    postData (){
      this.axios.post("/hdm/logData").then((res)=>{
        console.log(res)
        this.allData = res.data.articles;
        this.filterData = this.allData;
        this.tableData = this.filterData.slice(0,this.pagenums);
        this.totalnum = this.filterData.length;
        this.totallen = Math.floor(this.totalnum/this.pagenums);
      })
    },
    // 改变table数据样式居中
    cellStyle ({row,column,rowIndex,columnIndex}){
      return "text-align:center";
    },
    handleCurrentChange (page){
      const start = (page-1)*this.pagenums;
      const end = start+10;
      this.tableData = this.filterData.slice(start,end);
    },

    // 当前页改变时table显示数据
    handleSizeChange (page){
      if(page > this.totalnum){
        page = this.totalnum;
      }
      this.handleCurrentChange(page);
    },
    filterMethod (){
      this.filterData = this.allData;
      if(this.username){
        this.filterData = this.filterData.filter(val=>{
          return val.user.indexOf(this.username)>=0
        });
      }
      if(this.resourceName){
        this.filterData = this.filterData.filter(val=>{
          return val.name.indexOf(this.resourceName)>=0
        });
      }
      this.tableData = this.filterData.slice(0,this.pagenums)
      this.totalnum = this.tableData.length;
      this.totallen = Math.floor(this.totalnum/this.pagenums)+1;
    }
  }
}
</script>

<style lang="scss" scoped>
  .removeHeight {
    height:48px!important;
  }
  .removePadding {
    padding-left:20px!important;
    padding-right:20px!important;
  }
  .inp-modify{
    text-align: left;
    /deep/ .el-input{
      width:184px;
      height:34px;
      line-height:34px;
    }
    /deep/ .el-input__inner{
      height:34px;
      line-height:34px;
    }
    .el-input--addwidth /deep/ .el-input__inner {
      width:184px;
    }
  }
  .block {
    background:rgb(255,255,255);
    display:flex;
    justify-content: flex-end;
    .block-info {
      height:32px;
      line-height:32px;
      font-size:13px;
      font-weight:400;
      color:rgba(153,153,153,1);
    }
    .block-btn {
      width:34px;
      height:28px;
      background:rgba(230,230,230,1);
      border:1px solid rgba(224,224,224,1);
      border-radius:2px;
    }
  }

</style>

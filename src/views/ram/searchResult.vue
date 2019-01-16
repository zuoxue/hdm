<template>
  <div v-if="isshow" class="result-wrapper">
    <div class="addborder" v-for="(item,index) in searchData" :key="index">
      <div class="mr10 ml5">{{item.sdata}}</div>
      <div class="result-wrapper--info">
        <div><b>{{item.log}}</b></div>
        <div>
          <span class="mr10">用户：{{item.username}}</span>
          <span>ip地址：{{item.address}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'searchResult',
  data (){
    return {
      searchData:null,
      isshow:false
    }
  },
  mounted (){
    this.$bus.$on("searchCom",(data)=>{
        this.isshow=false;
        this.searchData = data;
        this.isshow = true;
    })
  }
}
</script>

<style scoped lang="scss">
  .result-wrapper {
    border:1px solid #ccc;
    .addborder {
      display: flex;
      flex-direction: row;
      justify-content: start;
      &:not(:last-child) {
        border-bottom:1px solid #ccc;
      }
      .mr10 {
        margin-right:10px;
      }
      .ml5 {
        margin-left:5px;
      }
    }
  }

</style>

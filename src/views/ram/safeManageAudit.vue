<template>
  <div class="safemanage-wrapper">
    <h2>审核</h2>
    <add-search></add-search>
    <search-result class="mt30"></search-result>
  </div>
</template>

<script>
import addSearch from './addSerach'
import searchResult from './searchResult'

export default {
  name:'safeManage',
  components:{
    addSearch,
    searchResult
  }
}
</script>

<style lang="scss" scoped>
  .safemanage-wrapper {
    margin-left: 16px;
    .mt30 {
      margin-top: 30px;
    }
  }
</style>

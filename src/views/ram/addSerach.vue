<template>
  <div class="main-wrapper">
    <el-form>
      <el-row :gutter="30" v-for="i in rows" :key="i">
        <el-col :span="8">
          <el-select v-model="data[i].preCommand" placeholder="命令">
            <el-option
              v-for="item in commands"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="data[i].searchMethods" placeholder="=">
            <el-option
              v-for="item in sMethods"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-input v-model="data[i].inputData"></el-input>
        </el-col>
        <el-col :span="2" class="main-border" @click.native="removeSelf(i)">-</el-col>
        <el-col :span="2" class="main-border" @click.native="addNew">+</el-col>
      </el-row>
      <el-row>
        <el-col :span="16"></el-col>
        <el-col :span="8">
          <el-button type="primary" size="large" @click="auditSearch">搜索</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name:'addSerach',
  data (){
    return {
      rowsNum:1,
      commands:[
        {
          value:1,
          label:'name'
        },
        {
          value:2,
          label:'account'
        },
        {
          value:3,
          label:'sex'
        },
        {
          value:4,
          label:'data'
        },
      ],
      data:[
        {
          preCommand:'',
          searchMethods:'',
          inputData:''
        }
      ],
      sMethods:[
        {
          value:0,
          label:'like'
        },
        {
          value:1,
          label:'not like'
        },
        {
          value:2,
          label:'%'
        }
      ]
    }
  },
  methods: {
    addNew (){
      this.rowsNum += 1;
      this.data.push({
          preCommand:'',
          searchMethods:'',
          inputData:''
        }
      )
    },
    removeSelf (i){
      if(this.data.length == 1){
        return ;
      }
      this.data.splice(i,1);
      this.rowsNum -= 1;
    },
    auditSearch (){
      const data = [
        {
          sdata:'2017年8月25日8点8分',
          log:'successful:admin',
          username:'admin',
          address:'192.168.2.122'
        },
        {
          sdata:'2017年8月25日8点8分',
          log:'successful:admin',
          username:'admin',
          address:'192.168.2.122'
        },
        {
          sdata:'2017年8月25日8点8分',
          log:'successful:admin',
          username:'admin',
          address:'192.168.2.122'
        },
        {
          sdata:'2017年8月25日8点8分',
          log:'successful:admin',
          username:'admin',
          address:'192.168.2.122'
        }
      ];
      // this.$axios.post('/',{'searchData':this.data}).then(res=>{
      //   this.$bus.$emit("searchCom",res.data);
      // })
      this.$bus.$emit("searchCom",data);

    }
  },
  computed: {
    rows (){
      const arr = [];
      for(var i = 0;i<this.rowsNum;i++){
        arr.push(i);
      }
      return arr;
    }
  },
}
</script>

<style lang="scss" scoped>
  .main-wrapper {
    .main-border {
      border:1px solid #0A7FAF;
      text-align:center;
      color:#0A7FAF;
      font-size:18px;
      width:20px;
      padding:0px!important;
      margin-right:10px;
      cursor:pointer;
      height: 20px;
      line-height: 20px;
      margin-top: 9px;
    }
  }
</style>

<template>
  <div class="drop_multy-wrapper">
    <el-row>
      <el-col :span="2">用户组:</el-col>
      <el-col :span="8">
        <el-select size="small" popper-class="select-drop" v-model="group" placeholder="请选择">
          <el-option
            v-for="(g,index) in groupList"
            :key="index"
            :value="g.groupId"
            :label="g.groupName"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="2">用户:</el-col>
      <el-col :span="8">
        <el-select size="small" v-model="user" popper-class="select-drop" placeholder="请选择">
          <el-option
            v-for="(us,index) in userList"
            :key="index"
            :label="us.username"
            :value="us.userId"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "dropMulty",
  data() {
    return {
      user: "",
      group: ""
    };
  },
  props: ["userList", "groupList", "groupval", "userval"],
  watch: {
    user() {
      this.$emit("update:userval", this.user);
    },
    group() {
      this.$emit("update:groupval", this.group);
    }
  }
};
</script>

<style lang="scss" scoped>
.drop_multy-wrapper {
}
.select-drop {
  .el-select-dropdown__item {
    height: 24px !important;
    line-height: 24px !important;
  }
}
</style>

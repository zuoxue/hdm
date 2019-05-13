<template>
  <div class="menu-wrapper">
    <el-form :model="ps" :rules="ruleMenu" ref="ps" status-icon>
      <el-form-item
        v-for="header in headers"
        :prop="header.valid?header.prop:''"
        :key="header.index"
        :label="header.label"
      >
        <el-input
          type="text"
          v-model="ps[header.prop]"
          class="inp-s"
          v-if="!header.isSelect"
          size="mini"
        ></el-input>
        <el-select name id v-model="ps[header.prop]" size="mini" v-else>
          <el-option :value="''">{{'请选择'+header.label}}</el-option>
          <el-option v-for="(menu,ind) in menuTypes" :key="ind" :value="menu.label">{{menu.label}}</el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="footer">
      <el-button type="primary" size="mini" @click="submit">{{type=="add"?'新增':'修改'}}</el-button>
      <el-button type="info" size="mini" @click="back">取消</el-button>
    </div>
  </div>
</template>

<script>
import { getMenuTypes } from "@/api/admin/menu";
import { addMenuManager, editMenuManager } from "@/api/ram/formAuth";

export default {
  name: "addmenu",
  data() {
    return {
      menuTypes: [],
      headers: [
        {
          index: 0,
          label: "菜单名称",
          prop: "name",
          isSelect: false,
          valid: true
        },
        {
          index: 1,
          label: "权限标识",
          prop: "permission",
          isSelect: false,
          valid: true
        },
        {
          index: 2,
          label: "前端url",
          prop: "path",
          isSelect: false,
          valid: false
        },
        // {
        //   index: 3,
        //   label: "type"
        // },
        {
          index: 3,
          label: "菜单类型名称",
          prop: "typeName",
          isSelect: true,
          valid: true
        }
      ],
      ps: {
        name: "",
        permission: "",
        path: "",
        typeName: "",
        type: ""
      },
      ruleMenu: {
        name: [
          { required: true, message: "不能为空", trigger: ["blur", "change"] }
        ],
        permission: [
          {
            // validator: checkPermission,
            message: "不能为空",
            required: true,
            trigger: ["blur", "change"]
          }
        ],
        typeName: [
          { required: true, message: "不能为空", trigger: ["blur", "change"] }
        ]
      }
    };
  },
  props: ["edit", "type"],
  mounted() {
    this.ps = this.edit;
    this.initData();
  },

  methods: {
    // 根据typeName获取type
    getType(value) {
      let d = "";
      for (var i = 0; i < this.menuTypes.length; i++) {
        if (value == this.menuTypes[i].label) {
          d = this.menuTypes[i].value;
          break;
        }
      }
      return d;
    },
    // 初始化数据
    initData() {
      getMenuTypes({}).then(res => {
        if (res.data.code == 0) {
          let d = res.data.data;

          let keys = Object.keys(d);
          keys.map(item => {
            this.menuTypes.push({ value: item, label: d[item] });
          });
        }
      });
    },

    // 返回
    back() {
      this.$emit("update:ishandle", false);
    },

    //提交修改
    submit() {
      this.$refs["ps"].validate(valid => {
        if (!valid) {
          return;
        }
        let data = this.ps;
        data.type = this.getType(data.typeName);
        if (this.type == "add") {
          // 新增
          addMenuManager(data, res => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: "新增权限成功"
              });
              this.ps = {
                name: "",
                permission: "",
                path: "",
                typeName: "",
                type: ""
              };
            }
          });
        } else {
          // 编辑
          editMenuManager(data, res => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: "更新权限成功"
              });
              this.$emit("update:ishandle", false);
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.menu-wrapper {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%);
  .el-form-item {
    display: flex;
    justify-content: center;
    flex-direction: row;
    // margin-bottom: 10px;
    /deep/ .el-form-item__label {
      width: 120px;
    }
    // .inp-s {
    //   width: 200px;
    //   height: 25px;
    // }
    // select {
    //   width: 200px;
    //   height: 31px;
    // }
    // .el-input {
    //   /deep/ .el-input__inner {
    //     height: 30px;
    //   }
    // }
  }
  .footer {
    text-align: center;
    margin-top: 20px;
  }
}
</style>

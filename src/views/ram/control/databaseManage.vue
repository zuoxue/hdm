<template>
  <div class="dbmanage-wrapper">
    <div class="dbmanage-left">
      <el-scrollbar class="dbmanage-scroll">
        <el-collapse v-model="expands" class="dbmanage-left--col">
          <el-collapse-item title="子用户" :name="1">
            <el-radio-group v-model="radiogroup" class="el-radio-flex">
              <el-radio
                :label="ra.userId"
                v-for="ra in ras"
                :key="ra.userId"
                @change="radioChange"
              >{{ra.username}}</el-radio>
            </el-radio-group>
          </el-collapse-item>
          <el-collapse-item
            :title="data.name"
            :name="index+2"
            v-for="(data,index) in alldatabase"
            :key="index"
          >
            <div>
              <div v-for="check in data.children" :key="check.id">
                <div v-if="check.children.length>0" style="margin-left:1rem">
                  <p>{{check.name}}</p>
                  <div style="margin-left:2rem;">
                    <el-checkbox-group
                      v-model="checkgroup"
                      @change="chgroupChange"
                      class="el-radio-flex"
                    >
                      <el-checkbox
                        v-for="checkChild in check.children"
                        :key="checkChild.id"
                        :label="checkChild.id"
                        @change="checkboxChange($event,checkChild.id)"
                      >{{checkChild.name}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-scrollbar>

      <div class="divider"></div>

      <div>
        <p class="ml20">选中表账号</p>
        <section v-for="db in dbs" :key="db.type" class="ml20">
          <p class="capitalize">{{db.type}}</p>
          <el-radio-group v-model="accoutSelect[db.type]">
            <el-radio
              v-for="singledb in db.value"
              :key="singledb.id"
              :label="singledb.id"
            >{{singledb.user_name}}</el-radio>
          </el-radio-group>
        </section>
      </div>
    </div>
    <div class="footer">
      <el-button type="primary" size="mini" @click="submitButton">提交</el-button>
    </div>

    <el-dialog :visible.sync="dbshow" title="表授权修改" class="dialog-wrapper">
      <div>
        <section v-for="(tb,index) in checkgroup" :key="index" class="dbshow-flex">
          <div>{{gettb(tb)['name']}}</div>
          <el-checkbox-group v-model="authority[index]">
            <el-checkbox label="read">读权限</el-checkbox>
            <el-checkbox label="write">写权限</el-checkbox>
          </el-checkbox-group>
        </section>
      </div>
      <div class="footer">
        <el-button size="mini" type="primary">提交</el-button>
        <el-button size="mini" type="default" @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAllUserChild } from "@/api/ram/user";
import { mapGetters } from "vuex";
import { getAllChildTable, setUnique, objToArr } from "@/util/util.js";
import {
  getAllDatabase,
  getCheckedTree,
  updateTable,
  getdbAccount
} from "@/api/ram/databaseManage";

export default {
  name: "databaseManage",
  data() {
    return {
      expands: [1, 2, 3, 4],
      radiogroup: "",
      ras: [],
      alldatabase: [],
      checkgroup: [],
      initChecked: [],
      modifyArr: [],
      deleteArr: [],
      dbs: [],
      accoutSelect: {
        Hive: null,
        Oracle: null,
        Impala: null
      },
      dbshow: false,
      allDataref: null,
      authority: [],
      categorys: {}
    };
  },
  computed: {
    ...mapGetters(["userId"])
  },

  mounted() {
    this.initData();
    this.getdbs();
  },
  methods: {
    gettb(tb) {
      return this.allDataref[tb];
    },
    initData() {
      let query = {
        ownerId: this.userId
      };
      let param = {
        userId: 1
      };
      this.modifyArr = [];
      this.deleteArr = [];
      this.initChecked = [];
      getAllUserChild(query, res => {
        if (res.data.msg == "success") {
          this.ras = res.data.data;
        }
      });
      getAllDatabase(param, res => {
        if (res.data.msg === "success") {
          this.alldatabase = res.data.data;
          this.allDataref = getAllChildTable(this.alldatabase);
        }
      });
    },
    getdbs() {
      getdbAccount({}, res => {
        if (res.data.msg == "success") {
          this.dbs = res.data.data;
        }
      });
    },
    getTree(id) {
      let data = {
        userId: id
      };
      this.initChecked = [];
      this.modifyArr = [];
      this.deleteArr = [];
      getCheckedTree(data, res => {
        if (res.data.msg == "success") {
          this.checkgroup = res.data.data.map(item => {
            console.log(item.source_id, 999);
            this.initChecked.push(parseInt(item.source_id));
            this.categorys[parseInt(item.source_id)] = {
              table_id: item.source_id,
              type: this.allDataref[item.source_id]["type"],
              database: this.allDataref[item.source_id]["database"],
              table: this.allDataref[item.source_id]["name"]
            };
            return parseInt(item.source_id);
          });
        }
      });
    },
    checkboxChange(boo, id) {
      // this.modifyArr = this.modifyArr.filter(item => {
      //       return !this.initChecked.includes(item);
      //     });
      if (boo) {
        if (!this.initChecked.includes(id)) {
          this.modifyArr.push(id);
        } else {
          // this.modifyArr = this.modifyArr.filter(item => {
          //   return item != id;
          // });
          this.deleteArr = this.deleteArr.filter(item => {
            return item != id;
          });
        }
        this.categorys[id] = {
          table_id: id,
          type: this.allDataref[id]["type"],
          database: this.allDataref[id]["database"],
          table: this.allDataref[id]["name"]
        };
      } else {
        if (!this.initChecked.includes(id)) {
          this.modifyArr = this.modifyArr.filter(item => {
            return item != id;
          });
        } else {
          this.deleteArr.push(id);
        }
        delete this.categorys[id];
      }
      return;
    },
    chgroupChange(data) {
      // console.log(data, 66);
    },
    radioChange(data) {
      this.getTree(data);
    },
    submitButton() {
      if (this.radiogroup == "") {
        this.$message({
          type: "error",
          message: "请先选择子用户!"
        });
        return false;
      }
      let barr = objToArr(this.categorys);
      let types = barr.map(item => {
        return item.type;
      });
      let uniques = setUnique(barr);
      let isright = uniques.every(item => {
        return this.accoutSelect[item] == null;
      });
      console.log(uniques, isright, 888);
      if (isright) {
        this.$message({
          type: "error",
          message: "请先选择对应的账号!"
        });
        return false;
      }
      this.authority = new Array(this.checkgroup.length).fill([]);
      this.dbshow = true;
      // let data = {
      //   add: this.modifyArr.length > 0 ? this.modifyArr.join() : "",
      //   delete: this.deleteArr.length > 0 ? this.deleteArr.join() : "",
      //   userId: this.radiogroup * 1
      // };

      // updateTable(data, res => {
      //   console.log(res);
      //   this.getTree(this.radiogroup);
      // });
    },
    cancel() {
      this.dbshow = false;
      this.authority = [];
    }
    // expandMethod(d) {
    //   console.log(d);
    // }
  }
};
</script>

<style lang="scss" scoped>
.dbmanage-wrapper {
  .dbmanage-left {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    .dbmanage-scroll {
      width: 50%;
      height: calc(100vh - 220px);
    }
    .dbmanage-left--col {
    }
    .divider {
      height: calc(100vh - 220px);
      border: 0.5px solid #ccc;
    }
  }
  .dialog-wrapper {
    .dbshow-flex {
      // display: flex;
      // flex-direction: row;
      // justify-content: flex-start;
      display: table;
      table-layout: fixed;
      line-height: 30px;
      min-width: 600px;
      margin: auto;
      div {
        display: table-cell;

        &:first-child {
          width: 40%;
          text-align: left;
        }
      }
    }
    .footer {
      margin-top: 30px;
    }
  }

  .ml20 {
    margin-left: 20px;
    .capitalize {
      text-transform: capitalize;
    }
  }
  .el-radio-flex {
    .el-radio {
      margin-right: 30px;
      margin-bottom: 5px;
      margin-top: 5px;
      & + .el-radio {
        margin-left: 0px;
      }
    }
    .el-checkbox {
      margin-right: 30px;
      margin-bottom: 5px;
      margin-top: 5px;
      & + .el-checkbox {
        margin-left: 0px;
      }
    }
  }
  .footer {
    text-align: center;
    margin-top: 20px;
  }
}
</style>

<template>
  <div class="resource_service--hdfs">
    <el-container v-show="!prelook">
      <el-header class="el-header--rsource">
        <div class="resource_service--header">
          <h2>HDFS资源与服务</h2>
          <div>
            <el-button type="default">
              <a href="javascript:;">帮助文档</a>
            </el-button>
          </div>
        </div>

        <hr style="opacity:.5;">
      </el-header>
      <el-main>
        <el-container>
          <el-header style="line-height:60px;">
            <el-row>
              <el-col :span="8" class="mt8">
                <div class="resource-header">
                  <p style="white-space:nowrap;">集群：</p>
                  <el-select v-model="selectCluster" placeholder="集群" size="mini">
                    <el-option
                      v-for="(cluster,index) in clusters"
                      :label="cluster"
                      :value="cluster"
                      :key="index"
                    ></el-option>
                  </el-select>
                  <el-input v-model="searchCluster" size="mini">
                    <el-button slot="append" class="el-icon-search"></el-button>
                  </el-input>
                </div>
              </el-col>
              <!-- <el-col :span="4">
                <el-input v-model="searchCluster" size="mini">
                  <el-button slot="append" class="el-icon-search"></el-button>
                </el-input>
              </el-col>-->
              <el-col :span="6"></el-col>
              <el-col :span="10" class="el-resource--icon-pos mt8">
                <el-row :gutter="5">
                  <el-col :span="6" class="el-font--color-b text-right">
                    <!-- <el-button icon="el-icon-upload">上传文件</el-button> -->
                    <el-upload
                      class="upload-demo"
                      :action="uploadUrl"
                      :show-file-list="false"
                      :data="{'access_token':access_token,'path':selection.length==1?selection[0].path:''}"
                      :on-success="handleSuccess"
                      :on-error="handleError"
                      :before-upload="beforeUpload"
                    >
                      <el-button icon="el-icon-upload">上传文件</el-button>
                    </el-upload>
                  </el-col>
                  <el-col :span="6" class="el-font--color-b">
                    <el-button icon="el-icon-plus" @click="fileadd">新建</el-button>
                  </el-col>
                  <el-col :span="6" class="el-font--color-b">
                    <el-button icon="el-icon-delete" @click="deletePatchfile">删除</el-button>
                  </el-col>
                  <el-col :span="6" class="el-font--color-b">
                    <el-button @click="backHomePage">返回首页</el-button>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-header>
          <el-main class="el-resource--main_padding">
            <div class="mh10">路径：{{rootpath}}</div>
            <div v-if="renderTable">
              <el-table
                :data="tableData"
                border
                style="width:100%"
                :stripe="true"
                :cell-style="cellStyle"
                :header-cell-style="cellStyle"
                @selection-change="selectChange"
                size="mini"
              >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-tree-column
                  fixed
                  :expand-all="!1"
                  file-icon="icon icon-file"
                  folder-icon="icon icon-folder"
                  prop="pathSuffix"
                  label="名称"
                  :remote="remote"
                  :indent-size="8"
                ></el-table-tree-column>
                <el-table-column
                  :prop="header.prop"
                  v-for="(header,index) in tableHeaders"
                  :key="index"
                  :label="header.name"
                ></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="renamefile(scope.row)">重命名</el-button>
                    <el-button type="text" size="small" @click="deleteFile(scope.row)">删除</el-button>
                    <el-button type="text" size="small" @click="spermisson(scope.row)">权限</el-button>
                    <el-button type="text" size="small" @click="setuser(scope.row)">用户</el-button>
                    <el-button
                      type="text"
                      size="small"
                      @click="download(scope.row)"
                      v-if="scope.row.type!='DIRECTORY'"
                    >下载</el-button>
                    <el-button
                      type="text"
                      size="mini"
                      @click="preOutlook(scope.row)"
                      v-if="scope.row.type!='DIRECTORY'"
                    >预览</el-button>
                    <!-- <el-button type="text" size="small" v-if="scope.row.type=='DIRECTORY'" @click="manageQuota(scope.row)">配额管理</el-button> -->
                  </template>
                </el-table-column>
              </el-table>
            </div>
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
            :total="totalnum"
          ></el-pagination>
          <!-- <div>
            <el-button type="default" size="mini" class="block-btn">GO</el-button>
          </div>-->
        </div>
      </el-footer>
    </el-container>

    <!-- 预览 -->
    <prelook
      v-show="prelook"
      :prelook.sync="prelook"
      :endData="endData"
      :title="prelooktitle"
      :path="prelookPath"
    ></prelook>

    <!-- 新建文件弹框 -->
    <el-dialog title="新建" :visible.sync="dialogAdd" width="30%" :before-close="handleClose">
      <el-row justify="center" type="flex">
        <el-col :span="6" class="dialog_title--newfile">新建文件夹：</el-col>
        <el-col :span="10">
          <el-input v-model="filename"></el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAdd = false">取 消</el-button>
        <el-button type="primary" @click="dialogComfirm">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 重命名 -->
    <el-dialog title="重命名" :visible.sync="dialogRename" width="30%" :before-close="handleClose">
      <el-row justify="center" type="flex">
        <el-col :span="6" class="dialog_title--newfile">旧名称：</el-col>
        <el-col :span="10">
          <el-input v-model="oldname"></el-input>
        </el-col>
      </el-row>
      <el-row justify="center" type="flex">
        <el-col :span="6" class="dialog_title--newfile">新名称：</el-col>
        <el-col :span="10">
          <el-input v-model="newname"></el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogRename = false">取 消</el-button>
        <el-button type="primary" @click="dialogComfirmRename">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 设置权限 -->
    <el-dialog title="设置权限" :visible.sync="setpermission" width="30%">
      <el-row justify="center" type="flex">
        <el-col :span="6" class="dialog_title--newfile">path：</el-col>
        <el-col :span="10">
          <el-input v-model="permissonPath" disabled size="mini"></el-input>
        </el-col>
      </el-row>
      <el-row justify="center" type="flex">
        <el-col :span="6" class="dialog_title--newfile">permisson：</el-col>
        <el-col :span="10">
          <el-input v-model="permissonNum" size="mini" ref="permissionNum" class="permissionNum"></el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setpermission = false">取 消</el-button>
        <el-button type="primary" @click="handlePermission">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 设置用户 -->
    <el-dialog title="设置用户" :visible.sync="setusers.isshow" width="30%">
      <el-row justify="center" type="flex">
        <el-col :span="6" class="dialog_title--newfile">path：</el-col>
        <el-col :span="10">
          <el-input v-model="setusers.path" disabled size="mini"></el-input>
        </el-col>
      </el-row>
      <el-row justify="center" type="flex">
        <el-col :span="6" class="dialog_title--newfile">group:</el-col>
        <el-col :span="10">
          <el-input v-model="setusers.group" size="mini"></el-input>
        </el-col>
      </el-row>
      <el-row justify="center" type="flex">
        <el-col :span="6" class="dialog_title--newfile">owner:</el-col>
        <el-col :span="10">
          <el-input v-model="setusers.owner" size="mini"></el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setpermission = false">取 消</el-button>
        <el-button type="primary" @click="handleuser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 配额管理 -->
    <!-- <el-dialog title="配额管理" :visible.sync="quota" width="300px">
       <el-tabs v-model="activeTab" type="card">
         <el-tab-pane v-for="(item,index) in tabsPane" :key="index" name="item.name">
           <components :is="item.name"></components>
         </el-tab-pane>
       </el-tabs>
    </el-dialog>-->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  handleData,
  handleSubData,
  getfilesize,
  permission
} from "@/util/util";
import * as hdfs from "@/api/urs/hdfs";
import prelook from "./prelook";
import Qs from "qs"

export default {
  name: "resourceServicehdfs",
  data() {
    return {
      selectCluster: "",
      searchCluster: "",
      clusters: [],
      rootpath: "/",
      tableData: [],
      allData: [],
      totalnum: 0,
      pagenums: 10,
      totallen: 0,
      currentPage1: 1,
      dialogAdd: false,
      filename: "",
      uploadUrl: "/urs/admin/hdfs/filebrowser/upload",
      menus: null,
      submenus: [],
      uploadData: {},
      selection: [],
      tableHeaders: [
        // {"name":'名称',"prop":"name"},
        { name: "大小（字节）", prop: "size" },
        // { name: "所属用户", prop: "user" },
        // { name: "所属分组", prop: "group" },
        // { name: "权限", prop: "permission" },
        // { name: "配额", prop: "quota" },
        // { name: "修改时间", prop: "modifytime" }
        { name: "目录", prop: "dir" },
        { name: "权限", prop: "permission" },
        { name: "文件配额", prop: "quota" },
        { name: "空间配额", prop: "spaceQuota" },
        { name: "所属用户组", prop: "group" },
        { name: "所属用户", prop: "owner" }
      ],
      dialogRename: false,
      oldname: "",
      newname: "",
      renameurl: "",
      urlpath: "",
      renderTable: true,
      // tabsPane:[
      //   {
      //     name:"文件配额",
      //     index:1
      //   },
      //   {
      //     name:"空间配额",
      //     index:2
      //   }
      // ],
      // quota:true,
      permissonPath: "",
      permissonNum: "",
      setpermission: false,
      setusers: {
        isshow: false,
        owner: "",
        group: "",
        path: ""
      },
      prelook: false,
      endData: "",
      prelooktitle: "",
      prelookPath: ""
    };
  },
  mounted() {
    this.postData();
  },

  computed: {
    ...mapGetters(["access_token"])
  },
  methods: {
    _message(message, type) {
      this.$message({
        message,
        type
      });
    },
    // 初始化数据
    postData() {
      let url = `/urs/admin/hdfs/filebrowser/liststatus?path=/&access_token=${
        this.access_token
      }`;
      hdfs.getHdfsAllFirst(url).then(async res => {
        this.allData = handleData(
          res.data.data.FileStatuses.FileStatus,
          null,
          res.data.data.path
        );
        await Promise.all(
          this.allData.map(async res => {
            await hdfs.pathSummary({ path: res.path }, info => {
              if (info.data.code == 0) {
                let d = info.data.data.ContentSummary;
                res.size = getfilesize(d.spaceConsumed);
                res.directoryCount = d.directoryCount;
                res.fileCount = d.fileCount;
                res.spaceQuota = d.spaceQuota == -1 ? "-" : d.spaceQuota;
                res.quota = d.quota == -1 ? "-" : d.quota;
              } else {
                this.$message({
                  type: "error",
                  message: info.data.msg
                });
              }
            });
          })
        );
        this.tableData = this.allData.slice(0, this.pagenums);
        this.totalnum = this.allData.length;
        this.totallen = Math.floor(this.totalnum / this.pagenums);
      });
    },
    remote(row, callback) {
      let url = `/urs/admin/hdfs/filebrowser/liststatus?path=${
        row.path
      }&access_token=${this.access_token}`;
      this.rootpath = row.path;
      hdfs
        .getHdfsAllFirst(url)
        .then(async res => {
          const submenus = handleSubData(
            res.data.data.FileStatuses.FileStatus,
            row.id,
            res.data.data.path,
            row.depth + 1
          );
          await Promise.all(
            submenus.map(async res => {
              await hdfs.pathSummary({ path: res.path }, info => {
                if (info.data.code == 0) {
                  let d = info.data.data.ContentSummary;
                  res.size = getfilesize(d.spaceConsumed);
                  res.directoryCount = d.directoryCount;
                  res.fileCount = d.fileCount;
                  res.spaceQuota = d.spaceQuota == -1 ? "-" : d.spaceQuota;
                  res.quota = d.quota == -1 ? "-" : d.quota;
                } else {
                  this.$message({
                    type: "error",
                    message: info.data.msg
                  });
                }
              });
            })
          );
          if (submenus.length > 0) {
            callback(submenus.filter(f => f["parent_id"] == row["id"]));
          } else {
            callback();
          }
        })
        .catch(err => {
          return;
        });
      // callback(this.submenus.filter(f => f["parent_id"] == row["id"]));
    },
    //table选中记录
    selectChange(selection) {
      this.selection = selection;
    },
    // 改变table数据样式居中
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return "text-align:left";
    },
    handleCurrentChange(page) {
      const start = (page - 1) * this.pagenums;
      const end = start + this.pagenums;
      this.tableData = this.allData.slice(start, end);
    },

    // 当前页改变时table显示数据
    handleSizeChange(page) {
      if (page > this.totalnum) {
        page = this.totalnum;
      }
      this.handleCurrentChange(page);
    },
    // 上传判断，必须有文件夹被选中
    beforeUpload(file) {
      if (this.selection.length != 1) {
        this._message("请确认选中了一个文件夹!", "info");
        return false;
      }
      if (this.selection[0].type != "DIRECTORY") {
        this._message("请确认选中了一个文件夹!", "info");
        return false;
      }
    },

    //上传成功提示
    handleSuccess(res, file, fileList) {
      this._message("上传成功！", "success");
      this.postData();
    },
    handleError() {
      this._message("上传失败！", "error");
    },
    //关闭提示
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 新建文件判断
    fileadd() {
      // if (this.selection.length != 1) {
      //   this._message("请先选中新建的文件夹位置！", "info");
      //   return false;
      // }
      // if (this.selection[0].flag == 1) {
      //   this._message("请先选中新建的文件夹位置！", "info");
      //   return false;
      // }
      this.dialogAdd = true;
    },
    // 确认新建文件
    dialogComfirm() {
      if (this.filename == "") {
        return;
      }
      hdfs
        .createDir({
          access_token: this.access_token,
          path: `${this.selection[0] ? this.selection[0].path : "/"}/${
            this.filename
          }`,
          permission: 755
        })
        .then(res => {
          this.dialogAdd = false;
          this._message("新建成功!", "success");
          this.postData();
        });
    },

    //删除自身
    deleteFile(row) {
      console.log(row, 4545,row.pathSuffix);
      this.$confirm("确认删除吗？", "删除", {
        showCancelButton: true
      })
        .then(() => {
          hdfs
            .deleteHdfs({
              access_token: this.access_token,
              path:row.dir +"/"+row.pathSuffix,
              recursive: true
            })
            .then(res => {
              if (res.data.code == 0) {
                this._message("删除成功！", "success");
                this.postData();
              } else {
                this._message("删除失败！", "error");
              }
            })
            .catch(err => {
              console.log(err, row);
            });
        })
        .catch(() => {});
    },

    // 批量删除
    deletePatchfile() {
      if (this.selection.length == 0) {
        this._message("请确认选中了一个文件或文件夹！", "info");
        return;
      }
      const allfiles = this.selection.map(res => {
        return res.path;
      });

      console.log(allfiles,999)
      // encodeURIComponent(JSON.stringify(allfiles))
      this.$confirm("确认删除吗？", "删除", {
        showCancelButton: true
      })
        .then(() => {
          hdfs
            .deleteHdfsAll({
              access_token: this.access_token,
              paths:allfiles,
              recursive: true
            })
            .then(res => {
              console.log(res, 777);
              this._message("删除成功！", "success");
              this.postData();
            });
        })
        .catch(() => {});
    },

    // 返回首页
    backHomePage() {
      this.$router.replace("/");
    },

    // 重命名
    renamefile(row) {
      this.oldname = row.pathSuffix;
      this.dialogRename = true;
      this.renameurl = row.path;
      // const urlpath = this.renameurl.split("/");
      // this.urlpath = urlpath.slice(0, urlpath.length - 1).join("/");
      this.urlpath = row.dir;
    },

    // 预览
    preOutlook(row) {
      this.prelooktitle = row.pathSuffix;
      this.prelookPath = row.path;
      hdfs.previewFile({ path: row.path }).then(res => {
        let data = res.data;
        if (!data) {
          return;
        }
        this.endData = data;

        this.prelook = true;

        // let url = window.URL.createObjectURL(new Blob([data]));
        // let link = document.createElement("a");
        // link.style.display = "none";
        // link.href = url;
        // document.body.appendChild(link);
        // link.click();
      });
    },
    // 下载文件
    download(row) {
      hdfs.download({ path: row.path }).then(res => {
        let data = res.data;
        if (!data) {
          return;
        }
        console.log(data, 111);
        let url = window.URL.createObjectURL(new Blob([data]));
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.setAttribute("download", row.pathSuffix);

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    },
    dialogComfirmRename() {
      if (this.newname == "") {
        this._message("请填写新名称！", "info");
        return;
      }
      hdfs
        .renameHdfs({
          access_token: this.access_token,
          path: this.renameurl,
          topath: this.urlpath + "/" + this.newname
        })
        .then(res => {
          console.log(res.data);
          if (res.data == "fail") {
            this._message("修改失败！", "error");
            return;
          }
          this._message("修改成功！", "success");
          this.dialogRename = false;
          this.postData();
        });
    },

    //权限
    spermisson(row) {
      this.permissonPath = row.path;
      this.setpermission = true;
    },
    handlePermission() {
      let reg = /^\d{3}$/;
      if (!reg.test(this.permissonNum)) {
        this.$message({
          type: "error",
          message: "请填写正确格式!"
        });
        this.$refs.permissionNum.focus();
        document
          .querySelector(".permissionNum")
          .querySelector(".el-input__inner").value = "";
        return;
      }
      let params = {
        path: this.permissonPath,
        permission: this.permissonNum
      };

      hdfs
        .setPermission(params)
        .then(res => {
          if (res.data.code == 0) {
            this._message("权限设置成功", "success");
            this.postData();
            this.setpermission = false;
            return;
          } else {
            this._message("权限设置失败", "error");
          }
        })
        .catch(err => {
          this._message("权限设置失败", "error");
        });
    },

    //设置用户组和用户
    setuser(row) {
      this.setusers = {
        owner: row.owner,
        group: row.group,
        path: row.path,
        isshow: true
      };

      return;
    },
    handleuser() {
      let query = this.setusers;
      if (query.owner && query.group) {
        hdfs
          .setUsersRel(query)
          .then(res => {
            if (res.data.code == 0) {
              this._message("用户设置成功", "success");
              this.postData();
              this.setusers.isshow = false;
              return;
            } else {
              this._message("用户设置失败", "success");
            }
          })
          .catch(err => {
            this._message("用户设置失败", "success");
          });
      }
    }
  },
  components: {
    prelook
  }
};
</script>

<style lang="scss" scoped>
.resource_service--hdfs {
  font-size: 16px;
  .el-header--rsource {
    height: 80px !important;
  }
  .resource_service--header {
    display: flex;
    justify-content: space-between;
  }
  .mt8 {
    margin-top: 8px;
  }
  .resource-header {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    p {
      width: 70px;
      line-height: 38px;
      height: 38px;
    }
  }
  .el-font--color-b {
    .el-button {
      color: #00bdf0;
    }
    .upload-demo {
      text-align: right;
    }
  }
  .el-resource--icon-pos {
    .el-button {
      width: 100%;
    }
  }
  .el-resource--main_padding {
    padding: 0 20px !important;
    .cursorStyle {
      cursor: pointer;
    }
    .mh10 {
      margin: 10px auto;
    }
  }
  .block {
    background: rgb(255, 255, 255);
    display: flex;
    justify-content: flex-end;
    .block-info {
      height: 32px;
      line-height: 32px;
      font-size: 13px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
    .block-btn {
      width: 34px;
      height: 28px;
      background: rgba(230, 230, 230, 1);
      border: 1px solid rgba(224, 224, 224, 1);
      border-radius: 2px;
    }
  }
  .dialog_title--newfile {
    height: 38px;
    line-height: 38px;
  }
  .icon-file {
    padding-right: 7px;
    padding-left: 18px;
  }

  .icon-folder,
  .icon-folder-open {
    padding-left: 7px;
    padding-right: 7px;
  }
  .el-table {
    /deep/ .el-table_1_column_2 {
      span {
        cursor: pointer;
      }
    }
  }
}
</style>

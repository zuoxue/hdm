<template>
  <div class="resource-wrapper">
    <el-form :model="resource" ref="resource" :rules="rule1" label-width="150px">
      <el-form-item
        v-for="(header,index) in headers"
        :key="index"
        :label="header"
        :prop="header"
        required
      >
        <el-input v-model="resource[header]" size="mini" :placeholder="'请填写'+header"></el-input>
      </el-form-item>
      <!-- 过期时间单独处理 -->
      <el-form-item label="expiration_ime" prop="expirationTime" required>
        <el-date-picker
          v-model="resource.expirationTime"
          type="datetime"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
      </el-form-item>

      <el-form-item>
        <div class="footer">
          <el-button type="primary" size="mini" @click="confirm">确认</el-button>
          <el-button @click="close">取消</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { addResource } from "@/api/ram/resourceManage";

export default {
  name: "createResource",
  data() {
    return {
      resource: {
        action: "",
        domain: "",
        service: "",
        region: "",
        instanceName: "",
        comment: "",
        size: 0,
        number: 0,
        expirationTime: "",
        parentId: 1,
        ownerId: 1
      },
      headers: [
        "parentId",
        "action",
        "domain",
        "service",
        "region",
        "instanceName"
      ],
      rule1: {
        action: [
          { required: true, message: "不能为空", trigger: ["blur", "change"] }
        ],
        domain: [
          { required: true, message: "不能为空", trigger: ["blur", "change"] }
        ],
        service: [
          { required: true, message: "不能为空", trigger: ["blur", "change"] }
        ],
        region: [
          { required: true, message: "不能为空", trigger: ["blur", "change"] }
        ],
        instanceName: [
          { required: true, message: "不能为空", trigger: ["blur", "change"] }
        ],
        expirationTime: [
          { required: true, message: "不能为空", trigger: ["blur", "change"] }
        ],
        parent_id: [
          {
            required: true,
            message: "不能为空",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  props: [],
  computed: {
    ...mapGetters(["userId", "access_token"])
  },
  methods: {
    close() {
      this.$emit("update:isshow", false);
    },
    confirm() {
      let params = this.headers;
      let k = 0;
      if (this.resource["expirationTime"] == "") {
        k += 1;
      }
      params.map(item => {
        if (this.resource[item] == "") {
          k += 1;
        }
      });

      if (k > 0) {
        this.$message({
          type: "error",
          message: "请填写完整!"
        });
        return;
      }
      let data = this.resource;
      data["ownerId"] = this.userId;
      data["access_token"] = this.access_token;

      console.log(data);
      addResource(data, res => {
        console.log(res, 8989);
      });
    }
  }
};
</script>

<style scoped lang="scss">
.resource-wrapper {
  .footer {
    text-align: center;
    padding-top: 30px;
    margin-left: -150px;
  }
}
</style>

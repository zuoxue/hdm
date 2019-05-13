<template>
  <div class="resourceChart_wrapper">
    <el-container>
      <el-header>资源用量</el-header>
      <el-main class="resourceChart_main">
        <el-form label-width="80px">
          <el-row>
            <el-col :span="6" class="main-row--col1">
              <el-form-item label="资源：">
                <el-select v-model="resource" size="mini">
                  <el-option
                    v-for="(option,index) in options"
                    :key="index"
                    :label="option.label"
                    :value="option.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="main-row--col2">
              <el-form-item label="时间：">
                <!-- <el-date-picker
                  size="mini"
                  v-model="startTime"
                  type="datetime"
                  placeholder="开始日期"
                  align="left"
                  value-format="yyyy-MM-dd HH:mm:SS"
                  class="main-col--eldate_start"
                ></el-date-picker>
                <el-date-picker
                  size="mini"
                  v-model="endTime"
                  type="datetime"
                  placeholder="结束日期"
                  align="left"
                  class="main-col--eldate_end"
                  value-format="yyyy-MM-dd HH:mm:SS"
                ></el-date-picker>-->
                <el-date-picker
                  v-model="startTime"
                  type="date"
                  placeholder="选择日期"
                  class="main-col--eldate_start"
                  value-format="yyyy-MM-dd"
                  :default-value="new Date()"
                  :picker-options="pickerOptions"
                ></el-date-picker>
                <el-button size="mini" type="primary" class="main-col--btn" @click="search">查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div id="lineGraph" style="height:600px;"></div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getResourceData } from "@/api/ram/resourceChart";
import { getResourceByOwnerId } from "@/api/ram/resourceManage";
import { mapGetters } from "vuex";
export default {
  name: "resourceEcharts",
  data() {
    let d = new Date();
    let year = d.getFullYear();
    let month =
      d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
    let day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
    return {
      xarr: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      resource: "",
      dataTimestamp: "",
      startTime: year + "-" + month + "-" + day,
      options: []
      // endTime: ""
    };
  },

  mounted() {
    this.getAllResource();
    this.getData();
  },
  computed: {
    ...mapGetters(["userId", "ownerId"])
  },
  methods: {
    // 获取数据
    getData() {
      let dat = new Date();
      let hr = dat.getHours();
      let bs = new Date(
        dat.getFullYear(),
        dat.getMonth() < 10 ? "0" + dat.getMonth() : dat.getMonth(),
        dat.getDate(),
        0,
        0,
        0
      ).getTime();

      let ds = new Date(this.startTime).getTime();
      if (ds < bs) {
        hr = 23;
      }
      this.xarr = [];
      for (let i = 0; i < hr + 1; i++) {
        let h = i < 10 ? "0" + i : i;
        for (var j = 0; j < 6; j++) {
          let m = 10 * j < 10 ? "00" : j * 10;
          this.xarr.push(h + ":" + m);
        }
        // this.xarr.push(i < 10 ? "0" + i : i);
      }

      let data = {
        resourceId: this.resource,
        ownerId: this.ownerId,
        userId: this.userId,
        time: this.startTime
        // endTime: this.endTime
      };
      getResourceData(data, res => {
        let arr = new Array(this.xarr.length).fill(0);
        if (res.data.code == 0) {
          res.data.data.map(item => {
            let indice =
              parseInt(item.hour, 10) * 6 + parseInt(item.minute, 10);
            arr[indice] = item.count;
          });
        }
        console.log(arr);
        var mychart = this.$echarts.init(document.getElementById("lineGraph"));
        let option = {
          title: {
            text: `${this.startTime}日资源使用数据`,
            left: "center",
            textStyle: {}
          },
          symbolSize: 10,
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985"
              }
            },
            formatter: params => {
              let tn = params[0].name.split(":");
              let name =
                this.startTime +
                " " +
                parseInt(tn[0]) +
                "时" +
                parseInt(tn[1]) +
                "分";

              // let name = this.startTime + " " + parseInt(params[0].name) + "时";
              let value = "访问量：" + params[0].data;
              return name + "<br/>" + value;
            }
          },

          dataZoom: [
            {
              type: "slider",
              show: true,
              xAxisIndex: [0],
              start: 0,
              end: 20,
              itemStyle: {
                height: "10px"
              },
              zoomLock: true
            },

            // {
            //   type: "slider",
            //   show: false,
            //   yAxisIndex: [0],
            //   left: "93%",
            //   start: 10,
            //   end: 20,
            //   throttle: 100
            // },
            {
              type: "inside",
              xAxisIndex: [0],
              start: 0,
              end: 20
            }
            // {
            //   type: "inside",
            //   yAxisIndex: [0],
            //   start: 29,
            //   end: 36
            // }
          ],
          // visualMap: {
          //   top: 10,
          //   right: 10,
          //   pieces: [
          //     {
          //       gt: 0,
          //       lte: 50,
          //       color: "#096"
          //     },
          //     {
          //       gt: 50,
          //       lte: 100,
          //       color: "#ffde33"
          //     },
          //     {
          //       gt: 100,
          //       lte: 150,
          //       color: "#ff9933"
          //     },
          //     {
          //       gt: 150,
          //       lte: 200,
          //       color: "#cc0033"
          //     },
          //     {
          //       gt: 200,
          //       lte: 300,
          //       color: "#660099"
          //     },
          //     {
          //       gt: 300,
          //       color: "#7e0023"
          //     }
          //   ],
          //   outOfRange: {
          //     color: "#999"
          //   }
          // },
          toolbox: {
            show: true,
            right: "100px",
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              magicType: {
                show: true,
                type: ["pie", "funnel"]
              },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: this.xarr,
            axisLine: {
              // symbol: ["none", "arrow"],
              // symbolOffset: [20, 20],
              // symbolSize: [5, 5]
            },
            axisLabel: {
              interval: 5
            }
          },
          yAxis: {
            type: "value",
            splitLine: false
          },
          series: [
            {
              data: arr,
              type: "line",
              // smooth: true,
              // label: {
              //   show: true
              // },
              itemStyle: {
                color: "#f2a9a6"
              },
              lineStyle: {
                width: 1,
                color: "#3783d2"
              },
              markLine: {
                silent: true,
                lineStyle: {
                  color: "#f00b"
                },
                data: [
                  {
                    yAxis: 50
                  },
                  {
                    yAxis: 100
                  },
                  {
                    yAxis: 150
                  },
                  {
                    yAxis: 200
                  },
                  {
                    yAxis: 300
                  }
                ]
              }
              // areaStyle: {}
            }
          ]
        };
        mychart.setOption(option);

        window.addEventListener("resize", function(ev) {
          console.log(ev);
          mychart.resize();
        });
      });
    },
    //获取所有资源
    getAllResource() {
      let data = {
        ownerId: this.userId
      };
      getResourceByOwnerId(data, {}, res => {
        if (res.data.code == 0) {
          res.data.data.map(item => {
            this.options.push({
              label: item.action,
              value: item.id
            });
          });
        }
      });
    },
    // 查询
    search() {
      this.getData();
    }
  }
};
</script>

<style scoped lang="scss">
.resourceChart_wrapper {
  .resourceChart_main {
    // min-width: 1140px;
    .main-row--col1 {
      width: 300px;
    }
    .main-row--col2 {
      width: 640px;
      /deep/ .el-form-item__label {
        margin-right: 66px;
      }
      .main-col--eldate_start {
        width: 200px !important;
        margin-right: 20px;
        margin-left: -66px;
      }
      .main-col--eldate_end {
        width: 200px !important;
      }
      .main-col--btn {
        width: 60px;
        margin-left: 20px;
      }
    }
  }
}
</style>

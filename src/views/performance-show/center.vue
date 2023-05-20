<template>
  <div id="center">
    <div class="up">
      <div
        class="bg-color-black item"
        v-for="item in titleItem"
        :key="item.title"
      >
        <p class="colorBlue fw-b">{{ item.title }}</p>
        
          <dv-digital-flop
            class="dv-dig-flop mt-2"
            :config="item.number"
          />
       
      </div>
    </div>
    <div class="down">
      <!-- <div class="ranking bg-color-black">
        <span>
          <icon name="chart-pie" class="text-icon"></icon>
        </span>
        <span class="fs-xl text mx-2 mb-1 pl-3">年度负责人组件达标榜</span>
        <dv-scroll-ranking-board class="dv-scr-rank-board mt-1" :config="ranking" />
      </div> -->
      <div class="percent">
        <div class="item bg-color-black">
          <span>绩效积分</span>
          <CenterChart
            class="center-chart"
            :id="rate[0].id"
            :tips="rate[0].tips"
            :text="rate[0].text"
            :colorObj="rate[0].colorData"
          />
        </div>
        <div class="item bg-color-black">
          <span>绩效等级</span>
          <CenterChart
            class="center-chart"
            :id="rate[1].id"
            :tips="rate[1].tips"
            :text="rate[1].text"
            :colorObj="rate[1].colorData"
          />
        </div>
        <div class="water">
          <dv-water-level-pond class="dv-wa-le-po" :config="water" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CenterChart from "@/components/echart/center/centerChartRate";

export default {
  data() {
    return {
      titleItem: [
        {
          title: "月度拜访完成率",
          number: {
            number: [104],
            toFixed:1,
            textAlign: "center",
            content: "{nt}",
            style: {
              fontSize: 24
            }
          }
        },
        {
          title: "玉溪创客进货面",
          number: {
            number: [98],
            toFixed: 1,
            textAlign: "center",
            content: "{nt}",
            style: {
              fontSize: 24
            }
          }
        },
        // {
        //   title: '今日累计任务次数',
        //   number: {
        //     number: [2],
        //     toFixed: 1,
        //     textAlign: 'left',
        //     content: '{nt}',
        //     style: {
        //       fontSize: 26
        //     }
        //   }
        // },
        {
          title: "数采执行率",
          number: {
            number: [99],
            toFixed:1,
            textAlign: "center",
            content: "{nt}",
            style: {
              fontSize: 24
            }
          }
        },
        {
          title: "品牌知晓率",
          number: {
            number: [100],
            toFixed:1,
            textAlign: "center",
            content: "{nt}",
            style: {
              fontSize: 24
            }
          }
        }
        // {
        //   title: '今年达标任务个数',
        //   number: {
        //     number: [100],
        //     toFixed: 1,
        //     textAlign: 'left',
        //     content: '{nt}',
        //     style: {
        //       fontSize: 26
        //     }
        //   }
        // }
      ],
      ranking: {
        data: [
          {
            name: "周口",
            value: 55
          },
          {
            name: "南阳",
            value: 120
          },
          {
            name: "西峡",
            value: 78
          },
          {
            name: "驻马店",
            value: 66
          },
          {
            name: "新乡",
            value: 80
          },
          {
            name: "新乡2",
            value: 80
          },
          {
            name: "新乡3",
            value: 80
          },
          {
            name: "新乡4",
            value: 80
          },
          {
            name: "新乡5",
            value: 80
          },
          {
            name: "新乡6",
            value: 80
          }
        ],
        carousel: "single",
        unit: "人"
      },
      water: {
        data: [24, 45],
        shape: "roundRect",
        formatter: "部门绩效等级：A",
        waveNum: 3
      },
      // 通过率和达标率的组件复用数据
      rate: [
        {
          id: "centerRate1",
          tips: 100,
          text:'3',
          colorData: {
            textStyle: "#3fc0fb",
            series: {
              color: ["#00bcd44a", "transparent"],
              dataColor: {
                normal: "#03a9f4",
                shadowColor: "#97e2f5"
              }
            }
          }
        },
        {
          id: "centerRate2",
          tips: 100,
          text:'A',
          colorData: {
            textStyle: "#ff9800",
            series: {
              color: ["#faf3a378", "transparent"],
              dataColor: {
                normal: "#ff9800",
                shadowColor: "#fcebad"
              }
            }
          }
        }
      ]
    };
  },
  components: {
    CenterChart
  }
};
</script>

<style lang="scss" scoped>
#center {
  display: flex;
  flex-direction: column;
  .up {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    justify-content: space-around;
    .item {
      border-radius: 6px;
      padding-top: 8px;
      margin-top: 8px;
      width: 48%;
      height: 70px;
      .dv-dig-flop {
        width: 100%;
        height: 30px;
      }
    }
  }
  .down {
    padding: 6px 4px;
    padding-bottom: 0;
    width: 100%;
    display: flex;
    height: 255px;
    justify-content: space-between;
    .bg-color-black {
      border-radius: 5px;
    }
    // .ranking {
    //   padding: 10px;
    //   width: 59%;
    //   .dv-scr-rank-board {
    //     height: 225px;
    //   }
    // }
    .percent {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .item {
        width: 50%;
        height: 120px;
        .center-chart {
          font-size: 14px;
          display: flex;
          justify-content: center;
        }
        span {
          margin-top: 8px;
          font-size: 14px;
          display: flex;
          justify-content: center;
        }
      }
      .water {
        width: 100%;
        .dv-wa-le-po {
          height: 120px;
        }
      }
    }
  }
}
</style>

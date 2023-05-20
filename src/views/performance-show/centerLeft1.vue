<template>
  <div id="centerLeft1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-bar" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="text mx-2">客户拜访</span>
          <dv-decoration-3 class="dv-dec-3" />
        </div>
      </div>
      <div class="d-flex jc-center">
        <CenterLeft1Chart />
      </div>
      <!-- 4个主要的数据 -->
      <div class="bottom-data">
        <div
          class="item-box mt-2"
          v-for="(item, index) in numberData"
          :key="index"
        >
          <div class="d-flex" >
            <dv-digital-flop class="dv-digital-flop" :config="item.number" />
          </div>
          <p class="text">
            {{ item.text }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CenterLeft1Chart from '@/components/echart/centerLeft/centerLeft1Chart'
export default {
  data() {
    return {
      numberData: [
        {
          number: {
            number: [112],
            toFixed:1,
            textAlign: 'center',
            content: '{nt}',
            style: {
              fontSize: 24
            }
          },
          text: '月度拜访覆盖率'
        },
        {
          number: {
            number: [100],
            toFixed:1,
            textAlign: 'center',
            content: '{nt}',
            style: {
              fontSize: 24
            }
          },
          text: '中支乌镇进货面'
        },
        {
          number: {
            number: [100],
            toFixed: 1,
            textAlign: 'center',
            content: '{nt}',
            style: {
              fontSize: 24
            }
          },
          text: '数采准确率'
        },
        {
          number: {
            number: [8],
            textAlign: 'center',
            content: '{nt}',
            style: {
              fontSize: 24
            }
          },
          text: '香溢通安装客户数'
        }
      ]
    }
  },
  components: {
    CenterLeft1Chart
  },
  mounted() {
    // this.changeTiming()
  },
  methods: {
    changeTiming() {
      setInterval(() => {
        this.changeNumber()
      }, 3000)
    },
    changeNumber() {
      this.numberData.forEach((item, index) => {
        item.number.number[0] += ++index
        item.number = { ...item.number }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$box-width: 300px;
$box-height: 410px;

#centerLeft1 {
  padding: 16px;
  height: $box-height;
  width: $box-width;
  border-radius: 10px;
  .bg-color-black {
    height: $box-height - 30px;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
  .dv-dec-3 {
    position: relative;
    width: 100px;
    height: 20px;
    top: -3px;
  }

  .bottom-data {
    .item-box {
      & > div {
        padding-right: 5px;
      }
      font-size: 14px;
      float: right;
      position: relative;
      width: 50%;
      color: #d3d6dd;
      .dv-digital-flop {
        width:100%;
        height: 30px;
      }
      // 金币
      .coin {
        position: relative;
        top: 6px;
        font-size: 20px;
        color: #ffc107;
      }
      .colorYellow {
        color: yellowgreen;
      }
      p {
        text-align: center;
      }
    }
  }
}
</style>

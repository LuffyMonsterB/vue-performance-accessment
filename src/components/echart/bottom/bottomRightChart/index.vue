<template>
  <div>
    <Chart :cdata="cdata" />
  </div>
</template>

<script>
import Chart from './chart.vue'
export default {
  data () {
    return {
      drawTiming: null,
      cdata: {
        year: null,
        weekCategory: [],
        radarData: [],
        radarDataAvg: [],
        maxData: 5,
        weekMaxData: [],
        weekLineData: []
      }
    }
  },
  components: {
    Chart,
  },
  mounted () {
    this.drawTimingFn();
  },
  beforeDestroy () {
    clearInterval(this.drawTiming);
  },
  methods: {
    drawTimingFn () {
      this.setData();
      // this.drawTiming = setInterval(() => {
      //   this.setData();
      // }, 6000);
    },
    setData () {
      // 清空轮询数据
      this.cdata.weekCategory = [];
      this.cdata.weekMaxData = [];
      this.cdata.weekLineData = [];
      this.cdata.radarData = [];
      this.cdata.radarDataAvg = [];

      let dateBase = new Date();
      this.cdata.year = dateBase.getFullYear();
      // 周数据
      for (let i = 0; i < 9; i++) {
        // 日期
        let date = new Date();
        this.cdata.weekCategory.unshift((18-i)+':00');

        // 折线图数据
        this.cdata.weekMaxData.push(this.cdata.maxData);
        let distance = Math.round(Math.random() *5);
        this.cdata.weekLineData.push(distance);

        // 雷达图数据
        // 我的指标
        let averageSpeed = +(Math.random() * 5 + 3).toFixed(3);
        let maxSpeed = averageSpeed + +(Math.random() * 3).toFixed(2);
        let hour = +(distance*5  / averageSpeed).toFixed(1);
        let radarDayData = [distance, averageSpeed, maxSpeed, hour];
        this.cdata.radarData.unshift(radarDayData);

        // 平均指标
        let distanceAvg = Math.round(Math.random() * 5);
        let averageSpeedAvg = +(Math.random() * 4 + 4).toFixed(3);
        let maxSpeedAvg = averageSpeedAvg + +(Math.random() * 2).toFixed(2);
        let hourAvg = +(distance*5  / averageSpeed).toFixed(1);
        let radarDayDataAvg = [
          distanceAvg,
          averageSpeedAvg,
          maxSpeedAvg,
          hourAvg
        ];
        this.cdata.radarDataAvg.unshift(radarDayDataAvg);
      }
      console.log(this.cdata)
      // this.cdata.weekCategory=["10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"]
      // this.cdata.weekLineData=[0,1,2,2,3,2,1,0,0]
      
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
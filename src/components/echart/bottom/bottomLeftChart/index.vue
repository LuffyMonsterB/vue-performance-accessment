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
      cdata: {
        category: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月",
        ],
        lineData: [
          81,
          85,
          90,
          87,
          85,
          82,
          86,
          89,
          92,
          90,
          89,
          93
        ],
        barData: [
          85,
          87,
          92,
          92,
          94,
          85,
          95,
          93,
          97,
          92,
          95,
          97,
          100
        ],
        rateData: []
      }
    };
  },
  components: {
    Chart,
  },
  mounted () {
    this.setData();
  },
  methods: {
    // 根据自己的业务情况修改
    setData () {
      for (let i = 0; i < this.cdata.barData.length -1; i++) {
        let rate = this.cdata.barData[i] / this.cdata.lineData[i];
        this.cdata.rateData.push(rate.toFixed(2));
      }
    },
  }
};
</script>

<style lang="scss" scoped>
</style>
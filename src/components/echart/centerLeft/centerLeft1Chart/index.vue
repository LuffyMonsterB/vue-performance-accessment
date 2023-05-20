<template>
  <div>
    <Chart :cdata="cdata" />
  </div>
</template>

<script>
import Chart from './chart.vue';
export default {
  data () {
    return {
      cdata: {
        xData: ["杭州", "绍兴", "宁波", "金华", "上海","温州"],
        seriesData: [
          { value: 10, name: "杭州" },
          { value: 5, name: "绍兴" },
          { value: 15, name: "宁波" },
          { value: 25, name: "金华" },
          { value: 20, name: "上海" },
          { value: 30, name: "温州" },
        ]
      }
    }
  },
  components: {
    Chart,
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
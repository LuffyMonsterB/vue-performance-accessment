<template>
  <div id="centerRight2">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="align-left" class="text-icon"></icon>
        </span>
        <span class=" text mx-2">终端建设情况</span>
      </div>
      <div class="d-flex ai-center flex-column body-box">
        <dv-capsule-chart class="dv-cap-chart" :config="config" />
        <centerRight2Chart1 />
      </div>
    </div>
  </div>
</template>

<script>
import centerRight2Chart1 from "@/components/echart/centerRight/centerRightChart";

export default {
  data() {
    return {
      config: {
        data: [
          {
            name: "香溢合作店",
            value: 100
          },
          {
            name: "普通终端",
            value: 98
          },
          {
            name: "一星现代终端",
            value: 67
          },
          {
            name: "二星现代终端",
            value: 30
          },
          {
            name: "三星现代终端",
            value: 55
          }
        ]
      }
    };
  },
  components: { centerRight2Chart1 }
};
</script>

<style lang="scss" scoped>
#centerRight2 {
  $box-height: 400px;
  $box-width: 320px;
  padding: 5px;
  height: $box-height;
  width: $box-width;
  border-radius: 5px;
  .bg-color-black {
    padding: 5px;
    height: $box-height;
    width: $box-width;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
  .body-box {
    border-radius: 10px;
    overflow: hidden;
    .dv-cap-chart {
      width: 100%;
      height: 160px;
    }
  }
}
</style>

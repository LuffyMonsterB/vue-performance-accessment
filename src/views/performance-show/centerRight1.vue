<template>
  <div id="centerRight1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-line" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="text mx-2">品牌培育</span>
        </div>
      </div>
      <div class="d-flex jc-center body-box">
        <dv-scroll-board class="dv-scr-board" :config="config" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      config: {
        header: ["品牌", "销售额", "订货客户数", "进货面"],
        data: [
          [
            "七匹狼（1575）",
            "0.27",
            "58",
            "<span  class='colorGrass'>↑75%</span>"
          ],
          [
            "云烟（中支乌镇之恋）",
            "0.01",
            "2",
            "<span  class='colorRed'>↓33%</span>"
          ],
          [
            "云烟（小云端）",
            "0.02",
            "2",
            "<span  class='colorGrass'>↑100%</span>"
          ],
          [
            "玉溪（创客）",
            "0.99",
            "175",
            "<span  class='colorGrass'>↑94%</span>"
          ],
          [
            "七匹狼（1575）",
            "0.27",
            "58",
            "<span  class='colorGrass'>↑75%</span>"
          ],
          [
            "云烟（中支乌镇之恋）",
            "0.01",
            "2",
            "<span  class='colorRed'>↓33%</span>"
          ],
          [
            "云烟（小云端）",
            "0.02",
            "2",
            "<span  class='colorGrass'>↑100%</span>"
          ],
          [
            "玉溪（创客）",
            "0.99",
            "175",
            "<span  class='colorGrass'>↑94%</span>"
          ],
          [
            "七匹狼（1575）",
            "0.27",
            "58",
            "<span  class='colorGrass'>↑75%</span>"
          ],
          [
            "云烟（中支乌镇之恋）",
            "0.01",
            "2",
            "<span  class='colorRed'>↓33%</span>"
          ],
          [
            "云烟（小云端）",
            "0.02",
            "2",
            "<span  class='colorGrass'>↑100%</span>"
          ],
          [
            "玉溪（创客）",
            "0.99",
            "175",
            "<span  class='colorGrass'>↑94%</span>"
          ]
        ],
        rowNum: 7, //表格行数
        headerHeight: 35,
        headerBGC: "#0f1325", //表头
        oddRowBGC: "#0f1325", //奇数行
        evenRowBGC: "#171c33", //偶数行
        columnWidth: [180]
      }
    };
  },
  components: {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
$box-height: 410px;
$box-width: 500px;
#centerRight1 {
  padding: 16px;
  padding-top: 20px;
  height: $box-height;
  width: $box-width;
  border-radius: 5px;
  .bg-color-black {
    height: $box-height - 30px;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
  .body-box {
    border-radius: 10px;
    overflow: hidden;
    .dv-scr-board {
      width: 480px;
      height: 340px;
    }
  }
}
</style>

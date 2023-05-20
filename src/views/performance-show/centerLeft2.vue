<template>
  <div id="centerLeft2">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-pie" class="text-icon"></icon>
        </span>
        <div class="d-flex">
          <span class="text mx-2">客户经理</span>
          <dv-decoration-1 class="dv-dec-1" />
        </div>
      </div>
      <div class="d-flex jc-center" style="margin-top:20px">
        <managers-pane
          width="160px"
          height="240px"
          :image="require('@/assets/persons/person1.jpg')"
        >
          
        </managers-pane>
      </div>
    </div>
  </div>
</template>

<script>
import ManagersPane from "@/components/ManagersPane";

export default {
  components: {
    ManagersPane
  }
};
</script>

<style lang="scss" scoped>
#centerLeft2 {
  $box-width: 300px;
  $box-height: 410px;
  padding: 16px;
  height: $box-height;
  min-width: $box-width;
  border-radius: 5px;
  .bg-color-black {
    height: $box-height - 30px;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
  .dv-dec-1 {
    position: relative;
    width: 100px;
    height: 20px;
    top: -3px;
  }
  
}
</style>

<template>
  <div class="work-performance-container">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="tabMapOptions[0].label" :name="tabMapOptions[0].key">
        <keep-live>
          <SCB-Table v-show="activeName == tabMapOptions[0].key" />
        </keep-live>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TabPane from "@/components/TabPane";
import SCBTable from "@/components/SCBTable";

export default {
  components: { TabPane, SCBTable},
  data() {
    return {
      tabMapOptions: [
        { label: "市场部", key: "SCB" }
      ],
      activeName: "SCB"
    };
  }
}
</script>

<style>
.work-performance-container {
  margin: 30px;
}
</style>

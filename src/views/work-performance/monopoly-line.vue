<template>
  <div class="work-performance-container">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="tabMapOptions[0].label" :name="tabMapOptions[0].key">
        <keep-live>
          <ZMS-Table v-show="activeName == tabMapOptions[0].key" />
        </keep-live>
      </el-tab-pane>
      <el-tab-pane :label="tabMapOptions[1].label" :name="tabMapOptions[1].key">
        <keep-live>
          <JCZD-Table v-show="activeName == tabMapOptions[1].key" />
        </keep-live>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TabPane from "@/components/TabPane";
import ZMSTable from "@/components/ZMSTable";
import JCZDTable from "@/components/JCZDTable";

export default {
  components: { TabPane, ZMSTable ,JCZDTable},
  data() {
    return {
      tabMapOptions: [
        { label: "专卖所", key: "ZMS" },
        { label: "稽查中队", key: "JCZD" }
      ],
      activeName: "ZMS"
    };
  }
}
</script>

<style>
.work-performance-container {
  margin: 30px;
}
</style>

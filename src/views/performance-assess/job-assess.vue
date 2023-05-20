<template>
  <div class="work-performance-container">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="tabMapOptions[0].label" :name="tabMapOptions[0].key">
        <keep-live>
          <JobsMonthlyAssessPane
            v-show="activeName == tabMapOptions[0].key"
          />
        </keep-live>
      </el-tab-pane>
      <!-- <el-tab-pane :label="tabMapOptions[1].label" :name="tabMapOptions[1].key">
        <keep-live>
          <jobs-quarterly-assess-pane v-show="activeName == tabMapOptions[1].key" />
        </keep-live>
      </el-tab-pane> -->
      <el-tab-pane :label="tabMapOptions[2].label" :name="tabMapOptions[2].key">
        <keep-live>
          <JobsAnnualAssessPane
            v-show="activeName == tabMapOptions[2].key"
          />
        </keep-live>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import JobsMonthlyAssessPane from "@/components/JobsMonthlyAssessPane";
import JobsQuarterlyAssessPane from "@/components/JobsQuarterlyAssessPane";
import JobsAnnualAssessPane from "@/components/JobsAnnualAssessPane";

export default {
  name: "JobAssess",
  components: {
    JobsMonthlyAssessPane,
    JobsQuarterlyAssessPane,
    JobsAnnualAssessPane
  },
  data() {
    return {
      tabMapOptions: [
        { label: "月度考核", key: "monthly" },
        { label: "季度考核", key: "quarterly" },
        { label: "年度考核", key: "annual" }
      ],
      activeName: "monthly"
    };
  }
};
</script>

<style>
.work-performance-container {
  margin: 30px;
}
</style>

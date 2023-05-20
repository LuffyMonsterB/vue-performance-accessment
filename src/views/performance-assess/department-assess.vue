<template>
  <div class="department-assess-container">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="tabMapOptions[0].label" :name="tabMapOptions[0].key">
        <keep-live>
          <department-quarterly-assess-pane v-show="activeName == tabMapOptions[0].key" />
        </keep-live>
      </el-tab-pane>
      <el-tab-pane :label="tabMapOptions[1].label" :name="tabMapOptions[1].key">
        <keep-live>
          <department-annual-assess-pane v-show="activeName == tabMapOptions[1].key" />
        </keep-live>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DepartmentQuarterlyAssessPane from '@/components/DepartmentQuarterlyAssessPane'
import DepartmentAnnualAssessPane from '@/components/DepartmentAnnualAssessPane'

export default {
  name: 'DepartmentAssess',
  components: { DepartmentQuarterlyAssessPane, DepartmentAnnualAssessPane},
  data() {
    return {
      tabMapOptions: [
        { label: '季度考核', key: 'quarterly' },
        { label: '年度考核', key: 'annual' }
      ],
      activeName: 'quarterly'
    }
  }
}
</script>

<style>
.department-assess-container {
  margin: 30px;
}
</style>

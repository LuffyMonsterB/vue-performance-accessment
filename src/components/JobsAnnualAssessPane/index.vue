<template>
  <div>
    <el-card>
      <div style="margin-bottom: 1em">
        <el-row type="flex" align="middle">
          <el-date-picker
            v-model="tableQuery.time"
            type="month"
            placeholder="选择日期"
          >
          </el-date-picker>
          <el-select
            v-model="tableQuery.department"
            placeholder="部门"
            clearable
            style="width: 120px"
            class="filter-item"
          >
            <el-option
              v-for="item in departmentOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
            <el-input
            v-model="tableQuery.name"
            placeholder="姓名"
            clearable
            style="width: 200px"
            class="filter-item"
          >
          </el-input>
          <el-button
            v-waves
            :loading="filtering"
            class="cu-shadow"
            style="margin-left: 10px"
            type="primary"
            icon="el-icon-search"
            @click="handleFilter"
          >
            搜索
          </el-button>
          <el-button
            v-waves
            :loading="downloading"
            class="cu-shadow"
            type="primary"
            icon="el-icon-download"
            @click="handleDownload"
          >
            导出
          </el-button>
        </el-row>
      </div>

      <div style="margin-bottom: 1em">
        <b style="font-size:18px">岗位年度绩效考核</b>
      </div>
      <el-table
        v-loading="tableLoading"
        :data="jobsAnnualAssessTable"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="50" align="center">
        </el-table-column>
        <el-table-column label="部门" align="center">
          <template slot-scope="{ row }">
            <el-tag
              :type="row.department1 | departmentFilter"
              size="mini"
              style="margin-right: 4px"
              >{{ row.department1 }}</el-tag
            >
            <span>{{ row.department2 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="岗位" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.job }}</span>
          </template>
        </el-table-column>

        <el-table-column label="月度绩效平均得分" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.monthlyPerformance }}</span>
          </template>
        </el-table-column>
        <el-table-column label="协作服务得分" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.collaborativeServiceScore }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="年终绩效得分"
          align="center"
          width="160"
    
        >
          <template slot-scope="{ row }">
            <span>{{ row.yearEndPerformanceScoreWork }}</span>
          </template>
        </el-table-column>

        <el-table-column label="岗位绩效等级" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.jobPerformanceLevel }}</span>
          </template>
        </el-table-column>

        <el-table-column label="科室绩效等级" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.departmentPerformanceLevel }}</span>
          </template>
        </el-table-column>

        <el-table-column label="绩效积分" align="center">
          <template slot-scope="{ row }">
            <el-tag>{{ row.performanceScore }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="每月绩效得分" width="120" type="expand">
          <template slot-scope="{ row }">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="1月">
                <el-tag type="info">{{ row.January }}</el-tag>
              </el-form-item>
              <el-form-item label="2月">
                <el-tag type="info">{{ row.February }}</el-tag>
              </el-form-item>
              <el-form-item label="3月">
                <el-tag type="info">{{ row.March }}</el-tag>
              </el-form-item>
              <el-form-item label="4月">
                <el-tag type="info">{{ row.April }}</el-tag>
              </el-form-item>
              <el-form-item label="5月">
                <el-tag type="info">{{ row.May }}</el-tag>
              </el-form-item>
              <el-form-item label="6月">
                <el-tag type="info">{{ row.June }}</el-tag>
              </el-form-item>
              <el-form-item label="7月">
                <el-tag type="info">{{ row.July }}</el-tag>
              </el-form-item>
              <el-form-item label="8月">
                <el-tag type="info">{{ row.August }}</el-tag>
              </el-form-item>
              <el-form-item label="9月">
                <el-tag type="info">{{ row.September }}</el-tag>
              </el-form-item>
              <el-form-item label="10月">
                <el-tag type="info">{{ row.October }}</el-tag>
              </el-form-item>
              <el-form-item label="11月">
                <el-tag type="info">{{ row.November }}</el-tag>
              </el-form-item>
              <el-form-item label="12月">
                <el-tag type="info">{{ row.December }}</el-tag>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <!-- <el-table-column label="" align="center" width="80">
          <template slot-scope="{ $index }">
            <el-button
              class="cu-shadow"
              type="primary"
              size="small"
              icon="el-icon-edit"
              circle
              @click="handleEdit($index)"
            ></el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <pagination :total="100" page.sync="1" limit.sync="20" />
    </el-card>

    <!-- <el-dialog title="绩效修改" :visible.sync="editFormVisible">
      <el-form
        ref="dataForm"
        :rules="editFormRules"
        :model="tempEditForm"
        label-position="right"
        label-width="80px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="部门">
          <el-tag
            :type="tempEditForm.department1 | departmentFilter"
            size="small"
            style="margin-right: 4px"
            >{{ tempEditForm.department1 }}</el-tag
          >
          <span>{{ tempEditForm.department2 }}</span>
        </el-form-item>
        <el-form-item label="姓名">
          <span>{{ tempEditForm.name }}</span>
        </el-form-item>
        <el-form-item label="岗位">
          <span>{{ tempEditForm.job }}</span>
        </el-form-item>

        <el-form-item label="重点工作" prop="keyWork">
          <el-input v-model="tempEditForm.keyWork" />
        </el-form-item>
        <el-form-item label="基础工作" prop="basicWork">
          <el-input v-model="tempEditForm.basicWork" />
        </el-form-item>
        <el-form-item label="共性工作" prop="commonWork">
          <el-input v-model="tempEditForm.commonWork" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false"> 取消 </el-button>
        <el-button type="primary" @click="editFormVisible = false">
          确定
        </el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import { getJobsAnnualAssessData,queryJobsAnnualAssessDataByName } from "@/api/jobs-assess";
import waves from "@/directive/waves";
import Pagination from "@/components/Pagination";

export default {
  name: "JobsAnnualAssessPane",
  directives: { waves },
  components: { Pagination },
  data() {
    return {
      jobsAnnualAssessTable: null,
      tableTitle: "",
      tableQuery: {
        page: 1,
        limit: 20,
        department: undefined,
        name: undefined,
        time: undefined,
        sort: "+id",
      },
      editFormVisible: false,
      tempEditForm: {
        department1: undefined,
        department2: undefined,
        name: undefined,
        id: undefined,
        job: undefined,
        keyWork: undefined,
        basicWork: undefined,
        commonWork: undefined,
      },
      editFormRules: {
        keyWork: [{ required: true, message: "内容不能为空", trigger: "blur" }],
        basicWork: [
          { required: true, message: "内容不能为空", trigger: "blur" },
        ],
        commonWork: [
          { required: true, message: "内容不能为空", trigger: "blur" },
        ],
      },
      tableLoading: false,
      filtering:false,
      downloading:false,
      departmentOptions:['办公室','财务科','业务科','专卖科'],
    };
  },
  filters: {
    departmentFilter(department) {
      const departmentMap = {
        综合线: "",
        专卖线: "success",
        营销线: "warning",
      };
      return departmentMap[department];
    },
  },
  methods: {
    handleFilter() {
      if (this.tableQuery.name) {
        this.filtering = true;
        setTimeout(() => {
          queryJobsAnnualAssessDataByName(this.tableQuery.name).then(res => {
            if(res.data.items.query){
              this.jobsAnnualAssessTable=[res.data.items.query]
              this.filtering = false;
            }else{
              this.jobsAnnualAssessTable=[]
              this.filtering = false;
            }

          });
        }, 500);
      } else {
        getJobsAnnualAssessData().then(res => {
          this.jobsAnnualAssessTable =
            res.data.items.jobs_annual_assess_table.jobs_assess;
        });
      }
    },
    handleDownload() {
      this.downloadLoading = true;
      console.log("download");
    },
    handleEdit(index) {
      this.tempEditForm = this.jobsMonthlyAssessTable[index];
      this.editFormVisible = true;
    },
  },
  created() {
    getJobsAnnualAssessData().then((res) => {
      this.jobsAnnualAssessTable =
        res.data.items.jobs_annual_assess_table.jobs_assess;
      this.tableTitle = res.data.items.jobs_annual_assess_table.title;
    });
  },
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 25%;
}
</style>

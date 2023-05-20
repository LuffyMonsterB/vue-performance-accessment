<template>
  <div>
    <el-card>
      <div style="margin-bottom: 1em;">
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
            style="margin-left: 10px;"
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
      <div style="margin-bottom:1em;">
        <b style="font-size:18px">岗位月度绩效考核</b>
      </div>
      <el-table
        v-loading="tableLoading"
        :data="jobsMonthlyAssessTable"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column type="index" label="序号" width="50" align="center">
        </el-table-column>
        <el-table-column label="部门" align="center">
          <template slot-scope="{ row }">
            <el-tag
              :type="row.department1 | departmentFilter"
              size="mini"
              style="margin-right:4px"
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
        <el-table-column label="重点工作（50%）" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.keyWork }}</span>
          </template>
        </el-table-column>
        <el-table-column label="基础工作（30%）" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.basicWork }}</span>
          </template>
        </el-table-column>
        <el-table-column label="共性工作（20%）" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.commonWork }}</span>
          </template>
        </el-table-column>
        <el-table-column label="月度工作得分" align="center" width="160">
          <template slot-scope="{ row }">
            <span>{{
              parseInt(row.keyWork) +
                parseInt(row.basicWork) +
                parseInt(row.commonWork)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="部门月度工作平均得分" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.departmentMonthlyAverageScore }}</span>
          </template>
        </el-table-column>
        <el-table-column label="月度绩效考核得分" align="center" sortable>
          <template slot-scope="{ row }">
            <el-tag>{{
              (
                ((parseInt(row.keyWork) +
                  parseInt(row.basicWork) +
                  parseInt(row.commonWork)) /
                  parseInt(row.departmentMonthlyAverageScore)) *
                100
              ).toFixed(2)
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="" align="center" width="80">
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
        </el-table-column>
      </el-table>
      <pagination :total="100" page.sync="1" limit.sync="20" />
    </el-card>

    <el-dialog title="绩效修改" :visible.sync="editFormVisible">
      <el-form
        ref="dataForm"
        :rules="editFormRules"
        :model="tempEditForm"
        label-position="right"
        label-width="80px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="部门">
          <el-tag
            :type="tempEditForm.department1 | departmentFilter"
            size="small"
            style="margin-right:4px"
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
        <el-button @click="editFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="editFormVisible = false">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getJobsMonthlyAssessData,
  queryJobsMonthlyAssessDataByName
} from "@/api/jobs-assess";
import waves from "@/directive/waves";
import Pagination from "@/components/Pagination";

export default {
  name: "JobsMonthlyAssessPane",
  directives: { waves },
  components: { Pagination },
  data() {
    return {
      jobsMonthlyAssessTable: null,
      tableTitle: "",
      tableQuery: {
        page: 1,
        limit: 20,
        department: undefined,
        name: undefined,
        time: undefined,
        sort: "+id"
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
        commonWork: undefined
      },
      editFormRules: {
        keyWork: [{ required: true, message: "内容不能为空", trigger: "blur" }],
        basicWork: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ],
        commonWork: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ]
      },
      filtering: false,
      downloading: false,
      tableLoading: false,
      departmentOptions: ["办公室", "财务科", "业务科", "专卖科"]
    };
  },
  filters: {
    departmentFilter(department) {
      const departmentMap = {
        综合线: "",
        专卖线: "success",
        营销线: "warning"
      };
      return departmentMap[department];
    }
  },
  methods: {
    handleFilter() {
      if (this.tableQuery.name) {
        this.filtering = true;
        setTimeout(() => {
          queryJobsMonthlyAssessDataByName(this.tableQuery.name).then(res => {
            if(res.data.items.query){
              this.jobsMonthlyAssessTable=[res.data.items.query]
              this.filtering = false;
            }else{
              this.jobsMonthlyAssessTable=[]
              this.filtering = false;
            }

          });
        }, 500);
      } else {
        getJobsMonthlyAssessData().then(res => {
          this.jobsMonthlyAssessTable =
            res.data.items.jobs_monthly_assess_table.jobs_assess;
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
    }
  },
  created() {
    getJobsMonthlyAssessData().then(res => {
      this.jobsMonthlyAssessTable =
        res.data.items.jobs_monthly_assess_table.jobs_assess;
    });
  }
};
</script>

<style></style>

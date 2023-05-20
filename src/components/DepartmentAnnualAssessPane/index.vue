<template>
  <div>
    <el-card>
      <div style="margin-bottom: 1em">
        <el-row type="flex" align="middle">
          <el-date-picker
            v-model="tableQuery.time"
            type="year"
            placeholder="选择日期"
          >
          </el-date-picker>
          <el-select
            v-model="tableQuery.department"
            placeholder="部门"
            clearable
            style="width: 200px"
            class="filter-item"
          >
            <el-option
              v-for="item in departmentOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
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
        <b style="font-size:18px">部门年度绩效考核</b>
      </div>
      <el-table
        v-loading="tableLoading"
        :data="departmentAnnualAssessTable"
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
        <el-table-column label="季度绩效考核平均得分（80%）" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.quarterlyPerformance }}</span>
          </template>
        </el-table-column>
        <el-table-column label="协作服务得分（20%）" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.collaborativeServiceScore }}</span>
          </template>
        </el-table-column>

        <el-table-column label="年终绩效考核得分" align="center">
          <template slot-scope="{ row }">
            <el-tag>{{
              parseInt(row.quarterlyPerformance) +
                parseInt(row.collaborativeServiceScore)
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="科室绩效等级" align="center">
          <template slot-scope="{ row }">
            <span>{{ row.departmentPerformanceLevel }}</span>
          </template>
        </el-table-column>

        <el-table-column label="每季度绩效得分" width="120" type="expand">
          <template slot-scope="{ row }">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="一季度">
                <el-tag type="info">{{ row.firstQuarter }}</el-tag>
              </el-form-item>
              <el-form-item label="二季度">
                <el-tag type="info">{{ row.secondQuarter }}</el-tag>
              </el-form-item>
              <el-form-item label="三季度">
                <el-tag type="info">{{ row.thirdQuarter }}</el-tag>
              </el-form-item>
              <el-form-item label="四季度">
                <el-tag type="info">{{ row.fourthQuarter }}</el-tag>
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
import waves from "@/directive/waves";
import Pagination from "@/components/Pagination";
import {
  genDepartmentAnnualAssessData,
  queryDepartmentAnnualAssessDataByDepartment
} from "@/api/department-assess";

export default {
  name: "DepartmentAnnualAssessPane",
  directives: { waves },
  components: { Pagination },
  data() {
    return {
      departmentAnnualAssessTable: null,
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
      tableLoading: false,
      filtering: false,
      downloading: false,
      departmentOptions: [
        "办公室",
        "财务科",
        "专卖科",
        "稽查中队",
        "城关专卖所",
        "力洋专卖所",
        "梅林专卖所",
        "业务科",
        "中转站",
        "城关市场部",
        "力洋市场部",
        "梅林市场部"
      ]
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
      if (this.tableQuery.department) {
        this.filtering = true;
        setTimeout(() => {
          queryDepartmentAnnualAssessDataByDepartment(
            this.tableQuery.department
          ).then(res => {
            if (res.data.items.query) {
              this.departmentAnnualAssessTable = [res.data.items.query];
              this.filtering = false;
            } else {
              this.departmentAnnualAssessTable = [];
              this.filtering = false;
            }
          });
        }, 500);
      } else {
        genDepartmentAnnualAssessData().then(res => {
          this.departmentAnnualAssessTable =
            res.data.items.department_annual_assess_table.department_assess;
        });
      }
    },
    handleDownload() {
      this.downloadLoading = true;
      console.log("download");
    },
    handleEdit(index) {
      this.tempEditForm = this.departmentAnnualAssessTable[index];
      this.editFormVisible = true;
    }
  },
  created() {
    genDepartmentAnnualAssessData().then(res => {
      this.departmentAnnualAssessTable =
        res.data.items.department_annual_assess_table.department_assess;
      this.tableTitle = res.data.items.department_annual_assess_table.title;
    });
  }
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

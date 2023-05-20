<template>
  <div class="app-container">
    <el-card class="filter-container">
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
           <el-input
            v-model="tableQuery.name"
            placeholder="姓名"
            style="width: 200px;"
            clearable
          />
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
    </el-card>
    <el-card>
      <div style="margin-bottom:1em;">
        <b>专卖所工作业绩表</b>
      </div>

      <el-card class="checkbox-container">
        <el-checkbox-group v-model="columns">
          <el-row
            type="flex"
            justify="center"
            class="checkbox-row"
            v-for="row in Math.ceil(columsOptions.length / 4)"
            :key="row"
          >
            <el-col :span="6" v-for="col in 4" :key="col">
              <el-checkbox
                :label="columsOptions[(row - 1) * 5 + col - 1].label"
                v-if="(row - 1) * 5 + col - 1 < columsOptions.length"
              ></el-checkbox>
            </el-col>
          </el-row>
        </el-checkbox-group>
      </el-card>
      <el-table :data="tableData" fit highlight-current-row style="width: 100%">
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>

        <el-table-column
          v-for="(item, index) in singleColunms"
          :key="'single' + index"
          :label="item.label"
          :prop="item.key"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          v-for="(item, index) in multiColumns"
          :key="'multi' + index"
          :label="item.label"
        >
          <el-table-column
            v-for="(child, index) in item.children"
            :key="'child' + index"
            :label="child.label"
            :prop="child.key"
            show-overflow-tooltip
          >
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getZMSData,queryZMSData } from "@/api/table";
import waves from '@/directive/waves/index.js'
import '@/styles/btn.scss'
const defaultColums = [
  "市场净化率",
  "市场检查计划完成率",
  "真烟查获数量",
  "假私烟查获量",
];

export default {
  name:'ZMSTable',
  directives: { waves },
  data() {
    return {
      tableData: [],
      tableTitle: "",
      tableQuery: {
        page: 1,
        limit: 20,
        name:undefined,
        department: undefined,
        unit: undefined,
        time: undefined,
        sort: "+id"
      },
      departmentOptions:['城关专卖所','梅林专卖所','力洋专卖所'],
      columsOptions: [
        
        { key: "scjhl", label: "市场净化率" },
        { key: "scjcjhwcl", label: "市场检查计划完成率" },
        { key: "wfwgdhjcyfgl", label: "违法违规大户检查月覆盖率" },
        { key: "zdjjcyfgl", label: "重点籍检查月覆盖率" },
        { key: "wfwgdhqdl", label: "违法违规大户取缔率" },
        { key: "zyajchs", label: "真烟案件查获数" },
        { key: "jsyajchs", label: "假私烟案件查获数" },
        { key: "zychsl", label: "真烟查获数量" },
        { key: "jsychl", label: "假私烟查获量" },
        { key: "xbzfhpjsc", label: "新办证复核平均时长" }
      ],
      columns: defaultColums,
      downloading:false,
      filtering:false
    };
  },
  methods:{
    handleFilter() {
      if (this.tableQuery.name) {
        this.filtering = true;
        setTimeout(() => {
          queryZMSData(this.tableQuery.name).then(res => {
            if(res.data.items.query){
              this.tableData=[res.data.items.query]
              this.filtering = false;
            }else{
              this.tableData=[]
              this.filtering = false;
            }

          });
        }, 500);
      } else {
        getZMSData().then(res => {
          this.tableData =
         res.data.items.department_work_tables.department_work_zms;
        });
      }
    },
    handleDownload(){
      this.downloadLoading=true
      console.log('download')
    }
  },
  computed: {
    singleColunms() {
      let columnsOptions=this.columsOptions.filter(item => this.columns.includes(item.label)).filter(item => !item.children);
      columnsOptions.unshift({ key: "bm", label: "部门" });
      columnsOptions.unshift({ key: "xm", label: "姓名" });
      return columnsOptions
    },
    multiColumns() {
      return this.columsOptions
        .filter(item => this.columns.includes(item.label))
        .filter(item => item.children);
    }
  },
  created() {
    getZMSData().then(res => {
      this.tableData =
        res.data.items.department_work_tables.department_work_zms;
    });
  }
};
</script>

<style scoped>
.filter-container {
  margin-bottom: 2em;

}
.checkbox-container {
  margin-bottom: 1em;
}
.checkbox-row {
  margin-bottom: 4px;
}
</style>

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
        <b>稽查中队工作业绩表</b>
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
import { getJCZDData,queryJCZDData } from "@/api/table";
import waves from "@/directive/waves";
const defaultColums = [
  "卷烟销量（万支）",
  "查获假私烟数量（万支）",
  "查获假私烟案件数量本期"
];

export default {
  name: "JCZDTable",
  directives: { waves },
  data() {
    return {
      tableData: [],
      tableTitle: "",
      tableQuery: {
        page: 1,
        limit: 20,
        name: undefined,
        department: undefined,
        unit: undefined,
        time: undefined,
        sort: "+id"
      },
      departmentOptions: ["稽查中队1", "稽查中队2", "稽查中队3"],
      columsOptions: [
        // { key: "zmjczd", label: "专卖稽查中队" },
        {
          key: "jyxl1",
          label: "卷烟销量（万支）",
          children: [{ key: "jyxl1", label: "1-9月" }]
        },
        {
          key: "chjsysl1",
          label: "查获假私烟数量（万支）",
          children: [
            { key: "chjsysl1", label: "本期" },
            { key: "chjsysl2", label: "排名" },
            { key: "chjsysl3", label: "得分" },
            { key: "chjsysl4", label: "同期" },
            { key: "chjsysl5", label: "同比%" },
            { key: "chjsysl6", label: "排名" },
            { key: "chjsysl7", label: "得分" }
          ]
        },
        { key: "chjsyajsl", label: "查获假私烟案件数量本期" },
        { key: "czlshs", label: "2021年1月1日持证零售户数（户）" },
        { key: "zmrysl", label: "2021年1月1日专卖人员数量（人）" },
        { key: "chjsyajccl", label: "查获假私烟案件查处率本期" },
        {
          key: "chjsyrjl",
          label: "查获假私烟人均量",
          children: [{ key: "chjsyrjl", label: "本期" }]
        },
        {
          key: "chswwzysajsl",
          label: "查获省外无证运输案件数量",
          children: [{ key: "chswwzysajsl", label: "本期" }]
        },
        {
          key: "chsyllzysl1",
          label: "查获省外流入真烟数量（万支）",
          children: [
            { key: "chsyllzysl1", label: "本期" },
            { key: "chsyllzysl2", label: "同期" },
            { key: "chsyllzysl3", label: "同比%" }
          ]
        },
        {
          key: "chswlrzyxdl",
          label: "查获省外流入真烟相对量",
          children: [{ key: "chswlrzyxdl", label: "本期" }]
        },
        { key: "syzxrs", label: "涉烟追刑人数本期" }
      ],
      columns: defaultColums,
      downloading: false,
      filtering: false
    };
  },
  methods: {
    handleFilter() {
      if (this.tableQuery.name) {
        this.filtering = true;
        setTimeout(() => {
          queryJCZDData(this.tableQuery.name).then(res => {
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
        getJCZDData().then(res => {
          this.tableData =
         res.data.items.department_work_tables.department_work_jczd;
        });
      }
    },
    handleDownload() {
      this.downloadLoading = true;
      console.log("download");
    }
  },
  computed: {
    singleColunms() {
      let name={ key: "xm", label: "姓名" };
      let columnsOptions=this.columsOptions.filter(item => this.columns.includes(item.label)).filter(item => !item.children);
      columnsOptions.unshift(name);
      return columnsOptions
    },
    multiColumns() {
      return this.columsOptions
        .filter(item => this.columns.includes(item.label))
        .filter(item => item.children);
    }
  },
  created() {
    // getZMSData().then(res => {
    //   this.tableData =
    //     res.data.items.department_work_tables.department_work_zms;
    //   this.tableTitle = res.data.items.department_work_tables.title;
    // });
    getJCZDData().then(res => {
      this.tableData =
        res.data.items.department_work_tables.department_work_jczd;
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

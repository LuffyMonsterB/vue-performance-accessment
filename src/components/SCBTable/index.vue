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
    </el-card>
    <el-card>
      <div style="margin-bottom: 1em">
        <b>市场部工作业绩表</b>
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
import { getSCBData, querySCBData } from "@/api/table";
import waves from "@/directive/waves";
const defaultColums = ["经营毛利增减幅度", "行业共育品牌"];

export default {
  name: "SCBTable",
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
      departmentOptions: ["城关市场部", "梅林市场部", "力洋市场部"],
      columsOptions: [
        {
          key: "jymlzffd1",
          label: "经营毛利增减幅度",
          children: [{ key: "jymlzffd1", label: "本期" }]
        },
        {
          key: "hygypp1",
          label: "行业共育品牌",
          children: [
            { key: "hygypp1", label: "销量同比增长" },
            { key: "hygypp2", label: "销量比重" },
            { key: "hygypp3", label: "销售额同比增长" }
          ]
        },
        {
          key: "xljhm1",
          label: "1575系列进货面",
          children: [
            { key: "xljhm1", label: "进货客户数" },
            { key: "xljhm2", label: "投放客户数" },
            { key: "xljhm3", label: "进货面" }
          ]
        },
        {
          key: "xyt1",
          label: "香溢通",
          children: [
            { key: "xyt1", label: "使用客户数" },
            { key: "xyt2", label: "2020年末正常经营零售客户数" },
            { key: "xyt3", label: "使用面" }
          ]
        },
        {
          key: "zfb1",
          label: "支付宝及聚合支付结算比值",
          children: [
            { key: "zfb1", label: "2021年结算笔数（万笔）" },
            { key: "zfb2", label: "2020年销量（万箱）" },
            { key: "zfb3", label: "结算比值" }
          ]
        },
        {
          key: "xfzhd1",
          label: "消费者会员活动（5月）",
          children: [
            { key: "xfzhd1", label: "会员活动参与人次" },
            { key: "xfzhd2", label: "2020年销量（万箱）" },
            { key: "xfzhd3", label: "活动比值" }
          ]
        },
        {
          key: "lskhyd1",
          label: "零售客户移动平台月使用率",
          children: [
            { key: "lskhyd1", label: "移动平台月平均使用客户数" },
            { key: "lskhyd2", label: "2020年末正常经营零售客户数" },
            { key: "lskhyd3", label: "使用面" }
          ]
        }
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
          querySCBData(this.tableQuery.name).then(res => {
            if (res.data.items.query) {
              this.tableData = [res.data.items.query];
              this.filtering = false;
            } else {
              this.tableData = [];
              this.filtering = false;
            }
          });
        }, 500);
      } else {
        getSCBData().then(res => {
          this.tableData =
            res.data.items.marketing_work_performance_table.marketing_Work_gzyjb;
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
      let columnsOptions = this.columsOptions
        .filter(item => this.columns.includes(item.label))
        .filter(item => !item.children);
      columnsOptions.unshift({ key: "bm", label: "部门" });
      columnsOptions.unshift({ key: "xm", label: "姓名" });

      return columnsOptions;
    },
    multiColumns() {
      return this.columsOptions
        .filter(item => this.columns.includes(item.label))
        .filter(item => item.children);
    }
  },
  created() {
    getSCBData().then(res => {
      this.tableData =
        res.data.items.marketing_work_performance_table.marketing_Work_gzyjb;
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

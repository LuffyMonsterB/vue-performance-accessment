const Mock = require("mockjs");

const mockData = {
  department1: [
    "综合线",
    "综合线",
    "专卖线",
    "专卖线",
    "专卖线",
    "专卖线",
    "专卖线",
    "营销线",
    "营销线",
    "营销线",
    "营销线",
    "营销线"
  ],
  department2: [
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

//月度考核数据生成
genDepartmentQuarterlyAssessData = () => {
  const departmentMonthlyAssessData = Mock.mock({
    department_quarterly_assess_table: {
      "department_assess|12": [
        {
          "department1|+1": mockData.department1,
          "department2|+1": mockData.department2,
          keyWork: "@integer(30,50)",
          basicWork: "@integer(10,30)",
          commonWork: "@integer(0,20)"
        }
      ]
    }
  });

  return departmentMonthlyAssessData;
};

genDepartmentAnnualAssessData = () => {
  const departmentAnnualAssessData = Mock.mock({
    department_annual_assess_table: {
      "department_assess|12": [
        {
          "department1|+1": mockData.department1,
          "department2|+1": mockData.department2,
          quarterlyPerformance: "@integer(60,80)",
          collaborativeServiceScore: "@integer(0,20)",
          departmentPerformanceLevel: "@integer(1,4)",
          firstQuarter: "@integer(60,100)",
          secondQuarter: "@integer(60,100)",
          thirdQuarter: "@integer(60,100)",
          fourthQuarter: "@integer(60,100)"
        }
      ]
    }
  });

  return departmentAnnualAssessData;
};

//查询季度数据
queryDepartmentQurterlyAssessDataByDepartment = department => {
  let index = mockData.department2.indexOf(department);
  if (index != -1) {
    let res = Mock.mock({
      query: {
        department1: mockData.department1[index],
        department2: mockData.department2[index],
        keyWork: "@integer(30,50)",
        basicWork: "@integer(10,30)",
        commonWork: "@integer(0,20)"
      }
    });
    return res;
  } else {
    return [];
  }
};

//查询年度数据
queryDepartmentAnnualAssessDataByDepartment = department => {
  let index = mockData.department2.indexOf(department);
  if (index != -1) {
    let res = Mock.mock({
      query: {
        department1: mockData.department1[index],
        department2: mockData.department2[index],
        quarterlyPerformance: "@integer(60,80)",
        collaborativeServiceScore: "@integer(0,20)",
        departmentPerformanceLevel: "@integer(1,4)",
        firstQuarter: "@integer(60,100)",
        secondQuarter: "@integer(60,100)",
        thirdQuarter: "@integer(60,100)",
        fourthQuarter: "@integer(60,100)"
      }
    });
    return res;
  } else {
    return [];
  }
};

module.exports = [
  {
    url: "/vue-admin-template/department-assess/quarterly",
    type: "get",
    response: config => {
      const { year, quarter } = config.query;
      const items = genDepartmentQuarterlyAssessData(year, quarter);
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      };
    }
  },

  {
    url: "/vue-admin-template/department-assess/annual",
    type: "get",
    response: config => {
      const { year } = config.query;
      const items = genDepartmentAnnualAssessData(year);
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      };
    }
  },

  {
    url: "/vue-admin-template/department-assess/query-quarterly",
    type: "get",
    response: config => {
      const { department } = config.query;
      const items = queryDepartmentQurterlyAssessDataByDepartment(department);
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      };
    }
  },
  {
    url: "/vue-admin-template/department-assess/query-annual",
    type: "get",
    response: config => {
      const { department } = config.query;
      const items = queryDepartmentAnnualAssessDataByDepartment(department);
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      };
    }
  }
];

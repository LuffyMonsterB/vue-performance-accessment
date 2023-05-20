const Mock = require("mockjs");

const mockData = {
  department1: ["专卖线", "营销线", "营销线", "专卖线", "综合线", "综合线"],
  department2: ["稽查中队", "中转站", "中转站", "稽查中队", "财务科", "财务科"],
  name: ["杨程", "黄人军", "王云娣", "王宇斌", "胡静菲", "杨俏婷"],
  job: [
    "专卖稽查员",
    "送货员",
    "综合管理员",
    "专卖稽查员",
    "出纳",
    "企业管理员"
  ]
};

//月度绩效数据生成
genJobsMonthlyAssessData = () => {
  const jobsMonthlyAssessData = Mock.mock({
    jobs_monthly_assess_table: {
      title: `月度绩效考核表`,
      "jobs_assess|6": [
        {
          "department1|+1": mockData.department1,
          "department2|+1": mockData.department2,
          "name|+1": mockData.name,
          "job|+1": mockData.job,
          keyWork: "@integer(30,50)",
          basicWork: "@integer(10,30)",
          commonWork: "@integer(0,20)",
          departmentMonthlyAverageScore: "@integer(60,100)"
        }
      ]
    }
  });

  return jobsMonthlyAssessData;
};

genJobsAnnualAssessData = () => {
  const jobsAnnualAssessData = Mock.mock({
    jobs_annual_assess_table: {
      title: `年度绩效考核表`,
      "jobs_assess|6": [
        {
          "department1|+1": mockData.department1,
          "department2|+1": mockData.department2,
          "name|+1": mockData.name,
          "job|+1": mockData.job,
          monthlyPerformance: "@integer(60,100)",
          collaborativeServiceScore: "@integer(60,100)",
          yearEndPerformanceScoreWork: "@integer(60,100)",
          jobPerformanceLevel: "@integer(1,4)",
          departmentPerformanceLevel: "@integer(1,4)",
          performanceScore: "@integer(60,100)",
          January: "@integer(60,100)",
          February: "@integer(60,100)",
          March: "@integer(60,100)",
          April: "@integer(60,100)",
          May: "@integer(60,100)",
          June: "@integer(60,100)",
          July: "@integer(60,100)",
          August: "@integer(60,100)",
          September: "@integer(60,100)",
          October: "@integer(60,100)",
          November: "@integer(60,100)",
          December: "@integer(60,100)"
        }
      ]
    }
  });

  return jobsAnnualAssessData;
};

//查询月度数据
queryJobsMonthlyAssessDataByName = name => {
  let index = mockData.name.indexOf(name);
  if (index != -1) {
    let res = Mock.mock({
      query: {
        department1: mockData.department1[index],
        department2: mockData.department2[index],
        name: mockData.name[index],
        job: mockData.job[index],
        keyWork: "@integer(30,50)",
        basicWork: "@integer(10,30)",
        commonWork: "@integer(0,20)",
        departmentMonthlyAverageScore: "@integer(60,100)"
      }
    });
    return res;
  } else {
    return [];
  }
};

//查询年度数据
queryJobsAnnualAssessDataByName = name => {
  let index = mockData.name.indexOf(name);
  if (index != -1) {
    let res = Mock.mock({
      query: {
        department1: mockData.department1[index],
        department2: mockData.department2[index],
        name: mockData.name[index],
        job: mockData.job[index],
        monthlyPerformance: "@integer(60,100)",
        collaborativeServiceScore: "@integer(60,100)",
        yearEndPerformanceScoreWork: "@integer(60,100)",
        jobPerformanceLevel: "@integer(1,4)",
        departmentPerformanceLevel: "@integer(1,4)",
        performanceScore: "@integer(60,100)",
        January: "@integer(60,100)",
        February: "@integer(60,100)",
        March: "@integer(60,100)",
        April: "@integer(60,100)",
        May: "@integer(60,100)",
        June: "@integer(60,100)",
        July: "@integer(60,100)",
        August: "@integer(60,100)",
        September: "@integer(60,100)",
        October: "@integer(60,100)",
        November: "@integer(60,100)",
        December: "@integer(60,100)"
      }
    });
    return res;
  } else {
    return [];
  }
};


module.exports = [
  {
    url: "/vue-admin-template/jobs-assess/monthly",
    type: "get",
    response: config => {
      const items = genJobsMonthlyAssessData();
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
    url: "/vue-admin-template/jobs-assess/annual",
    type: "get",
    response: config => {
      const items = genJobsAnnualAssessData();
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
    url: "/vue-admin-template/jobs-assess/query-monthly",
    type: "get",
    response: config => {
      const { name } = config.query;
      const items = queryJobsMonthlyAssessDataByName(name);
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
    url: "/vue-admin-template/jobs-assess/query-annual",
    type: "get",
    response: config => {
      const { name } = config.query;
      const items = queryJobsAnnualAssessDataByName(name);
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

const Mock = require("mockjs");

const zmsName = [
  "陈粱",
  "王彬彬",
  "朱宗电",
  "胡忍盼",
  "俞申杰",
  "王鸿江"
];
const jczdName = [
  "赵丽",
  "乔刚",
  "萧静",
  "陆杰",
  "马杰",
  "彭刚",
  "江芳",
  "孙伟",
  "周超",
  "胡勇"
];
const scbName = [
  "娄海富",
  "赵伟华",
  "洪玉娇",
  "徐冬冬",
  "王晓翔",
  "郑伟"
];

//专卖所数据
genZmsData = () => {
  const zmsData = Mock.mock({
    department_work_tables: {
      "department_work_zms|6": [
        {
          "xm|+1": zmsName,
          "bm|+1": ["城关专卖所","城关专卖所",  "力洋专卖所", "力洋专卖所","梅林专卖所", "梅林专卖所"],
          scjhl: "100%",
          scjcjhwcl: "100%",
          wfwgdhjcyfgl: "100%",
          zdjjcyfgl: "100%",
          wfwgdhqdl: "0",
          zyajchs: "@integer(0,5)",
          jsyajchs: "@integer(0,2)",
          zychsl: "@float(20,200,2,2)",
          jsychl: "@float(0,20,2,2)",
          xbzfhpjsc: "@integer(4,15)"
        }
      ]
    }
  });
  return zmsData;
};

//稽查中队数据
genJczdData = () => {
  const JCZDData = Mock.mock({
    department_work_tables: {
      "department_work_jczd|10": [
        {
          "xm|+1": jczdName,
          jyxl1: "@float(30,120,2,2)",
          chjsysl1: "@float(0,3,2,2)",
          chjsysl2: "@integer(1,5)",
          chjsysl3: "@float(0,3,2,2)",
          chjsysl4: "@float(0,3,2,2)",
          chjsysl5: "@float(-30,30,2,2)",
          chjsysl6: "@integer(1,5)",
          chjsysl7: "@float(0,3,2,2)",
          chjsyajsl: "@integer(1,20)",
          czlshs: "@integer(1,100)",
          zmrysl: "@integer(1,20)",
          chjsyajccl: "@float(0,80,2,2)",
          chjsyrjl: "@float(0,3,2,2)",
          chswwzysajsl: "@integer(0,10)",
          chsyllzysl1: "@float(0,100,2,2)",
          chsyllzysl2: "@float(0,100,2,2)",
          chsyllzysl3: "@float(-10,10,2,2)",
          chswlrzyxdl: "@float(0,1,2,2)",
          syzxrs: "@integer(0,10)"
        }
      ]
    }
  });
  return JCZDData;
};

//市场部数据
genScbData = () => {
  const scbData = Mock.mock({
    marketing_work_performance_table: {
      "marketing_Work_gzyjb|6": [
        {
          "xm|+1": scbName,
          "bm|1": ["城关市场部", "梅林市场部", "力洋市场部"],
          jymlzffd1: "@float(1,20,2)",
          hygypp1: "@float(-10,10,2)",
          hygypp2: "@float(10,40,2)",
          hygypp3: "@float(0,10,2)",
          xljhm1: "@integer(200,3000)",
          xljhm2: "@integer(1000,4000)",
          xljhm3: "@float(40,99,2)",
          xyt1: "@integer(200,1000)",
          xyt2: "@integer(1000,3000)",
          xyt3: "@float(10,50,2)",
          zfb1: "@float(100,200,2)",
          zfb2: "@float(1,5,2)",
          zfb3: "@float(20,70,2)",
          xfzhd1: "@integer(200,1000)",
          xfzhd2: "@float(0,3,2)",
          xfzhd3: "@float(70,500,2)",
          lskhyd1: "@integer(500,2000)",
          lskhyd2: "@integer(1000,3000)",
          lskhyd3: "@float(70,90,2)"
        }
      ]
    }
  });
  return scbData;
};

//查询zms数据
queryZmsData = name => {
  let index = zmsName.indexOf(name);
  if (index != -1) {
    let res = Mock.mock({
      query: {
        xm: zmsName[index],
        "bm|1": ["城关专卖所", "梅林专卖所", "力洋专卖所"],
        scjhl: "100%",
        scjcjhwcl: "100%",
        wfwgdhjcyfgl: "100%",
        zdjjcyfgl: "100%",
        wfwgdhqdl: "0",
        zyajchs: "@integer(0,5)",
        jsyajchs: "@integer(0,2)",
        zychsl: "@float(20,200,2,2)",
        jsychl: "@float(0,20,2,2)",
        xbzfhpjsc: "@integer(4,15)"
      }
    });
    return res;
  } else {
    return [];
  }
};
//查询jczd数据
queryJczdData = name => {
  let index = jczdName.indexOf(name);
  if (index != -1) {
    let res = Mock.mock({
      query: {
        xm: jczdName[index],
        jyxl1: "@float(30,120,2,2)",
        chjsysl1: "@float(0,3,2,2)",
        chjsysl2: "@integer(1,5)",
        chjsysl3: "@float(0,3,2,2)",
        chjsysl4: "@float(0,3,2,2)",
        chjsysl5: "@float(-30,30,2,2)",
        chjsysl6: "@integer(1,5)",
        chjsysl7: "@float(0,3,2,2)",
        chjsyajsl: "@integer(1,20)",
        czlshs: "@integer(1,100)",
        zmrysl: "@integer(1,20)",
        chjsyajccl: "@float(0,80,2,2)",
        chjsyrjl: "@float(0,3,2,2)",
        chswwzysajsl: "@integer(0,10)",
        chsyllzysl1: "@float(0,100,2,2)",
        chsyllzysl2: "@float(0,100,2,2)",
        chsyllzysl3: "@float(-10,10,2,2)",
        chswlrzyxdl: "@float(0,1,2,2)",
        syzxrs: "@integer(0,10)"
      }
    });
    return res;
  } else {
    return [];
  }
};
//查询scb数据
queryScbData = name => {
  let index = scbName.indexOf(name);
  if (index != -1) {
    let res = Mock.mock({
      query: {
        xm: scbName[index],
        "bm|1": ["城关市场部", "梅林市场部", "力洋市场部"],
        jymlzffd1: "@float(1,20,2)",
        hygypp1: "@float(-10,10,2)",
        hygypp2: "@float(10,40,2)",
        hygypp3: "@float(0,10,2)",
        xljhm1: "@integer(200,3000)",
        xljhm2: "@integer(1000,4000)",
        xljhm3: "@float(40,99,2)",
        xyt1: "@integer(200,1000)",
        xyt2: "@integer(1000,3000)",
        xyt3: "@float(10,50,2)",
        zfb1: "@float(100,200,2)",
        zfb2: "@float(1,5,2)",
        zfb3: "@float(20,70,2)",
        xfzhd1: "@integer(200,1000)",
        xfzhd2: "@float(0,3,2)",
        xfzhd3: "@float(70,500,2)",
        lskhyd1: "@integer(500,2000)",
        lskhyd2: "@integer(1000,3000)",
        lskhyd3: "@float(70,90,2)"
      }
    });
    return res;
  } else {
    return [];
  }
};

module.exports = [
  {
    url: "/vue-admin-template/table/zms",
    type: "get",
    response: config => {
      const items = genZmsData();
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
    url: "/vue-admin-template/table/jczd",
    type: "get",
    response: config => {
      const items = genJczdData();
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
    url: "/vue-admin-template/table/scb",
    type: "get",
    response: config => {
      const items = genScbData();
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
    url: "/vue-admin-template/table/query-zms",
    type: "get",
    response: config => {
      const { name } = config.query;
      const items = queryZmsData(name);
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
    url: "/vue-admin-template/table/query-jczd",
    type: "get",
    response: config => {
      const { name } = config.query;
      const items = queryJczdData(name);
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
    url: "/vue-admin-template/table/query-scb",
    type: "get",
    response: config => {
      const { name } = config.query;
      const items = queryScbData(name);
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

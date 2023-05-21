# 绩效考核 web 端

![image-20230520205115154](https://hexo-img.obs.cn-east-3.myhuaweicloud.com/llf/image-20230520205115154.png)

![image-20230520205155152](https://hexo-img.obs.cn-east-3.myhuaweicloud.com/llf/image-20230520205155152.png)

![image-20230520205213461](https://hexo-img.obs.cn-east-3.myhuaweicloud.com/llf/image-20230520205213461.png)

项目内所有数据纯属虚构，如有雷同，纯属巧合！

## 内容

1. 登录
2. 工作业绩表格展示
3. 绩效考核表格展示
4. 客户经理绩效大屏展示

## 亮点

1. 科技感十足的登录页面
2. 动态表格功能：按分类选项展示表格列
3. 多重列动态渲染
4. 数据可视化大屏模版-客户经理工作指标面板

## 技术

1. vue-template-admin：后台模板；
2. vue-element-admin：后台参考实现样式；
3. elementui：组件样式；
4. DataV：大屏模板组件；
5. mockjs：模拟后端 api，产生随机数据，后续想集成到 eggjs 中实现前后端分离；
6. animation.css：动画样式库

## 难点

1. **页面响应式布局**：

   1. 大屏展示中使用**drawMixin**可以实现页面整体保持比例缩放
   2. 但自己写的其他页面缩放性都还不太好
   3. 登录页面：
      1. 背景缩放方式：保持高度 100%，宽度 auto，这种方式可以保持背景的比例，但会裁剪横向的内容，如果背景上左右两边都有内容展示，那么用这种方法效果是不好的。
      2. 登录表单：水平垂直居中显示
   4. 并未适配移动端

2. **动态列显示**，即实现自选列展示到表格中：

   1. **多重列名**怎么展示：

      1. 参照 elementui 的 el-table 组件的多重列的写法，多重列采用列嵌套的方式实现；

   2. 多重列实现之后，如何**动态地展示列**：

      1. 不能采用常规的 v-for 的写法去生成动态列，因为涉及到多重列，el-table-column 的写法不同；

      2. 解决方法是改变列名对象的数据结构，**为多重列添加一个 children 对象**，用来存放子列，在 v-for 中添加对是否存在 children 对象的判断条件，以此来判断是否是多重列，写法如下：

         ```js
         columsOptions: [
                 { key: "dw", label: "姓名" },
                 { key: "zmjczd", label: "专卖稽查中队" },
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
                 { key: "czlshs", label: "2021年1月1日持证零售户数（户）" }
           ],
           columns: defaultColums,//columns为页面中要展示的列，options中为所有可选的列
         ```

      3. 但实现多重列的动态展示后，出现了表格的 bug，直接在表格中展示[单列,多重列,单列,单列,多重列...]等这样的单列和多重列随意组合的内容时，多重列的子列布局会无法对齐；经多番尝试之后仍然无法解决，只能退而求其次，采用这样的方案：对所选列先进行筛选，单列在前，多重列在后，**使用计算属性对所选列进行单列和多重列的筛选**，页面中先展示单列，再展示多重列，代码如下：

         ```vue
         <template>
           <div class="app-container">
             <el-card>
               <div style="margin-bottom:1em;">
                 <b>工作业绩表</b>
               </div>
               <!--列选择块-->
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
               <!--表格-->
               <el-table
                 :data="tableData"
                 fit
                 highlight-current-row
                 style="width: 100%"
               >
                 <el-table-column type="index" label="序号" width="50">
                 </el-table-column>
                 <!--先生成单列-->
                 <el-table-column
                   v-for="(item, index) in singleColunms"
                   :key="'single' + index"
                   :label="item.label"
                   :prop="item.key"
                   show-overflow-tooltip
                 ></el-table-column>
                 <!--再遍历多重列，对其中的子列进行循环生成-->
                 <el-table-column
                   v-for="(item, index) in multiColumns"
                   :key="'multi' + index"
                   :label="item.label"
                 >
                   <!--多重列的子列生成-->
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
         const defaultColums = [
           "姓名",
           "专卖稽查中队",
           "卷烟销量（万支）",
           "查获假私烟数量（万支）"
         ];

         export default {
           data() {
             return {
               tableData: [],
               columsOptions: [
                 { key: "dw", label: "姓名" },
                 { key: "zmjczd", label: "专卖稽查中队" },
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
               columns: defaultColums
             };
           },
           computed: {
             //筛选出单列
             singleColunms() {
               return this.columsOptions
                 .filter(item => this.columns.includes(item.label))
                 .filter(item => !item.children);
             },
             //筛选出多重列
             multiColumns() {
               return this.columsOptions
                 .filter(item => this.columns.includes(item.label))
                 .filter(item => item.children);
             }
           }
         </script>

         <style scoped></style>
         ```

   3. 大屏模板展示：

      1. 采用了**vue-big-screen**的 vue 模板，地址为：https://gitee.com/MTrun/big-screen-vue-datav
      2. 开始时想在 vue-template-admin 的框架下集成大屏模板，但无法适配到框架内，缩放的比例一直调不好，故最后的方案改为：管理平台内添加点击按钮，点击后跳转到另外一个页面，保持原来的整页面展示的模式，希望在将来能有能力可以实现模板下集成大屏的想法。
      3. **添加客户经理照片展示模块**：
         1. 开始时使用了 swiper 组件，想使用轮播页的方式来实现客户经理的轮播展示，但由于对 vue-big-screen 组件的不了解，无法适配出想要的效果来；
         2. 故只能手写一个简单的图片轮播组件，好在 vue-template-admin 框架本身添加了标签出现和消失的动画，使得切换的效果还是不错的。

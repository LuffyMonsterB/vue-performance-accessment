<template>
  <div class="dashboard-container">
    <el-row style="width:100%" type="flex" justify="center">
      <span class="inset-text">绩效管理平台</span>
    </el-row>
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  data(){
    return{
      show:true
    }
  },
  computed: {
    ...mapGetters(["name"])
  },
  created() {
    for (i in 5) {
      console.log(i);
    }
    getZMSData().then(res => {
      console.log(res);
    });
  }
};
</script>

<style scoped>
.dashboard-container{
  
  height: 500px;
  width: 100%;
  margin-top: 50px;
  display: flex;
  text-align: center;
  align-items: center;
}
.inset-text{
	font-weight:bold;
  font-size:80px;
	color:rgba(200, 200, 200);
	color:rgba(200, 200, 200, 0.7);
	text-shadow:1px 3px 6px #fff,0 0 0 #000,1px 3px 6px #fff;
}
</style>

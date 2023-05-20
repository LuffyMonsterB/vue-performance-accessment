<template>
  <div>
    <el-row type="flex" align="middle" justify="space-between">
      <el-col>
        <i class="el-icon-arrow-left" style="font-size:50px" @click="handleLeft"></i>
      </el-col>

      <el-col>
            <dv-border-box-8 :reverse="true" style="padding:4px 4px 0px 4px;">
              <div
                :style="{ zIndex: zIndex, height: height, width: width }"
                class="pan-item"
              >
                <!-- eslint-disable-next-line -->
                <div
                  :style="{ backgroundImage: `url(${activeManager.imgSrc})` }"
                  class="pan-thumb"
                ></div>
              </div>
            </dv-border-box-8>
            <div class="d-flex jc-center" style="margin-top:20px">
              <dv-decoration-7 style="width:160px;height:30px;"
                >{{ activeManager.department }}-{{ activeManager.name }}</dv-decoration-7
              >
            </div>
      </el-col>

      <el-col>
        <i class="el-icon-arrow-right" style="font-size:50px" @click="handleRight"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "ManagersPane",
  data() {
    return {
      activeManagerIndex:0,
      activeManager: {
          name: "张三",
          department: "市场部",
          imgSrc: require("@/assets/persons/person1.jpg")
        },
      managerOptions: [
        {
          name: "张三",
          department: "市场部",
          imgSrc: require("@/assets/persons/person1.jpg")
        },
        {
          name: "李四",
          department: "专卖所",
          imgSrc: require("@/assets/persons/person2.jpg")
        },
        {
          name: "王五",
          department: "稽查队",
          imgSrc: require("@/assets/persons/person3.jpg")
        }
      ]
    };
  },
  methods:{
    handleRight(){
      this.activeManagerIndex==this.managerOptions.length-1?this.activeManagerIndex=0:this.activeManagerIndex++
      this.activeManager=this.managerOptions[this.activeManagerIndex]
    },
    handleLeft(){
      this.activeManagerIndex==0?this.activeManagerIndex=this.managerOptions.length-1:this.activeManagerIndex--
      this.activeManager=this.managerOptions[this.activeManagerIndex]
    }
  },
  props: {
    image: {
      type: String,
      required: true
    },
    zIndex: {
      type: Number,
      default: 1
    },
    width: {
      type: String,
      default: "150px"
    },
    height: {
      type: String,
      default: "150px"
    }
  }
};
</script>

<style scoped>
.pan-item {
  width: 200px;
  height: 200px;

  display: inline-block;
  position: relative;
  cursor: default;
}

.pan-info-roles-container {
  padding: 20px;
  text-align: center;
}

.pan-thumb {
  width: 100%;
  height: 100%;
  background-position: center center;
  background-size: cover;

  overflow: hidden;
  position: absolute;
  transform-origin: 95% 40%;
  transition: all 0.3s ease-in-out;
}

/* .pan-thumb:after {
  content: '';
  width: 8px;
  height: 8px;
  position: absolute;
  border-radius: 50%;
  top: 40%;
  left: 95%;
  margin: -4px 0 0 -4px;
  background: radial-gradient(ellipse at center, rgba(14, 14, 14, 1) 0%, rgba(125, 126, 125, 1) 100%);
  box-shadow: 0 0 1px rgba(255, 255, 255, 0.9);
} */

.pan-info {
  position: absolute;
  width: inherit;
  height: inherit;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: inset 0 0 0 5px rgba(0, 0, 0, 0.05);
}

.pan-info h3 {
  color: #fff;
  text-transform: uppercase;
  position: relative;
  letter-spacing: 2px;
  font-size: 18px;
  margin: 0 60px;
  padding: 22px 0 0 0;
  height: 85px;
  font-family: "Open Sans", Arial, sans-serif;
  text-shadow: 0 0 1px #fff, 0 1px 2px rgba(0, 0, 0, 0.3);
}

.pan-info p {
  color: #fff;
  padding: 10px 5px;
  font-style: italic;
  margin: 0 30px;
  font-size: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
}

.pan-info p a {
  display: block;
  color: #333;
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  color: #fff;
  font-style: normal;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 9px;
  letter-spacing: 1px;
  padding-top: 24px;
  margin: 7px auto 0;
  font-family: "Open Sans", Arial, sans-serif;
  opacity: 0;
  transition: transform 0.3s ease-in-out 0.2s, opacity 0.3s ease-in-out 0.2s,
    background 0.2s linear 0s;
  transform: translateX(60px) rotate(90deg);
}

/* .pan-info p a:hover {
  background: rgba(255, 255, 255, 0.5);
}

.pan-item:hover .pan-thumb {
  transform: rotate(-110deg);
}

.pan-item:hover .pan-info p a {
  opacity: 1;
  transform: translateX(0px) rotate(0deg);
} */
</style>

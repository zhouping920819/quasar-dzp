<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from "./echartsBase.js";
import resize from "./mixins/resize.js";
export default {
  name: "line-chart",
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "350px"
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    customOptions: {
      type: Object,
      default: () => {
        return {
          typePosition: "x"
        };
      }
    },
    chartData: {
      type: Object,
      default: () => {
        return {
          typeData: [],
          valueData: []
        };
      }
    }
  },
  data() {
    return {
      chart: null,
      animationDuration: 2000
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        if(this.chart){
          this.chart.clear();
        }
        this.setOptions(val);
      }
    }
  },
  methods: {
    setOptions({ typeData, valueData = [] }) {
      let xAxis = [
        Object.assign({}, {
          type: "category",
          data: typeData,
          axisTick: {
            alignWithLabel: true
          }
        }, this.customOptions.xAxis || {})
      ];
      let yAxis = [
        Object.assign({}, {
          type: "value",
          axisTick: {
            show: false
          }
        }, this.customOptions.yAxis || {})
      ];
      // 图表配置
      let options = {
        title: Object.assign({}, {
          show: false,
          text: ''
        }, this.customOptions.title || {}),
        tooltip: Object.assign(
          {},
          {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          this.customOptions.tooltip || {}
        ),
        grid: Object.assign(
          {},
          {
            top: 30,
            left: "1%",
            right: "2%",
            bottom: "3%",
            containLabel: true
          },
          this.customOptions.grid || {}
        ),
        color: this.customOptions.color,
        xAxis,
        yAxis,
        series: []
      };
      // 显示数据 项=默认值
      let seriesItemDefaultData = {
        name: "",
        type: "line",
        // stack: "vistors",
        data: null,
        animationDuration: this.animationDuration
      };
      // 取出数据
      valueData.forEach(item => {
        // 数据
        options.series.push(Object.assign({}, seriesItemDefaultData, item));
      });
      // 坐标方向
      if (this.customOptions.typePosition === "y") {
        options.xAxis = yAxis;
        options.yAxis = xAxis;
      }
      // 生效
      this.chart.setOption(options);
    },
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.setOptions(this.chartData);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  }
};
</script>


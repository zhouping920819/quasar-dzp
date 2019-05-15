<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from "./echartsBase.js";
import resize from "./mixins/resize.js";
export default {
  name: "pie-chart",
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
      animationDuration: 2600
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    }
  },
  methods: {
    setOptions({ typeData, valueData = [] }) {
      // 图表配置
      let options = {
        tooltip: Object.assign(
          {},
          {
            show: false,
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          this.customOptions.tooltip || {}
        ),
        legend: Object.assign(
          {},
          {
            left: "center",
            bottom: "5",
            data: null
          },
          this.customOptions.legend || {}
        ),
        calculable: true,
        series: []
      };
      // 饼图--图例数据
      if (typeData) {
        options.legend.data = typeData;
      }
      // 默认
      let defauleItem = {
        name: "",
        type: "pie",
        // roseType: "radius",
        radius: [1, 60],
        center: ["50%", "45%"],
        data: null,
        color: ["#FFC000", "#00B050"],
        label: {
          normal: {
            show: true,
            position: "inside",
            color: "#000",
            // {d}%
            formatter: "{d}%"
          }
        },
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        },
        // animationEasing: "cubicInOut",
        animationDuration: 2600
      };
      valueData.forEach(item => {
        let tmp = Object.assign({}, item);
        tmp.data = tmp.data.map((val, idx) => {
          return {
            name: typeData[idx],
            value: val
          };
        });
        options.series.push(Object.assign({}, defauleItem, tmp));
      });
      // 生效
      this.chart.clear();
      this.chart.setOption(options);
    },
    initChart() {
      // console.log(this.$el);
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


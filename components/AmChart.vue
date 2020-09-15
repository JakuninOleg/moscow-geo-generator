<template>
   <div ref="chartdiv" class="hello" />
</template>

<script>
export default {
  props: {
    chartData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      chosenAreas: new Set()
    }
  },
  computed: {
    computedChartData() {
      return this.chartData
    },
  },
  methods: {
    filterMap(areaName) {
      this.chosenAreas.has(areaName) ? this.chosenAreas.delete(areaName) : this.chosenAreas.add(areaName)
      this.$emit('filterMap', this.chosenAreas)
    },
    loadChart() {
      this.chosenAreas.clear()
      this.chart.data = this.computedChartData
    }
  },
  mounted() {
     const {am4core, am4charts, am4themes_animated, am4themes_dark} = this.$am4core()

     const chart = am4core.create(this.$refs.chartdiv, am4charts.PieChart)

     console.log(this.chartData)
     chart.data = this.computedChartData

     chart.logo.disabled = true

     const pieSeries = chart.series.push(new am4charts.PieSeries())

     pieSeries.dataFields.value = "Кол-во объектов"
     pieSeries.dataFields.category = "Административный округ"

     chart.innerRadius = am4core.percent(40);

     pieSeries.labels.template.disabled = true
     pieSeries.ticks.template.disabled = true

     pieSeries.slices.template.events.on('hit', (ev) => this.filterMap(ev.target.dataItem.dataContext['Административный округ']))

     this.chart = chart
  },
   watch: {
     chartData: {
       handler: 'loadChart',
       deep: true
     }
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  width: 100%;
  height: 500px;
}
</style>

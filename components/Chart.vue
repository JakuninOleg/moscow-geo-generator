<template>
  <GChart
    :data="computedChartData"
    :options="chartOptions"
    :settings="{ packages: ['corechart'] }"
    :create-chart="(el, google) => new google.visualization.PieChart(el)"
    @click="clickChart"
  />
</template>

<script>
import { GChart } from 'vue-google-charts'
export default {
  components: {
    GChart,
  },
  props: {
    chartData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedSlice: 1,
      chartDataHeaders: ['Административынй округ', 'Кол-во точек'],
      chartType: 'PieChart',
      chartOptions: {
        title: 'Распределение по АО г. Москва',
        legend: { position: 'bottom' },
        width: 900,
        height: 500,
        pieSliceText: 'label',
      },
      // chartEvents: {
      //   click(click) {
      //     // const clickEventArray = click.targetID.split('#')

      //     console.log()

      //     // if (clickEventArray[0] !== 'slice') return

      //     // const clickedSliceId = clickEventArray[1]
      //     // // this.selectedSlice = clickedSliceId

      //     // if (clickedSliceId === 1 && clickEventArray[0] === 'slice') {
      //     //   // this.$emit('showAllAreas')
      //     //   console.log(clickedSliceId)
      //     // } else if (clickEventArray[0] === 'slice') {
      //     //   // this.$emit('showChosenAreas', clickedSliceId)
      //     //   console.log('not id 1')
      //     // }
      //   },
      // },
    }
  },
  computed: {
    computedChartData() {
      return [this.chartDataHeaders, ...this.chartData]
    },
  },
  methods: {
    clickChart() {
      console.log(this)
    },
  },
}
</script>

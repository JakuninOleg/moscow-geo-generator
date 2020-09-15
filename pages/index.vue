<template>
  <div class="container">
    <button @click="generateNewData">Сгенерировать новые метки</button>
    <div class="main-content">
      <Map :map-data="mapData" />
      <AmChart :chart-data="chartData" @filterMap="filterMap" />
    </div>
  </div>
</template>

<script>
import Map from '@/components/Map'
import AmChart from '@/components/AmChart'
import { generateCoords } from '~/algorithms/coords-generator'

export default {
  components: {
    Map,
    AmChart,
  },
  data() {
    return {
      areasWithPoints: [],
      mapData: [],
      chartData: [],
    }
  },
  created() {
    this.generateNewData()
  },
  methods: {
    generateNewCoords() {
      this.areasWithPoints = generateCoords()
    },
    generateChartData() {
      this.chartData = []
      this.areasWithPoints.forEach((el) => {
        this.chartData.push({'Административный округ': el.name, 'Кол-во объектов': el.points.length})
      })
    },
    generateMapData(dataArray) {
      this.mapData = dataArray
    },
    generateNewData() {
      this.generateNewCoords()
      this.generateMapData(this.areasWithPoints)
      this.generateChartData()
    },
    filterMap(chosenAreas) {
      if(chosenAreas.size === 0) {
        this.generateMapData(this.areasWithPoints)
      } else {
        this.generateMapData(this.areasWithPoints.filter(el => {
          return chosenAreas.has(el.name)
        }))
      }
    }
  },
}
</script>

<style>
.container {
  display: grid;
  height: 90vh;
  align-items: center;
  justify-items: center;
}

.main-content {
  display: flex;
  justify-content: center;
}
</style>

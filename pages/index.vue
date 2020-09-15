<template>
  <div class="container">
    <button class="button" @click="generateNewData">Сгенерировать новые метки</button>
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  justify-content: center;
}

.button {
  transition: all 0.32s ease-out;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 20px;
  text-decoration: none;
  margin-top: 20px;
  color: #fff;
  position: relative;
  display: inline-block;
  background-color: #55acee;
  box-shadow: 0px 5px 0px 0px #3C93D5;
}

.button:hover {
  background-color: #6FC6FF;
  cursor: pointer;
}

.button:active {
  transform: scale(0.95);
  box-shadow: 0px 1px 0px 0px;
}

.button:focus {
  outline: none;
}
</style>

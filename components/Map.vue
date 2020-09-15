<template>
  <client-only>
    <yandex-map
      :coords="[37.620407, 55.754093]"
      class="map"
      :controls="[]"
      :zoom="9"
      :use-object-manager="true"
    >
      <ymap-marker
        v-for="(item, id) in coordinates"
        :key="id"
        :marker-id="id"
        marker-type="placemark"
        :coords="item"
      ></ymap-marker>
    </yandex-map>
  </client-only>
</template>

<script>
export default {
  props: {
    mapData: { required: true, type: Array },
  },
  computed: {
    areasComputed() {
      return this.mapData
    },
    coordinates() {
      const arrayOfPoints = [...this.areasComputed.map((el) => el.points)]
      const arrayOfCoordinates = []
      arrayOfPoints.forEach((el) =>
        el.forEach((el) => arrayOfCoordinates.push(el))
      )
      return arrayOfCoordinates
    },
  }
}
</script>

<style>
.ymap-container {
  height: 500px;
  width: 600px;
  justify-self: center;
}
</style>

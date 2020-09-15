import Vue from 'vue'
import YmapPlugin from 'vue-yandex-maps'

const settings = {
  apiKey: '1a2a21cf-1f34-4289-a9d9-76199865eb96',
  lang: 'ru_RU',
  coordorder: 'longlat',
  version: '2.1',
}

Vue.use(YmapPlugin, settings)

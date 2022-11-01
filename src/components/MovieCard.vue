<template>
  <v-hover>
    <template v-slot:default="{ isHovering, props }">
      <v-card
          class="d-flex pa-1"
          style="border: 1px #C4C4C4 solid;"
          @click="detailPage"
          v-bind="props"
          :elevation="isHovering ? 8 : 0"
          height="100%"
      >
<!--        <img :src="`${image_url_w500}${data.poster_path}`" width="125">-->
        <div>
          <v-img
              :src="`${image_url_w500}${data.poster_path}`"
              :lazy-src="`${image_url_w500}${data.poster_path}`"
              cover
              class="bg-grey-lighten-2"
              width="125"
          >
            <template v-slot:placeholder>
              <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
              >
                <v-progress-circular
                    indeterminate
                    color="grey-lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </div>
        <div>
          <v-card-title
              style="word-break: break-word"
              class="text-start text-wrap text-subtitle-1"
          >
            {{  data.title  }}
          </v-card-title>
          <v-card-text class="mt-8">
            <div class="d-flex">
              <img :src="require('@/assets/calendar.svg')">
              <h4 class="mx-1">{{  data.release_date  }}</h4>
            </div>
            <div class="d-flex flex-wrap mt-2">
              <div
                  v-for="(genre, index) in data.genre_ids"
                  :key="index"
                  class="d-flex flex-wrap"
              >
                <h4>{{ $store.state.genres[genre] }}</h4>
                <img :src="require('@/assets/ellipse.svg')" class="mx-1" v-if="index !== data.genre_ids.length-1">
              </div>
            </div>
          </v-card-text>
        </div>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
export default {
  name: 'MovieCard',
  props: ['data'],
  computed: {
    image_url_w500() {
      return process.env.VUE_APP_IMAGE_URL_W500
    }
  },
  methods: {
    detailPage() {
      this.$router.push({  name: 'detail', query: { movie_id: this.data.id }  })
      this.$store.state.moviePage = this.$route.query.page
    }
  }
}
</script>
<template>
  <div>
    <BackBox v-if="!loading" :title="detail.original_title || ''" :subTitle="detail.tagline || ''"/>
    <div v-if="!loading" class="d-flex mt-12">
      <div>
        <v-img
            :src="`${image_url_original}${detail.poster_path}`"
            :lazy-src="`${image_url_original}${detail.poster_path}`"
            cover
            class="bg-grey-lighten-2"
            min-width="330"
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
      <v-card
          width="100%"
          elevation="0"
          class="px-8 py-4"
      >
        <DetailValue
            :key="index"
            v-for="(element, index) in details"
            :title="element.title"
            :value="detail[element.key]"
            :price="element.price"
            :genres="element.genres"
            :link="element.link"
        />
      </v-card>
    </div>
    <p
        class="mt-8 text-start"
        v-if="!loading"
    >
      {{ detail.overview }}
    </p>
    <div v-if="!loading" class="text-start mt-8">
      <h4>Credit:</h4>
      <h5 class="mt-3">{{ crew.join(', ') }}</h5>
      <h5 class="mt-3">{{ cast.join(', ') }}</h5>
    </div>
    <v-progress-circular
        indeterminate
        color="secondary"
        class="mt-8"
        v-if="loading"
    ></v-progress-circular>
  </div>
</template>

<script>
import BackBox from "@/components/BackBox";
import DetailValue from "@/components/DetailValue";
import api from "@/services/api";
export default {
  name: 'DetailMovies',
  components: {
    BackBox,
    DetailValue
  },
  data: () => ({
    details: [
      {
        title: 'Budget',
        key: 'budget',
        price: true
      },
      {
        title: 'Revenue',
        key: 'revenue',
        price: true
      },
      {
        title: 'Release Date',
        key: 'release_date'
      },
      {
        title: 'Runtime',
        key: 'runtime'
      },
      {
        title: 'Score',
        key: 'vote_average'
      },
      {
        title: 'Genres',
        key: 'genres',
        genres: true
      },
      {
        title: 'IMDB Link',
        key: 'imdb_id',
        link: true
      },
      {
        title: 'Homepage Link',
        key: 'homepage',
        link: true
      }
    ],
    detail: {},
    cast: [],
    crew: [],
    loading: true,
  }),
  computed: {
    movie_id() {
      return this.$route.query.movie_id
    },
    image_url_original() {
      return process.env.VUE_APP_IMAGE_URL_ORIGINAL
    },
  },
  mounted() {
    api.details(this.movie_id).then(res => {
      this.detail = res.data
      this.loading = false
    }).catch(() => {
      this.loading = false
    })
    api.credits(this.$route.query.movie_id).then(res => {
      res.data.cast.forEach(element => {
        this.cast.push(element.name)
      })
      res.data.crew.forEach(element => {
        this.crew.push(element.name)
      })
    })
  }
}
</script>
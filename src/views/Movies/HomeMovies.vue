<template>
  <div>
    <SearchBox @searchSubmit="search"/>
    <v-progress-circular
        indeterminate
        color="secondary"
        class="mt-8"
        v-if="loading"
    ></v-progress-circular>
    <v-row
        class="mt-8"
        v-else
    >
      <v-col
          xl="3"
          lg="4"
          md="6"
          sm="12"
          v-for="(movie, index) in movies"
          :key="index"
      >
        <MovieCard :data="movie"/>
      </v-col>
    </v-row>
    <div v-if="!loading && success" class="d-flex justify-center mt-16">
      <v-btn
          @click="previousPage"
          variant="text"
          class="text-capitalize text-body-2"
          :disabled="$route.query.page == 1 || typeof $route.query.page == 'undefined'"
          :color="($route.query.page == 1 || typeof $route.query.page == 'undefined') ? 'black' : 'secondary'"
      >
        Previous Page
      </v-btn>
      <v-divider
          class="mx-4"
          vertical
          height="100"
          color="#6A6A6A"
      ></v-divider>
      <v-btn
          @click="nextPage"
          variant="text"
          class="text-capitalize text-body-2"
          :disabled="$route.query.page == $store.state.totalPages"
          color="secondary"
      >
        Next Page
      </v-btn>
    </div>
    <div
        class="text-grey-darken-1 mt-4"
        v-if="!loading && success"
    >
      Showing results {{ (($route.query.page || 1) - 1) * 20 + 1 }}-{{ (($route.query.page || 1) - 1) * 20 + countResult }}
    </div>
  </div>
</template>

<script>
import SearchBox from '@/components/SearchBox'
import MovieCard from '@/components/MovieCard'
import api from "@/services/api";
export default {
  name: 'MoviesLayout',
  components: {
    SearchBox,
    MovieCard
  },
  data: () => ({
    movies: [],
    loading: false,
    success: false,
    countResult: 0,
  }),
  mounted() {
    api.genres().then(res => {
      res.data.genres.forEach(element => {
        this.$store.state.genres[element.id] = element.name
      })
      this.loadMovies(this.$route.query.page)
    })
  },
  methods: {
    search(searchText) {
      console.log(searchText)
    },
    loadMovies(page) {
      this.loading = true
      this.success = false
      if (typeof page === "undefined") {
        page = 1
      }
      api.movies(page).then(res => {
        this.movies = res.data.results
        this.$store.state.totalPages = res.data.total_pages
        this.countResult = res.data.results.length
        console.log(res)
        this.loading = false
        this.success = true
      }).catch(() => {
        this.movies = []
        this.loading = false
      })
    },
    nextPage() {
      if (typeof this.$route.query.page === "undefined") {
        this.$route.query.page = 1
      }
      this.$router.push({ name: 'home', query: { page: parseInt(this.$route.query.page) + 1 } })
      this.loadMovies(parseInt(this.$route.query.page) + 1)
    },
    previousPage() {
      this.$router.push({ name: 'home', query: { page: parseInt(this.$route.query.page) - 1 } })
      this.loadMovies(parseInt(this.$route.query.page) - 1)
    }
  }
}
</script>
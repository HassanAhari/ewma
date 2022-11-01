<template>
  <v-card
      color="dark"
      class="rounded-lg d-flex align-center mt-4"
      min-height="104"
      elevation="0"
  >
    <v-card-actions>
      <v-btn
          color="secondary"
          class="rounded-pill text-capitalize ms-8 px-4"
          @click="$router.push({ name: 'home', query: { page: $store.state.moviePage } })"
          variant="flat"
      >
        <v-icon>mdi-arrow-left</v-icon>
        Back
      </v-btn>
    </v-card-actions>
    <div class="text-start">
      <v-card-title>{{ title }}</v-card-title>
      <v-card-subtitle>{{ subTitle }}</v-card-subtitle>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'BackBox',
  props: ['title', 'subTitle']
}
</script>
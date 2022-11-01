<template>
  <v-card
      color="dark"
      class="rounded-lg mt-4"
      elevation="0"
  >
    <v-form
        @submit.prevent="$emit('searchSubmit', searchText)"
        class="d-md-flex px-8 py-4 align-center"
    >
      <v-text-field
          v-model="searchText"
          label="Search by release date"
          variant="outlined"
          clearable
          hide-details
          density="compact"
          class="my-4 mx-4"
      ></v-text-field>
      <v-btn
          color="secondary"
          class="rounded-pill text-capitalize px-4"
          type="submit"
      >
        Search
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: 'SearchBox',
  data: () => ({
    searchText: ''
  })
}
</script>
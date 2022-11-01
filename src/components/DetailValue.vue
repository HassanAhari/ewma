<template>
  <div class="d-flex py-2">
    <p><strong>{{ title }}</strong></p>
    <v-spacer></v-spacer>
    <span v-if="price">{{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value) }}</span>
    <span v-else-if="genres" v-for="(genre, index) in value" :key="index">
      {{ genre.name }}
      <span v-if="index !== value.length-1" class="me-1">,</span>
    </span>
    <span v-else-if="link"><a :href="value" class="text-secondary" target="_blank">link</a></span>
    <span v-else>{{ value }}</span>
  </div>
</template>

<script>
export default {
  name: 'DetailValue',
  props: ['title', 'value', 'price', 'genres', 'link'],
  methods: {
    formatter() {
      Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
    }
  }
}
</script>
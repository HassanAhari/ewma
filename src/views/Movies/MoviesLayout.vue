<template>
  <v-app>
    <v-app-bar
        height="48"
        color="primary"
        elevation="0"
    >
    </v-app-bar>
    <v-main class="my-4">
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
body {
  background-color: black;
}
#app {
  position: relative;
  min-height: 100vh;
  max-width: 640px;
  margin: 0 auto;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f6f6f9;
}
.max-container {
  max-width: 640px;
}
</style>

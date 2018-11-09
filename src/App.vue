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
.app-fb-tab,
.max-container {
  max-width: 640px;
}
#app .app-fb-tab {
  position: fixed;
  z-index: 10;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #e5e5e5;
}
</style>

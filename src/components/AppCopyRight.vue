<template>
    <div class="xa-cell copy-right" style="margin:20px 0;">
        <p class="xa-txt-12">Copyright © 2007-{{year}} XAG</p>
    </div>
</template>
<script>
let YEAR = (new Date()).getFullYear()
YEAR = YEAR >= 2017 ? YEAR : 2017
export default {
  name: 'copyright',
  data() {
    return {
      year: YEAR
    }
  }
}
</script>
<style scoped>
.copy-right {
  justify-content: center;
}
</style>

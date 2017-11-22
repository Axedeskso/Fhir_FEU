<template>
   <div id="database" class="content">
     <div class="body-container">
       <div class="container-content">
         <GridTest/>
       </div>
     </div>
   </div>
</template>

<script>
  export default {
    name: 'database',

    methods: {
      handleScroll () {
        document.getElementById('gridtest').scrollLeft = document.getElementById('gridtest').scrollLeft
      }
    }
  }
</script>

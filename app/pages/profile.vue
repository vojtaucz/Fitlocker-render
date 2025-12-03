<script lang="js" setup>
  const route = useRouter();
   const authdata = await $fetch('/api/checkjwttoken')

 route.push("/users/" + authdata.name)
</script>
<template>
  <div>
    
  </div>
</template>


<style>

</style>
<script setup lang="ts">
import user_exist_check from '~/middleware/user_exist_check';
const route = useRoute();
  definePageMeta({
    middleware: [user_exist_check]
     })
  useHead({
  title: 'FitLocker | @' + route.params.user
  })
</script>
<template>
  <div>
    <mainpage-header/>
    <profile-profilepage :name="$route.params.user"/>
  </div>
</template>



<template>
  <div>
    <mainpage-header/>
    <posts-postspage :id="$route.params.post"/>
  </div>
</template>

<script lang="ts" setup>
import post_exist_check from '~/middleware/post_exist_check';
definePageMeta({
    middleware: [post_exist_check]
     })
</script>

<style>

</style>
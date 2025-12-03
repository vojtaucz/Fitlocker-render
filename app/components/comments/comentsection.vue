<template>
  <div class="comsec">
    <comments-createcomment :id="parms.id"/>
    <p v-if="!comments">No comments...</p>
    <comments-comment v-for="x in comments" :id="x.comment_id"
    :key="x.comment_id"></comments-comment>
  </div>
</template>

<script lang="js" setup>
const parms = defineProps({
  id:{}
})
const { data: comments } = await useFetch('/api/reqs/getcomments', {
  key: 'post-comments', 
  method: 'POST',
  body: { id: parms.id }
})
console.log(comments[0])
</script>

<style>
  .comsec {
    display: flex;
    flex-direction: column;
    gap: 5px;
    overflow-y: scroll;
    width: 100%;
    height: 100%;
  }
</style>
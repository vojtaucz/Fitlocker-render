<script lang="ts" setup>
const router = useRouter();
const filesrc = ref();
const props = defineProps({
  id: {
    
  }
})
const resolut = await $fetch("/api/postinfo", {
  method: "POST",
  body: {
      id: props.id
  }
})
filesrc.value = resolut.src;
</script>

<template>
    <div class="post-container">
      <img :src="filesrc" @click="router.push('/posts/'+ props.id)"></img>
    </div> 
</template>


<style>
  .post-container {
    cursor:pointer;
    display: flex;
    flex-direction: column;
    height: max-content;
    width: 250px; 
    background-color: rgb(107, 107, 107);
    overflow: hidden;
    border-radius: 5px;
    transition: 0.3s;
  }
  .post-container > img {
    width: 250px; 
    height: auto;
  }
  .post-container:hover {
    transform: translateY(-15px);
  }
  .post-container:active {
    transform: scale(0.89);
  }
</style>
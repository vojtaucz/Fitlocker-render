<template>
  <div class="comment-c">
    <input v-model="mess">
    <button @click="submit()">Submit</button>
  </div>
</template>

<script lang="js" setup>
const props = defineProps({
  id: {}
})
const router = useRouter();
const route = useRoute();
const mess = ref()

const authdata = await $fetch('/api/checkjwttoken')

  const submit = async() => {
    if (!mess.value) {return}
    if (!(authdata.loggedin)) {router.push('/login')}
    const res = await $fetch("/api/reqs/addcomment", {
    method: "POST",
    body: {
      message: mess.value,
      post_id: props.id
    }
  })
  mess.value = ""
  await refreshNuxtData('post-comments')
  await refreshNuxtData('post-comments')
}
</script>
<style>
.comment-c {
  display: flex;
  width: 95%;
  height: 100px;
  background-color: rgb(228, 228, 228);
  border-radius: 35px;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
}
.comment-c > p {
  font-size:  12px;
  padding: 0px 15px;
  text-align: justify;
}
.comment-c > svg {
  width: 30px;
  transition: 0.3s;
  margin-right: 15px;
}
.comment-c > svg:hover  {
  transform: translateY(-7px);
}
.comment-c > svg:active {
  transform: scale(0.75);
}
.comment-c > button {
   background-color: black;
            color: white;
            padding: 6px;
            border-radius: 12px;
            border: none;
            font-family: inter;
            font-size: 1.1rem;
            transition: 0.2s;
            width: 80px;
}
</style>
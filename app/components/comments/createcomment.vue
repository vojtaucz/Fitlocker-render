<template>
  <div class="comment-c">
    <div class="nap-c">
      <img :src="pfp">
    </div> 
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
const pfp = ref()
const mess = ref()
pfp.value = "/uploads/profilepics/default.png"
const authdata = await $fetch('/api/checkjwttoken')
  if (authdata.loggedin) {
    pfp.value = await $fetch("/api/getpfp",{
      method: "POST",
      body: {
        id: authdata.id
      }
    })
  }else {
    router.push("/login")
  }

  const submit = async() => {
    if (!mess.value) {return}
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
.nap-c > img {
  border-radius: 35px;
  width: 50px;
  height: 50px;
  object-fit: cover;
}
.nap-c {
  margin-left: 15px;
  max-width: 75px;
  display: flex;
  justify-content:left;
  flex-direction: column;
  align-items: center;
}
.comment-c > p {
  font-size:  12px;
  padding: 0px 15px;
  text-align: justify;
}
.nap-c > p {
  font-size:  10px;
  padding: 0;
  margin: 2px 0px 0px 0px;
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
</style>
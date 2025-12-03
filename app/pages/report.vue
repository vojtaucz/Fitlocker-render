<template>
  <mainpage-header/>
  <div class="this">
    <h3>Duvod Reportu</h3>
    <select :disabled="disabledtype" v-model="reporttype">
      <option>Profile</option>
      <option>Post</option>
      <option>Comment</option>
    </select>
    <input :disabled="disabled" v-model="id" placeholder="Id of the Profile,Post or Comment should be here by default">
    <select v-model="reason">
      <option>Nudity (Bannable)</option>
      <option>Violence (Bannable)</option>
      <option>Not an Outfit</option>
    </select>
    <input v-model="osobnishrnuti" placeholder="Your own summary">
    <button @click="onsubmit()">Report!</button>
    <p>Warning False Reporting is Bannable!!! Reports are not anonymus!!!</p>
  </div>
</template>

<script lang="js" setup>
const route = useRoute()
const router = useRouter()
definePageMeta({
  key: route => route.fullPath
})
const osobnishrnuti = ref()
const id = ref()
const disabled = ref()
const disabledtype = ref()
const reporttype = ref()
const reason = ref()
try {
  id.value = route.query.id;
  reporttype.value = route.query.type;
} catch(err) {

}
if (reporttype.value) {
  disabledtype.value = true
}
else {
  disabledtype.value = false
}
if (id.value) {
  disabled.value = true;
}else {
  disabled.value = false;
}
const authdata = await $fetch('/api/checkjwttoken')

const onsubmit = async() => {
  if (authdata.loggedin) {
    const state = await $fetch("/api/reqs/report", {
      method: "POST",
      body: {
        user_id: authdata.id,
        idofreported: id.value,
        typeof: reporttype.value,
        message: osobnishrnuti.value,
        reason: reason.value
      }
    })
    console.log(state.state)
    if (state.state) {
      router.push("/");
    }else {

    }
  }
  else {
    router.push("/login")
  }
}
</script>

<style>
.this {
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 35px;
}
.this > p {
  color: red;
}
</style>
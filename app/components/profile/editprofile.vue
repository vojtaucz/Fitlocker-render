<script lang="js" setup>
const router = useRouter()
const bio = ref("");
const name = ref("");
const errmes = ref("");
 const oldbio = ref("");
  const authdata = await $fetch('/api/checkjwttoken')
    if (authdata.loggedin) {
        const data = await $fetch("/api/gatherinfo", {
            method: "POST",
            body: {
                id: authdata.id
            }
        })
        console.log(data)
        name.value = authdata.name;
        bio.value = data.bio;
        oldbio.value = data.bio;
    }
    else {
        router.push("/login")
    }
    const formData = new FormData()
    const selectedFile = ref(null)
    const handleFileChange = function (event) {
        selectedFile.value = event.target.files[0]}
    const upload = async function() {
    sendinfo();
}
const sendinfo = async function() {
  if (selectedFile.value != null) {
    formData.append('file', selectedFile.value)
  }
  formData.append('name',authdata.name);
  formData.append('id',authdata.id);
  formData.append('bio',bio.value);
  if (name.value != authdata.name) {
    formData.append('newname', name.value)
  }
  try {
    await $fetch('/api/reqs/changeprofile', {
    method: "POST",
      body: formData
  })
  await $fetch('/api/auth/updatejwt', {
    method: "POST",
      body: {
        name: name.value,
      }

  })
  router.push('/profile')
  } catch (err) {
    errmes.value = err.data.statusMessage
  }
}
</script>
<template>
  <div class="edit-page">
      <div class="container">
        <h1>EDIT YOUR PROFILE</h1>
        <div>
            <h3>PROFILE PICTURE</h3>
            <input class="file-input" type="file" @change="handleFileChange" accept="image/*"></input>
        </div>
        <div>
            <h3>USERNAME</h3>
            <input class="input" placeholder="username" v-model="name"></input>
        </div>
        <div>
            <h3>DESCRIPTION</h3>
            <input class="input" placeholder="Bio" v-model="bio"></input>
        </div>
          <button class="submit" @click="upload()">Submit</button>
          <p style="color: red;" v-if="errmes" v-text="errmes"></p>
      </div>
    </div>
</template>

<style>
  .edit-page {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  padding: 60px 20px 0px 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  text-align: center;
}
.container {
  background: white;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  height: 90vh;
  padding-top: 20px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
}
.container > div {
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.submit {
  background-color: #000;
  color: white;
  padding: 16px;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  width: 90%;
  margin-top: 10px;
  transition: opacity 0.2s;
  margin-top: 50px;
}
.input {
  width: 95%;
}
.submit:hover {
  opacity: 0.8;
}
h3 {
  color: #4a4a4a;
      font-size: 0.9rem;
    font-weight: 600;
}
h1 {
  color: #1a1a1a;
}
.file-input {
  background-color: #f0f0f0;
  width: 95%;
}
</style>
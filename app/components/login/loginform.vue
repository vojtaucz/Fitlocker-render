<script lang="js" setup>
const router = useRouter()
const email = ref('')
const password = ref('')
const errmes = ref('')
async function submit () {
  errmes.value = null
  try {
    const pass = await $fetch("/api/auth/login", {
    method: "POST",
    body: {
      email: email.value,
      password: password.value
    }
  }) 
  email.value = ""
  password.value = ""
  router.push('/')
  } catch(err) {
    if (err.data.statusMessage == "Server Error") {
        errmes.value = "Wrong credentials"
    }else {
      errmes.value = err.data.statusMessage
    }
  }
  
    
}
</script>
<template>
  <div class="form">
    <h1 class="logoreg"><span>Fit</span>Locker</h1>
            <h2>Log in</h2>
            <input v-model="email" type="email" placeholder="Your@mail.here">
            <input v-model="password" type="password" placeholder="Password">
            <button class="button" type="submit" @click="submit()">
                Log in
            </button>
            <a @click="router.push('/register')">I dont have an account</a>
            <p style="color: red;" v-if="errmes" v-text="errmes"></p>
  </div>
</template>


<style>
    .form {
        padding-top:  50px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 25px;
        height: 85vh;
       } 
       .form > input {
        width: 9vw ;
       }
       p , button{
        font-family: inter;
       }
       a {
        color:#3b2f64;
        text-decoration: underline;
        font-family: inter;
       
       }
       .logoreg {
        font-family: Climate Crisis;
        color: black;
       }
       .logoreg > span {
       color: #9590A8;;
       }
</style>
<script lang="js" setup>
  const router = useRouter()
  const nameform = ref('')
  const emailform = ref('')
  const passform = ref('')
  const errmes = ref('')
  async function sendreg() {
    errmes.value = null
    try {
      await $fetch("/api/auth/adduser", {
      method: "POST",
      body: {
          name: nameform.value,
          email: emailform.value,
          password: passform.value
        }
    })
    if (!errmes.value) {
      router.push('/login')
    }
    } catch(err) {
      errmes.value = err.data.statusMessage
    }
  }
</script>
<template>
  <div class="form">
    <h1 class="logoreg"><span>Fit</span>Locker</h1>
            <h2>Register</h2>
            <input v-model="nameform" placeholder="Your name">
            <input v-model="emailform" type="email" placeholder="Your@mail.here">
            <input v-model="passform" type="password" placeholder="Password">
            <button class="button" type="submit" @click="sendreg()">
                Register
            </button>
            <a @click="router.push('/login')" >I have an account</a>
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
       .logoreg {
        font-family: Climate Crisis;
        color: black;
       }
       .logoreg > span {
       color: #9590A8;;
       }

</style>
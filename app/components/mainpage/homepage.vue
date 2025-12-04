<template>
  <div class="main-page">
    <header class="logodiv">
      <h1 class="logo"><span>Fit</span>Locker</h1>
      <div class="header-spacer"></div>
    </header>
    <p>Made by @Vojtau_ ig:</p>
    <div class="card-container">
      <div class="buttons-wrapper">
        <button class="action-btn" @click="router.push('/profile')">
          Profile
        </button>
        <div class="btn-divider"></div>
        <button class="action-btn" @click="router.push('/search')">
          Browse
        </button>
      </div>
      <main class="card-content">
        <div class="border-patch"></div>
        <h2 class="section-title">Now trending</h2>
          <div v-if="posts && posts[0]" class="grid-layout">
      <posts-post
        v-for="(post, index) in posts[0]" 
        :key="post.post_id" 
        :id="post.post_id"
      />
    </div>
          <p v-else>The list is empty...</p>
      </main>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const { data: posts, error } = await useFetch("/api/postsformainpage", {
  method: "POST"
})
</script>

<style scoped>
.main-page {
  font-family: Arial, Helvetica, sans-serif;
  width: 95%;
  max-width: 100%;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  color: #333;
  box-sizing: border-box;
  padding-top: 100px;
}
.logodiv {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: -6px; 
  padding-left: 0;
  padding-right: 1rem;
  z-index: 2;
  position: relative;
}

.logo {
  font-size: 7rem;
  font-weight: 900;
  letter-spacing: -2px;
  margin: 0;
  line-height: 1;
  color: #000000;
  font-family: Climate Crisis;
  letter-spacing: normal;
  transition: 0.3s;
}
.logo:hover {
  letter-spacing: 0.5rem;
  
}
.logo > span {
  color: #9590A8;
}
.card-container {
  position: relative;
  width: 100%;
  margin-top: 40px;
}

.buttons-wrapper {
  position: absolute;
  top: -58px; 
  right: 40px;
  height: 58px;
  
  background-color: #ffffff;
  border: 4px solid #000;
  border-bottom: none;
  
  border-top-left-radius: 29px;
  border-top-right-radius: 29px;
  
  display: flex;
  align-items: center;
  z-index: 10;
  overflow: hidden;
  transition: 0.3s;
}

.action-btn {
  background: none;
  border: none;
  font-size: 1.25rem;
  font-weight: 600;
  padding: 0 35px;
  height: 100%;
  cursor: pointer;
  font-family: inter;
  color: #18181b;
  transition: 0.2s;
}

.action-btn:hover {
  background-color: rgba(0,0,0,0.05);
  border-bottom: solid; 
  transition: 0.3s;
}

.action-btn:hover .buttons-wrapper{
  border-bottom-left-radius: 29px;
  border-bottom-right-radius: 29px;
}

.btn-divider {
  width: 2px;
  height: 50%;
  background-color: rgba(0,0,0,0.1);
}

.card-content {
  background-color: #ffffff;
  border: 4px solid #000;
  border-radius: 30px;
  padding: 40px;
  position: relative;
  min-height: 600px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
.card-content {
  display: flex; 
  flex-direction: column;
  align-items: center;
}

.border-patch {
  position: absolute;
  top: -4px;
  right: 42px;
  width: 250px; 
  height: 10px;
  background-color: #ffffff; 
  z-index: 5;
}

.section-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2.5rem;
  margin-top: 0.5rem;
  font-weight: normal;
  color: #18181b;
}

.grid-layout {
  columns: 1; 
  column-gap: 1vw;
}
.grid-layout > * {
  margin-bottom: 1vw;
}

.grid-item:hover {
  transform: translateY(-4px);
  background-color: #6a6a75;
}

.placeholder-box {
  color: rgba(255,255,255,0.4);
  font-size: 1.5rem;
  font-weight: bold;
}
@media (max-width: 450px) {
  .grid-layout {
  column-count: 1; 
  }
  .logodiv {
    justify-content: center;
  }
  .card-container{
    justify-content: center;
    margin-top: 100px;
  }
  .card-content {
    padding: 0;
  }
}
@media (min-width: 2200px) {
  .grid-layout {
  column-count: 6; 
  column-gap: 1vw;
  row-gap: 15px;
  }
}
@media (min-width: 768px) {
  .logo {
    font-size: 3rem;
  }
  
  .buttons-wrapper {
    right: 20px;
  }
  
  .border-patch {
    right: 22px;
    width: 215px;
  }

  .card-content {
    padding: 20px;
  }
  
  .grid-layout {
    column-count: 2;
  }
  
  .action-btn {
    padding: 0 20px;
  }
}
@media (min-width: 1024px) {
  .grid-layout {
    column-count: 3;
  }
}
@media (min-width: 1424px) {
  .grid-layout {
    column-count: 5;
  }
}
</style>
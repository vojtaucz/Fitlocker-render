<script setup lang="js">
import { ref } from 'vue'
const router = useRouter();

const props = defineProps({
  id: {
    required: true
  }
})

const isowner = ref(false)
const haslike = ref(false)
const user = ref('');
const postname = ref('');
const desc = ref('');
const date = ref('');
const src = ref('');
const likes = ref(0);

const refreshinfo = async function () {
  try {
    const req = await $fetch("/api/postinfo", {
      method: 'POST',
      body: { id: props.id }
    })
    user.value = req.username;
    postname.value = req.postname;
    desc.value = req.description;
    date.value = req.date;
    src.value = req.src;
    likes.value = req.likes;
  } catch (e) {
    console.error("Failed to refresh info", e);
  }
}

try {
  const req = await $fetch("/api/postinfo", {
    method: 'POST',
    body: { id: props.id }
  })
  
  user.value = req.username;
  postname.value = req.postname;
  desc.value = req.description;
  date.value = req.date;
  src.value = req.src;
  likes.value = req.likes;
  const authdata = await $fetch('/api/checkjwttoken')
  
  if (authdata && authdata.loggedin) {
    const haslikefetch = await $fetch('/api/reqs/haslike', {
      method: "POST",
      body: { post_id: props.id }
    })
    haslike.value = haslikefetch

    isowner.value = await $fetch("/api/auth/ispostowner", {
      method: "POST",
      body: { post_id: props.id }
    })
  } else {
    
    haslike.value = false
    isowner.value = false
  }

} catch (error) {
  console.error("Error loading post data:", error);
}


const like = async function () {
  
  const or = !haslike.value;
  
  try {
    await $fetch('/api/reqs/likereq', {
      method: "POST",
      body: {
        post_id: props.id,
        or: or
      }
    })
    haslike.value = or; 
    refreshinfo(); 
  } catch (e) {
    console.error("Like failed", e);
  }
}
const reportpost = async function () {
  if(!confirm("Opravdu nahlasit příspěvek?")) return;
  
  try {
    router.push('/report?id='+props.id+'&type=Post')
  } catch (e) {
  }
}

const deletepost = async function () {
  if(!confirm("Opravdu smazat příspěvek?")) return;
  
  try {
    await $fetch('/api/reqs/deletepost', {
      method: "POST",
      body: { post_id: props.id }
    })
    router.push('/profile')
  } catch (e) {
    console.error("Delete failed", e);
  }
}
</script>

<template>
  <div class="page-container">
    <div class="content-wrapper">
      
      <div class="post-header">
        <h1 class="main-title">{{ postname || 'NAME' }}</h1>
      </div>

      <div class="post-grid">
        
        <div class="left-column">
          <div class="image-wrapper">
            <img :src="src" class="post-image" alt="Post image" />
          </div>
          
          <div class="description-area">
            <p class="desc-text">{{ desc || 'Description' }}</p>
            
            <div class="action-buttons">
              <button v-if="isowner" @click="deletepost()" class="btn-delete">Delete Post</button>
              <button v-else class="btn-report" @click="reportpost()">Report!</button>
            </div>
          </div>
        </div>

        <div class="right-column">
          
          <div class="meta-row">
            <div class="likes-wrapper">
              <button @click="like()" class="heart-btn">
                <svg v-if="haslike"  viewBox="0 0 24 24" fill="currentColor" class="heart-icon filled">
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.312 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
                <svg v-else  fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="heart-icon outline">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button>
              <span class="like-count">{{ likes }}</span>
            </div>

            <div class="author-info">
              Post made by<br>
              <span class="username" @click="router.push('/users/' + user)">{{ user }}</span>
            </div>
          </div>

          <div class="comments-box">
            <comments-comentsection :id="props.id" class="comments-title"/>
            </div>

        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>

* {
  box-sizing: border-box;
}

.page-container {
  padding-top: 100px;

  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start; /* nebo center pro vertikální centrování */
  background-color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

.content-wrapper {
  width: 100%;
  max-width: 1000px; /* Šířka karty */
  background: white;
  /* Pokud chceš stín jako kartu, odkomentuj: box-shadow: 0 4px 20px rgba(0,0,0,0.1); */
}

/* Hlavička s názvem */
.post-header {
  text-align: center;
  margin-bottom: 30px;
}

.main-title {
  font-size: 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
  margin: 0;
  color: #000;
}

.post-grid {
  display: grid;
  grid-template-columns: 1fr 1fr; 
  gap: 40px;
}

.left-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.image-wrapper {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  /* Poměr stran obrázku - vertikální jako v designu */
  aspect-ratio: 3/4; 
  background-color: #f0f0f0;
}

.post-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.description-area {
  padding-top: 10px;
}

.desc-text {
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #1a1a1a;
}

/* --- PRAVÝ SLOUPEC (Info a Komentáře) --- */
.right-column {
  display: flex;
  flex-direction: column;
  height: 100%; /* Aby se komentáře natáhly */
}

.meta-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  padding-top: 20px; /* Zarovnání s vrškem obrázku vizuálně */
}

/* Srdíčko a počet */
.likes-wrapper {
  display: flex;
  align-items: center;
  gap: 15px;
}

.heart-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
}

.heart-icon {
  width: 35px;
  height: 35px;
  transition: transform 0.1s;
}

.heart-icon:active {
  transform: scale(0.9);
}

.heart-icon.outline {
  color: #000;
}

.heart-icon.filled {
  color: #ed4956; /* Instagram red/pink */
}

.like-count {
  font-size: 1.5rem;
  font-weight: 400;
}

/* Informace o autorovi */
.author-info {
  text-align: right;
  font-size: 1.2rem;
  line-height: 1.4;
  color: #000;
}

.username {
  font-weight: bold;
  cursor: pointer;
}

.username:hover {
  text-decoration: underline;
}

/* Box na komentáře */
.comments-box {
  flex-grow: 1; /* Zabere zbytek výšky */
  border: 2px solid #000;
  border-radius: 15px;
  padding: 20px;
  min-height: 300px; /* Minimální výška */
  background: #fff;
  display: flex;
  flex-direction: column;
}

.comments-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 500;
  text-transform: uppercase;
}

/* Tlačítka Delete/Report */
.action-buttons {
  margin-top: 10px;
}

.btn-delete {
  background: #ff4444;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.btn-report {
  background: #e0e0e0;
  color: #333;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

/* Responsivita pro mobily */
@media (max-width: 768px) {
  .post-grid {
    grid-template-columns: 1fr; /* Pod sebe na mobilech */
    gap: 20px;
  }

  .image-wrapper {
    aspect-ratio: 1/1; /* Čtverec na mobilech */
  }

  .meta-row {
    padding-top: 0;
  }
}
</style>
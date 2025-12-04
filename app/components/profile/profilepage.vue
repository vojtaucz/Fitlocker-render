<script setup lang="js">
const router = useRouter()
const route = useRoute()
const props = defineProps({
  name: {}
})
const owner = ref()
const following = ref()
const likes = ref(); 
const follows = ref()
const bio = ref();
const src = ref();
var nameofuser = props.name
    const authdata = await $fetch('/api/checkjwttoken')
    if (authdata.loggedin) {
        if (authdata.name == props.name) {
            owner.value = true;
            following.value = false
        }
        else {
            owner.value = false;
            const followed_ = await $fetch("/api/reqs/hasfollow", {
                method: "POST",
                body: {
                    user: props.name}
            })
            if (followed_) {
                following.value = true
            } else {
                following.value = false
            } 
        }
        }
        else {
            const following = ref()
            router.push("/login")
        }
const refresh = async function () {
    const data = await $fetch("/api/gatherinfo",{
    method: "POST",
    body: {
      name: nameofuser
    }
  }) 
    likes.value = data.likes; 
    follows.value = data.followers
    bio.value = data.bio;
    src.value = data.src;
    if (src.value == null) {
        src.value = '/uploads/profilepics/default.png'
    }
    const postids = await $fetch("/api/getfiveposts", {
        method: "POST",
        body: {
            name: props.name
        }
    })
}        

  const follow = async function(bool) {
    const res = await $fetch("/api/reqs/followreq",{
    method: "POST",
    body: {
      name: nameofuser,
      or: bool
    }
  }) 
  following.value = !following.value
    refresh()
  }
  const data = await $fetch("/api/gatherinfo",{
    method: "POST",
    body: {
      name: nameofuser
    }
  }) 
likes.value = data.likes; 
follows.value = data.followers
bio.value = data.bio;
src.value = data.src;
    if (src.value == null) {
        src.value = '/uploads/profilepics/default.png'
    }
    const postids = await $fetch("/api/getfiveposts", {
        method: "POST",
        body: {
            name: props.name
        }
    })
const reportpfof = async function () {
  if(!confirm("Opravdu nahlasit příspěvek?")) return;
  
  try {
    router.push('/report?id='+data.id+'&type=Profile')
  } catch (e) {
  }
}
console.log(bio.value)

if (bio == null) {
    bio.value = "Nothing here....."
}
</script>
<template>
      <div class="body">
        <div class="profile">
            <div class="top-container">
                <div class="img-container">
                    <div class="image">
                        <img :src="src">
                        <h4>{{name}}</h4>
                    </div>
                    <div>
                        <div class="icon-container">
                            <div class="likes">
                                <img>
                                <h5 v-text="likes"></h5>
                            </div>
                            <div class="followers">
                                <img>
                                <h5 v-text="follows"></h5>
                            </div>
                        </div>
                        <div class="btns">
                            <button class="button" v-if="owner" @click="router.push('/editprofile')">Edit profile</button>
                            <button class="button" v-else-if="following" @click="follow(false)">Unfollow</button>
                            <button class="button" v-else @click="follow(true)">Follow</button>
                            <button class="button" v-if="!owner" @click="reportpfof()">Report</button>
                        </div>
                        
                    </div>
                </div>
                <div class="bio-container">
                    <h4>Bio</h4>
                    <div class="bio">
                        <p v-text="bio"></p>
                    </div>
                </div>
            </div>
            <div class="posts-container">
                <div class="posts">
                    <posts-post :id="postids[1]" v-if="postids[1]"></posts-post>
                    <posts-post :id="postids[2]" v-if="postids[2]"></posts-post>
                    <posts-post :id="postids[3]" v-if="postids[3]"></posts-post>
                    <posts-post :id="postids[4]" v-if="postids[4]"></posts-post>
                    <posts-post :id="postids[5]" v-if="postids[5]"></posts-post>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
        .body {
            display: flex;
            justify-content: center;
            padding-top: 256px;
        }
        h4 {
            font-family: inter;
        }
        h5 {
            margin: 1px;
            font-family: inter;
        }
        .profile {
            background-color: #FFFFFF;
            width: 90vw;
            height: 90vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-radius: 30px;
            gap: 10px;
        }
        .top-container {
            margin-top: 5vh;
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }
        .icon-container {
            display: flex;
            justify-content: space-evenly;
            flex-direction: row-reverse;
            gap: 2vh;
        }
        .img-container {
            display: flex;
            flex-direction: row;
            align-items: center;
            width: 47.5vw;
            justify-content: start;
            gap: 3vw;
            padding-left: 3vw;
            text-align: center;
        }
        .image > img {
            width: 300px;
            height: 300px;
            object-fit: cover;
        }
        .likes > img {
            content: url("https://www.iconpacks.net/icons/2/free-heart-icon-3510-thumb.png");
            width: 50px;
            height: 50px;
        }
        .followers > img {
            content: url("https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg");
            width: 50px;
            height: 50px;
        }
        .bio-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 47.5vw;
        }
        .bio {
            width: 30vw;
            height: 300px;
            background-color: #F4F4F4;
            text-align: justify;
            border-radius: 10px;
            padding: 5px;
        }
        .posts-container {
            margin-top: 100px;
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .posts {
            height: 100%;
            width: 95%;
            background-color: #F4F4F4;
            border-radius: 30px;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
        }
        .button {
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
        .button:hover {
            opacity: 0.8;
        }
        .button:active {
            transform: scale(0.75) ;
        }
        .btns {
            display: flex;
            flex-direction: row;
            gap: 5px;
            justify-content: space-evenly;
        }
    </style>
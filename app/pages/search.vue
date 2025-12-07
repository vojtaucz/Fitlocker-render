<template>
  <div>
    <mainpage-header></mainpage-header>
    <div class="main">
      <div class="container-search">
        <p v-if="!posts || !posts[0] || !posts[0][0]">There are no posts like this..</p>
        <div v-else class="searchresolut">
        <posts-post 
          v-for="(post, index) in posts[0]" 
          :key="post.post_id" 
          :id="post.post_id"
        />
      </div>
      <mainpage-sidepanelbrowse/>
      </div>
    </div>
  </div>
</template>

<script lang="js" setup>
const route = useRoute()
definePageMeta({
  key: route => route.fullPath
})

const topcolor = route.query.topcolors;
const bottomcolor = route.query.bottomcolors;
const colors = route.query.colors;
const style = route.query.style;
const body_shape = route.query.bodyshape;
const gender = route.query.gender;


const params = {
  topcolor,
  bottomcolor,
  colors,
  style,
  body_shape,
  gender
}

let nonundefined = {}
Object.entries(params).forEach(([key, value]) => {
  if (value !== undefined) {
    nonundefined[key] = value
  }
})

const { data: posts, error } = await useFetch("/api/getmostrelevantposts", {
  method: "POST",
  body: {
    listofparams: nonundefined
  }
})
</script>
<style scoped>
  .main {
    display: flex;
    flex-direction: row;
    padding-top: 50px;
  }
  .container-search {
    width: 80vw;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .searchresolut {
    column-count: 4;
    column-gap: 1vw;
  }
  .searchresolut > * {
    margin-bottom: 1vw;
  }
</style>
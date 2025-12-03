<template>
  <div>
    <mainpage-header></mainpage-header>
    <div class="main">
      <div class="container-search">
        <div v-if="posts && posts[0]" class="searchresolut">
        <posts-post 
          v-for="(post, index) in posts[0]" 
          :key="post.post_id" 
          :id="post.post_id"
        />
      </div>
      <p v-else>There are no posts like this..</p>
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

const colors = route.query.colors;
const style = route.query.style;
const bodyshape = route.query.bodyshape;
const gender = route.query.gender;


const params = {
  colors,
  style,
  bodyshape,
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
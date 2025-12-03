import { viewDepthKey } from "vue-router"

export default defineNuxtRouteMiddleware(async(to, from) => {
    var posts = await $fetch("/api/listofposts")
    var postss = posts.map(item => item.name)
    if (!postss.includes(to.params.id)) {
        return navigateTo('/posts/_404')
    }
})
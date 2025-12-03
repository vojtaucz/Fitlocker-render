export default defineNuxtRouteMiddleware(async(to, from) => {
    var users = await $fetch("/api/listofusersnames")
    var username = users.map(item => item.name)
    if (!username.includes(to.params.user)) {
        return navigateTo('/users/_404')
    }
})
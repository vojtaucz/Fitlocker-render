<template>
  <div class="comment">
    <div class="nap">
      <img class="pfp" :src="pfp" @click="toprofile()">
      <p v-text="name"></p>
    </div> 
    <p v-text="mess">
    </p>
    <svg v-if="isowner" @click="delcomment()" version="1.1" id="Layer_1" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="108.294px" height="122.88px" viewBox="0 0 108.294 122.88" enable-background="new 0 0 108.294 122.88" xml:space="preserve"><g><path d="M4.873,9.058h33.35V6.2V6.187c0-0.095,0.002-0.186,0.014-0.279c0.075-1.592,0.762-3.037,1.816-4.086l-0.007-0.007 c1.104-1.104,2.637-1.79,4.325-1.806l0.023,0.002V0h0.031h19.884h0.016c0.106,0,0.207,0.009,0.309,0.022 c1.583,0.084,3.019,0.76,4.064,1.81c1.102,1.104,1.786,2.635,1.803,4.315l-0.003,0.021h0.014V6.2v2.857h32.909h0.017 c0.138,0,0.268,0.014,0.401,0.034c1.182,0.106,2.254,0.625,3.034,1.41l0.004,0.007l0.005-0.007 c0.851,0.857,1.386,2.048,1.401,3.368l-0.002,0.032h0.014v0.032v10.829c0,1.472-1.195,2.665-2.667,2.665h-0.07H2.667 C1.195,27.426,0,26.233,0,24.762v-0.063V13.933v-0.014c0-0.106,0.004-0.211,0.018-0.315v-0.021 c0.089-1.207,0.624-2.304,1.422-3.098l-0.007-0.002C2.295,9.622,3.49,9.087,4.81,9.069l0.032,0.002V9.058H4.873L4.873,9.058z M77.79,49.097h-5.945v56.093h5.945V49.097L77.79,49.097z M58.46,49.097h-5.948v56.093h5.948V49.097L58.46,49.097z M39.13,49.097 h-5.946v56.093h5.946V49.097L39.13,49.097z M10.837,31.569h87.385l0.279,0.018l0.127,0.007l0.134,0.011h0.009l0.163,0.023 c1.363,0.163,2.638,0.789,3.572,1.708c1.04,1.025,1.705,2.415,1.705,3.964c0,0.098-0.009,0.193-0.019,0.286l-0.002,0.068 l-0.014,0.154l-7.393,79.335l-0.007,0.043h0.007l-0.016,0.139l-0.051,0.283l-0.002,0.005l-0.002,0.018 c-0.055,0.331-0.12,0.646-0.209,0.928l-0.007,0.022l-0.002,0.005l-0.009,0.018l-0.023,0.062l-0.004,0.021 c-0.118,0.354-0.264,0.698-0.432,1.009c-1.009,1.88-2.879,3.187-5.204,3.187H18.13l-0.247-0.014v0.003l-0.011-0.003l-0.032-0.004 c-0.46-0.023-0.889-0.091-1.288-0.202c-0.415-0.116-0.818-0.286-1.197-0.495l-0.009-0.002l-0.002,0.002 c-1.785-0.977-2.975-2.882-3.17-5.022L4.88,37.79l-0.011-0.125l-0.011-0.247l-0.004-0.116H4.849c0-1.553,0.664-2.946,1.707-3.971 c0.976-0.955,2.32-1.599,3.756-1.726l0.122-0.004v-0.007l0.3-0.013l0.104,0.002V31.569L10.837,31.569z M98.223,36.903H10.837 v-0.007l-0.116,0.004c-0.163,0.022-0.322,0.106-0.438,0.222c-0.063,0.063-0.104,0.132-0.104,0.179h-0.007l0.007,0.118l7.282,79.244 h-0.002l0.002,0.012c0.032,0.376,0.202,0.691,0.447,0.825l-0.002,0.004l0.084,0.032l0.063,0.012h0.077h72.695 c0.207,0,0.399-0.157,0.518-0.377l0.084-0.197l0.054-0.216l0.014-0.138h0.005l7.384-79.21L98.881,37.3 c0-0.045-0.041-0.111-0.103-0.172c-0.12-0.118-0.286-0.202-0.451-0.227L98.223,36.903L98.223,36.903z M98.334,36.901h-0.016H98.334 L98.334,36.901z M98.883,37.413v-0.004V37.413L98.883,37.413z M104.18,37.79l-0.002,0.018L104.18,37.79L104.18,37.79z M40.887,14.389H5.332v7.706h97.63v-7.706H67.907h-0.063c-1.472,0-2.664-1.192-2.664-2.664V6.2V6.168h0.007 c-0.007-0.22-0.106-0.433-0.259-0.585c-0.137-0.141-0.324-0.229-0.521-0.252h-0.082h-0.016H44.425h-0.031V5.325 c-0.213,0.007-0.422,0.104-0.576,0.259l-0.004-0.004l-0.007,0.004c-0.131,0.134-0.231,0.313-0.259,0.501l0.007,0.102V6.2v5.524 C43.554,13.196,42.359,14.389,40.887,14.389L40.887,14.389z"/></g></svg>
    <svg v-else @click="reportofcomment"  shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 511.999 463.377"><path d="M289.639 9.137c12.411 7.25 23.763 18.883 33.037 34.913l.97 1.813 1.118 1.941 174.174 302.48c33.712 56.407-1.203 113.774-66.174 112.973v.12H73.485c-.895 0-1.78-.04-2.657-.112-59.104-.799-86.277-54.995-61.909-106.852.842-1.805 1.816-3.475 2.816-5.201L189.482 43.959l-.053-.032c9.22-15.786 20.717-27.457 33.411-34.805C243.788-3 268.711-3.086 289.639 9.137zM255.7 339.203c13.04 0 23.612 10.571 23.612 23.612 0 13.041-10.572 23.613-23.612 23.613-13.041 0-23.613-10.572-23.613-23.613s10.572-23.612 23.613-23.612zm17.639-35.379c-.794 19.906-34.506 19.931-35.278-.006-3.41-34.108-12.129-111.541-11.853-143.591.284-9.874 8.469-15.724 18.939-17.955 3.231-.686 6.781-1.024 10.357-1.019 3.595.008 7.153.362 10.387 1.051 10.818 2.303 19.309 8.392 19.309 18.446l-.043 1.005-11.818 142.069zM37.596 369.821L216.864 59.942c21.738-37.211 56.225-38.289 78.376 0l176.298 306.166c17.177 28.285 10.04 66.236-38.774 65.488H73.485c-33.017.756-52.841-25.695-35.889-61.775z"/></svg>
  </div>
</template>

<script lang="js" setup>
const authdata = await $fetch('/api/checkjwttoken')
const router = useRouter();
const props = defineProps({
  id: {
  }
})
  const pfp = ref()
  const info = await $fetch("/api/getcommentinfo", {
    method: "POST",
    body: {
      id: props.id
    }
  })
  const isowner = ref()
  if (info.name[0].name == authdata.name) {
    isowner.value = true;
  }
  else {
    isowner.value = false;
  }
  const name = ref()
  pfp.value = "/uploads/profilepics/default.png"
  pfp.value = await $fetch("/api/getpfp",{
      method: "POST",
      body: {
        name: info.name[0].name,
        id: null

      }
    })
  const mess = ref()
  name.value = info.name[0].name
  mess.value = info.commentinfo[0].message
  const toprofile = () => {
    if (!name.value) {

    }else {
      router.push('/users/'+name.value);
    }
  }
  const reportofcomment = async function () {
  if(!confirm("Opravdu nahlasit příspěvek?")) return;
  
  try {
    router.push('/report?id='+props.id+'&type=Comment')
  } catch (e) {
  }}
  const delcomment = async function () {
  if(!confirm("Opravdu odstranit příspěvek?")) return;
    $fetch("/api/reqs/deletecoment", {
      method: "POST",
      body: {
        comm_id: props.id
      }
    })
    await refreshNuxtData('post-comments')
    await refreshNuxtData('post-comments')
}
</script>

<style>
.comment {
  display: flex;
  width: 95%;
  max-height: 150px;
  background-color: rgb(228, 228, 228);
  border-radius: 35px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.nap > img {
  border-radius: 35px;
  width: 50px;
  height: 50px;
  object-fit: cover;
}
.nap {
  margin-left: 15px;
  max-width: 75px;
  display: flex;
  justify-content:left;
  flex-direction: column;
  align-items: center;
}
.comment > p {
  font-size:  12px;
  padding: 0px 15px;
  text-align: justify;
}
.nap > p {
  font-size:  10px;
  padding: 0;
  margin: 2px 0px 0px 0px;
}
.comment > svg {
  width: 30px;
  transition: 0.3s;
  margin-right: 15px;
}
.comment > svg:hover  {
  transform: translateY(-7px);
}
.comment > svg:active {
  transform: scale(0.75);
}
.pfp {
  cursor: pointer;
}
</style>
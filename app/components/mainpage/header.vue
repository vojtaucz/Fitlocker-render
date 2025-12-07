  <template>
    <div class="header">
      <a @click="router.push('/')"><span>Fit</span>locker</a>
      <input 
        name="search" class="search"
        v-model="searchValue"
        @keyup.enter="handleSearch"
        placeholder="Search for a user"
      >
      
      <div class="profile-menu-container">
        <a class="Pfs" @click="handleProfileClick">
          <img :src="pfppath">
        </a>

        <div class="slide-menu" :class="{ hidden: !isMenuOpen, visible: isMenuOpen }">
          <button 
            v-for="item in menuItems" 
            :key="item.id"
            class="menu-button"
            @click="handleMenuClick(item.id)"
          >
            <svg class="menu-icon" viewBox="0 0 24 24" v-html="item.icon"></svg>
          </button>
        </div>
      </div>
    </div>
  </template>

  <script setup lang="js">
  import { ref } from 'vue'

  const router = useRouter()
  const searchValue = ref('')
  const isMenuOpen = ref(false)
  const authdata = await $fetch('/api/checkjwttoken')
  const pfppath = ref()
  const menuItems = ref([
    {
      id: 'home',
      icon: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>'
    },
    {
      id: 'edit',
      icon: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>'
    },
    {
      id: 'add',
      icon: '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line>'
    },
    {
      id: 'logout',
      icon: '<path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 17L21 12L16 7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 12H9" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>'
    }
  ])
  const handleSearch = () => {
    if (searchValue.value.trim()) {
      router.push("/users/"+searchValue.value)
    }
  }

  const handleProfileClick = async () => {
    if (authdata.loggedin) {
      isMenuOpen.value = !isMenuOpen.value
    } else {
      router.push('/login')
    }
  }

  const handleMenuClick = (id) => {
    console.log('Menu clicked:', id)
    
    switch(id) {
      case 'home':
        router.push('/profile')
        break
      case 'edit':
        router.push('/editprofile')
        break
      case 'add':
        router.push('/createpost')
        break
      case 'logout':
        if(!confirm("Do you want to log out?")) return;
        $fetch("/api/auth/logout")
        router.push('/login')
        break
    }
    
    isMenuOpen.value = false
  }
  pfppath.value = "/uploads/profilepics/default.png"
  if (authdata.loggedin) {
    pfppath.value = authdata.pfp
  } else {
    pfppath.value = "/uploads/profilepics/default.png"
  }
  </script>

  <style scoped>
  a {
    margin-left: 25px;
    font-family: Climate Crisis;
    color: rgb(255, 255, 255);
    text-decoration: none;
    transition: 0.3s;
    width: 50px;
    font-size: 25px;
    cursor:pointer;
  }
  a:hover {
    letter-spacing: 0.5rem;
  }
  a:active {
    transform: scale(0.75);
  }
  a > span {
    color:#575368;
  }
  .Hpg {
    cursor: pointer;
  }

  .Hpg img {
    height: 40px;
  }

  .search {
    padding: 10px 20px;
    border: 2px solid #e0e0e0;
    border-radius: 25px;
    font-size: 14px;
    outline: none;
    transition: 0.3s;
    width: 25vw;
  }

  .search:focus {
    border-color: #9590A8;
  }

  .profile-menu-container {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .Pfs {
    cursor: pointer;
    display: block;
  }

  .Pfs img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .Pfs:hover img {
    transform: scale(1.05);
  }

  .slide-menu {
    position: absolute;
    right: -10px;
    top: 60px;
    background: linear-gradient(135deg, #9590A8 0%, #9590A8 100%);
    border-radius: 20px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 0;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    transform-origin: top right;
    z-index: 1000;
  }

  .slide-menu.hidden {
    opacity: 0;
    transform: translateY(-20px) scale(0.8);
    pointer-events: none;
  }

  .slide-menu.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .menu-button {
    width: 70px;
    height: 70px;
    background: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }

  .menu-button:first-child {
    border-radius: 15px 15px 0 0;
  }

  .menu-button:last-child {
    border-radius: 0 0 15px 15px;
  }

  .menu-button + .menu-button {
    border-top: 3px solid #9590A8;
  }

  .menu-button:hover {
    background: #f5f5f5;
    transform: translateX(-5px);
  }

  .menu-button:active {
    transform: translateX(-5px) scale(0.95);
  }

  .menu-icon {
    width: 45px;
    height: 45px;
    stroke: #333;
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
  }

  </style>
<template>
  <mainpage-header/>
  <div class="create-page">
    <div class="create-card">
      <h1 class="page-title">Create New Post</h1>
      
      <div class="form-group upload-group">
        <p class="input">Post Image</p>
        <input type="file" @change="handleFileChange" accept="image/*" class="file-input"></input>
      </div>

      <div class="form-group">
        <p class="input">Name</p>
        <input placeholder="Give your fit a name..." v-model="name" class="styled-input"></input>
      </div>

      <div class="form-group">
        <p class="input">Description</p>
        <textarea placeholder="Describe your outfit..." v-model="desc" class="styled-input styled-textarea"></textarea>
      </div>

      <div class="attributes-grid">
        <div class="grid-item">
          <p class="input">Top-Color</p>
          <div class="select-wrapper">
            <select v-model="topcolor" class="styled-select">
              <option disabled value="">Select color</option>
              <option v-for="x in availableColors" :key="x.name" :value="x.value">
                {{ x.name}}
              </option>
            </select>
          </div>
        </div>

        <div class="grid-item">
          <p class="input">Bottom-Color</p>
          <div class="select-wrapper">
            <select v-model="bottomcolor" class="styled-select">
              <option disabled value="">Select color</option>
              <option v-for="x in availableColors" :key="x.name" :value="x.value">
                {{ x.name}}
              </option>
            </select>
          </div>
        </div>

        <div class="grid-item">
          <p class="input">Gender</p>
          <div class="select-wrapper">
            <select v-model="gender" class="styled-select">
              <option disabled value="">Select gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Unisex</option>
            </select>
          </div>
        </div>

        <div class="grid-item">
          <p class="input">Style</p>
          <div class="select-wrapper">
            <select v-model="style" class="styled-select">
              <option disabled value="">Select style</option>
              <option v-for="x in styleOptions" :key="x" :value="x">
                {{x}}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="shape-section">
        <p class="input">Body-shape</p>
        <div class="body-shape-card" @click="cycleBodyShape" :title="`Click to change (current: ${bodyShape})`">
          <div class="icon-container">
            <svg v-if="bodyShape === 'triangle'" viewBox="0 0 100 100" class="shape-icon">
              <path d="M 10 10 L 90 10 L 50 90 Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/>
            </svg>
            <svg v-else-if="bodyShape === 'inverted-triangle'" viewBox="0 0 100 100" class="shape-icon">
              <path d="M 10 100 L 90 100 L 50 0 Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/>
            </svg>
            <svg v-else-if="bodyShape === 'square'" viewBox="0 0 100 100" class="shape-icon">
              <rect x="15" y="15" width="70" height="70" fill="none" stroke="currentColor" stroke-width="4"/>
            </svg>
            <svg v-else-if="bodyShape === 'round'" viewBox="0 0 100 100" class="shape-icon">
              <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" stroke-width="4"/>
            </svg>
            <svg v-else-if="bodyShape === 'hourglass'" viewBox="0 0 100 100" class="shape-icon">
              <path d="M 20 10 L 80 10 L 50 50 L 80 90 L 20 90 L 50 50 Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/>
            </svg>
          </div>
          <span class="shape-label">{{ bodyShape }}</span>
          <span class="click-hint">(Click to change)</span>
        </div>
      </div>

      <button @click="uploadFile()" class="submit">Submit Post</button>
      <p class="er-message" v-if="errmes" v-text="errmes"></p>
    </div>
  </div>
</template>

<script lang="js" setup>

useHead({
  title: 'FitLocker | Create your post!'
  })
const router = useRouter();
const authdata = await $fetch('/api/checkjwttoken')
    if (authdata.loggedin) {
    } else {
        router.push("/login");
    }
    const selectedFile = ref(null)
    const name = ref("")
    const desc = ref("")
    const topcolor = ref("")
    const bottomcolor = ref("")
    const style = ref("")
    const gender = ref("")
    const errmes = ref("")



  const availableColors = [
  { name: 'Blue', value: 'blue', hex: '#3B82F6' },
  { name: 'Pink', value: 'pink', hex: '#EC4899' },
  { name: 'Red', value: 'red', hex: '#EF4444' },
  { name: 'White', value: 'white', hex: '#FFFFFF' },
  { name: 'Brown', value: 'brown', hex: '#92400E' },
  { name: 'Yellow', value: 'yellow', hex: '#EAB308' },
  { name: 'Gray', value: 'gray', hex: '#6B7280' },
  { name: 'Navy', value: 'navy', hex: '#1E3A8A' },
  { name: 'Green', value: 'green', hex: '#22C55E' },
  { name: 'Black', value: 'black', hex: '#000000' },
  { name: 'Purple', value: 'purple', hex: '#A855F7' },
  { name: 'Orange', value: 'orange', hex: '#F97316' },
  { name: 'Colorful', value: 'colorful', hex: '#F97316' },
]
const styleOptions = [
  'Streetwear', 
  'Skateboarder', 
  'Casual', 
  'Formal', 
  'Athletic', 
  'Vintage', 
  'Punk',
  'Bohemian',
  'Minimalist'
]
const bodyShape = ref('inverted-triangle') 
const bodyShapes = ['triangle', 'inverted-triangle', 'square', 'round', 'hourglass']

const cycleBodyShape = () => {
  const currentIndex = bodyShapes.indexOf(bodyShape.value)
  const nextIndex = (currentIndex + 1) % bodyShapes.length
  bodyShape.value = bodyShapes[nextIndex]
}

const handleFileChange = async function (event) {
        selectedFile.value = event.target.files[0]}
        const uploadFile = async function() {
        if (!selectedFile.value) {
            errmes.value = "No file found"
            return
        }
        if (!name.value || !desc.value || !topcolor.value ||!bottomcolor.value || !style.value || !gender.value || !bodyShape.value) {
            errmes.value = "Something is missing"
            return
        }
        errmes.value = null
        const formData = new FormData()
        formData.append('file', selectedFile.value)
        formData.append('name', name.value)
        formData.append('desc', desc.value)
        formData.append('topcolor', topcolor.value)
        formData.append('bottomcolor', bottomcolor.value)
        formData.append('style', style.value)
        formData.append('bodyshape', bodyShape.value)
        formData.append('gender', gender.value)
        console.log("inside")
        try {
            const response = await $fetch('/api/reqs/createpost', {
                method: 'POST',
                body: formData
            })
            if (!errmes.value) {
                router.push("/posts/" + response.id);
            }
        } catch (error) {
            errmes.value =error.data.statusMessage
        }}
</script>

<style scoped>
.create-page {
  display: flex;
  justify-content: center;
  padding: 60px 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}
.create-card {
  background: white;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.page-title {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #1a1a1a;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.form-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.input {
  font-size: 0.9rem;
  font-weight: 600;
  color: #4a4a4a;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: 0.3s;
}

.styled-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  background: #fff;
}
.styled-input:focus {
  outline: none;
  border-color: #000;
}
.styled-textarea {
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
}

.file-input {
  padding: 10px;
  background: #f0f0f0;
  border-radius: 8px;
  width: 100%;
  cursor: pointer;
}

.attributes-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 10px;
}

.select-wrapper {
  position: relative;
}

.styled-select {
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  appearance: none; 
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 12px top 50%;
  background-size: 12px auto;
}

.shape-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
}

.body-shape-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: 2px dashed #ccc;
  border-radius: 12px;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s ease;
  background: #fafafa;
}

.body-shape-card:hover {
  border-color: #000;
  background: #f0f0f0;
  transform: translateY(-2px);
}

.shape-icon {
  width: 80px;
  height: 80px;
  color: #333;
}

.shape-label {
  margin-top: 10px;
  font-weight: bold;
  font-size: 1.1rem;
  text-transform: capitalize;
}


.click-hint {
  font-size: 0.8rem;
  color: #888;
  margin-top: 4px;
}


.submit {
  background-color: #000;
  color: white;
  padding: 16px;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
  transition: opacity 0.2s;
}

.submit:hover {
  opacity: 0.8;
}

.er-message {
  color: #e53935;
  text-align: center;
  font-weight: 500;
  margin-top: 10px;
}

@media (max-width: 600px) {
  .attributes-grid {
    grid-template-columns: 1fr;
  }
}
</style>
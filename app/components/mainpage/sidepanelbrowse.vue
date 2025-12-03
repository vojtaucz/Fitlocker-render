<template>
  <div class="sidebar-container">
    <h1 class="main-title">Filter</h1>

    <div class="filter-section">
      <h3>Body shape</h3>
      <div class="body-shape-display" @click="cycleBodyShape" :title="`Click to change (current: ${bodyShape})`">
        <svg v-if="bodyShape === 'triangle'" viewBox="0 0 100 100" class="shape-icon">
          <path d="M 10 10 L 90 10 L 50 90 Z" fill="none" stroke="black" stroke-width="4" stroke-linejoin="round"/>
        </svg>
        <svg v-else-if="bodyShape === 'inverted-triangle'" viewBox="0 0 100 100" class="shape-icon">
          <path d="M 10 100 L 90 100 L 50 0 Z " fill="none" stroke="black" stroke-width="4" stroke-linejoin="round"/>
        </svg>
        <svg v-else-if="bodyShape === 'square'" viewBox="0 0 100 100" class="shape-icon">
          <rect x="15" y="15" width="70" height="70" fill="none" stroke="black" stroke-width="4"/>
        </svg>
        <svg v-else-if="bodyShape === 'round'" viewBox="0 0 100 100" class="shape-icon">
          <circle cx="50" cy="50" r="35" fill="none" stroke="black" stroke-width="4"/>
        </svg>
        <svg v-else-if="bodyShape === 'hourglass'" viewBox="0 0 100 100" class="shape-icon">
          <path d="M 20 10 L 80 10 L 50 50 L 80 90 L 20 90 L 50 50 Z" fill="none" stroke="black" stroke-width="4" stroke-linejoin="round"/>
        </svg>
      </div>
      <label>Ignore Body Shape</label>
      <input type="checkbox" v-model="ignorebod">
    </div>

    <div class="filter-section">
      <h3>Gender</h3>
      <div class="select-wrapper">
        <select v-model="gender">
          <option>Male</option>
          <option>Female</option>
          <option>Unisex</option>
        </select>
      </div>
    </div>

    <div class="filter-section">
      <h3>Colors</h3>
      
      <div class="swatch-container">
        <button
          v-for="color in colors"
          :key="color"
          @click="removeColor('colors', color)"
          class="color-swatch"
          :style="{ backgroundColor: getColorHex(color) }"
          :title="`Remove ${color}`"
        >
        </button>
      </div>

      <div class="select-wrapper">
        <select 
          v-model="selectedColor" 
          @change="addColor('colors', 'selectedColor')"
        >
          <option value="" disabled selected>+ Add color</option>
          <option v-for="color in availableColors" :key="color.value" :value="color.value">
            {{ color.name }}
          </option>
        </select>
      </div>
    </div>

    <div class="filter-section">
      <h3>Top-Colors</h3>
      
      <div class="swatch-container">
        <button
          v-for="color in topColors"
          :key="color"
          @click="removeColor('topColors', color)"
          class="color-swatch"
          :style="{ backgroundColor: getColorHex(color) }"
          :title="`Remove ${color}`"
        >
        </button>
      </div>

      <div class="select-wrapper">
        <select 
          v-model="selectedTopColor" 
          @change="addColor('topColors', 'selectedTopColor')"
        >
          <option value="" disabled selected>+ Add color</option>
          <option v-for="color in availableColors" :key="color.value" :value="color.value">
            {{ color.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="filter-section">
      <h3>Bottom-Colors</h3>
      
      <div class="swatch-container">
        <button
          v-for="color in bottomColors"
          :key="color"
          @click="removeColor('bottomColors', color)"
          class="color-swatch"
          :style="{ backgroundColor: getColorHex(color) }"
          :title="`Remove ${color}`"
        >
        </button>
      </div>

      <div class="select-wrapper">
        <select 
          v-model="selectedBottomColor" 
          @change="addColor('bottomColors', 'selectedBottomColor')"
        >
          <option value="" disabled selected>+ Add color</option>
          <option v-for="color in availableColors" :key="color.value" :value="color.value">
            {{ color.name }}
          </option>
        </select>
      </div>
    </div>

    <div class="filter-section">
      <h3>Style</h3>
      
      <div class="tags-container" v-if="styles.length > 0">
        <span v-for="style in styles" :key="style" class="style-tag" @click="removeStyle(style)">
          {{ style }},
        </span>
      </div>

      <div class="select-wrapper">
        <select v-model="selectedStyle" @change="addStyle">
          <option value="" disabled selected>+ Add style</option>
          <option v-for="style in styleOptions" :key="style" :value="style">
            {{ style }}
          </option>
        </select>
      </div>
    </div>

    <button class="search-btn" @click="search()">Search</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();
const ignorebod = ref(false)

const bodyShape = ref('inverted-triangle') 
const bodyShapes = ['triangle', 'inverted-triangle', 'square', 'round', 'hourglass']

const gender = ref('Unisex')
const styles = ref([]) 


const topColors = ref([])
const bottomColors = ref([])
const colors = ref([]) 

const selectedTopColor = ref('')
const selectedBottomColor = ref('')
const selectedColor = ref('')
const selectedStyle = ref('')

const stateMap = {
  topColors: { list: topColors, model: selectedTopColor },
  bottomColors: { list: bottomColors, model: selectedBottomColor },
  colors: { list: colors, model: selectedColor },
}

const availableColors = [
  { name: 'Blue', value: 'blue', hex: '#0099FF' }, 
  { name: 'Pink', value: 'pink', hex: '#FF00FF' }, 
  { name: 'Red', value: 'red', hex: '#FF0000' },
  { name: 'White', value: 'white', hex: '#FFFFFF' },
  { name: 'Brown', value: 'brown', hex: '#8B4513' },
  { name: 'Yellow', value: 'yellow', hex: '#FFD700' },
  { name: 'Gray', value: 'gray', hex: '#808080' },
  { name: 'Navy', value: 'navy', hex: '#000080' },
  { name: 'Green', value: 'green', hex: '#008000' },
  { name: 'Black', value: 'black', hex: '#000000' },
  { name: 'Purple', value: 'purple', hex: '#800080' },
  { name: 'Orange', value: 'orange', hex: '#FFA500' },
  { name: 'Colorful', value: 'colorful', hex: '#F97316' },
]

const styleOptions = [
  'Streetwear', 'Skateboarder', 'Casual', 'Formal', 
  'Athletic', 'Vintage', 'Punk', 'Bohemian', 'Minimalist'
]


const cycleBodyShape = () => {
  const currentIndex = bodyShapes.indexOf(bodyShape.value)
  const nextIndex = (currentIndex + 1) % bodyShapes.length
  bodyShape.value = bodyShapes[nextIndex]
}

const addColor = (listKey) => {
  const state = stateMap[listKey];
  const colorValue = state.model.value;
  
  if (colorValue && !state.list.value.includes(colorValue)) {
    state.list.value.push(colorValue);
    state.model.value = ''; 
  }
}

const removeColor = (listKey, color) => {
  const list = stateMap[listKey].list;
  const index = list.value.indexOf(color);
  if (index > -1) {
    list.value.splice(index, 1);
  }
}

const addStyle = () => {
  if (selectedStyle.value && !styles.value.includes(selectedStyle.value)) {
    styles.value.push(selectedStyle.value)
    selectedStyle.value = ''
  }
}

const removeStyle = (style) => {
  const index = styles.value.indexOf(style)
  if (index > -1) {
    styles.value.splice(index, 1)
  }
}

const getColorHex = (colorValue) => {
  const color = availableColors.find(c => c.value === colorValue)
  return color ? color.hex : '#000000'
}

const search = () => {
  const queryParams = new URLSearchParams();
  
  if (colors.value.length) queryParams.append('colors', colors.value.join(','));
  if (topColors.value.length) queryParams.append('top-colors', topColors.value.join(','));
  if (bottomColors.value.length) queryParams.append('bottom-colors', bottomColors.value.join(','));
  if (styles.value.length) queryParams.append('style', styles.value.join(','));
  if (gender.value && gender.value != 'Unisex') queryParams.append('gender', gender.value);
  if (ignorebod.value != true) queryParams.append('bodyshape', bodyShape.value);
  router.push('/search/?' + queryParams.toString());
}
</script>

<style scoped>
.sidebar-container {
  overflow: scroll;
  width: 20vw; 
  height: 100vh;
  position: fixed;
  left: 80vw;
  background-color: #f5f5f5; 
  border-radius: 8px;
  padding: 20px 10px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  margin: 0 auto;
}

.main-title {
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 20px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  width: 100%;
}

.filter-section {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.filter-section h3 {
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 8px;
  text-align: center;
}

.body-shape-display {
  cursor: pointer;
  transition: transform 0.2s;
  display: flex;
  justify-content: center;
}

.body-shape-display:hover {
  transform: scale(1.05);
}

.shape-icon {
  width: 80px;
  height: 80px;
}

.select-wrapper {
  width: 100%;
  position: relative;
}

select {
  width: 100%;
  padding: 6px;
  font-size: 14px;
  border: none;
  background-color: transparent;
  text-align: center; 
  text-align-last: center;
  cursor: pointer;
  outline: none;
  appearance: none; 
}


select:hover {
  text-decoration: underline;
}


.swatch-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-bottom: 8px;
}

.color-swatch {
  width: 20px;
  height: 20px;
  border-radius: 4px; 
  border: 1px solid rgba(0,0,0,0.2);
  cursor: pointer;
  padding: 0;
  transition: opacity 0.2s;
}

.color-swatch:hover {
  opacity: 0.7;
}

.tags-container {
  text-align: center;
  margin-bottom: 5px;
  line-height: 1.4;
}

.style-tag {
  font-size: 14px;
  cursor: pointer;
  color: #333;
}

.style-tag:hover {
  color: red;
  text-decoration: line-through;
}

.search-btn {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-size: 14px;
}

.search-btn:hover {
  background-color: #000;
}
</style>
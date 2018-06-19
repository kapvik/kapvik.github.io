<template>
  <div>
        <div class="item-img">
          <img :src="book.volumeInfo.imageLinks.smallThumbnail">
        </div>
        <div class="item-info">
          <h3 class="title">{{ book.volumeInfo.title }}</h3>
          <p class="author">By: {{ book.volumeInfo.authors | showArrayVal }}</p>
          <p class="published">{{  book.volumeInfo.publishedDate | toLocalDate }}</p>
        </div>
        <button type="button" :showPopupForm="showPopupForm" @click="showPopupForm = true" class="item-button">Buy now</button>
      
    <Popup v-if="showPopupForm" @close="showPopupForm = false" 
           :src="book.volumeInfo.imageLinks.smallThumbnail"
           :description="book.volumeInfo.description" />
  </div>
</template>

<script>
import Popup from './Popup.vue'


export default {
  name: 'Book',
  data: () => ({
    showPopupForm: false
  }),
  props: ['book', 'index'],
  components: {
    Popup
  },
  filters: {
    toLocalDate: (date) => {
      if (!date) return ''
      return new Intl.DateTimeFormat('uk-UA').format(new Date(date))
    },
    showArrayVal: (array) => {
      if (!array) return ''
      return array.toLocaleString()
    }
  }
}
</script>

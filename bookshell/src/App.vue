<template>
  <div id="app">
    <header>
      <h1>{{ title }}</h1>
    </header>
      <div id="searchForm">
      <input type="text" name="search" placeholder="Search for books by title" id="search">
      <input type="submit" value="Search" @click="initBooks" >
    </div>
    <main>
      <div id="orderBook">
      <Order 
        v-for = "order in $store.state.orders"
        :order="order"
        key="index" /> 
        </div>
      <div id="bookShell">
        <div class="book-item" v-for = "(book, index) in $store.state.books">
          <Book 
            :book = "book"
            :index = "index"
            key = "index"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Book from './components/Book.vue'
import Order from './components/Order.vue'

import {mapActions} from 'vuex'

export default {
  name: 'app',
  data: () => ({
    title: 'Hello, please, write name of the book, witch you want to buy?',
  }),
  methods: mapActions([
      'initBooks',
    ]),
  components: {
    Book,
    Order
  }
}
</script>

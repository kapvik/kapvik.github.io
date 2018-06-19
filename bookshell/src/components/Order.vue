<template>
  
    <div class="order">
      <p>Your order: </p>
      <div class="order-info ">
          <img :src="order.imgSRC">
      </div>
        <div class="customer-info">
          <p class="fullName">{{ order.name }}</p>
          <p class="email">{{order.email}}</p>
           <p class="tel">{{order.tel}}</p>
      </div>
    </div>
  
</template>
<script>
  export default {
    name: 'Order',
    props: ['order'],
    data: () => ({

    }),

  }
</script>

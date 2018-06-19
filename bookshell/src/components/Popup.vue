<template>
  <transition>
    <div class="overlay">
      <div class="popup ">
        <form id="item-buy" action="#" method="post" @submit.prevent="addOrder">
          <span class="close" @click="$emit('close')">Close</span>
          <div class="item-img-buy">
            <img :src="src" v-model="form.imgSRC">
          </div>
          <div class="description">
            <p>{{ description }}</p>
          </div>
          <div class="form-fields">
            <div class="field">
              <label for="name"> Full name</label>
              <input id="name" type="text" name="name" 
                      v-model.trim="form.name" 
                      v-validate.disable="'required|alpha_spaces|min:2'" 
                      :class="{'input': true, 'is-danger': errors.has('name') }"       
              />
              <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
            </div>
            <div class="field">
              <label  for="email"> Email Address</label>
              <input id="email" type="email" name="email" 
                      v-model.trim="form.email" 
                      v-validate.disable="'required|email'" 
                      :class="{'input': true, 'is-danger': errors.has('email') }" 
              />
              <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
            </div>
            <div class="field">
              <label for="tel"> Telephone number</label>
              <input id="tel" type="tel" name="tel" 
                      v-model.trim="form.tel" 
                      v-validate.disable="{required: true, regex: /^\+380\d{9}$/} " 
                      :class="{'input': true, 'is-danger': errors.has('tel') }"
              />
              <span v-show="errors.has('tel')" class="help is-danger">{{ errors.first('tel') }}</span>
            </div>
          </div>
          <input class="send-btn" type="submit" value="Send" :disabled="!disabledBtn" @click.prevent="validate" >
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'Popup',
  props: ['src', 'description'],
  data: () =>({
    form: {
      name: '',
      email: '',
      tel: '',
      imgSRC: []
    }
    
  }),
  computed: {
    disabledBtn: function(){
      return this.form.name != "" && this.form.email != '' && this.form.tel != ''
    }
  },
  methods: {
    ...mapActions([
      'addOrder'
      ]),
    validate() {
      this.$validator.validateAll().then((result) => {
        if(result) {
          this.form.imgSRC.push(this.src);
          this.$store.state.orders.push(this.form)
          this.$emit('close')
          } 
        })
    }
  }
}
</script>

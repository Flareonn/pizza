<template>
  <div class="sign">
    <form class="sign-form" @submit.prevent="registerUser" v-if="getUser === null">
      <span class="sign-form__error">{{errorValidForm || getError}}</span>
      <h2 class="sign-form__title">
        <span v-if="!getLoading">Регистрация</span>
        <span v-else>Момент...</span>
      </h2>
      <label class="sign-form__label">
        <h4>E-mail</h4>
        <span class="sign-form__error" v-show="$v.email.$error">Такой почты не бывает :)</span>
      </label>
        <input
          class="sign-form__input"
          type="email"
          v-model="email"
          placeholder="Введите e-mail"
          @blur="$v.email.$touch()"
        >
      <label class="sign-form__label">
        <h4>Пароль</h4>
        <span class="sign-form__error">{{isValidPassword}}</span>
      </label>
        <input
          class="sign-form__input"
          type="password"
          v-model="password"
          placeholder="Придумайте пароль"
          :class="{error: isValidPassword}"
          @blur="$v.password.$touch()"
        >
        <input
          class="sign-form__input"
          type="password"
          v-model="confrimPassword"
          placeholder="Повторите пароль"
          :class="{error: isValidPassword}"
          @blur="$v.confrimPassword.$touch()"
        >
        <div class="sign-group">
          <button 
            type="submit" 
            class="button sign-form__submit" 
            :class="[$v.$invalid || getLoading ? 'button_outline' : 'button-active' ]"
          >
            Регистрация
          </button>
          <router-link 
            to="/login" 
            class="button button-active sign-already-register"
          >
            Уже есть аккаунт?
          </router-link>
        </div>
    </form>
    <transition name="fade" v-else>
      <div class="thanks">
        <h2 class="thanks__title">
          Вы здесь уже <b>зарегестрированы</b>! <br> <br>
          Выбрать <router-link to="/"><b>пиццы</b></router-link> под вечер <br>
          Или же... посидеть в своём <router-link to="/admin"><b>кабинете</b></router-link>?
        </h2>
        <div class="thanks-group">
          <router-link class="button button_dark" to="/">
            Купить пиццу
          </router-link>
          <router-link class="button button-active" to="/admin">
            Войти в кабинет
          </router-link>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import admin from '../../../sass/login.sass'
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      email: '',
      password: '',
      confrimPassword: '',
      errorValidForm: '',
    }
  },
  methods: {
    registerUser() {
      if(this.$v.$invalid){
        this.errorValidForm = 'Кажется вы заполнили не все поля!';
        setTimeout(() => this.errorValidForm = '', 2500);
        return;
      }
      const user = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('registerUser', user).then(() => {
        this.$router.push('/')
      })
    }
  },
  computed: {
    isValidPassword () {
      if(!this.$v.$invalid) return ''
      else if(!this.password || !this.confrimPassword) return ''
      else if(!this.$v.confrimPassword.sameAsPassword) return 'Пароли не похожи друг на друга!'
      else if(!this.$v.password.minLength) return 'Пароль слишком короткий!'
    },
    getError () {
      return this.$store.getters.getError;
    },
    getLoading () {
      return this.$store.getters.getLoading;
    },
    getUser () {
      return this.$store.getters.getUser;
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    confrimPassword: {
      sameAsPassword: sameAs('password')
    }
  },
}
</script>
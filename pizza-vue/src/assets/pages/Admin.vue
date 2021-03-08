<template>
  <div>
    <form class="builder-form">
      <div class="form-group form-group__linkToImg">
        <label for="linkToImg" class="builder-form__title">Ссылка на картинку:</label>
        <input id="linkToImg" v-model="constructorPizza.imageUrl" type="text" class="builder-form__input" placeholder="Например: https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/65f40f94-8181-4042-ae2c-10cd31c0a178.jpg">
      </div>
      <div class="form-group">
        <label for="name" class="builder-form__title">Название пиццы:</label>
        <input id="name" v-model="constructorPizza.name" type="text" class="builder-form__input" placeholder="Например: Сырная">
      </div>
      <div class="form-group">
        <span class="builder-form__title">Доступные типы пиццы:</span>
        <label for="typeThick" class="builder-form__checkbox-label">
          тонкий
          <input type="checkbox" v-model="constructorPizza.types['тонкое']" @change="changeChecked($event)" class="builder-form__input" id='typeThick'>
        </label>
        <label for="typeTrad" class="builder-form__checkbox-label" @change="changeChecked($event)">
          традиционный
          <input type="checkbox" v-model="constructorPizza.types['традиционное']" class="builder-form__input" id='typeTrad'>
        </label>
      </div>
      <div class="form-group">
        <span class="builder-form__title">Доступные размеры пиццы:</span>
        <label for="26sm" class="builder-form__checkbox-label">26 см.
          <input type="checkbox" v-model="constructorPizza.sizes['26']" @change="changeChecked($event)" class="builder-form__input" id='26sm'></label>
        <label for="30sm" class="builder-form__checkbox-label">30 см.
          <input type="checkbox" v-model="constructorPizza.sizes['30']" @change="changeChecked($event)" class="builder-form__input" id='30sm'>
        </label>
        <label for="40sm" class="builder-form__checkbox-label">40 см.
          <input type="checkbox" v-model="constructorPizza.sizes['40']" @change="changeChecked($event)" class="builder-form__input" id='40sm'>
        </label>
      </div>
      <div class="form-group">
        <label for="price" class="builder-form__title">Цена пиццы:</label>
        <input id="price" v-model.number="constructorPizza.price" step="10" type="number" class="builder-form__input">
      </div>
      <div class="form-group">
        <label for="popularity" class="builder-form__title">Популярность пиццы:</label>
        <input id="popularity" v-model.number="constructorPizza.popularity" type="number" class="builder-form__input">
      </div>
      <div class="form-group form-group__cat">
        <span class="builder-form__title">Категории пиццы:</span>
        <span>(Зажмите клавишу cmd / ctrl, чтобы выбрать несколько категорий)</span>
        <select multiple v-model="constructorPizza.categories">
          <option v-for="item in categories" :key="item">{{item}}</option>
        </select>
      </div>
    </form>
    <div class="builder-actions">
      <button class="button-submit button button-active" @click="createPizza">Отправить в базу данных</button>
      <button class="seePizzas button button_outline" @click="isOpenList = !isOpenList">Получить пиццы из БД</button>
    </div>
    <div class="pizzas-list" v-show="isOpenList">
      <div class="pizzas-list-header">
        <h3 class="pizza-item__title">Изображение:</h3>
        <h3 class="pizza-item__title">Название:</h3>
        <h3 class="pizza-item__title">Цена:</h3>
        <h3 class="pizza-item__title">Доступные типы:</h3>
        <h3 class="pizza-item__title">Доступные размеры:</h3>
        <h3 class="pizza-item__title">Доступна в категориях:</h3>
        <h3 class="pizza-item__title">Установленный уровень популярности:</h3>
        <h3 class="pizza-item__title">Действия:</h3>
      </div>
      <pizza-item v-for="pizza in getAllPizzas" :key="pizza.id" :pizza="pizza"></pizza-item>
    </div>
  </div>
</template>

<script>
import admin from '../../sass/admin.sass'
import PizzaItem from '../components/PizzaItem.vue'
export default {
  components: { PizzaItem },
  name: 'Admin',
  data () {
    return {
      constructorPizza: {
        imageUrl: '',
        name: '',
        price: 0,
        count: 0,
        types: {
          "тонкое": false,
          "традиционное": false,
        },
        sizes: {
          '26': false,
          '30': false,
          '40': false,
        },
        "categories": [
          'Все',
        ],
        "popularity": 0,
      },
      categories: [
        "Мясные",
        "Вегетарианские",
        "Гриль",
        "Острые",
        "Закрытые",
      ],
      isOpenList: false
    }
  },
  methods: {
    changeChecked(input) {
      input.target.closest('label').classList.toggle('active');
    },
    createPizza() {
      Array
        .from(document.querySelectorAll('.active'))
        .map(label => label.classList.remove('active'));

      this.$store.dispatch('setDbPizza', {
        http: this.$http,
        constructorPizza: this.constructorPizza
      })
      .then(() => {
        this.constructorPizza = {
          imageUrl: '',
          name: '',
          price: 0,
          count: 0,
          types: {
            "тонкое": false,
            "традиционное": false
          },
          sizes: {
            '26': false,
            '30': false,
            '40': false
          },
          "categories": ['Все'],
          "popularity": 0,
        };
      })    
    }
  },
  computed: {
    getAllPizzas() {
      return this.$store.getters.getPizzas;
    }
  },
}
</script>
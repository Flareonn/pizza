export default {
  computed: {
    // totalCount() {
    //   return this.$store.getters.getSelectedPizzasCount;
    // },
    totalPrice() {
      let sum = 0;

      // this.pizzas.forEach(pizza => sum += pizza.price * pizza.count)

      return sum;
    }
  },
}
<template>
  <!-- 画面全体のレイアウトコンテナ -->
  <v-container>
    
    <!-- 中央揃え -->
    <v-row justify="center">
      
      <!-- 幅を指定したカラム：モバイルで全幅、タブレットサイズ以上で幅6 -->
      <v-col cols="12" md="6" class="text-center">
        
        <!-- タイトル表示 -->
        <h2 class="text-h5 font-weight-bold mb-4">購入履歴ページ</h2>

        <!--カート内の商品を表示する Vuetify のリストコンポーネント -->
        <v-list dense class="mb-4">
          <!-- 数量が1以上の商品だけを1件ずつ表示 -->
          <v-list-item
            v-for="item in purchased_products"
            :key="item.ID"
          >
            <!-- 商品名と個数を中央揃えで表示 -->
            <v-list-item-content class="text-center">
              <v-list-item-title>
                {{ item.name }} - {{ item.quantity }}個
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <!-- 合計金額の表示 -->
        <v-divider class="my-3"></v-divider>
        <p class="text-subtitle-1 font-weight-bold mb-4">
          合計金額：{{ purchased_totalPrice }}円
        </p>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'OrderedView',

  mounted() {
  console.log('Vuexのストア情報:', this.$store.state.purchased_products)
  console.log('購入履歴データ:', this.purchased_products)
  console.log('mounted が呼ばれました');

},


  computed: {
    // カートに入っている数量が1以上の商品を取得
    productsInCart() {
      return this.$store.state.products.filter(p => p.quantity > 0)
    },
    // getterから合計金額を取得
    totalPrice() {
      return this.$store.getters.totalPrice
    },

    purchased_totalPrice() {
      return this.$store.getters.purchased_totalPrice
    },

    purchased_products() {
    return this.$store.state.purchased_products
  }
  },

  methods: {
  }
}
</script>
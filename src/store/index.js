import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        products: [
            { id: 1, name: '水', price: 50, quantity: 0 },
            { id: 2, name: '紅茶', price: 140, quantity: 0 },
            { id: 3, name: '緑茶', price: 80, quantity: 0 },
            { id: 4, name: '炭酸水', price: 60, quantity: 0 },
            { id: 5, name: 'オレンジジュース', price: 600, quantity: 0 }
        ],
        purchased_products: [

        ]
    },
    // 合計金額を計算するgetter
    getters: {
        totalPrice(state) {
            // state.products にある全商品の合計金額を計算
            return state.products.reduce((sum, item) => {
            // 各商品の「価格 × 数量」を加算していく    
            return sum + (item.price * item.quantity);
            }, 0);
        },

        purchased_totalPrice(state) {
            // state.products にある全商品の合計金額を計算
            return state.purchased_products.reduce((sum, item) => {
            // 各商品の「価格 × 数量」を加算していく    
            return sum + (item.price * item.quantity);
            }, 0);
        }
    },
    
    // 商品をカートに追加するmutation（数量を1つ増やす）
    mutations: {
        addToCart(state, product) {

            // state.productsの中から、product.idと同じIDを持つ商品pを探し、見つかればitemに代入
            const item = state.products.find(p => p.id === product.id);

            // 該当商品の quantity を1つカウントアップ
            if (item) {
                item.quantity++;
            }
        },
        // 商品の数量をリセットするmutation
        clearCart(state) {
            
            // state.products のすべての商品を1つずつ取り出して0にリセット
            state.products.forEach(item => {item.quantity = 0;});
        },

        //購入履歴にセットする
        add_purchased(state, product){
          state.purchased_products = product;
          console.log('格納された情報', state.purchased_products);
        }
    },

    // 商品購入処理をの非同期action
    actions: {
        
        // PromiseとsetTimeoutを使って3秒間待機
        async purchaseItems({ commit }) {
            await new Promise(resolve => setTimeout(resolve, 3000));

            // 3秒後、商品数量を初期化処理を実行
            commit('clearCart');
        },

        insert_DB: async function(){
          console.log('データベースへの格納を行いました');
          let response;
          let cartItem;
          try{
            // axiosでAPIを叩く
            cartItem = this.state.products.filter(p => p.quantity > 0)
            for(let i = 0; i < cartItem.length; i++){
              response = await axios.post('https://m3h-ryoya-javatask0801.azurewebsites.net/api/INSERT', null, {
                params: {
                Item_ID : cartItem[i].id,
                name : cartItem[i].name,
                quantity : cartItem[i].quantity,
                price : cartItem[i].price
              }
              });
              console.log('現在の格納情報：', response.data);
            }
          } catch (error) {
            //try内で何らかのエラーがあったとき
            console.error("エラー：", error);
          }
        },

        select_DB: async function({commit}){
          console.log('データベースから抽出を行いました');
          let response;
          try{
            // axiosでAPIを叩く
            response = await axios.get('https://m3h-ryoya-javatask0801.azurewebsites.net/api/SELECT')
            console.log('現在の抽出情報：', response.data.List);
            commit('add_purchased', response.data.List);
          } catch (error) {
            //try内で何らかのエラーがあったとき
            console.error("エラー：", error);
          }
        }
    },
    modules: {
    }
})
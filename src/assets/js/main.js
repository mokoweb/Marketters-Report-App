var eventBus = new Vue()

Vue.component('product', {
    props: {
      premium: {
        type: Boolean,
        required: true
      }
    },
    template: 
	`
     <div class="product container">
		<div class="row">
				<div class="col-6">
			
					<div class="product-image">
			 
					  <i :style="{ color: fontColor}" class="fab fa-drupal"></i>
					</div>
			 
				</div><!--close div for col 1--->
				
				<div class="col-6">
					<div class="product-info">
						<h1>{{ title }}</h1>
						<p v-if="inStock">In Stock</p>
						<p v-else>Out of Stock</p>
						<p>Shipping: {{ shipping }}</p>
			  
						<ul>
						  <li v-for="detail in details">{{ detail }}</li>
						</ul>
						<div class="slide">
						<div class="color-box"
							 v-for="(variant, index) in variants" 
							 :key="variant.variantId"
							 :style="{ backgroundColor: variant.variantColor }"
							 @mouseover="updateProduct(index)"
							 >
						</div> 
						</div>
						
						<div class="slide" >
						<button type="button" class="btn btn-primary" @click="addToCart" 
						  :disabled="!inStock"
						  :class="{ disabledButton: !inStock }"
						  >
						Add to cart
						</button>
						<button type="button" class="btn btn-warning"
						  @click="removeFromCart" >Remove From cart </button>
					</div> 
					</div>
					<hr />
				</div><!--close div for col 2--->
				
		    <div><!--close div for row 1--->
			
			<div class="row">
				<div class="col">
					<product-tabs :reviews="reviews"></product-tabs>
				</div>
			</div><!--close div for row 2--->
	</div><!--close div for container--->
	  
     `,
    data() {
      return {
          product: 'Icons',
          brand: 'Mokoweb Drupal',
          selectedVariant: 0,
          details: ['80% cotton', '20% polyester', 'Gender-neutral'],
          variants: [
            {
              variantId: 1,
              variantColor: 'black',
              variantQuantity: 10     
            },
			 {
              variantId: 2,
              variantColor: 'green',
              variantQuantity: 1     
            },
            {
              variantId: 3,
              variantColor: 'blue',
              variantQuantity: 0     
            }
			
          ],
		  reviews: []
      }
    },
      methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
			this.$emit('variant-details', this.variants)
        },
		removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct(index) {  
            this.selectedVariant = index
        }
      },
      computed: {
          title() {
              return this.brand + ' ' + this.product  
          },
		   fontColor(){
              return this.variants[this.selectedVariant].variantColor
          },
		  
          inStock(){
              return this.variants[this.selectedVariant].variantQuantity
          },
          shipping() {
            if (this.premium) {
              return "Free"
            }
              return 2.99
          }
      },
	  mounted() {
        eventBus.$on('review-submitted', productReview => {
          this.reviews.push(productReview)
        })
      }
  })
  
  
  
  Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">

    <p>
      <label for="name">Name:</label>
      <input class="name" v-model="name" required>
    </p>
    
    <p>
      <label for="review">Review:</label>      
      <textarea class="review" v-model="review" required></textarea>
    </p>
    
    <p>
      <label for="rating">Rating:</label>
      <select class="rating" v-model.number="rating" required>
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>
        
    <p>
      <input type="submit" value="Submit">  
    </p>    
  
   </form>
    `,
    data() {
      return {
        name: null,
        review: null,
        rating: null,
      }
    },
    methods: {
      onSubmit() {
        if (this.name && this.review && this.rating) {
          let productReview = {
            name: this.name,
            review: this.review,
            rating: this.rating
          }
          eventBus.$emit('review-submitted', productReview)
          this.name = null
          this.review = null
          this.rating = null
        }
       
      }
    }
  })

  Vue.component('product-tabs', {
    props: {
      reviews: {
        type: Array,
        required: false
      }
    },
    template: `
      <div>
      
        <div>
		<button type="button" class="btn btn-primary tab" 
                :class="{ activeTab: selectedTab === tab }"
                v-for="(tab, index) in tabs"
                :key="index"
                @click="selectedTab = tab"
          >{{ tab }}</button>
        </div>

        <div v-show="selectedTab === 'Reviews'">
            <p v-if="!reviews.length">There are no reviews yet.</p>
            <ul v-else>
                <li v-for="review in reviews">
                  <p>{{ review.name }}</p>
                  <p>Rating:{{ review.rating }}</p>
                  <p>{{ review.review }}</p>
                </li>
            </ul>
        </div>

        <div v-show="selectedTab === 'Make a Review'">
          <product-review></product-review>
        </div>
    
      </div>
    `,
    data() {
      return {
        tabs: ['Reviews', 'Make a Review'],
        selectedTab: 'Reviews'
      }
    }
  })

  
  var app = new Vue({
      el: '#app',
      data: {
        premium: true,
        cart: [],
		seeCart: false
		//cartIndex: []
      },
      methods: {
        updateCart(id) {
          this.cart.push(id)
		 // this.cartIndex.push(index)
        },
		reduceCart(id) {
          this.cart.pop(id)
		  //this.cartIndex.pop(index)
        },
		returnIndex(prop) {
			console.log('i am here', this.variants);
			//var index = this.variants.findIndex(x => x.variantId==prop)
			//return variants[index].variantColor
		}
		
		
      }
  });
Vue.component('product-detail', {
    template: `
    <ul>
        <li v-for="detail in details" :key="detail">{{ detail }}</li>
    </ul>
    `,
    data() {
        return { details: ['80% cotton', '20% polyester', 'Gender-neutral'] }
    }           //ready to conect shit 

})

Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
        <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>
        </p>
        <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name" placeholder="name">
        </p>
        <p>
            <label for="review">Review:</label>
            <textarea id="review" v-model="review"></textarea>
        </p>
        <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
            </select>
        </p>
        <p>
            <label for="recommend">Would you recommend this product?</label>
            <input type="radio" id="recommend" v-model="recommend" value="yes"> yes
            <input type="radio" id="recommend" v-model="recommend" value="no"> no
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
        recommend: null,
        errors: []
    }
},
methods: {
    onSubmit() {
        if (this.name && this.review && this.rating) {
            let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating,
                recommend: this.recommend
            }
            eventBus.$emit('review-submitted', productReview)
            this.name = null
            this.review = null
            this.rating = null
            this.recommend = null
        } else {
            if (!this.name) this.errors.push("Name required.")
            if (!this.review) this.errors.push("Review required.")
            if (!this.rating) this.errors.push("Rating required.")
        }
    }
}
})// оформил бд, вьющка с ошибкой вывод рабочий, пол кк комент 
Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: false
        },
        shipping: {
            type: String,
            required: true
        },
    },
    template: `
    <div>
        <ul>
            <span class="tab" v-for="(tab, index) in tabs" @click="selectedTab = tab" :class="{ activeTab: selectedTab === tab }">{{ tab }}</span>
        </ul>
        <div  v-show="selectedTab === 'Reviews'" >
            <p v-if="!reviews.length">There are no reviews yet.</p>
            <ul>
                <li v-for="review in reviews">
                    <p>{{ review.name }}</p>
                    <p>Rating: {{ review.rating }}</p>
                    <p>{{ review.review }}</p>
                    <p>{{ review.recommend }}</p>
                </li>
            </ul>
        </div>
        <div v-show="selectedTab === 'Make a Review'">
            <product-review></product-review>
        </div>
        <div v-show="selectedTab === 'Shipping'">
            <p>Shipping : {{ shipping }}</p>
        </div>
        <div v-show="selectedTab === 'Details'">
            <product-detail></product-detail>
        </div>
  
    </div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Make a Review', 'Shipping', 'Details'],
            selectedTab: 'Reviews',
        }
    }                           //оформление летит кк 

})
let eventBus = new Vue()


let app = new Vue({
    el: "#app",
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        removeCart(id) {
            const index = this.cart.indexOf(id);
            if (index !== -1) {
                this.cart.splice(index, 1);
            }
        }
    }
})
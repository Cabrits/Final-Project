<!--Popup where it's possible to review the selected item-->

<template>

    <div class="signUpWrapper">
        <div class="reviewPopup">
            <div class="closeSignUp" @click="closeS">&times;</div>
            <div class="container">
                <!-- rating and labels -->
                <div class="rating">
                    <input type="radio"  id="rate5" v-model="newReview.rating" value="5">
                    <label for="rate5" class="fas fa-star"></label>
                    <input type="radio"  id="rate4" v-model="newReview.rating" value="4">
                    <label for="rate4" class="fas fa-star"></label>
                    <input type="radio"  id="rate3" v-model="newReview.rating" value="3">
                    <label for="rate3" class="fas fa-star"></label>
                    <input type="radio"  id="rate2" v-model="newReview.rating" value="2">
                    <label for="rate2" class="fas fa-star"></label>
                    <input type="radio"  id="rate1" v-model="newReview.rating" value="1">
                    <label for="rate1" class="fas fa-star"></label>
                </div>
                <form @submit.prevent="addReview">
                    <!-- Header displaying the rating text -->
                    <header>{{ getRatingText }}</header>
                     <!-- Text area for the review -->
                    <div class="textArea">
                        <textarea v-model="newReview.review" cols="30" placeholder="review..."></textarea>
                    </div>
                     <!-- Form submit button -->
                    <div class="btnForm">
                        <button type="submit" @click="addReview">Submit Review</button>
                    </div>
                </form>
            </div>   
        </div>
    </div>

</template>

<script>
    export default{
        name: 'PopupReview',
        data() {
            return {
                newReview: {
                    rating: 0,
                },
            };
        },
        methods: {
            addReview() {
                //emit addreview event and close popup

                this.$emit('addReview', this.newReview);
                console.log(this.newReview);
                this.closeS();

            },
            closeS() {
                // Emit a 'closeS' event to notify the parent component to close the popup
                this.$emit('closeS');
            },
        },
        // Computed method to get the rating text corresponding to the selected star value
        computed: {
            getRatingText() {
            const rating = parseInt(this.newReview.rating);
            switch (rating) {
                case 1:
                return 'Very bad';
                case 2:
                return 'Bad';
                case 3:
                return 'Medium';
                case 4:
                return 'Good';
                case 5:
                return 'Fantastic';
                default:
                return '';
            }
        },
    },

    watch: {
        'newReview.rating': function(newRating) {
            // Update <header> content when rating selection changes
            this.$forceUpdate();
        },
    },
};
</script>

<style scoped>

.signUpWrapper{
    position: fixed;
    padding-top: 35px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 5;
}


.reviewPopup{
    display: block;
    position: relative;
    width: 450px;
    line-height: 20px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15%;
    padding: 20px 30px;
    background-color: rgb(204, 197, 185);
    border-radius: 10px;
    border: 2px solid rgb(255, 255, 255);
    transition: top 0ms ease-in-out 200ms, opacity 100ms ease-in-out 200ms,
        transform 20ms ease-in-out 0ms;
    transform: scale(1.05);
    z-index: 5;
}


.closeSignUp{
    position: absolute;
    top: 18px;
    right: 18px;
    width: 23px;
    height: 23px;
    background: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    text-align: center;
    line-height: 23px;
    border-radius: 15px;
    cursor: pointer;
}


.container{
    position: relative;
    padding: 20px 30px;
    align-items: center;
    flex-direction: column;
    justify-content: center;
}


.container .rating input{
    display: none; 
}


.rating{
    display: flex;
    flex-direction: row-reverse;
}

.rating label{
    font-size: 40px;
    color: #444;
    padding: 10px;
    transition: all 0.2s ease;
    margin-left: 3%;
    
}


input:not(:checked) ~ label:hover,
input:not(:checked) ~ label:hover ~ label{
    color: whitesmoke;    
}


input:checked ~ label{
    color: whitesmoke;        
}


input#rate5:checked ~ label{
    color: white;
    text-shadow: 0 0 20px blanchedalmond;
    
}


form header{
    width: 100%;
    font-size: 25px;
    font-weight: 400;
    margin: 5px 0 20px 0;
    text-align: center;
    transition: all 0.2s ease;
}

textarea{
    height: 100px;
    width: 100%;
    overflow: hidden;
}

.textArea textarea{
    height: 93px;
    width: 92%;
    outline: none;
    padding: 15px;
    font-size: 17px;
    resize: none;
}

form .btnForm{
    height: 30px;
    width: 100%;
    margin: 15px 0;
}

form .btnForm button{
    height: 100%;
    width: 100%;
    background-color: white;
    box-shadow: 10px 8px 1px rgba(50, 50, 50, 0.7);
    border: none;
    border-radius: 15px;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
}

form .btnForm button:hover{
    background-color: rgb(56, 49, 40);
    color: white;
}

/*Responsive*/

@media (max-width: 725px){
    .reviewPopup{
        width: 300px;
    }

    .rating label{
        font-size: 23px;
    }
}

</style>
    
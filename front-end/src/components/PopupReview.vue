<template>
    <div class="signUpWrapper">
        <div class="reviewPopup">
            <div class="closeSignUp" @click="closeS">&times;</div>
            <div class="container">
                <!-- Stars and labels -->
                <div class="stars">
                    <input type="radio"  id="rate5" v-model="newReview.stars" value="5">
                    <label for="rate5" class="fas fa-star"></label>
                    <input type="radio"  id="rate4" v-model="newReview.stars" value="4">
                    <label for="rate4" class="fas fa-star"></label>
                    <input type="radio"  id="rate3" v-model="newReview.stars" value="3">
                    <label for="rate3" class="fas fa-star"></label>
                    <input type="radio"  id="rate2" v-model="newReview.stars" value="2">
                    <label for="rate2" class="fas fa-star"></label>
                    <input type="radio"  id="rate1" v-model="newReview.stars" value="1">
                    <label for="rate1" class="fas fa-star"></label>
                </div>
                <form @submit.prevent="addReview">
                    <!-- Header displaying the rating text -->
                    <header>{{ getRatingText }}</header>
                     <!-- Text area for the comment -->
                    <div class="textArea">
                        <textarea v-model="newReview.comment" cols="30" placeholder="Comment..."></textarea>
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
                    stars: 0,
                    comment: '',
                },
            };
        },
        methods: {
            addReview() {
                 // Emit an 'addReview' event and pass the newReview object as the payload
                this.$emit('addReview', this.newReview);
                // Call the 'closeS' method to close the popup
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
            const rating = parseInt(this.newReview.stars);
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
        'newReview.stars': function(newRating) {
            // Update <header> content when rating selection changes
            this.$forceUpdate();
        },
    },
};
</script>

<style scoped>

     /* Styles for the main container */
    .signUpWrapper {
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

    /* Styles for the review popup */
    .reviewPopup {
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

    /* Styles for the close button */
    .closeSignUp {
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

    /* Styles for the inner container */
    .container{
        position: relative;
        padding: 20px 30px;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }


    .container .stars input{
        display: none; 
    }

    /* Styles for the stars */
    .stars{
        display: flex;
        flex-direction: row-reverse;
    }

    .stars label{
        font-size: 40px;
        color: #444;
        padding: 10px;
        transition: all 0.2s ease;
        margin-left: 3%;
        
    }

    /* Styles for star labels when hovered */
    input:not(:checked) ~ label:hover,
    input:not(:checked) ~ label:hover ~ label{
        color: whitesmoke;    
    }

    /* Styles for selected star labels */
    input:checked ~ label{
        color: whitesmoke;        
    }

    /* Styles for the rating 5 star label when selected */
    input#rate5:checked ~ label{
        color: white;
        text-shadow: 0 0 20px blanchedalmond;
        
    }

    /* Styles for the header */
    form header{
        width: 100%;
        font-size: 25px;
        font-weight: 400;
        margin: 5px 0 20px 0;
        text-align: center;
        transition: all 0.2s ease;
    }

    /* Styles for the textarea */
    textarea{
        height: 100px;
        width: 100%;
        overflow: hidden;
    }

    /* Specific styles for the textarea */
    .textArea textarea{
        height: 93px;
        width: 92%;
        outline: none;
        padding: 15px;
        font-size: 17px;
        resize: none;
    }

    /* Styles for the submit button container */
    form .btnForm{
        height: 30px;
        width: 100%;
        margin: 15px 0;
    }

    /* Styles for the submit button */
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
    /* Styles for the submit button when hovered */
    form .btnForm button:hover{
        background-color: rgb(56, 49, 40);
        color: white;
    }

    /* Styles for devices with a maximum width of 725 pixels */
    @media (max-width: 725px){
        .reviewPopup{width: 300px;}

        .stars label{
            font-size: 23px;
        }
    }
</style>
    
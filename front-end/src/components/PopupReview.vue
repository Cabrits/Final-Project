<template>
    <div class="signUpWrapper">
        <div class="reviewPopup">
            <div class="closeSignUp" @click="closeS">&times;</div>
            <div class="form">
                <h2
                    id="popupTitle"
                    style="color: white; font-family: Arial, Helvetica, sans-serif"
                >
                GIVE YOUR REVIEW
                </h2>
        
                <h3
                    id="bookTitle"
                    style="color: white; font-family: Arial, Helvetica, sans-serif"
                >
                Book Title
                </h3>
                <h3
                    id="userName"
                    style="color: black; font-family: Arial, Helvetica, sans-serif"
                >
                @User1
                </h3>
                <div class="formElement">
                    <label for="generalEvaluation" style="color: white"><h3>General evaluation</h3></label>
                    <div class="rating">
                        <input type="radio" name="star" id="star1"><label for="star1"></label>
                        <input type="radio" name="star" id="star2"><label for="star2"></label>
                        <input type="radio" name="star" id="star3"><label for="star3"></label>
                        <input type="radio" name="star" id="star4"><label for="star4"></label>
                        <input type="radio" name="star" id="star5"><label for="star5"></label>
                    </div>
                </div>
                <div class="formElement">
                    <label for="review" style="color: white"><h3>Review</h3></label>
                    <input
                        type="text"
                        id="review"
                        placeholder="Enter your review"
                        v-model="Text"
                    />
                </div>

                <div class="formElement">
                    <button
                        id="sendFormBtn"
                        style="font-family: Arial, Helvetica, sans-serif"
                    >
                        Send
                    </button>
                </div>

            </div>   
        </div>
        <!--Blur the background when Popup is opened-->

        <div v-if="showPopup" class="blur"></div>
    </div>
</template>

<script>
    export default{
        name: 'PopupReview',
        data(){
            return{
                showPopup: true,
            }
        },
        methods:{
            closeS(){
                this.$emit('closeS');
            },
        }
    };


</script>

<style scoped>
    .signUpWrapper {
        width: 99%;
        padding-top: 35px;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .reviewPopup {
        display: block;
        position: relative;
        width: 350px;
        line-height: 20px;
        margin-left: auto;
        margin-right: auto;
        padding: 20px 30px;
        background-color: rgb(204, 197, 185);
        border-radius: 10px;
        border: 2px solid rgb(255, 255, 255);
        transition: top 0ms ease-in-out 200ms, opacity 100ms ease-in-out 200ms,
            transform 20ms ease-in-out 0ms;
        transform: scale(1.05);
        z-index: 5;
    }

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

    .form h2 {
        text-align: center;
        margin: 10px 0px 20px;
        font-size: 25px;
        user-select: none;
    }

    .form h3 {
        user-select: none;
    }

    .rating{
        display:flex;
        flex-direction: row-reverse;
        margin-bottom: 10%;
    }

    .rating input{
        display: none;
    }

    .rating label{
        cursor: pointer;
        width: 50px;
        display: block;
        position: relative;
    }

    .rating label::before{
        content: '\f005';
        font-family: fontAwesome;
        position: absolute;
        display: block;
        font-size: 20px;
        color: #101010;
    }
    
    .rating label::after{
        content: '\f005';
        font-family: fontAwesome;
        position: absolute;
        display: block;
        font-size: 20px;
        color: rgb(255, 255, 255);
        top: 0%;
        opacity: 0;
        transition: .5s;
        text-shadow: 0 2px 5px rgba(0, 0, 0, .5);
    }

    .rating label:hover:after, .rating input:hover ~ label::after, .rating input:checked ~ label::after{
        opacity: 1;
    }
    
    .formElement {
        margin: 13px 0px;
    }

    .formElement label {
        font-size: 14px;
        color: #222;
        font-family: Arial, Helvetica, sans-serif;
    }

    .formElement input[type="text"]{
        margin-top: 5px;
        display: block;
        width: 94%;
        height: 100px;
        padding: 10px;
        outline: none;
        border-radius: 5px;
        color: rgb(78, 75, 75);
        box-shadow: 7px 7px rgba(50, 50, 50, 0.5);
        -moz-box-shadow: 7px 7px rgba(50, 50, 50, 0.5);
        -webkit-box-shadow: 7px 7px rgba(50, 50, 50, 0.5);
        -o-box-shadow: 7px 7px rgba(50, 50, 50, 0.5);
        font-size: 15px;
        border: none;
    }

    .formElement button {
        width: 70%;
        height: 40px;
        border: none;
        outline: none;
        font-size: 15px;
        font-weight: 600;
        background-color: white;
        color: rgb(78, 75, 75);
        border-radius: 10px;
        cursor: pointer;
        margin-top: 25px;
        box-shadow: 7px 7px rgba(50, 50, 50, 0.5);
        -moz-box-shadow: 7px 7px rgba(50, 50, 50, 0.5);
        -webkit-box-shadow: 7px 7px rgba(50, 50, 50, 0.5);
        -o-box-shadow: 7px 7px rgba(50, 50, 50, 0.5);
    }

    .formElement button:hover {
        background-color: #b5b5b6;
    }

    /*Blur what's behind the popup when opened*/

    .blur {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 4;
    }

    /*Responsive*/

    @media screen and (max-width: 800px) {
    .signUpWrapper {
        width: 96%;
    }

    .reviewPopup {
        width: 270px;
        height: 400px;
    }
    }
</style>
    
<!--Popup where it's possible to share the selected item to different social media-->

<template>

    <div class="popupWrapper">
        <div class="popupContent">
            <button class="closeSocialMedia" @click="closeShare">&times;</button>
            <h3>Social Medias</h3>
            <div class="socialMediaBtn">
                <button @click="buttonClicked(1)"><i class="fab fa-facebook-f"></i></button>
                <button @click="buttonClicked(2)"><i class="fab fa-twitter"></i></button>
                <button @click="buttonClicked(3)"><i class="fa fa-envelope"></i></button>
            </div>
        </div>
    </div>

</template>

<script>

export default{
    name: 'PopupShare',
    methods:{
        buttonClicked(buttonNumber){

            const product = {
            name: 'Name of product',
            story: 'Story of product',
            price: '9,99 €',
      };

        if (buttonNumber === 1) {
            // Share by Facebook
            const url = `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(
            `Check this product: ${product.name}\n\nStory: ${product.story}\n\nPrice: ${product.price}`
            )}`;

            window.open(url, '_blank');
        } else if (buttonNumber === 2) {
            // Share by Twitter
            const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            `Check this product: ${product.name}\n\nStory: ${product.story}\n\nPrice: ${product.price}`
            )}`;

            window.open(url, '_blank');
        } else if (buttonNumber === 3) {
            // Share by e-mail
            const subject = encodeURIComponent(`Check out this product: ${product.name}`);
            const body = encodeURIComponent(
            `Product: ${product.name}\n\nStory: ${product.story}\n\nPrice: ${product.price}`
            );
            const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
            window.location.href = mailtoLink;
      }
    },
        closeShare(){
            this.$emit("closeS");
        }
    }
};

</script>

<style scoped>
.popupWrapper{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5;
}

.popupContent{
    display: block;
    position: relative;
    width: 350px;
    line-height: 20px;
    padding: 20px 30px;
    background-color: rgb(204, 197, 185);
    border-radius: 10px;
    border: 2px solid rgb(255, 255, 255);
    transition: top 0ms ease-in-out 200ms, opacity 100ms ease-in-out 200ms,
        transform 20ms ease-in-out 0ms;
    transform: scale(1.05);
}

.popupContent h3{
    margin-left: 110px;
}
.socialMediaBtn{
    display:flex;
    justify-content:center; 
}

.socialMediaBtn button{
    margin: 10px;
    width: 60px;
    height: 30px;
    border-radius: 15px;
    font-size: 15px;
    background-color: white;
    box-shadow: 10px 8px 1px rgba(50, 50, 50, 0.7);
    border: none;
}

.socialMediaBtn button:hover{
    background-color: rgb(56, 49, 40);
    color: white;
}

.closeSocialMedia{
    position: absolute;
    top: 18px;
    right: 18px;
    width: 23px;
    height: 23px;
    background: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
    border: none;
    font-size: 15px;
    line-height: 13px;
}

/*Responsive*/

@media (max-width: 500px){
    .popupContent{
        width: 280px;
    }

    .popupContent h3 {
        margin-left: 80px
    }
}

</style>
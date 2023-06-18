<!--Footer containing direct links with useful information-->

<template>

    <!--Footer-->

    <footer>
        <div class="footer leftRightAuto px1750Size">
            <ul>
                <li class="lili"><a href="#">Twitter</a></li>
                <li class="lili"><router-link :to="'/aboutus'"> About Us</router-link></li>
                <li class="lili"><a href="https://github.com/Cabrits/Final-Project">Github</a></li>
                <li><p>👋</p></li>
            </ul>
        </div>
    </footer>

</template>


<script>

export default{
    name:'Footer'
}

</script>


<style scoped>

.nightModeWrapper{
  display: flex;
}

button{
    width: 25px;
    height: 25px;
    border-radius: 10px;
}

/*Responsive*/

.px1750Size{
    margin: auto;
    width: 1780px;
}

.leftRightAuto{
    margin-left: auto;
    margin-right: auto;
}

/*Footer*/

footer{
    font-family: Arial, Helvetica, sans-serif;
    padding-top: 130px;
    
}

.footer{
    display: flex;
    background-color: rgb(58, 56, 53);
    line-height: 1.5;
    border-radius: 10px;
    padding: 10px;
    border: 2px solid white;
}

.footer ul{
    display: inline-grid;
    grid-auto-flow: row;
    grid-gap: 30px;
    margin: auto;
    margin-left: 650px;
    list-style-type: none;
}

.lili{
    margin-top: 15px;
    font-weight: 600;
}

.footer a{
    color: white;
    text-decoration: none;
    box-shadow: inset 0 -1px 0 hsla(0, 0%, 100%, 0.4);
}

.footer a:hover{
    box-shadow: inset 0 -1.2em 0 hsla(0, 0%, 100%, 0.4);
}

.footer li:last-child{
    grid-column: 1 / 2;
    grid-row: 1 / 2;
}

.footer li:hover ~ li p{
    animation: wave 0.3s infinite;
}

/*Animation*/

@keyframes wave{
    0%,
    100% {
        transform: rotate(0deg);
    }
    25% {
        transform: rotate(20deg);
    }
    75% {
        transform: rotate(-15deg);
    }
}

/*Responsive*/

@media screen and (min-width: 500px){
    .footer ul{
        grid-auto-flow: column; 
    }
}


@media screen and (max-width: 500px){
    .footer{
        height: 45vh;
        border-radius: 10px;
    }

    .footer a{
        margin-right: 30px;
    }
}


@media screen and (max-width: 1800px){
    .px1750Size{
        width: 95%;
    }
    .footer ul{
        margin: auto;
    }
}

</style>
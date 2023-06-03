<template>
    <div class="notificationStyle">
        <div class="px1750Size">
            <div class="notificationWrapper ">
            <div class="notificationPopup" id="showNotification">
                <div class="closeNotification" @click="closeN">&times;</div>
                <h2>Notifications</h2>
                <ul class="notificationItems">
                <li>
                    <span class="notificationQuantity">1x</span> Sony Camera
                    <div class="notificationPrice">400€</div>
                    <a href="#" class="notificationRemove"><i class="fa fa-heart" aria-hidden="true"></i></a>
                </li>
                </ul>
            </div>
            <div class="arrow"></div>
            </div>
        </div>
    </div>
  </template>
  
<script>
export default {
    name: 'PopupNotification',
    methods: {
      closeN() {
        this.$emit('closeN');
      }
    }
}
</script>
  
<style scoped>

.notificationStyle{
    position: absolute;
    width: 100%;
}

.px1750Size{
    position: relative;
    margin: auto;
    width: 1750px;
}

.notificationWrapper{
    position: relative;
    z-index: 5;
    top: 5px; 
}

.notificationPopup{
    position: relative;
    display: block;
    height: 415px;
    width: 400px;
    padding-top: 50px;
    overflow-y: auto;
    background-color: rgb(186, 200, 165);
    transition: right .3s;
    border: 1px solid white;
    border-radius: 10px;
    color: black;
    box-shadow: 35px 45px 25px rgba(50, 50, 50, 0.5);
    left: 77.6%;
}

.notificationPopup h2{
    font-size: 20px;
    text-align: center;
    margin-top: -20px;
}

.closeNotification{
    position: absolute;
    top: 13px;
    right: 11px;
    width: 23px;
    height: 23px;
    background: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    text-align: center;
    line-height: 23px;
    border-radius: 50%;
    cursor: pointer;
}

.closeNotification:hover{
    background-color: rgb(149, 161, 132);
}

.notificationItems{
    padding: 0;
}

.notificationItems a{
    text-decoration: none;
    color: black;
    margin-top: -40px;
    right: 11px;
    width: 28px;
    height: 28px;
    background-color: white;
    border-radius: 50%;
    text-align: center;
    line-height: 26px;
    font-size: 20px;
    font-weight: 100;
}

.notificationItems a:hover{
    background-color: rgb(149, 161, 132);
}

.notificationItems li{
    position: relative;
    padding: 1rem;
    border-top: solid;
    font-weight: 700;
}

.notificationItems span{
    font-weight: 550;
    color: rgb(94, 106, 106);
    margin-right: 10px;
}

.notificationItems li:last-child{
    border-bottom: 2px solid white;
    border-top: 2px solid white;
}

.notificationItems .fa-heart:before{
    font-size: 0.9rem;
    padding: 0.45rem;
    color: rgb(78, 75, 75);
    }

.notificationPrice{
    margin-top: .8rem;
}

.notificationRemove{
    position: absolute;
    right: 1rem;
}

.arrow{
    z-index: 100;
    position: absolute;
    top: -10px;
    right: 235px;
    border-bottom: 10px solid rgb(149, 161, 132);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
}


@media screen and (max-width: 767px) {
  .notificationPopup {
    width: 100%;
    max-width: 100%;
    margin: 0;
    left: 0;
    right: 0;
  }
}

</style>
  
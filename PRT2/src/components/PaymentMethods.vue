<template>
  <div class="paymentContainer">
    <h3>Payment Methods</h3>
    <ul>
      <li v-for="method in paymentMethods" :key="method.id">
        {{ method.name }} - {{ method.cardNumber }}
      </li>
    </ul>

    <button @click="addPaymentMethod">Add Payment Method</button>

    <!-- Popup -->
    <div v-if="showPopup" class="popupContainer">
      <div class="popup">
        <button @click="cancelAdd" class="closeButton">&times;</button>
        <div class="changeInfo">
          <h3>Add Payment Method</h3>
          <label for="name">Name</label>
          <input id="name" v-model="newPaymentMethod.name" type="text" placeholder="Enter your name" />
          <label for="cardNumber">Card Number</label>
          <input id="cardNumber" v-model="newPaymentMethod.cardNumber" type="text" placeholder="Enter card number" />
        </div>
        <div class="saveButton">
          <button @click="savePaymentMethod">Save</button>
        </div>
      </div>
    </div>

    <div v-if="showPopup" class="blur"></div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      paymentMethods: [
        { id: 1, name: 'Card 1', cardNumber: '**** **** **** 1234' },
        { id: 2, name: 'Card 2', cardNumber: '**** **** **** 5678' },
      ],
      newPaymentMethod: {
        name: '',
        cardNumber: '',
      },
      showPopup: false,
    };
  },
  methods: {
    addPaymentMethod() {
      this.showPopup = true;
      this.newPaymentMethod = { name: '', cardNumber: '' };
    },
    savePaymentMethod() {
      const newMethod = {
        id: Date.now(),
        name: this.newPaymentMethod.name,
        cardNumber: this.newPaymentMethod.cardNumber,
      };
      this.paymentMethods.push(newMethod);
      this.showPopup = false;
    },
    cancelAdd() {
      this.showPopup = false;
    },
  },
};
</script>

<style scoped>

.paymentContainer{
  background-color: rgb(185, 188, 159);
  border-radius: 10px;
  border: 2px solid white;
  padding: 10px 70px;
  box-shadow: 25px 25px 22px rgba(50, 50, 50, 0.5);

}
.popupContainer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.popup {
  background: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: block;
  border-radius: 10px;
}

.popup button{
  float: right;
}

.changeInfo{
  display: flex;
  flex-direction: column;
}

.closeButton {
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;
}

.blur {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 4;
}

</style>
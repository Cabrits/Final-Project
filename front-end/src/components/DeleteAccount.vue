<!--Component of UserPage to Delete Account-->

<template>

  <!--Delete Account-->

  <div class="deleteContainer">
    <h2>Delete Account</h2>
    <div class="deleteButton">
      <button>Delete Account</button>
    </div>
  </div>

</template>

<script>

export default{
};

</script>

<style scoped>



/*Payment Box*/
.deleteContainer {
    background-color: rgb(97, 82, 68);
    border-radius: 10px;
    border: 2px solid white;
    padding: 10px 70px;
    box-shadow: 25px 25px 10px rgba(50, 50, 50, 0.6);
    color: white;
}

.deleteContainer h2 {
    text-align: center;
}

.deleteButton{
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.deleteButton button {
    margin-top: 60px;
    margin-bottom: 60px;
    align-self: center;
    position: relative;
    border: none;
    outline: none;
    background-color: white;
    color: #000000;
    border-radius: 50px;
    font-size: 22px;
    cursor: pointer;
    width: 300px;
    height: 45px;
    box-shadow: 10px 8px 1px rgba(50, 50, 50, 0.7);
}

.deleteButton button:hover {
    background-color: rgb(163, 31, 31);
    color: white;
}

@media screen and (max-width: 480px) {
  
  .deleteButton button {
      width: 200px;
  }

}

</style>



<!--Chat to talk with a bot-->

<template>

  <!--Chat Bot-->

  <div class="chatBotWrapper">

    <!--Clickable Icon-->

    <div class="chatBotIcon" @click="toggleChatBox">
      <font-awesome-icon icon="fa-solid fa-comment" />
    </div>

    <!--Chat Popup-->

    <div v-show="showChatBox" class="chatBox">
      <div class="closeChat" @click="toggleChatBox">&times;</div>
      <div class="inputContainer">
        <input type="text" v-model="inputText" @keyup.enter="sendMessage" placeholder="Ask Us Something..."/>
      </div>
      <div class="messagesContainer" ref="messagesContainer">
        <div v-for="message in messages" :key="message.id" :class="['message', message.type]">
          {{ message.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

//  Import necessary modules and functions
import axios from "axios";
import { mapState, mapGetters } from "vuex";
import apiURL from "../config";

export default{
  name: "ChatBot",
  //  Data for the component (show chat box, messages and input text)
  data() {
    return {
      showChatBox: false,
      messages: [],
      inputText: "",
    };
  },
  //  Computed properties for the component (items, favourites and user id)
  computed: {
    ...mapState(["items"]),
    ...mapState(["favourites"]),
    ...mapGetters("user", ["userId"]),
    //  Get the items that match the selected category
    mangas() {
      console.log(this.items.items);
      return this.items.items;
    },
  },
  //  Methods for the component (toggle chat box, ask chat gpt, send message and scroll to bottom)
  methods: {
    //  Toggle chat box to show or hide it
    toggleChatBox() {
      this.showChatBox = !this.showChatBox;
    },
    //  Ask the chat bot a question and get a response through the API
    async askChatGpt(message) {
      try {
        //  Send the message to the API
        const response = await axios.post(`${apiURL}/chat`, {
          message,
        });
        //  Return the response from the API
        return response.data.reply;
      } catch (error) {
        console.error(error);
      }
    },
    //  Send a message to the chat bot and get a response
    async sendMessage() {
      //  Check if the input is not empty
      if (this.inputText.trim() !== "") {
        //  Add the message to the messages array
        const trimmedInput = this.inputText.trim();
        this.messages.push({
          id: this.messages.length + 1,
          content: trimmedInput,
          type: "user",
        });
        //  Clear the input
        this.inputText = "";
        //  Scroll to the bottom of the chat
        this.$nextTick(() => {
          this.scrollToBottom();
        });
        //  Get a response from the chat bot
        const responseFromGpt = await this.askChatGpt(trimmedInput);
        //  Add the response to the messages array
        this.messages.push({
          id: this.messages.length + 1,
          content: responseFromGpt,
          type: "bot",
        });
        //  Scroll to the bottom of the chat
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },
    //  Scroll to the bottom of the chat
    scrollToBottom() {
      const messagesContainer = this.$refs.messagesContainer;
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    },
  },
};

</script>

<style scoped>

/*To remove the outline color when typing*/

input:focus{
    outline: none;
}

/*Chat Bot*/

.chatBotWrapper{
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
}

/*Icon*/

.chatBotIcon{
    width: 70px;
    height: 70px;
    background-color: #ffffff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(76, 75, 75);
    font-size: 25px;
    cursor: pointer;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
    transition: 0.5s;
}

.chatBotIcon:hover{
    background-color: rgb(58, 56, 53);
    color: #ffffff;
    width: 68px;
    height: 68px;
    border: 2px solid white;
}

/*Chat Popup*/

.chatBox{
    position: fixed;
    display: flex;
    flex-direction: column-reverse;
    bottom: 15px;
    right: 20px;
    width: 350px;
    height: 410px;
    background-color: rgb(58, 56, 53);
    border-radius: 10px;
    border: 2px solid white;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    padding-top: 10px;
    z-index: 9999;
}

.closeChat{
    position: absolute;
    top: 8px;
    right: 10px;
    width: 23px;
    height: 23px;
    background: #ffffff;
    color: rgb(0, 0, 0);
    text-align: center;
    line-height: 23px;
    border-radius: 15px;
    cursor: pointer;
}

.messagesContainer{
    overflow-y: auto;
    padding-left: 10px;
    padding-right: 10px;
    scrollbar-width: thin;
    height: 300px;
    margin-top: 30px;
}

.message{
    padding: 8px;
    margin-bottom: 10px;
    border-radius: 5px;
    word-wrap: break-word;
    max-width: 90%;
}

.message.user{
    background-color: rgb(255, 254, 254);
    width: 60%;
    margin-left: auto;
}

.message.bot{
    background-color: #e1dada;
    width: 60%;
    margin-right: auto;
}

.message:last-child{
    margin-bottom: 0;
}

.inputContainer{
    padding: 10px;
    margin-left: auto;
    margin-right: auto;
    width: 98%;
}

input[type="text"]{
    width: 90%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    margin-top: 10px;
    background-color: #f0efef;
    font-size: 15px;
}

input[placeholder]{
    color: rgb(0, 0, 0);
}

/*Responsive*/

@media screen and (max-width: 800px){
  .chatBotWrapper{
      bottom: 10px;
      right: 10px;
  }

  .chatBotIcon{
      width: 60px;
      height: 60px;
      font-size: 20px;
  }

  .chatBox{
      bottom: 80px;
      right: 10px;
      width: 300px;
      height: 350px;
  }

  .closeChat{
      width: 25px;
      height: 25px;
  }

  input[type="text"]{
      width: 87%;
  }
}

@media screen and (max-width: 500px){
  .chatBotWrapper{
      bottom: 5px;
      right: 5px;
  }

  .chatBotIcon{
      width: 40px;
      height: 40px;
      font-size: 16px;
  }

  .chatBox{
      right: 5px;
      width: 300px;
      height: 350px;
  }
}

</style>

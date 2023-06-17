<!--Search bar located on the Header, that contains a autocomplete for the item search-->

<template>

    <!--Overall Search Bar-->

    <div class="searchBar" id="search">
        <form autocomplete="off" @submit.prevent="handleSearch">

            <!--Search button and input-->

            <button type="submit"><i class="fa fa-search" aria-hidden="true"></i></button>
            <input ref="searchInput" type="text" placeholder="Search Product..." name="search" v-model="searchInput" @input="handleInput"/>

            <!--Autocomplete with the item searched-->

            <div class="searchResultsWrapper">
                <ul class="searchResults" v-if="showAutocomplete">
                    <li v-for="(result, index) in getLimitedResults" :key="result.item_name" >
                      <router-link  :to="'/item/' + result.item_id">
                        <img :src="result.item_image" :alt="result.item_name" />
                        <span>{{ result.item_name }}</span>
                      </router-link>
                    </li>
                    <li v-if="searchResults.length === 0" class="noResults">
                        Product not found
                    </li>
                </ul>
            </div>

        </form>
    </div>

</template>


<script>
import { mapState} from 'vuex';
export default{
    name:'SearchBar',

    data() {
      return {
          showAutocomplete: false,
          searchResults: [], 
          maxResults: 4,
          searchInput: "",
      };
    },

    computed: {
      ...mapState('items', ['items']),

      getLimitedResults() {
        return this.searchResults.slice(0, this.maxResults);
      },
    },

    methods: {
      handleInput() {
      if (this.searchInput.length > 0) {
        const matchingProducts = this.items.filter((item) =>
          item.item_name.toLowerCase().includes(this.searchInput.toLowerCase())
        );

        if (matchingProducts.length > 0) {
          this.searchResults = matchingProducts;

        } else {
          this.searchResults = [
            { name: "Product not found", image:"/images/Product Not Found.png"},
          ];
        }

        this.showAutocomplete = true;

      } else {
        this.showAutocomplete = false;
        this.searchResults = [];
      }
    },
    
    showMoreResults() {

    },

    handleSearch() {
      const searchTerm = this.searchInput.trim();
      console.log(this.getItems)
      if (searchTerm) {
        const matchingProducts = this.getItems.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (matchingProducts.length > 0) {
          this.searchResults = matchingProducts;

        } else {
          this.searchResults = [
            { item_name: "Product not found", item_image: "path/to/notfound.jpg" },
          ];
        }
        this.showAutocomplete = true;

      } else {
        this.showAutocomplete = false;
        this.searchResults = [];
      }
    },
    },
}

</script>


<style scoped>

/*To remove the outline color when searching*/

input:focus{
    outline: none;
}   

/*Search Bar*/

.searchBar{
    position: relative;
    outline: none;
    width: 40%;
    margin-left: auto;
    outline: none;
}

.searchBar form{
    position: relative;
    display: flex;
    font-size: 1.1rem;
    height: 40px;
    outline: 0;
    width: 100%;
    
}

.searchBar button{
    border-bottom-left-radius: 8px;
    border-top-left-radius: 8px;
    border-width: 0;
    cursor: pointer;
    display: inline-block;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    list-style: none;
    margin: 0;
    padding: 10px 12px;
    text-align: center;
    transition: all 200ms;
    vertical-align: baseline;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    background-color: rgb(213, 200, 188);
    border: 1px solid white;
    border-right: none;
}
  

.searchBar input{
    width: 100%;
    padding: 10px 12px;
    z-index: 3;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-width: 0;
    display: inline-block;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    list-style: none;
    margin: 0;
    padding: 10px 12px;
    transition: all 200ms;
    vertical-align: baseline;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    background-color: rgb(248, 246, 244); 
    color: black;
    border: 1px solid white;
    border-left: none;
}

.searchBar ul {
    z-index: 5;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 100;
    background-color: rgb(204, 197, 185);
    width: 100%;
    border: 2px solid #ffffff;
    border-top: none;
    list-style-type: none;
    width: 97%;
}

.searchBar li {
    padding: 10px;
    cursor: pointer;
}

.searchBar li:hover {
    background-color: rgb(255, 252, 242);
    border-radius: 10px;
}

/*Autocomplete*/

.searchResultsWrapper {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    border-radius: 4px;
    padding-top: 4px;
    margin-left: 5px;
    max-height: 300px; 
    flex-direction: column;
    display: flex;
}

.searchResults {
    margin-top: 0;
    padding: 3px;
    border-radius: 10px;
}

.searchResults li {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.searchResults li a {
    text-decoration: none;
    color: inherit;
}

.searchResults img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
}

/*Responsive*/

@media screen and (max-width: 800px){   

.searchBar{
    margin: auto;
    margin-top: 30px;
    width: 80%;
}
}

</style>
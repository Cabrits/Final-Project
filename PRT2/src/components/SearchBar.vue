<template>

    <div class="searchBar" id="search">
        <form autocomplete="off" @submit.prevent="handleSearch">
            <button type="submit"><i class="fa fa-search" aria-hidden="true"></i></button>
            <input ref="searchInput" type="text" placeholder="Search Product..." name="search" v-model="searchInput" @input="handleInput"/>
            <div class="searchResultsWrapper">
                <ul class="searchResults" v-if="showAutocomplete">
                    <li v-for="(result, index) in getLimitedResults" :key="result.name" >
                        <img :src="result.image" :alt="result.name" />
                        <span>{{ result.name }}</span>
                    </li>
                    <li v-if="searchResults.length > maxResults">
                        <button @click="showMoreResults">Show More</button>
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
    methods: {

    handleInput() {
      if (this.searchInput.length > 0) {
        const products = [
          { name: "Sony Camera", image: "/images/product1.jpg"},
          { name: "Bose Headphones", image: "/images/product2.jpg"},
          { name: "Video Kit", image: "/images/product3.jpg"},
        ]; 

        const matchingProducts = products.filter((product) =>
          product.name.toLowerCase().includes(this.searchInput.toLowerCase())
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
      if (searchTerm) {
        const matchingProducts = [
          { name: "Product 1", image: "/images/product1.jpg" },
        ].filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (matchingProducts.length > 0) {
          this.searchResults = matchingProducts;

        } else {
          this.searchResults = [
            { name: "Product not found", image: "path/to/notfound.jpg" },
          ];
        }
        this.showAutocomplete = true;

      } else {
        this.showAutocomplete = false;
        this.searchResults = [];
      }
    },
    },

    computed: {
    getLimitedResults() {
      return this.searchResults.slice(0, this.maxResults);
    },
    },
}

</script>


<style scoped>

input:focus{
    outline: none;
}   

.searchBar{
    position: relative;
    outline: none;
    width: 40%;
    margin-left: auto;
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
    background-color: rgb(149, 161, 132);
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
    background-color: rgb(165, 176, 147); 
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
    background-color: #fff;
    width: 100%;
    border: 1px solid #ccc;
    border-top: none;
    list-style-type: none;
    width: 97%;
}

.searchBar li {
    padding: 10px;
    cursor: pointer;
}

.searchBar li:hover {
    background-color: #f2f2f2;
    border-radius: 10px;
}

.searchResultsWrapper {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    border-radius: 4px;
    padding: 10px;
    max-height: 300px; 
    flex-direction: column;
    display: flex;
}

.searchResults {
    margin: 0;
    padding: 0;
    border-radius: 10px;
}

.searchResults li {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.searchResults img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
}

@media screen and (max-width: 800px){   

.searchBar{
    margin: auto;
    margin-top: 30px;
    width: 80%;
}
}





</style>
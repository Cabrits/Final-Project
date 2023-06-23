<!--Search bar located on the Header, that contains a autocomplete for the item search-->

<template>
  <!--Overall Search Bar-->

  <div class="searchBar" id="search">
    <form autocomplete="off" @submit.prevent="handleSearch">
      <!--Search button and input-->

      <button type="submit">
        <i class="fa fa-search" aria-hidden="true"></i>
      </button>
      <input
        ref="searchInput"
        type="text"
        placeholder="Search Product..."
        name="search"
        v-model="searchInput"
        @input="handleInput"
      />

      <!--Autocomplete with the item searched-->

      <div class="searchResultsWrapper">
        <ul class="searchResults" v-if="showAutocomplete">
          <li
            v-for="(result, index) in getLimitedResults"
            :key="result.item_name"
          >
            <router-link
              :to="'/item/' + result.item_id"
              @click="clearSearchBar"
            >
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
import { mapState } from "vuex";
export default {
  name: "SearchBar",

  //  Data for the component (show autocomplete, search results, max results and search input)
  data() {
    return {
      showAutocomplete: false,
      searchResults: [],
      maxResults: 4,
      searchInput: "",
    };
  },

  //  Map items state (items)
  computed: {
    ...mapState("items", ["items"]),

    // Get the items that match the search input with a limit of 4
    getLimitedResults() {
      return this.searchResults.slice(0, this.maxResults);
    },
  },

  //  Methods for the component (handle input, clear search bar, handle search)
  methods: {
    //  Function that handles the input of the user
    handleInput() {
      //  If the input is not empty, search for the items that match the input
      if (this.searchInput.length > 0) {
        //  Filter the items that match the input
        const matchingProducts = this.items.filter((item) =>
          item.item_name.toLowerCase().includes(this.searchInput.toLowerCase())
        );
        //  If there are matching items, show them
        if (matchingProducts.length > 0) {
          this.searchResults = matchingProducts;
        } else {
          //  If there are no matching items, show product not found item
          this.searchResults = [
            {
              item_name: "Product not found",
              item_image: "src/assets/ProductNotFound.jpg",
            },
          ];
        }
        //  Show the autocomplete
        this.showAutocomplete = true;
      } else {
        //  If the input is empty, hide the autocomplete
        this.showAutocomplete = false;
        this.searchResults = [];
      }
    },

    //  Function that clears the search bar
    clearSearchBar() {
      this.searchInput = "";
      this.showAutocomplete = false;
      this.searchResults = [];
    },

    //  Function that handles the search
    handleSearch() {
      //  If the input is not empty, search for the items that match the input
      const searchTerm = this.searchInput.trim();
      //  Filter the items that match the input
      if (searchTerm) {
        const matchingProducts = this.getItems.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        //  If there are matching items, show them
        if (matchingProducts.length > 0) {
          this.searchResults = matchingProducts;
        } else {
          //  If there are no matching items, show product not found item
          this.searchResults = [
            {
              item_name: "Product not found",
              item_image: "src/assets/ProductNotFound.jpg",
            },
          ];
        }
        //  Show the autocomplete
        this.showAutocomplete = true;
      } else {
        //  If the input is empty, hide the autocomplete
        this.showAutocomplete = false;
        this.searchResults = [];
      }
    },
  },
};
</script>

<style scoped>
/*To remove the outline color when searching*/

input:focus {
  outline: none;
}

/*Search Bar*/

.searchBar {
  position: relative;
  outline: none;
  width: 40%;
  margin-left: auto;
  outline: none;
}

.searchBar form {
  position: relative;
  display: flex;
  font-size: 1.1rem;
  height: 40px;
  outline: 0;
  width: 100%;
}

.searchBar button {
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

.searchBar input {
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

@media screen and (max-width: 800px) {
  .searchBar {
    margin: auto;
    margin-top: 30px;
    width: 80%;
  }
}
</style>

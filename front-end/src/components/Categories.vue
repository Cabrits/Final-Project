<!--Button to choose which product genre the user wants-->

<template>

  <div class="categories leftRightAuto">
    <div class="subCat" @click="resetCategory()">  
        <span class="inner"></span>
        <i>All</i>
    </div>
    <div class="subCat" v-for="category in categories" :key="category.id" :class="{ active: category === selectedCategory }" @click="selectCategory(category)">  
        <span class="inner"></span>
        <i :class="category.icon" aria-hidden="true"></i>
        <p class="categoryName">{{ category.name }}</p>
    </div>
  </div>

</template>

<script>

export default{
  name: 'Categories',

  data() {
    return {
      categories: [
        { id: 1, name: 'Comedy', icon: 'fa fa-masks-theater'},
        { id: 2, name: 'Romance', icon: 'fa fa-heart'},
        { id: 3, name: 'Horror', icon: 'fa fa-ghost' },
        { id: 4, name: 'Action', icon: 'fa fa-hand-fist' },
      ],
      selectedCategory: null,
    };
  },

  methods: {
    selectCategory(category) {
      this.selectedCategory = category;
      this.$emit('category-selected', category.name);
    },

    resetCategory() {
      this.selectedCategory = null;
      this.$emit('category-selected', null);
    },
  },
};

</script>

<style scoped>

/*Responsive*/

.leftRightAuto{
    margin-left: auto;
    margin-right: auto;
}

/*Categories Buttons*/

.categories{
    padding-top: 3rem;
    width: 80%;
    height: auto;
    display: flex;
    justify-content: space-between;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.subCat{
    display: inline-block;
    font-size: 2em;
    line-height: 80px;
    position: relative;
    text-align: center;
    border-radius: 50%;
    background-color: rgb(255, 255, 255);
    color: rgb(76, 75, 75);
    display: block;
    height: 80px;
    position: relative;
    width: 80px;
    border-radius: 50%;
    transition: 0.1s;
    box-shadow: 9px 5px rgba(50, 50, 50, 0.8);
    -moz-box-shadow: 9px 5px rgba(50, 50, 50, 0.8);
    -webkit-box-shadow: 9px 5px rgba(50, 50, 50, 0.8);
    -o-box-shadow: 9px 5px rgba(50, 50, 50, 0.8);
    border: 1px solid rgb(104, 95, 76);
    
}

.subCat .inner{
    background-color: rgb(64, 61, 57);
    display: block;
    height: 0;
    width: 0;
    left: 50%;
    top: 50%;
    margin: 0;
    position: absolute;
    border-radius: 50%;
    transition: 0.25s;
}

.subCat .inner i{
    position: relative;
    transition: color 0.2s;
}

.subCat:hover,
.subCat.active{
    color: white;
    z-index: 3;
}


.subCat:hover .inner,
.subCat.active .inner{
    height: 76px;
    margin-left: -38px;
    margin-top: -38px;
    width: 76px;
    z-index: -1;
}

.categoryName{
  font-size: 20px;
  line-height: 5px;
  font-weight: bold;
  color: rgb(64, 61, 57);
}

/*Responsive*/

@media screen and (max-width: 800px){
  .categories{
      width: 100%;
  }


  .subCat.active{
      z-index: 0;
  }
}

@media screen and (max-width: 500px){
  .categories{
      width: 100%;
  }

  .subCat{
    width: 60px;
    height: 60px;
    font-size: 1.5em;
    line-height: 65px;
  }

  .subCat:hover .inner,
  .subCat.active .inner{
      height: 56px;
      margin-left: -28px;
      margin-top: -28px;
      width: 56px;
      z-index: -1;
  }

  .categoryName{
      font-size: 15px;
      font-weight: bold;
      margin-top: 10px;
      color: rgb(64, 61, 57);
  }

  .subCat.active{
      z-index: 0;
  }
}

</style>

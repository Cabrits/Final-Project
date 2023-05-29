<template> 
    <div class="categories leftRightAuto">
        <div class="subCat" v-for="category in categories" :key="category.id" @click="selectCategory(category)">
            <span class="inner"></span>
            <i :class="category.icon" aria-hidden="true" ></i>
        </div>
    </div>
</template> 

<script>

export default {
  name: 'Categories',
  data() {
    return {
      categories: [
        { id: 1, name: null ,icon:'fa fa-shower' },
        { id: 2, name: 'category2' ,icon:'fa fa-superpowers' },
        { id: 3, name: 'category3' ,icon:'fa fa-apple' },
        { id: 4, name: 'category4' ,icon:'fa fa-bicycle' },
        { id: 5, name: 'category5' ,icon:'fa fa-shower' },
        // Add more categories as needed
      ],
    };
  },
  methods: {
    selectCategory(category) {
      this.$emit('category-selected', category.name);
    },
  },
};

</script>

<style scoped>

.categories{
    margin-top: 4rem;
    width: 80%;
    height: auto;
    margin-left: 10%;
    display: flex;
    justify-content: space-between;
}

.leftRightAuto{
    margin-left: auto;
    margin-right: auto;
}

.categories .subCat{
    display: inline-block;
    font-size: 2em;
    line-height: 80px;
    position: relative;
    text-align: center;
    box-shadow: 10px 8px  rgba(50, 50, 50, 0.2);
    -moz-box-shadow: 10px 8px  rgba(50, 50, 50, 0.2);
    -webkit-box-shadow: 10px 8px  rgba(50, 50, 50, 0.2);
    -o-box-shadow: 10px 8px  rgba(50, 50, 50, 0.2);
    border-radius:50%;
}

.subCat {
    background-color: #fff;
    color: rgb(204, 221, 108);;
    display: block;
    height: 80px;
    position: relative;
    width: 80px;
    border-radius: 50%;
    transition: 0.1s;
}

.subCat i{
    position: relative;
    z-index: 1;
    border-color: black;
}

.subCat .inner{
    background-color: rgb(185, 188, 159);
    display: block;
    height: 0;
    left: 50%;
    margin: 0;
    position: absolute;
    top: 50%;
    width: 0;
    border-radius: 50%;
    transition: 0.1s;
}

.subCat:hover{
    color: #fff;
}

.subCat:hover .inner{
    height: 76px;
    margin-left: -38px;
    margin-top: -38px;
    width: 76px;
}

</style>
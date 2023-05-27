<template> 
    <div class="categories leftRightAuto">
        <div class="subCat">
            <a href="#">
            <span class="inner"></span>
            <i class="fa fa-shower" aria-hidden="true"></i>
            </a>
        </div>
        <div class="subCat">
            <a href="#">
            <span class="inner"></span>
            <i class="fa fa-superpowers" aria-hidden="true"></i>
            </a>
        </div>
        <div class="subCat">
            <a href="#">
            <span class="inner"></span>
            <i class="fa fa-apple" aria-hidden="true"></i>
            </a>
        </div>
        <div class="subCat">
            <a href="#">
            <span class="inner"></span>
            <i class="fa fa-bicycle" aria-hidden="true"></i>
            </a>
        </div>
        <div class="subCat">
            <a href="#">
            <span class="inner"></span>
            <i class="fa fa-coffee" aria-hidden="true"></i>
            </a>
        </div>
    </div>
</template> 

<script>

export default{
    name:'Categories',
}

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

.subCat a{
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

.subCat a:hover{
    color: #fff;
}

.subCat a:hover .inner{
    height: 76px;
    margin-left: -38px;
    margin-top: -38px;
    width: 76px;
}

</style>
<template>
    <RouterView></RouterView>
  </template>
  
<script setup>
    import { useRouter } from 'vue-router';
    import { onMounted, ref} from "vue";
    const router = useRouter();
    
</script>
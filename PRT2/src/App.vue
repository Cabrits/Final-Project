<template>
    <RouterView></RouterView>
</template>
  
<script setup>
    import { useRouter } from 'vue-router';
    import { onMounted, ref} from "vue";
    const router = useRouter();
    
</script>

<style>
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background-color: rgb(224, 228, 193); 
}

::-webkit-scrollbar-thumb {
  background-color: #888; 
  border-radius: 10px; 
}

::-webkit-scrollbar-thumb:hover {
  background-color: #555; 
}

::-webkit-scrollbar-corner {
  background-color: #f1f1f1; 
  height: 53.3049px; 
  transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 295.372, 0, 1);
 }
</style>
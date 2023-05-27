
<template>
    <RouterView></RouterView>
</template>

<script setup>

import { useRouter } from 'vue-router';
import { onMounted, ref} from "vue";
/*import { getAuth, onAuthStateChanged, signOut} from "@firebase/auth"; */

const router = useRouter();

</script>
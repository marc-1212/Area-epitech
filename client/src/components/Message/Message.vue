<template>
    <p class="from">{{ this.from }}</p>
    <p class="message">{{ this.message }}</p>
</template>
    
<script lang="js">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'MessageComponent',
    data() {
        return {
        };
    },
    props: {
        message: String,
        from: String
    },
    methods: {
    },
    created() {
    }
})
</script>
      
<style>
    .from {
        font-weight: bold;
        margin-left: 50px;
        font-size: 15px;
    }
    .message {
        margin-left: 15px;
    }
</style>
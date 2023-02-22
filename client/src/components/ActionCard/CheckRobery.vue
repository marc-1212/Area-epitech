<template>
    <div class="input-container">
        <button @click="action" :style="{marginTop: '113px'}" class="area-button">SAVE</button>
    </div>
</template>
    
<script lang="js">
import { defineComponent } from 'vue';
import dropdown from '../../assets/dropdown.png';
import { updateCardsAction } from '../../actioncardServices.js';

export default defineComponent({
    name: 'CheckRobery',
    data() {
        return {
            localId: null
        };
    },
    props: {
        id: Number,
    },
    methods: {
        action() {
            console.log(localStorage.getItem('userId'));
            console.log(this.localId);
            updateCardsAction('Football', 'checkRobery', '', '', this.localId, localStorage.getItem("userId")).then((res) => {
                console.log(res);
            })
        }
    },
    created() {
        this.localId = this.id;
    }
})
</script>
      
<style>
.area-input {
    text-align: center;
    border: 1px solid black;
    border-radius: 2px;
    margin: 0.25em 0;
}

.input-container {
    display: flex;
    flex-direction: column;
}
</style>
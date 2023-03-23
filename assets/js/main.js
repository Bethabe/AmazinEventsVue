
const { createApp } = Vue

createApp({
    data(){
        return{
        arrayOriginal:[],
        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then(rps =>rps.json())
        .then(data => this.arrayOriginal == data)
        console.log(data);

    }
}).mount("#app")
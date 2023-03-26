const { createApp } = Vue
const url = "https://mindhub-xj03.onrender.com/api/amazing"
// 'https://fakestoreapi.com/products'


console.log(Vue);
createApp({
    data(){
        return{
        arrayOriginal: [],
        arrayCategorias:[],
        textoBusqueda:"",
        arrayFiltroTexto:[],
        arraySeleccionSelectores:[],
        personajesFiltrados:[],
        elemento:[],
        arrayUpcoming:[],
        arrayPast:[]
        }
    },
    created(){
        fetch(url)
        .then(rps =>rps.json())
        .then(data =>{
            this.arrayOriginal = data.events
            this.arrayUpcoming = data.events.filter(obj => obj.date > data.currentDate)
            this.arrayPast = data.events.filter(obj => obj.date < data.currentDate)

            console.log(this.arrayUpcoming)
            console.log(this.arrayPast)
            console.log(this.arrayOriginal)
            if(document.title.includes("Details")){
                let loc = location.search 
                let params = new URLSearchParams(loc)
                const id = params.get('id')
                this.elemento = this.arrayOriginal.filter(obj => obj._id == id)
                console.log(this.elemento)
            }else if(document.title.includes("Upcoming")||document.title.includes("Past") || document.title.includes("Amazing Events") ){
                this.arrayCategorias = [...new Set( this.arrayOriginal.filter(el => el.category).map(x => x.category))]
                console.log(this.arrayCategorias)
            }
        })
    },
    computed:{
        // filtrarInput: function filtrarTexto (){
         
    //    [...this.arrayFiltroTexto] = this.arrayOriginal.filter(obj => obj.name.toLowerCase().includes(this.textoBusqueda.toLowerCase()))
    //    console.log(this.arrayFiltroTexto)
    //     },

    //     filtrarSeleccion: function filtrarSeleccion(){
    //         console.log(this.arrayOriginal.filter(obj => this.arraySeleccionSelectores.includes(obj.category)))
    //     },
    filtrosCruzadosUpcoming: function filtrosCruzados(){
        this.personajesFiltrados = this.arrayUpcoming.filter(obj => 
            {return obj.name.toLowerCase().includes(this.textoBusqueda.toLowerCase()) && (this.arraySeleccionSelectores.includes(obj.category) || this.arraySeleccionSelectores.length == 0)}) 
       
     },
    filtrosCruzadosPast: function filtrosCruzados(){
        this.personajesFiltrados = this.arrayPast.filter(obj => 
            {return obj.name.toLowerCase().includes(this.textoBusqueda.toLowerCase()) && (this.arraySeleccionSelectores.includes(obj.category) || this.arraySeleccionSelectores.length == 0)}) 
       
     },
        filtrosCruzados: function filtrosCruzados(){
           this.personajesFiltrados = this.arrayOriginal.filter(obj => 
               {return obj.name.toLowerCase().includes(this.textoBusqueda.toLowerCase()) && (this.arraySeleccionSelectores.includes(obj.category) || this.arraySeleccionSelectores.length == 0)}) 
          
        }
    }
}).mount('#app')
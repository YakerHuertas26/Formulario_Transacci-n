import validarCantidad from "./validaciones";


const darFormato=new Intl.NumberFormat('es-PE',{style:'currency',currency:'PEN'});
const formulario= document.getElementById('formulario');
const cantidad= formulario.querySelector('#cantidad');


// agregó un evento al momento que dejo de escribir
cantidad.addEventListener('keyup',(e)=>{
    if (cantidad.id==='cantidad') {
        validarCantidad();
    }
})


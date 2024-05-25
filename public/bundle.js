'use strict';

const formulario$1= document.getElementById('formulario');
const cantidad$1= formulario$1.querySelector('#cantidad');
// dar formato a la moneda;


const validarCantidad= ()=>{
    const expRegCantidad= /^\d+(\.\d+)?$/;
    if (expRegCantidad.test(cantidad$1.value)) {
        cantidad$1.classList.remove('formulario__input--error');
        
    }
    else {
        cantidad$1.classList.add('formulario__input--error'); 
    } 
};

const formulario= document.getElementById('formulario');
const cantidad= formulario.querySelector('#cantidad');


// agregó un evento al momento que dejo de escribir
cantidad.addEventListener('keyup',(e)=>{
    if (cantidad.id==='cantidad') {
        validarCantidad();
    }
});

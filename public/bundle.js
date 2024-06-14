'use strict';

const formulario$2= document.getElementById('formulario');
const cantidad$1= formulario$2.querySelector('#cantidad');
// dar formato a la moneda;


const validarCantidad= ()=>{
    const expRegCantidad= /^\d+(\.\d+)?$/;
    if (expRegCantidad.test(cantidad$1.value)) {
        cantidad$1.classList.remove('formulario__input--error');
        return true;
    }
    else {
        cantidad$1.classList.add('formulario__input--error'); 
        return false;
    } 
};

const formulario$1= document.getElementById('formulario');


const confirmarPaso= (pasoActual)=>{
    // agrego la clase paso checked
    const paso= formulario$1.querySelector(`.linea-pasos [data-paso="${pasoActual}"] span`);
    paso.classList.add('linea-pasos__paso-check--checked');
    
};

const formulario= document.getElementById('formulario');
const cantidad= formulario.querySelector('#cantidad');
const btnSiguiente= formulario.querySelector('#formulario__btn');


// agregó un evento al momento que dejo de escribir
cantidad.addEventListener('keyup',(e)=>{
    if (cantidad.id==='cantidad') {
        validarCantidad();
    }
});

// Agregar un evento al momento de dar btn siguiente
btnSiguiente.addEventListener('click',(e)=>{
    e.preventDefault();
    
    // obtengo el paso actual
    let pasoActual= formulario.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso').dataset.paso;

    console.log(pasoActual);
    // si el paso es cantidad, valido si la cantidad es la correcta antes de dar a siguiente
    if (pasoActual==='cantidad') {
        
    // si la validadación es correcta 
        if (validarCantidad()) {
        // el paso validad se confirma mediante una función 
        confirmarPaso("cantidad");
        
        }
    }
});

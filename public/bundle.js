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

const pasoSiguiente= ()=>{
    // convierto y obtengo a lista los posos
    const listPasos= [...document.querySelectorAll('.linea-pasos__paso')];

    // obtengo paso actual
    let pasoActual= document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso');
    
    // capturo cual es el index de mi paso actual con respecto a la lista de pasos
    let indexPaso= listPasos.indexOf(pasoActual);
    
    // condiciono que el index sean menor que la longitud del array => 3
    if (indexPaso< listPasos.length-1) {
        
        // remuevo la clase activo del paso actual
        pasoActual.querySelector('span').classList.remove('linea-pasos__paso-check--active');

        // el siguiente paso lo activo con la clase active
        listPasos[indexPaso+1].querySelector('span').classList.add('linea-pasos__paso-check--active');

        // pasar la pantalla
        const idSiguiente= listPasos[indexPaso+1].dataset.paso;
            // acceder a la sección de datos
            // con ScroolIntoView me va permitir mostrar o desplazar la sección siguiente
            document.querySelector(`.formulario__body [data-paso='${idSiguiente}']`).scrollIntoView({
                inline:'start',
                behavior:'smooth',
            });
        
    }
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

    
    // si el paso es cantidad, valido si la cantidad es la correcta antes de dar a siguiente
    if (pasoActual==='cantidad') {
 
        if (validarCantidad()) {
        
        //si la validadación es correcta, el paso validad se confirma mediante una función 
        confirmarPaso("cantidad");
        
        //pasar al siguiente paso 
        pasoSiguiente();

        
        }
    }
});

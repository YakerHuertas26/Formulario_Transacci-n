'use strict';

const formulario$2= document.getElementById('formulario');
const cantidad= formulario$2.querySelector('#cantidad');
// dar formato a la moneda;


const validarCantidad= ()=>{
    // expresión regular que admite numero y  un punto
    const expRegCantidad= /^\d+(\.\d+)?$/;
    if (expRegCantidad.test(cantidad.value)) {
        cantidad.classList.remove('formulario__input--error');
        return true;
    }
    else {
        cantidad.classList.add('formulario__input--error'); 
        return false;
    } 
};

// función para validar nombre
const validarNombre= ()=>{
    const inputNombre= formulario$2['nombre-receptor'];
    const expRegNombre= /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
    if (expRegNombre.test(inputNombre.value)) {
        inputNombre.classList.remove('formulario__input--error');
        return true;
    }
    else {
        inputNombre.classList.add('formulario__input--error'); 
        return false;
        
    } 
};

const validarCorreo= ()=>{
    const inputCorre= formulario$2['correo-receptor'];
    const expRegNombre= /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (expRegNombre.test(inputCorre.value)) {
        inputCorre.classList.remove('formulario__input--error');
        return true;
    }
    else {
        inputCorre.classList.add('formulario__input--error'); 
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
const btnSiguiente= formulario.querySelector('#formulario__btn');


// siempre que se cargue el scrool este en la sección cero
// document.querySelector('.formulario_body').scrollLeft= 0;


// agregó un evento al momento que dejo de escribir
formulario.addEventListener('keyup',(e)=>{
    if (e.target.id==='cantidad') {
        validarCantidad();
    }
    else if(e.target.id==='nombre-receptor'){
        validarNombre();
    }
    else if (e.target.id==='correo-receptor') {
        validarCorreo();
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
    else if (pasoActual==='datos') {
        if (validarNombre() && validarCorreo() ) {
            confirmarPaso('datos');
            pasoSiguiente();
        }
    }
    else if (pasoActual==='metodo') {
        confirmarPaso('metodo');
        const cantidad= (document.querySelector('.formulario__parrafos [data-valor="cantidad"] span'));
        const nombre= document.querySelector('.formulario__parrafos [data-valor="nombre-receptor"] span') ;
        const correo= document.querySelector('.formulario__parrafos [data-valor="correo-receptor"] span') ;
        const metodo= document.querySelector('.formulario__parrafos [data-valor="metodo"] span'); 
        
        // dar formato a mi cantidad
        const opcion = {style: 'currency', currency: 'PEN'};
        const formatoMoneda= new Intl.NumberFormat('es-PE', opcion);

        cantidad.innerText = formatoMoneda.format(formulario['cantidad'].value);
        nombre.innerText= formulario['nombre-receptor'].value;
        correo.innerText= formulario['correo-receptor'].value;
        metodo.innerText= formulario.metodo.value;

        // cambiar el texto de siguiente a transferir
        btnSiguiente.querySelector('span').innerHTML='Transferir';
        
        // cambiar el icono de siguiente a banco
        btnSiguiente.querySelector('.formulario__btn-contenedor-icono').classList.remove('formulario__btn-contenedor-icono--active');
        btnSiguiente.querySelector('[data-icono="banco"]').classList.add('formulario__btn-contenedor-icono--active');
        
        // el boton lo inactivo
        btnSiguiente.classList.add('formulario__btn--disabled');
        
        pasoSiguiente();

        // despues de 4 segundos lo activo nuevamente
        setTimeout(()=>{
            btnSiguiente.classList.remove('formulario__btn--disabled');
        },4000);

    }
    
    // condiciono para que pasen los 4 segundos con la función maches 
    else if(pasoActual=='confirmacion' && !btnSiguiente.matches('.formulario__btn--disabled')){
        // el boton lo inactivo
        btnSiguiente.classList.add('formulario__btn--disabled');

        // cambio a transfiriendo
        btnSiguiente.querySelector('span').innerText='transfiriendo...';
        
        // luego de 4 segundos
        setTimeout(()=>{
            btnSiguiente.classList.remove('formulario__btn--disabled');
            document.querySelector('.formulario').classList.add('formulario--hidden');
            document.querySelector('.alerta').classList.add('alerta--active');
        },4000);

    }
});

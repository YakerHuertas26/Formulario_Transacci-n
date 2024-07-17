import { validarCantidad, validarNombre, validarCorreo } from "./validaciones";
import confirmarPaso from "./confirmarPaso";
import pasoSiguiente from "./PasoSiguiente";

const formulario= document.getElementById('formulario');
const btnSiguiente= formulario.querySelector('#formulario__btn')


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
            confirmarPaso('datos')
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

// Agrego un evento al hacer click en la linea de pasos
const pasoSeleccioando= document.querySelector('.linea-pasos');

pasoSeleccioando.addEventListener('click',(e)=>{
    if (!e.target.closest('.linea-pasos__paso')) return;
        let pasoActual= document.querySelector('.linea-pasos__paso-check--active').closest('.linea-pasos__paso').dataset.paso;

        if (pasoActual==='cantidad') {
            if (!validarCantidad())return false;
            
        }
        else if(pasoActual==='datos'){
            if (!validarNombre() || !validarCorreo()) return false;
        }

        btnSiguiente.querySelector('span').innerText='Siguiente';
        btnSiguiente.querySelector('[data-icono="banco"]').classList.remove('formulario__btn-contenedor-icono--active');


        btnSiguiente.querySelector('[data-icono="siguiente"]').classList.add('formulario__btn-contenedor-icono--active');

        btnSiguiente.classList.remove('formulario__btn--disabled');

        // regresión a anterior sección 
        const PasoANavegar= e.target.closest('.linea-pasos__paso');
        if (PasoANavegar.querySelector('.linea-pasos__paso-check--checked')) {
                let pasoEditarID= e.target.closest('.linea-pasos__paso').dataset.paso;

                let pasoActualCambioIcono=document.querySelector('.linea-pasos__paso-check--active');
                pasoActualCambioIcono.classList.remove('linea-pasos__paso-check--active');


                pasoSeleccioando.querySelector(`[data-paso="${pasoEditarID}"] span`).classList.add('linea-pasos__paso-check--active');
                console.log('ya pudes editar');

                document.querySelector(`.formulario__body [data-paso="${pasoEditarID}"]`).scrollIntoView({
                    inline:'start',
                    behavior:'smooth'
                });

                
        };
        
        

});
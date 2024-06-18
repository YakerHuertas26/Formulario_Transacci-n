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
        pasoSiguiente();
    }
});


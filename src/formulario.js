import validarCantidad from "./validaciones";
import confirmarPaso from "./confirmarPaso";

const formulario= document.getElementById('formulario');
const cantidad= formulario.querySelector('#cantidad');
const btnSiguiente= formulario.querySelector('#formulario__btn')


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


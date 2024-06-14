const formulario= document.getElementById('formulario');
const cantidad= formulario.querySelector('#cantidad');
// dar formato a la moneda;


const validarCantidad= ()=>{
    const expRegCantidad= /^\d+(\.\d+)?$/;
    if (expRegCantidad.test(cantidad.value)) {
        cantidad.classList.remove('formulario__input--error');
        return true;
    }
    else{
        cantidad.classList.add('formulario__input--error'); 
        return false;
    } 
}


export default validarCantidad;
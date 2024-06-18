const formulario= document.getElementById('formulario');
const cantidad= formulario.querySelector('#cantidad');
// dar formato a la moneda;


const validarCantidad= ()=>{
    // expresión regular que admite numero y  un punto
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

// función para validar nombre
const validarNombre= ()=>{
    const inputNombre= formulario['nombre-receptor'];
    const expRegNombre= /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
    if (expRegNombre.test(inputNombre.value)) {
        inputNombre.classList.remove('formulario__input--error');
        return true;
    }
    else{
        inputNombre.classList.add('formulario__input--error'); 
        return false;
        
    } 
};

const validarCorreo= ()=>{
    const inputCorre= formulario['correo-receptor'];
    const expRegNombre= /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (expRegNombre.test(inputCorre.value)) {
        inputCorre.classList.remove('formulario__input--error');
        return true;
    }
    else{
        inputCorre.classList.add('formulario__input--error'); 
        return false;
        
    } 
};


export {validarCantidad, validarNombre, validarCorreo};
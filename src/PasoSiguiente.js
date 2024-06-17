
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
}

export default pasoSiguiente;
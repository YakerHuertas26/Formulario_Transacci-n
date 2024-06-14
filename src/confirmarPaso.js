const formulario= document.getElementById('formulario');


const confirmarPaso= (pasoActual)=>{
    // agrego la clase paso checked
    const paso= formulario.querySelector(`.linea-pasos [data-paso="${pasoActual}"] span`);
    paso.classList.add('linea-pasos__paso-check--checked')
    
};
export default confirmarPaso;
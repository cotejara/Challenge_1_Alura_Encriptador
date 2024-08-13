
var mensaje2 = document.querySelector(".div_mensaje2_section2");
var resultado = document.querySelector(".texto-resultado");
var texto =  document.querySelector(".ingresetext");
var botoncopiar = document.querySelector(".div-copiar");
var mono_div =document.querySelector(".muñeco_div"); 

botoncopiar.classList.add("ocultar");

function Desencripta(frase) {
    let matrizCodigo = [["enter","e"], ["imes","i"], ["ai","a"], ["ober","o"], ["ufat","u"]];

    frase = frase.toLowerCase();
    for (var i = 0; i < matrizCodigo.length; i++) {
        if (frase.includes(matrizCodigo[i][0])) {
            frase = frase.replaceAll((matrizCodigo[i][0]), matrizCodigo[i][1] )
        }
    }
    return frase;
}

function remplaza_vocal_encript(vocal) {
/*         La letra "e" es convertida para "enter"
    La letra "i" es convertida para "imes"
    La letra "a" es convertida para "ai"
    La letra "o" es convertida para "ober"
    La letra "u" es convertida para "ufat" */

    if (vocal == "a") {
        return "ai"
    }
    else if (vocal == "e") {
        return "enter"
    }
    else if (vocal == "i") {
        return "imes"
    }
    else if (vocal == "o") {
        return "ober"
    }   
    else if (vocal == "u") {
        return"ufat" 
    }  
    else {
        return vocal
    }                        
}


function obtiene_texto(){   
    if (texto.value.length > 0) {     
        var letra = texto.value.toLowerCase();
        if (VerificaAcentos(letra)) {
            ocultarSeccion2();
            var mensaje="";
            for (x=0;x<= (letra.length-1); x++) {
                mensaje= mensaje + remplaza_vocal_encript(letra[x]);
            }
            console.log(mensaje)
            resultado.textContent = mensaje;
            texto.value = '';
        }
    }
    else {        
        ejecutarAccion('Atención: ¡Ingrese un texto para Encriptar!!');
    }
    
}

function desencripta_texto(){
    var vartexto =  document.querySelector(".ingresetext");
    if (VerificaAcentos(vartexto.value)) {
            if (vartexto.value.length > 0) {
                var textodesencriptado = Desencripta(vartexto.value);
                ocultarSeccion2();
                resultado.textContent = textodesencriptado;
                vartexto.value='';
            }
            else {                
                ejecutarAccion('Atención: ¡No hay texto para desencriptar!!');
            }
    }

}

function ocultarSeccion2(){    
    resultado.style.backgroundImage = 'none';
    mensaje2.classList.add("ocultar");
    botoncopiar.classList.remove("ocultar");
}

function MostrarSeccion2(){    
    resultado.style.backgroundImage = 'url("/imagenes/Muñeco.png")';    
    mensaje2.classList.remove("ocultar");
    botoncopiar.classList.add("ocultar");

}

function copytext(){
    var text = resultado.textContent;
    texto.value = text;
    ejecutarAccion('¡Texto Copiado!!');
    text.value = '';
    resultado.textContent = '';
    MostrarSeccion2();
}

function limpia_texto(){
    texto.value = '';
    resultado.textContent = '';
    MostrarSeccion2();
}

function VerificaAcentos(cadena){
    const acentos = ['á','é','í','ó','ú','Á','É','Í','Ó','Ú','´'];
    for (var i = 0; i < acentos.length; i++) {
        console.log(acentos[i]);
            if (cadena.includes(acentos[i])) {
                ejecutarAccion('Error detectado: ¡Ingrese texto sin acento!!');
                return false;
                break;
            }
        }
    return true;
}


function ejecutarAccion(mensaje_error) {
    try {
        throw new Error(mensaje_error);
        // Código normal que se ejecutaría si no hay errores
        console.log("Todo va bien");

    } catch (error) {
        // Mostrar el mensaje de error en la ventana emergente personalizada
        document.getElementById("popup-message").textContent = error.message;
        document.getElementById("overlay").style.display = "block";
        document.getElementById("popup").style.display = "block";
    }
}

function cerrarPopup() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("popup").style.display = "none";
}
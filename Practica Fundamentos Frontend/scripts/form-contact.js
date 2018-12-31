export class FormContact {
    constructor() {
        // elementos del DOM
        this.oFormContact =  document.querySelector('#contact')
        this.oInputName = document.querySelector('#name')
        this.oInputEmail = document.querySelector('#email')
        this.oInputPhone = document.querySelector('#phone')
        this.oTextMessage = document.querySelector('#message')
        this.oMensajeConocido = document.querySelector('#mensaje-conocido')
        this.oSelectSeleccion = document.querySelector('#selection')

        this.oData = {
            name: '',
            email: '',
            phone: '',
            message: '',
            conocido: '',
            seleccion: '',

        }

        this.validado = true;

        this.oFormContact.addEventListener('submit', this.leerContact.bind(this))
        this.oSelectSeleccion.addEventListener('change', this.displayMensajeConocido.bind(this))
        this.oTextMessage.addEventListener('input', this.contarPalabras.bind(this))
        this.oInputEmail.addEventListener('input', this.definirValidaciones.bind(this))

    }    
    leerContact(oE) {
        oE.preventDefault()
        if (this.validar()) {
            this.guardarDatos()
        }
    }

    guardarDatos() {
        this.oData = {
            name:  this.oInputName.value,
            email: this.oInputEmail.value ,
            phone: this.oInputPhone.value,
            message: this.oTextMessage.value,
            conocido: this.oMensajeConocido.value,
            seleccion: this.oSelectSeleccion.options[this.oSelectSeleccion.selectedIndex].value,
        }

    console.dir(this.oData)
    }

    processRadio(aNodos) {
        let value
        aNodos.forEach(
            (item) => {if(item.checked) {value = item.value}}
        )
        return value
    }

    definirValidaciones() {        
        if (this.oInputEmail.validity.typeMismatch) {
            this.oInputEmail.setCustomValidity("El e-mail no esta bien formado");
            this.validado = false
        } else {
            this.oInputEmail.setCustomValidity("");
        }
    }

    displayMensajeConocido(){
        console.log("Prueba:" + this.oSelectSeleccion.value)
        if (this.oSelectSeleccion.value == 'otros'){
            this.oMensajeConocido.style.display = 'block'
        }
        else {
            this.oMensajeConocido.style.display = 'none'
        }
    }

    contarPalabras(){
        console.log('Num: ' + this.oTextMessage.value.split(' ').length)
        if(this.oTextMessage.value.split(' ').length > 150){
            this.oTextMessage.setCustomValidity('Excedido el número máximo de palabras (150)')
            this.validado = false
        }
        else{
            this.oTextMessage.setCustomValidity("")
        }
    }

    validar(){
        return this.validado
    }

}
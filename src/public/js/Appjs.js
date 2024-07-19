document.addEventListener("DOMContentLoaded", function() {
    var inputs = document.querySelectorAll("input");
    inputs.forEach(function(input) {
        input.setAttribute("autocomplete", "off");
    });
});
/*AQUI EL  REGISTRO DE EMPRESAS*/
btnRegistro = document.querySelector('#registrarEmpresa');
btnCancelar = document.querySelector('#cancelarEmpresa');

txtrazonSocial=document.querySelector('#razonsocial');
txtCIF=document.querySelector('#CIF');
txtgrupoempresarial = document.querySelector('#grupoempresarial');
txtCNAE= document.querySelector('#CNAE');
txtdescripcionCNAE = document.querySelector('#descripcionCNAE');
txtciudad  = document.querySelector('#ciudad');
txtcodigopostal  = document.querySelector('#codigopostal');
txtdireccionempresa = document.querySelector('#direccionempresa');
txtencargado = document.querySelector('#encargado');
txtemailempresa  = document.querySelector('#emailempresa');
txtntrabajadoresempresa = document.querySelector('#ntrabajadoresempresa');
txttelefonoempresa = document.querySelector('#telefonoempresa');
txtmessage = document.querySelector('#message');
btnRegistro.addEventListener('click', ()=>{
    txtmessage.textContent='';
    if (txtrazonSocial.value != '' && txtCIF.value != '' && txtgrupoempresarial.value != '' && txtCNAE.value != '' && txtdescripcionCNAE.value != '' && txtciudad.value != '' && txtcodigopostal.value != '' && txtdireccionempresa.value != '' && txtencargado.value != ''  && txtemailempresa.value != '' && txtntrabajadoresempresa.value != '' && txttelefonoempresa.value != '')
    {
        const dataVerificar = {razonsocial:txtrazonSocial.value, CIF:txtCIF.value };        
        const data = {
            razonsocial:txtrazonSocial.value,
            CIF:txtCIF.value,
            grupoempresarial:txtgrupoempresarial.value,
            CNAE: txtCNAE.value,
            descripcionCNAE:txtdescripcionCNAE.value,
            ciudad: txtciudad.value,
            codigopostal:txtcodigopostal.value,
            direccionempresa:txtdireccionempresa.value,
            encargado: txtencargado.value,
            emailempresa:txtemailempresa.value,
            ntrabajadoresempresa:txtntrabajadoresempresa.value,
            telefonoempresa : txttelefonoempresa.value
            };   
            fetch('/verificarempresa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataVerificar)
            })
            .then(response => response.json())
            .then(dataVerificar => {
                if (dataVerificar.rowsAffected==0)
                {
                    //registrar empresa
                    fetch('/registrarempresa',{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body: JSON.stringify(data)
                    }).then(response=>response.json()).then(data=>{
                        limpiarRegistroEmpresa();
                        txtmessage.classList.remove('alert');
                        txtmessage.textContent =`SE REGISTRO CORRECTAMENTE A LA BASE DE DATOS`;
                        txtmessage.classList.add('confirm');
                        console.log(data);
                    }).catch((error) => {
                        console.error('Error:', error);
                    });
                    //registrar empresa
                }
                else
                {
                    txtmessage.classList.remove('confirm');
                    txtmessage.textContent =`LA EMPRESA YA SE ENCUENTRA REGISTRADA EN LA BASE DE DATOS`;
                    txtmessage.classList.add('alert');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
        });
    }
    else{
        txtmessage.classList.remove('confirm');
        txtmessage.textContent=`SE REQUIEREN DATOS PARA EL REGISTRO`;
        txtmessage.classList.add('alert');
    }
    
    
});
btnCancelar.addEventListener('click',limpiarRegistroEmpresa);
function limpiarRegistroEmpresa(){
    txtrazonSocial.value='';
    txtCIF.value='';
    txtgrupoempresarial.value='';
    txtCNAE.value='';
    txtdescripcionCNAE.value='';
    txtciudad.value='';
    txtcodigopostal.value='';
    txtdireccionempresa.value='';
    txtencargado.value='';
    txtemailempresa.value='';
    txtntrabajadoresempresa.value='';
    txttelefonoempresa.value='';
    txtmessage.textContent='';
}
/*FIN REGISTRO EMPRESA*/

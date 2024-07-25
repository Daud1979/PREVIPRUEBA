
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
lblupdateEmpresa = document.querySelector('#updatelblEmpresa');
inputBuscarEmpresa = document.querySelector('#buscarempresa');
inputBuscarTrabajador = document.querySelector('#buscartrabajador');
tablabody = document.querySelector('#tbody');
tablaEmpresa = document.querySelector('#tablaEmpresa');
razonsocialCentro = document.querySelector('#razonsocialCentro');
CIFCentro = document.querySelector('#CIFCentro');
nidEmpresa=0;
razonsocialTrabajador = document.querySelector('#razonsocialTrabajador');
CIFTrabajador = document.querySelector('#CIFTrabajador');
cmbcentro = document.querySelector('#cmbcentro');
centro = document.querySelector('#listaCentros'); 
trabajador = document.querySelector('#listaUsuarios');
btnCancelarCentro = document.querySelector('#cancelarCentro');
btnCancelarTrabajador = document.querySelector('#cancelarTrabajador');
btnRegistroCentro = document.querySelector('#registrarCentro');
btnRegistroTrabajador = document.querySelector('#registrarTrabajador');
CIFCentro = document.querySelector('#CIFCentro');
razonsocialCentro = document.querySelector('#razonsocialCentro');
nombreCentro = document.querySelector('#nombreCentro');
encargadoCentro = document.querySelector('#encargadoCentro');
ciudadCentro = document.querySelector('#ciudadCentro');
telefonoCentro = document.querySelector('#telefonoCentro');
codigopostalCentro = document.querySelector('#codigopostalCentro');
direccionCentro = document.querySelector('#direccionCentro');
emailCentro = document.querySelector('#emailCentro');
ntrabajadorCentro = document.querySelector('#ntrabajadorCentro');
txtmessageCentro = document.querySelector('#messageCentro');
tablabodyC = document.querySelector('#tbodyC');
tablabodyT = document.querySelector('#tbodyT');
tablabodyCT = document.querySelector('#tbodyCT');
tbodyCT = document.querySelector('#tbodyCT');
tablaCentro = document.querySelector('#tablaCentro');
tablatrabajador = document.querySelector('#tablaTrabajador');
lblupdateCentro = document.querySelector('#updatelblCentro');
lblupdateTrabajador = document.querySelector('#updatelblTrabajador');
cmbcentro = document.querySelector('#cmbcentro');
nifnie = document.querySelector('#nifnie');
nombreTrabajador = document.querySelector('#nombreTrabajador');
apellidosTrabajador = document.querySelector('#apellidosTrabajador');
telefonoTrabajador = document.querySelector('#telefonoTrabajador');
emailTrabajador = document.querySelector('#emailTrabajador');
txtmessagetrabajador = document.querySelector('#messageTrabajador');
containerCentroTrabajadores = document.querySelector('.containerCentroTrabajadores');
btnCerrarCentroTrabajador = document.querySelector('#btnCerrarCentroTrabajador');
containerCambioCentroTrabajadores = document.querySelector('.containerCambioCentroTrabajadores');
btnCambioCerrarCentroTrabajador = document.querySelector('#btnCambioCerrarCentroTrabajador');
btnCambioCentroTrabajador =document.querySelector('#btnCambioCentroTrabajador');
lblupdateCambiarTrabajador = document.querySelector('#lblupdateCambiarTrabajador');
containerMostrarCNAEMostras = document.querySelector('.containerMostrarCNAEMostras');
containerCentroTrabajadoresMostrar = document.querySelector('#containerCentroTrabajadoresMostrar');
containerCNAEModificar = document.querySelector('#containerCNAEModificar');
btnCambioCerrarEmpresa = document.querySelector('#btnCambioCerrarEmpresa');
containerMostrarCNAE = document.querySelector('.containerMostrarCNAE');
cambioCNAE = document.querySelector('#CambioCNAE');
btnCambioEmpresa = document.querySelector('#btnCambioEmpresa');
valorcelda='';
nidTrabajador='';
//SE CARGA AL INICIAR LA PAGINA
btnCancelar.addEventListener('click',limpiarRegistroEmpresa);
document.addEventListener("DOMContentLoaded", function() {
    var inputs = document.querySelectorAll("input");
    inputs.forEach(function(input) {
        input.setAttribute("autocomplete", "off");
    });
    cargarListaEmpresa()
});

//SE CARGAR TODO LA TABLA EMPRESA
function cargarListaEmpresa()
{
    const data= {search:inputBuscarEmpresa.value};   
    fetch('/search', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {      
       tablabody.innerHTML='';
       data.forEach(item => {        
        cargartablaEmpresa(item);
        cargarCNAE(txtCNAE);
    });
    })
    .catch((error) => {
        console.error('Error:', error);
});
}

function cargarCNAE(select){
    const data= {novalor:'0'};   
    fetch('/cargarCNAE', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {         
        data.forEach(item => {        
            const nuevoOption = document.createElement('option');
            nuevoOption.value =item.idCNAE;
            nuevoOption.text = item.CNAE;
            select.appendChild(nuevoOption);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
});

}

function cargarCNAE_(select){
    const data= {novalor:'0'};   
    fetch('/cargarCNAE', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {         
        data.forEach(item => {        
            const nuevoOption = document.createElement('option');
            nuevoOption.value =item.CNAE1;
            nuevoOption.text = item.CNAE;
            select.appendChild(nuevoOption);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
});

}

btnCerrarCentroTrabajador.addEventListener('click',()=>{
    containerCentroTrabajadores.classList.remove('containerCentroTrabajadoresMostrar');
    containerCentroTrabajadores.classList.add('containerCentroTrabajadores');
});
btnCambioCerrarCentroTrabajador.addEventListener('click',()=>{
    containerCambioCentroTrabajadores.classList.remove('containerCambioCentroTrabajadoresMostrar');
    containerCambioCentroTrabajadores.classList.add('containerCambioCentroTrabajadores');    
    
});
function validarNumero(input) {
    if (typeof input === 'number' && !isNaN(input)) {
        return true;
    } else if (typeof input === 'string' && input.trim() !== '' && !isNaN(Number(input))) {
        return true;
    }
    return false;
}
function ocultarLabel(lblcambio) {
    const lbl=lblcambio;
    setTimeout(() => {
        lbl.classList.remove('alertlbl');
        lbl.classList.remove('confirmtlbl');      
        lbl.classList.remove('alert'); 
        lbl.textContent='';
    }, 1500); // 3 segundos
}

//SON LOS INPUT QUE BUSCAN EN LA TABLA
inputBuscarEmpresa.addEventListener('keyup',()=>{   
    const data= {search:inputBuscarEmpresa.value.trim()};   
    fetch('/search', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {      
       tablabody.innerHTML='';
       data.forEach(item => {        
        cargartablaEmpresa(item);
    });
    })
    .catch((error) => {
        console.error('Error:', error);
});

});
inputBuscarTrabajador.addEventListener('keyup',()=>{   
    console.log(nidEmpresa);
    const data= {search:inputBuscarTrabajador.value.trim(),idEmpresa:nidEmpresa};   
    fetch('/searchTrabajador', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {      
       tablabodyT.innerHTML='';
       data.forEach(item => {                
        cargartablaTrabajador(item);
    });
    })
    .catch((error) => {
        console.error('Error:', error);
});

});

//BOTON CANCELAR CIERRA LOS DIV Y MUESTRA LA PAGINA PRINCIPAL
btnCancelarCentro.addEventListener('click',()=>{        
    const containerCentros = 'containerCentros';
    const containerCentrosSi = 'containerCentrosSi';    
    centro.classList.add(containerCentros);
    centro.classList.remove(containerCentrosSi);
});
btnCancelarTrabajador.addEventListener('click',()=>{        
    const containerCentros = 'containerCentros';
    const containerCentrosSi = 'containerCentrosSi';    
    trabajador.classList.add(containerCentros);
    trabajador.classList.remove(containerCentrosSi);
});
btnCambioCerrarEmpresa.addEventListener('click',()=>{        
    containerMostrarCNAE.classList.remove('containerMostrarCNAEMostras');
    containerMostrarCNAE.classList.add('containerMostrarCNAE');    
});

//BOTON DE REGISTRAR DE LOS FORMULARIOS
btnRegistro.addEventListener('click', ()=>{
    txtmessage.textContent='';
    if (txtrazonSocial.value != '' && txtCIF.value != '' && txtgrupoempresarial.value != '' && txtCNAE.value != '' && txtciudad.value != '' && txtcodigopostal.value != '' && txtdireccionempresa.value != '' && txtencargado.value != ''  && txtemailempresa.value != '' && txtntrabajadoresempresa.value != '' && txttelefonoempresa.value != '')
    {
        const dataVerificar = {razonsocial:txtrazonSocial.value, CIF:txtCIF.value };        
        const data = {
            razonsocial:txtrazonSocial.value,
            CIF:txtCIF.value,
            grupoempresarial:txtgrupoempresarial.value,
            CNAE: txtCNAE.value,      
            descripcionCNAE : txtCNAE.options[txtCNAE.selectedIndex].text,    
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
                        location.reload(true);

                        
                    }).catch((error) => {
                        console.error('Error:', error);
                    });
                    //registrar empresa
                }
                else
                {
                    txtmessage.classList.remove('confirm');
                    txtmessage.classList.add('alert');
                    txtmessage.textContent =`LA EMPRESA YA SE ENCUENTRA REGISTRADA EN LA BASE DE DATOS`;
                    ocultarLabel(txtmessage);       
                }
            })
            .catch((error) => {
                console.error('Error:', error);
        });
    }
    else{
        txtmessage.classList.remove('confirm');
        txtmessage.classList.add('alert');
        txtmessage.textContent=`SE REQUIEREN DATOS PARA EL REGISTRO`;                  
        ocultarLabel(txtmessage);       
        
    }
    
    
});
btnRegistroCentro.addEventListener('click', ()=>{
    //txtmessage.textContent='';//hay que crear
     if (nombreCentro.value != '' && encargadoCentro.value != '' && ciudadCentro .value != '' && telefonoCentro.value != '' && codigopostalCentro.value != '' && direccionCentro.value != ''  && emailCentro.value != '' && ntrabajadorCentro.value != '')
     {
         const dataVerificar = {nombreCentro:nombreCentro.value, CIF:CIFCentro.value, razonsocial:razonsocialCentro.value };        
        
         const data = {
             nombreCentro : nombreCentro.value,
             encargadoCentro : encargadoCentro.value,
             ciudadCentro : ciudadCentro.value,
             telefonoCentro :  telefonoCentro.value,
             codigopostalCentro : codigopostalCentro.value,
             direccionCentro :  direccionCentro.value,
             emailCentro : emailCentro.value,
             ntrabajadorCentro : ntrabajadorCentro.value,
             idEmpresa:nidEmpresa
             };   
             fetch('/verificarcentro', {
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
                     fetch('/registrarcentro',{
                         method:'POST',
                         headers:{
                             'Content-Type':'application/json'
                         },
                         body: JSON.stringify(data)
                     }).then(response=>response.json()).then(data=>{
                         limpiarRegistroCentro();
                         txtmessageCentro.classList.remove('alert');
                         txtmessageCentro.textContent =`SE REGISTRO CORRECTAMENTE A LA BASE DE DATOS`;
                         txtmessageCentro.classList.add('confirm');                     
                         ocultarLabel(txtmessageCentro);       
                         //lista de centro cargar
                         cargarListaCentro(nidEmpresa);
                     
                         
                     }).catch((error) => {
                         console.error('Error:', error);
                     });                    
                 }
                 else
                 {
                     txtmessageCentro.classList.remove('confirm');
                     txtmessageCentro.classList.add('alert');
                     txtmessageCentro.textContent =`EL CENTRO YA SE ENCUENTRA REGISTRADA EN LA BASE DE DATOS`;
                     ocultarLabel(txtmessageCentro);       
                 }
             })
             .catch((error) => {
                 console.error('Error:', error);
         });
     }
     else{
         txtmessageCentro.classList.remove('confirm');
         txtmessageCentro.classList.add('alert');
         txtmessageCentro.textContent=`SE REQUIEREN DATOS PARA EL REGISTRO`;                  
         ocultarLabel(txtmessageCentro);
     }   
}); 
 btnRegistroTrabajador.addEventListener('click', ()=>{
     //txtmessage.textContent='';//hay que crear
    
      if (nifnie.value != '' && nombreTrabajador.value != '' && apellidosTrabajador.value != '' && telefonoTrabajador.value != '' && emailTrabajador.value != '')
      {
          const dataVerificar = {idCentro:cmbcentro.value, nif:nifnie.value };        
         
          const data = {
             nif : nifnie.value,
             nombres : nombreTrabajador.value,
             apellidos : apellidosTrabajador.value,
             telefono : telefonoTrabajador.value,
             email : emailTrabajador.value,
             idCentro :  cmbcentro.value         
             };   
              fetch('/verificartrabajador', {
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
                      fetch('/registrartrabajador',{
                          method:'POST',
                          headers:{
                              'Content-Type':'application/json'
                          },
                          body: JSON.stringify(data)
                      }).then(response=>response.json()).then(data=>{
                          limpiarRegistroTrabajador();
                          //console.log(nidEmpresa);
                         // txtmessageTrabajador.classList.remove('alert');
                          //txtmessageTrabajador.textContent =`SE REGISTRO CORRECTAMENTE A LA BASE DE DATOS`;
                          //txtmessagetrabajador.classList.add('confirm');                     
                          //ocultarLabel(txtmessageTrabajador);       
                          //lista de centro cargar
                          cargarListaTrabajador(nidEmpresa);
                         
                          
                      }).catch((error) => {
                          console.error('Error:', error);
                      });                    
                  }
                  else
                  {
                      txtmessagetrabajador.classList.remove('confirm');
                      txtmessagetrabajador.classList.add('alert');
                      txtmessagetrabajador.textContent =`EL TRABAJADOR YA SE ENCUENTRA REGISTRADA EN LA BASE DE DATOS`;
                      ocultarLabel(txtmessagetrabajador);       
                  }
              })
              .catch((error) => {
                  console.error('Error:', error);
          });
      }
      else{
          txtmessagetrabajador.classList.remove('confirm');
          txtmessagetrabajador.classList.add('alert');
          txtmessagetrabajador.textContent=`SE REQUIEREN DATOS PARA EL REGISTRO`;                  
          ocultarLabel(txtmessagetrabajador);
      }   
});

//LIMPIAR LOS INPUT ANTES DE REGISTRAR
function limpiarRegistroEmpresa(){
    txtrazonSocial.value='';
    txtCIF.value='';
    txtgrupoempresarial.value='';
    txtCNAE.value='';    
    txtciudad.value='';
    txtcodigopostal.value='';
    txtdireccionempresa.value='';
    txtencargado.value='';
    txtemailempresa.value='';
    txtntrabajadoresempresa.value='';
    txttelefonoempresa.value='';
    txtmessage.textContent='';
}
function limpiarRegistroCentro(){
    nombreCentro.value='';
    encargadoCentro.value='';
    ciudadCentro.value='';
    telefonoCentro.value='';
    codigopostalCentro.value='';
    direccionCentro.value='';
    emailCentro.value='';
    ntrabajadorCentro.value='';   
}
function limpiarRegistroTrabajador(){
     nifnie.value='';
    nombreTrabajador.value='';
    apellidosTrabajador.value='';
    telefonoTrabajador.value='';
    emailTrabajador.value='';     
    
}

//SE ACTUALIZA LOS DATOS CON LOS BLUR
function updateEmpresa(atributo,id,valor){
        const data= {atributo,id,valor};
        fetch('/updateEmpresa', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if(data.rowsAffected){
                lblupdateEmpresa.classList.remove('alertlbl');
                updatelblEmpresa.textContent=`SE REALIZO LA MODIFICACION`;
                lblupdateEmpresa.classList.add('confirmlbl');
            }
            else
            {
                lblupdateEmpresa.classList.add('confirmlbl');
                lblupdateEmpresa.textContent=`NO SE PUDO REALIZAR LA MODIFICACION`;                         
                lblupdateEmpresa.classList.remove('alertlbl');
            }
            ocultarLabel(lblupdateEmpresa);
        })
        .catch((error) => {
            console.error('Error:', error);
    });
}
function updateCentro(atributo,id,valor){
    const data= {atributo,id,valor};    
    fetch('/updateCentro', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {       
        if(data.rowsAffected){
            lblupdateCentro.classList.remove('alertlbl');//clase para empresa y centor es lo mismo
            lblupdateCentro.textContent=`SE REALIZO LA MODIFICACION`;
            lblupdateCentro.classList.add('confirmlbl');//clase para empresa y centor es lo mismo
        }
        else
        {
            lblupdateCentro.classList.add('confirmlbl');
            lblupdateCentro.textContent=`NO SE PUDO REALIZAR LA MODIFICACION`;                         
            lblupdateCentro.classList.remove('alertlbl');
        }
        ocultarLabel(lblupdateCentro);
    })
    .catch((error) => {
        console.error('Error:', error);
});
}
function updateTrabajador(atributo,id,valor){
    const data= {atributo,id,valor};     
    fetch('/updateTrabajador', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {       
        if(data.rowsAffected){
            
            lblupdateTrabajador.classList.remove('alertlbl');//clase para empresa y centor es lo mismo
            lblupdateTrabajador.textContent=`SE REALIZO LA MODIFICACION`;
            lblupdateTrabajador.classList.add('confirmlbl');//clase para empresa y centor es lo mismo
        }
        else
        {
            lblupdateTrabajador.classList.add('confirmlbl');
            lblupdateTrabajador.textContent=`NO SE PUDO REALIZAR LA MODIFICACION`;                         
            lblupdateTrabajador.classList.remove('alertlbl');
        }
        ocultarLabel(lblupdateTrabajador);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
//actualizar el centro y estado del trabajador
btnCambioCentroTrabajador.addEventListener('click',()=>{
    estado = document.querySelector('#estadoTrabajador').value;
    id = document.querySelector('#CambioCentro').value;
    const data= {idTrabajador:nidTrabajador,idCentro:id,estado:estado};      
    fetch('/updateTrabajadorCentroEstado', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {           
        lblupdateCambiarTrabajador.textContent=`SE REALIZO LA MODIFICACION`;
        lblupdateCambiarTrabajador.classList.add('confirm');//clase para empresa y centor es lo mismo
        ocultarLabel(lblupdateCambiarTrabajador);
        cargarListaTrabajador(nidEmpresa);
       
    })
    .catch((error) => {
        console.error('Error:', error);
    });  
});
//actualizar CNAE de empresa
btnCambioEmpresa.addEventListener('click',()=>{
    const data= {CNAE:cambioCNAE.value,descripcionCNAE:cambioCNAE.options[cambioCNAE.selectedIndex].text,idEmpresa:nidEmpresa};      
    console.log('html',data);
    fetch('/updateCNAEEmpresa', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {   
        cargarListaEmpresa();
        lblupdateCambiarEmpresa = document.querySelector('#lblupdateCambiarEmpresa');        
        lblupdateCambiarEmpresa.textContent=`SE REALIZO LA MODIFICACION`;
        lblupdateCambiarEmpresa.classList.add('confirm');//clase para empresa y centor es lo mismo
        ocultarLabel(lblupdateCambiarEmpresa);
        CNEAEActual.value=cambioCNAE.options[cambioCNAE.selectedIndex].text;
       
     })
    .catch((error) => {
        console.error('Error:', error);
    });  
    
});

//PARA ACTUALIZAR LOS DATOS DE EMPRESA, CENTRO Y TRABAJADORES
$(document).on("blur","#tbody td[data-id]",function(event){  
    let valor=this.innerHTML.trim();
    let id =event.currentTarget.dataset.id;  //obtener el valor del data-id    
    numero=false;    
    if (event.currentTarget.id =='tdntrabajadorEmpresa')
    {
        validarNumero(valor)?numero=false:numero=true
    }
    
    if (valor != valorcelda && numero==false)
    {      
        if (valor!='<br>'&& valor!='')
        {        
            updateEmpresa(event.currentTarget.id,id,valor);   
        }
        else
        {
            lblupdateEmpresa.classList.remove('confirmlbl');
            lblupdateEmpresa.textContent=`DATOS NO VALIDOS`;                
            lblupdateEmpresa.classList.add('alertlbl');
            this.innerHTML=valorcelda;
            ocultarLabel(lblupdateEmpresa);
        }
    }
    else{
        this.innerHTML=valorcelda;
    }
   
});
$(document).on("blur","#tbodyC td[data-id]",function(event){  
    let valor=this.innerHTML.trim();    
    let campo=event.target.id;
    let id =event.currentTarget.dataset.id;  //obtener el valor del data-id    
    numero=false;    
    if (event.currentTarget.id =='tdcp_')
    {
        validarNumero(valor)?numero=false:numero=true
    }
    if (valor != valorcelda && numero==false)
    {      
        if (valor!='<br>'&& valor!='')
        {        
            updateCentro(campo,id,valor);          
        }
        else
        {
            lblupdateCentro.classList.remove('confirmlbl');
            lblupdateCentro.textContent=`DATOS NO VALIDOS`;                
            lblupdateCentro.classList.add('alertlbl');
            this.innerHTML=valorcelda;
            ocultarLabel(lblupdateCentro);
        }
    }
    else{
        this.innerHTML=valorcelda;
    }
});
$(document).on("blur","#tbodyT td[data-id]",function(event){  
    let valor=this.innerHTML.trim();    
    let campo=event.target.id;
    let id =event.currentTarget.dataset.id;  //obtener el valor del data-id    
    numero=false;    
    if (event.currentTarget.id =='tdcp_')
    {
        validarNumero(valor)?numero=false:numero=true
    }
    if (valor != valorcelda && numero==false)
    {      
        if (valor!='<br>'&& valor!='')
        {        
            updateTrabajador(campo,id,valor);          
        }
        else
        {
            
            lblupdateTrabajador.classList.remove('confirmlbl');
            lblupdateTrabajador.textContent=`DATOS NO VALIDOS`;                
            lblupdateTrabajador.classList.add('alertlbl');
            this.innerHTML=valorcelda;
            ocultarLabel(lblupdateCentro);
        }
    }
    else{
        this.innerHTML=valorcelda;
    }
});

//AQUI SE CAPTURA EL DATO DE LA CELDA DE LA TABLA
tablabody.addEventListener('click', function(event) {  
    if (event.target.tagName === 'TD') {       
         valorcelda = event.target.innerText;       
    }
});
tablaCentro.addEventListener('click', function(event) {  
    if (event.target.tagName === 'TD') {       
         valorcelda = event.target.innerText;           
    }
});

tablatrabajador.addEventListener('click', function(event) {  
    if (event.target.tagName === 'TD') {       
         valorcelda = event.target.innerText;       
    }
});

//SE SACA DATOS PARA LOS INPUT DE CENTRO Y TRABAJADOR "idEmpresa y Nombre empresa"
function MostrarCentro(idEmpresa)
{ 
    nidEmpresa=idEmpresa;
    const data= {idEmpresa};
    fetch('/empresas/obtener', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        razonsocialCentro.value = data[0].razonSocial; 
        CIFCentro.value=data[0].CIF;
        razonsocialCentro.classList.add('blanco');
        CIFCentro.classList.add('blanco');
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    const containerCentros = 'containerCentros';
    const containerCentrosSi = 'containerCentrosSi';    
    centro.classList.remove(containerCentros);
    centro.classList.add(containerCentrosSi);  
   
}
function MostrarTrabajador(idEmpresa)
{ 
    nidEmpresa=idEmpresa;
    const data= {idEmpresa};
    fetch('/empresas/obtener', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {        
        razonsocialTrabajador.value = data[0].razonSocial; 
        CIFTrabajador.value=data[0].CIF;
        razonsocialTrabajador.classList.add('blanco');
        CIFTrabajador.classList.add('blanco');
        
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    /////
    fetch('/listarcentro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {        
                                
                cmbcentro.innerHTML = '';
                data.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item.idCentro;
                    option.text = item.nombreCentro;
                    cmbcentro.appendChild(option);
                });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    /////
    const containerCentros = 'containerCentros';
    const containerCentrosSi = 'containerCentrosSi';    
    trabajador.classList.remove(containerCentros);
    trabajador.classList.add(containerCentrosSi);  
   
}

//AQUI CUANDO SE PRESOINA ESCAPE SE CIERRA LA VENTANA TRABAJADOR U CENTRO
trabajador.addEventListener('keydown', function(event) {   
    if (event.key === 'Escape') {

        const containerCentros = 'containerCentros';
        const containerCentrosSi = 'containerCentrosSi';    
        trabajador.classList.add(containerCentros);
        trabajador.classList.remove(containerCentrosSi);
    }
});
centro.addEventListener('keydown', function(event) {   
    if (event.key === 'Escape') {

        const containerCentros = 'containerCentros';
        const containerCentrosSi = 'containerCentrosSi';    
        centro.classList.add(containerCentros);
        centro.classList.remove(containerCentrosSi);
    }
});

//AQUI SE CREAN LAS TABLAS DINAMICAMENTE, CON CONEXION SQL Y ESTAN LOS BOTONES 
function cargartablaEmpresa(item){
  //aqui es el cargar
    const fila = tablabody.insertRow();//se crea una nueva fila           
    const CIF_ = fila.insertCell(0);//primer columna
    const tdrazonSocial_= fila.insertCell(1);//primer columna
    const tdgrupoEmpresarial_= fila.insertCell(2);//primer columna
    const tdCNAE_= fila.insertCell(3);//primer columna    
    const tdntrabajadorEmpresa_= fila.insertCell(4);//primer columna
    const tddireccionEmpresa_= fila.insertCell(5);//primer columna
    const tdencargadoEmpresa_= fila.insertCell(6);//primer columna
    const tdemail_= fila.insertCell(7);//primer columna
    const tdtelefono_= fila.insertCell(8);//primer columna
    const tdciudad_= fila.insertCell(9);//primer columna
    const tdcodigopostal_= fila.insertCell(10);//primer columna
    const tdbutton_= fila.insertCell(11);//botones
    let btnCentros = document.createElement("button")
    let btnTrabajador = document.createElement("button");
    let btndatos =document.createElement("button");
    btnCentros.innerHTML=` <span class="material-symbols-outlined homework">  home_work </span>`;
    btnCentros.id = item.idEmpresa;
    tdbutton_.appendChild(btnCentros);
    btnCentros.addEventListener("click", () => {
        MostrarCentro(btnCentros.id);
        cargarListaCentro(item.idEmpresa);
    });
 
    btnTrabajador.innerHTML = `<span class="material-symbols-outlined personapron">engineering</span>`;
    btnTrabajador.id = item.idEmpresa;
    tdbutton_.appendChild(btnTrabajador);
    btnTrabajador.addEventListener("click", () => {
       MostrarTrabajador(btnTrabajador.id);       
       cargarListaTrabajador(item.idEmpresa);
    });
  btndatos.innerHTML=`<span class="material-symbols-outlined gridview">picture_as_pdf</span>`;
  tdbutton_.appendChild(btndatos);
  tdbutton_.classList.add('btncentro');
 
  //
  CIF_.setAttribute('data-id', item.idEmpresa);
  CIF_.id =`tdCIF`;
  CIF_.contentEditable = true;
  CIF_.textContent = item.CIF;  
  // //
  tdrazonSocial_.setAttribute('data-id', item.idEmpresa);
  tdrazonSocial_.id =`tdrazonSocial`;
  tdrazonSocial_.contentEditable = true;
  tdrazonSocial_.textContent = item.razonSocial;  
  // //
  tdgrupoEmpresarial_.setAttribute('data-id', item.idEmpresa);
  tdgrupoEmpresarial_.id =`tdgrupoEmpresarial`;
  tdgrupoEmpresarial_.contentEditable = true;
  tdgrupoEmpresarial_.textContent = item.grupoEmpresarial;  
  //
  let aCNAE = document.createElement("a")  
  aCNAE.innerHTML=item.CNAE;
  aCNAE.id = item.idEmpresa;  
  tdCNAE_.classList.add('listatrabajador');
  tdCNAE_.classList.add('celdaizq');
  tdCNAE_.appendChild(aCNAE);
  aCNAE.addEventListener('click',()=>{    
    CNEAEActual = document.querySelector('#CNEAEActual');    
    CNEAEActual.value=item.descripcionCNAE;
    cargarCNAE_(cambioCNAE);
    nidEmpresa=item.idEmpresa;
    containerCNAEModificar.classList.remove('containerMostrarCNAE');
    containerCNAEModificar.classList.add('containerMostrarCNAEMostras');
  });
//   tdCNAE_.setAttribute('data-id', item.idEmpresa);
//   tdCNAE_.id =`tdCNAE`;
//   tdCNAE_.contentEditable = true;
//   tdCNAE_.classList.add('celdaizq');
//   tdCNAE_.textContent = item.CNAE;  
  // 
  tdntrabajadorEmpresa_.setAttribute('data-id', item.idEmpresa);
  tdntrabajadorEmpresa_.id =`tdntrabajadorEmpresa`;
  tdntrabajadorEmpresa_.contentEditable = true;
  tdntrabajadorEmpresa_.textContent = item.ntrabajadorEmpresa;  
  tdntrabajadorEmpresa_.classList.add('celdaizq');
  //        
  tdencargadoEmpresa_.setAttribute('data-id', item.idEmpresa);
  tdencargadoEmpresa_.id =`tdencargadoEmpresa`;
  tdencargadoEmpresa_.contentEditable = true;
  tdencargadoEmpresa_.textContent = item.encargadoEmpresa;  
  //
  tddireccionEmpresa_.setAttribute('data-id', item.idEmpresa);
  tddireccionEmpresa_.id =`tddireccionEmpresa`;
  tddireccionEmpresa_.contentEditable = true;
  tddireccionEmpresa_.textContent = item.direccionEmpresa;  
  //
  tdemail_.setAttribute('data-id', item.idEmpresa);
  tdemail_.id =`tdemail`;
  tdemail_.contentEditable = true;
  tdemail_.textContent = item.email;  
  //
  tdtelefono_.setAttribute('data-id', item.idEmpresa);
  tdtelefono_.id =`tdtelefono`;
  tdtelefono_.contentEditable = true;
  tdtelefono_.textContent = item.telefono;  
  tdtelefono_.classList.add('celdaizq');
  //
  tdciudad_.setAttribute('data-id', item.idEmpresa);
  tdciudad_.id =`tdciudad`;
  tdciudad_.contentEditable = true;
  tdciudad_.textContent = item.ciudad;  
  //
  tdcodigopostal_.setAttribute('data-id', item.idEmpresa);
  tdcodigopostal_.id =`tdcodigopostal`;
  tdcodigopostal_.contentEditable = true;
  tdcodigopostal_.textContent = item.codigopostal;  
  tdcodigopostal_.classList.add('celdaizq');
  //

//fin cargar
}
function cargartablaCentro(item){
    //aqui es el cargar
    
    const fila = tablabodyC.insertRow();//se crea una nueva fila           
    const tdnombrecentro_ = fila.insertCell(0);//primer columna
    const tdencargadocentro_= fila.insertCell(1);//primer columna
    const tdciudadcentro_= fila.insertCell(2);//primer columna
    const tdcp_= fila.insertCell(3);//primer columna
    tdcp_.classList.add('derecha');
    const tddireccioncentro_= fila.insertCell(4);//primer columna
    const tdtelefonocentro_= fila.insertCell(5);//primer columna
    tdtelefonocentro_.classList.add('derecha');
    const tdemailcentro_= fila.insertCell(6);//primer columna
    const tdntrabajadorescentro_= fila.insertCell(7);//primer columna     
    const tdbutton_= fila.insertCell(8);//primer columna     
    tdbutton_.classList.add('btncentro');
    let aTrabajadores = document.createElement("a")  
    aTrabajadores.innerHTML=`Total de Trabajadores: ${item.ntrabajadorCentro} `;
    aTrabajadores.id = item.idEmpresa;  
    tdntrabajadorescentro_.classList.add('listatrabajador');
    tdntrabajadorescentro_.appendChild(aTrabajadores);
   //
    tdnombrecentro_.setAttribute('data-id', item.idCentro);
    tdnombrecentro_.id =`tdnombreCentro_`;
    tdnombrecentro_.contentEditable = true;
    tdnombrecentro_.textContent = item.nombreCentro;  
    //
    tdencargadocentro_.setAttribute('data-id', item.idCentro);
    tdencargadocentro_.id =`tdencargadocentro_`;
    tdencargadocentro_.contentEditable = true;
    tdencargadocentro_.textContent = item.encargadoCentro;  
    //
    tdciudadcentro_.setAttribute('data-id', item.idCentro);
    tdciudadcentro_.id =`tdciudadcentro_`;
    tdciudadcentro_.contentEditable = true;
    tdciudadcentro_.textContent = item.ciudad;  
    //
    tdcp_.setAttribute('data-id', item.idCentro);
    tdcp_.id =`tdcp_`;
    tdcp_.contentEditable = true;    
    tdcp_.textContent = item.codigopostal;  
    //
    tddireccioncentro_.setAttribute('data-id', item.idCentro);
    tddireccioncentro_.id =`tddireccioncentro_`;
    tddireccioncentro_.contentEditable = true;
    tddireccioncentro_.textContent = item.direccionCentro; 
    // 
    tdtelefonocentro_.setAttribute('data-id', item.idCentro);
    tdtelefonocentro_.id =`tdtelefonocentro_`;
    tdtelefonocentro_.contentEditable = true;
    tdtelefonocentro_.textContent = item.telefonoCentro; 
    //
    tdemailcentro_.setAttribute('data-id', item.idCentro);
    tdemailcentro_.id =`tdemailcentro_`;
    tdemailcentro_.contentEditable = true;
    tdemailcentro_.textContent = item.emailCentro; 
    //
    aTrabajadores.addEventListener("click", () => {        
        cargarListaTrabajadorCentro(item.idCentro);
        containerCentroTrabajadores.classList.remove('containerCentroTrabajadores');
        containerCentroTrabajadores.classList.add('containerCentroTrabajadoresMostrar');
    });
    //
    let btdocumentoCentro =document.createElement("button");
    btdocumentoCentro.innerHTML=`<span class="material-symbols-outlined gridview">picture_as_pdf </span>`;
    btdocumentoCentro.id = item.idEmpresa;
    tdbutton_.appendChild(btdocumentoCentro);
    btdocumentoCentro.addEventListener("click", () => {
        // MostrarCentro(btnCentros.id);
        // cargarListaCentro(item.idEmpresa);
        alert('ir a documentoacion del trabajador en todo elcentro');
    });
    //
    let btneliminarCentro =document.createElement("button");
    btneliminarCentro.innerHTML=`<span class="material-symbols-outlined deletes">delete </span>`;
    btneliminarCentro.id = item.idEmpresa;
    tdbutton_.appendChild(btneliminarCentro);
    btneliminarCentro.addEventListener("click", () => {
        eliminarCentro(item.idCentro,nidEmpresa);        
    });
}
function cargartablaTrabajador(item){
    //aqui es el cargar
    
    const fila = tablabodyT.insertRow();//se crea una nueva fila           
    const tdn_ = fila.insertCell(0);//primer columna
    tdn_.classList.add('derecha');
    const tdcentro_= fila.insertCell(1);//primer columna
    const tdnif_= fila.insertCell(2);//primer columna
   
    const tdnombre_= fila.insertCell(3);//primer columna
    const tdapellidos_= fila.insertCell(4);//primer columna
    const tdemail_= fila.insertCell(5);//primer columna
    const tdtelefono_= fila.insertCell(6);//primer columna
    tdtelefono_.classList.add('derecha');
    const tdfecha_= fila.insertCell(7);//primer columna
    tdfecha_.classList.add('derecha');
    const tdestado_= fila.insertCell(8);//primer columna     
    const tdbutton_= fila.insertCell(9);//primer columna     
    tdbutton_.classList.add('btncentro');
    tdn_.setAttribute('data-id', item.idTrabajador);
    tdn_.id =`tdn_`;
    //tdn_.contentEditable = true;
    tdn_.textContent = item.n;  
    //
    tdcentro_.setAttribute('data-id', item.idTrabajador);
    tdcentro_.id =`tdcentro_`;
   // tdcentro_.contentEditable = true;
    tdcentro_.textContent = item.nombreCentro;  
    //
    tdnif_.setAttribute('data-id', item.idTrabajador);
    tdnif_.id =`tdnif_`;
    tdnif_.contentEditable = true;
    tdnif_.textContent = item.NIF;  
    //
    tdnombre_.setAttribute('data-id', item.idTrabajador);
    tdnombre_.id =`tdnombre_`;
    tdnombre_.contentEditable = true;
    tdnombre_.textContent = item.nombres;  
    //
    tdapellidos_.setAttribute('data-id', item.idTrabajador);
    tdapellidos_.id =`tdapellidos_`;
    tdapellidos_.contentEditable = true;
    tdapellidos_.textContent = item.apellidos;  
    //
    tdemail_.setAttribute('data-id', item.idTrabajador);
    tdemail_.id =`tdemail_`;
    tdemail_.contentEditable = true;
    tdemail_.textContent = item.email;  
    //
    tdtelefono_.setAttribute('data-id', item.idTrabajador);
    tdtelefono_.id =`tdtelefono_`;
    tdtelefono_.contentEditable = true;
    tdtelefono_.textContent = item.telefono;  
    //
    tdfecha_.setAttribute('data-id', item.idTrabajador);
    tdfecha_.id =`tdfecha_`;
   // tdfecha_.contentEditable = true;
    tdfecha_.textContent = item.fechaAlta;  
    //
    tdestado_.setAttribute('data-id', item.idTrabajador);
    tdestado_.id =`tdestado_`;
    //tdestado_.contentEditable = true;
    tdestado_.textContent = item.Estado;  
    //
    let btnmodificarTrabajador =document.createElement("button");
    btnmodificarTrabajador.innerHTML=`<span class="material-symbols-outlined tuerca">swap_horiz </span>`;
    btnmodificarTrabajador.id = item.idEmpresa;
    tdbutton_.appendChild(btnmodificarTrabajador);
    btnmodificarTrabajador.addEventListener("click", () => {
        cargarCambioTrabajadorCentro(item.idCentro,item.nombreCentro,item.estado,item.idTrabajador);
        containerCambioCentroTrabajadores.classList.remove('containerCambioCentroTrabajadores');
        containerCambioCentroTrabajadores.classList.add('containerCambioCentroTrabajadoresMostrar');
    });
    //
    let btdocumentoTrabajador =document.createElement("button");
    btdocumentoTrabajador.innerHTML=`<span class="material-symbols-outlined gridview"> picture_as_pdf </span>`;
    btdocumentoTrabajador.id = item.idEmpresa;
    tdbutton_.appendChild(btdocumentoTrabajador);
    btdocumentoTrabajador.addEventListener("click", () => {
        // MostrarCentro(btnCentros.id);
        // cargarListaCentro(item.idEmpresa);
        alert('ir a documentoacion del trabajador');
    });
    //
    let bteliminarTrabajador =document.createElement("button");
    bteliminarTrabajador.innerHTML=`<span class="material-symbols-outlined deletes">  delete </span>`;
    bteliminarTrabajador.id = item.idEmpresa;
    tdbutton_.appendChild(bteliminarTrabajador);
    bteliminarTrabajador.addEventListener("click", () => {
        // MostrarCentro(btnCentros.id);
        // cargarListaCentro(item.idEmpresa);
        alert('ir a eliminar del trabajador, simepre y cuando no tenga documentos y etc');
    });
}
function cargartablaTrabajadorCentro(item){
    //aqui es el cargar
    const fila = tablabodyCT.insertRow();//se crea una nueva fila          
    const tdn_= fila.insertCell(0);//primer columna
    tdn_.classList.add('derecha');
    const tdnif_= fila.insertCell(1);//primer columna
    tdnif_.classList.add('izquierda');
    const tdnombre_= fila.insertCell(2);//primer columna
    tdnombre_.classList.add('izquierda');
    const tdapellidos_= fila.insertCell(3);//primer columna
    tdapellidos_.classList.add('izquierda');
    const tdtelefono_= fila.insertCell(4);//primer columna 
   

    tdn_.setAttribute('data-id', item.idTrabajador);
    tdn_.id =`tdnif_`;
    tdn_.contentEditable = true;
    tdn_.textContent = item.n;  
    //
    tdnif_.setAttribute('data-id', item.idTrabajador);
    tdnif_.id =`tdnif_`;
    tdnif_.contentEditable = true;
    tdnif_.textContent = item.NIF;  
    //
    tdnombre_.setAttribute('data-id', item.idTrabajador);
    tdnombre_.id =`tdnombre_`;
    tdnombre_.contentEditable = true;
    tdnombre_.textContent = item.nombres;  
    //
    tdapellidos_.setAttribute('data-id', item.idTrabajador);
    tdapellidos_.id =`tdapellidos_`;
    tdapellidos_.contentEditable = true;
    tdapellidos_.textContent = item.apellidos;  
    //
    tdtelefono_.setAttribute('data-id', item.idTrabajador);
    tdtelefono_.id =`tdtelefono_`;
    tdtelefono_.contentEditable = true;
    tdtelefono_.textContent = item.telefono;  
  
}

//AQUI SE CARGA LAS LISTA DESDE SQL Y SE MANDA A LAS FUNCIONES DE ARRIBA CARGARTABLA...
function cargarListaCentro(idEmpresa){
    const id=idEmpresa;
    const data={idEmpresa:id};
   
    fetch('/listarcentro',{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body: JSON.stringify(data)
    })
    .then(response=>response.json())
    .then(data => {      
        tablabodyC.innerHTML='';
        
        data.forEach(item => {        
            cargartablaCentro(item);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
     });                 
}
function cargarListaCentroTrabajadoCambio(idEmpresa){
    const id=idEmpresa;
    const data={idEmpresa:id};
   
    fetch('/listarcentro',{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body: JSON.stringify(data)
    })
    .then(response=>response.json())
    .then(data => {    
        CambioCentro = document.querySelector('#CambioCentro');  
        CambioCentro.textContent='';
        CambioCentro.value='';
        data.forEach(item => {        
            const nuevoOption = document.createElement('option');
            nuevoOption.value =item.idCentro;
            nuevoOption.text = item.nombreCentro;
            CambioCentro.appendChild(nuevoOption);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
     });                 
}
function cargarListaTrabajador(idEmpresa){
    const id=idEmpresa;
    const data={idEmpresa:id};
   
    fetch('/listartrabajador',{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body: JSON.stringify(data)
    })
    .then(response=>response.json())
    .then(data => {      
        tablabodyT.innerHTML='';      
        data.forEach(item => {        
            cargartablaTrabajador(item);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
     });                 
}
function cargarListaTrabajadorCentro(idCentro){
    const id=idCentro;
    const data={idCentro:id};
    
    fetch('/listartrabajadorcentro',{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body: JSON.stringify(data)
    })
    .then(response=>response.json())
    .then(data => {      
        tablabodyCT.innerHTML='';      
        data.forEach(item => {        
            cargartablaTrabajadorCentro(item);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
     });                 
}

//ELIMINAR CENTRO Y TRABAJADORES
function eliminarCentro(idCentro,idEmpresa){
    const data={idCentro};    
    fetch('/eliminarcentro',{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body: JSON.stringify(data)
    })
    .then(response=>response.json())
    .then(data => {      
        
        cargarListaCentro(idEmpresa);
    })
    .catch((error) => {
        console.error('Error:', error);
    })
}   
//CAMBIO DE CENTRO Y ESTADO PARA TRABAJADOR
function cargarCambioTrabajadorCentro(idCentro,centro,estado,idTrabajador){
    centroActualTrabajador =document.querySelector('#centroActualTrabajador');
    centroActualTrabajador.value=centro;
    nidTrabajador=idTrabajador;
    cargarListaCentroTrabajadoCambio(nidEmpresa);
    estadoTrabajador = document.querySelector('#estadoTrabajador');
    estadoTrabajador.textContent='';
    estadoTrabajador.value='';
    const opciones = [
        {value: 'H', text: 'Habilitado'},
        {value: 'D', text: 'Deshabilitado'}        
    ];
    opciones.forEach(function(opcion) {
        const nuevoOption = document.createElement('option');
        nuevoOption.value = opcion.value;
        nuevoOption.text = opcion.text;
        estadoTrabajador.appendChild(nuevoOption);
    });
}






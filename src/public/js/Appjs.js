document.addEventListener("DOMContentLoaded", function() {
    var inputs = document.querySelectorAll("input");
    inputs.forEach(function(input) {
        input.setAttribute("autocomplete", "off");
    });
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
    });
    })
    .catch((error) => {
        console.error('Error:', error);
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
lblupdateEmpresa = document.querySelector('#updatelblEmpresa');
inputBuscarEmpresa = document.querySelector('#buscarempresa');
tablabody = document.querySelector('#tbody');
tablaEmpresa = document.querySelector('#tablaEmpresa');
let valorcelda='';

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

function ocultarLabel(lblcambio) {
    const lbl=lblcambio;
    setTimeout(() => {
        lbl.classList.remove('alertlbl');
        lbl.classList.remove('confirmtlbl');      
        lbl.classList.remove('alert'); 
        lbl.textContent='';
    }, 1500); // 3 segundos
}

$(document).on("blur","#tbody td[data-id]",function(event){  
    let valor=this.innerHTML;
    console.log(valor,valorcelda);
    let id =event.currentTarget.dataset.id;  //obtener el valor del data-id    
    if (valor != valorcelda)
    {
        if (valor!='<br>'&& valor!='')
        {        
            updateEmpresa(event.currentTarget.id,id,valor);
            const celdas = document.querySelectorAll('td[contenteditable="true"]');
            celdas.forEach(celda => {
                celda.setAttribute('autocorrect', 'off');
                celda.setAttribute('autocomplete', 'off');
                celda.setAttribute('autocapitalize', 'off');
                celda.setAttribute('spellcheck', 'false');
            });
        // Deshabilitar autocorrección, autocompletado y capitalización automática
     
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

tablabody.addEventListener('click', function(event) {  
    if (event.target.tagName === 'TD') {       
         valorcelda = event.target.innerText;       
    }
});

inputBuscarEmpresa.addEventListener('keyup',()=>{   
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
    });
    })
    .catch((error) => {
        console.error('Error:', error);
});

});

razonsocialCentro = document.querySelector('#razonsocialCentro');
CIFCentro = document.querySelector('#CIFCentro');
let nidEmpresa=0;

const centro = document.querySelector('#listaCentros'); 

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

centro.addEventListener('keydown', function(event) {   
    if (event.key === 'Escape') {

        const containerCentros = 'containerCentros';
        const containerCentrosSi = 'containerCentrosSi';    
        centro.classList.add(containerCentros);
        centro.classList.remove(containerCentrosSi);
    }
});

function cargartablaEmpresa(item){
  //aqui es el cargar
    const fila = tablabody.insertRow();//se crea una nueva fila           
    const CIF_ = fila.insertCell(0);//primer columna
    const tdrazonSocial_= fila.insertCell(1);//primer columna
    const tdgrupoEmpresarial_= fila.insertCell(2);//primer columna
    const tdCNAE_= fila.insertCell(3);//primer columna
    const tddescripcionCNAE_= fila.insertCell(4);//primer columna
    const tdntrabajadorEmpresa_= fila.insertCell(5);//primer columna
    const tddireccionEmpresa_= fila.insertCell(6);//primer columna
    const tdencargadoEmpresa_= fila.insertCell(7);//primer columna
    const tdemail_= fila.insertCell(8);//primer columna
    const tdtelefono_= fila.insertCell(9);//primer columna
    const tdciudad_= fila.insertCell(10);//primer columna
    const tdcodigopostal_= fila.insertCell(11);//primer columna
    const tdbutton_= fila.insertCell(12);//botones
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

  btnTrabajador.innerHTML = `<span class="material-symbols-outlined personapron">person_apron </span>`;
  tdbutton_.appendChild(btnTrabajador);
 
  btndatos.innerHTML=`  <span class="material-symbols-outlined gridview">grid_view</span>`;
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
  tdCNAE_.setAttribute('data-id', item.idEmpresa);
  tdCNAE_.id =`tdCNAE`;
  tdCNAE_.contentEditable = true;
  tdCNAE_.textContent = item.CNAE;  
  //
  tddescripcionCNAE_.setAttribute('data-id', item.idEmpresa);
  tddescripcionCNAE_.id =`tddescripcionCNAE`;
  tddescripcionCNAE_.contentEditable = true;
  tddescripcionCNAE_.textContent = item.descripcionCNAE;  
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

btnCancelarCentro = document.querySelector('#cancelarCentro');

btnCancelarCentro.addEventListener('click',()=>{        
    const containerCentros = 'containerCentros';
    const containerCentrosSi = 'containerCentrosSi';    
    centro.classList.add(containerCentros);
    centro.classList.remove(containerCentrosSi);
});
//no funciona por el id verificar
// function getEmpresaCentro(id){
//     console.log(id.value);
//     const data= {id};
//     fetch('/empresas/obtener', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data.rowsAffected);        
       
       
//     })
//     .catch((error) => {
//         console.error('Error:', error);
// });
// }

btnRegistroCentro = document.querySelector('#registrarCentro');
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
tablaCentro = document.querySelector('#tablaCentro');
lblupdateCentro = document.querySelector('#updatelblCentro');
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
                    txtmessageCentro.textContent =`LA EMPRESA YA SE ENCUENTRA REGISTRADA EN LA BASE DE DATOS`;
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

function cargartablaCentro(item){
    //aqui es el cargar
    
    const fila = tablabodyC.insertRow();//se crea una nueva fila           
    const tdnombrecentro_ = fila.insertCell(0);//primer columna
    const tdencargadocentro_= fila.insertCell(1);//primer columna
    const tdciudadcentro_= fila.insertCell(2);//primer columna
    const tdcp_= fila.insertCell(3);//primer columna
    const tddireccioncentro_= fila.insertCell(4);//primer columna
    const tdtelefonocentro_= fila.insertCell(5);//primer columna
    const tdemailcentro_= fila.insertCell(6);//primer columna
    const tdntrabajadorescentro_= fila.insertCell(7);//primer columna     
    let aTrabajadores = document.createElement("a")  
    aTrabajadores.innerHTML=`Lista Trabajadores: ${item.ntrabajadorCentro} `;
    aTrabajadores.id = item.idEmpresa;  
    tdntrabajadorescentro_.classList.add('centrarfila');
    tdntrabajadorescentro_.appendChild(aTrabajadores);
    aTrabajadores.addEventListener("click", () => {
       
    });
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

}

$(document).on("blur","#tbodyC td[data-id]",function(event){  
    let valor=this.innerHTML;
    
    let campo=event.target.id;
    let id =event.currentTarget.dataset.id;  //obtener el valor del data-id    

    if (valor!=valorcelda)
    if (valor!='<br>'&& valor!='')
    {  
       console.log(valor,32);
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

});

tablaCentro.addEventListener('click', function(event) {  
    if (event.target.tagName === 'TD') {       
         valorcelda = event.target.innerText;   
         console.log(valorcelda);    
    }
});

function updateCentro(atributo,id,valor){//para actualizar solo enviamos un valor no todo
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
        console.log(data.rowsAffected);
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

/*AQUI EL  REGISTRO DE EMPRESAS*/
especialidad = document.querySelector('#especialidad');
tablabody = document.querySelector('#tbody');
dni = document.querySelector('#dni');
nombres= document.querySelector('#nombre');
apellidos = document.querySelector('#apellidos');
telefono = document.querySelector('#telefono');
email= document.querySelector('#email');
titulacion= document.querySelector('#titulacion');
especialidad= document.querySelector('#especialidad');
ubicacion = document.querySelector('#ubicacion');
hrsanual = document.querySelector('#hrsanual');
txtmessageUsuario = document.querySelector('#message');
buscarUsuario = document.querySelector('#buscarUsuario');
btnCancelar = document.querySelector('#cancelarUsuario');
btnRegistrar = document.querySelector('#registrarUsuario');
lblupdateUsuario = document.querySelector('#updatelblUsuario');
mostrarUsuario = document.querySelector('.mostrarUsuario');
containerMostrarUsuariosSi = document.querySelector('.containerMostrarUsuariosSi');
btnCambioCerrarUsuario = document.querySelector('#btnCambioCerrarUsuario');
btnCambioUsuario = document.querySelector('#btnCambioUsuario');
CambioEstado = document.querySelector('#CambioEstado');
valorcelda ='';
nidUsuario='';
containerUsuarioModificar = document.querySelector('#containerUsuarioModificar');
//SE CARGA AL INICIAR LA PAGINA
btnCancelar.addEventListener('click',limpiarRegistroUsuario);
btnCambioCerrarUsuario.addEventListener('click',()=>{
        
        containerUsuarioModificar.classList.remove('containerMostrarUsuariosSi');
        containerUsuarioModificar.classList.add('containerMostrarUsuarios');
});
document.addEventListener("DOMContentLoaded", function() {
    var inputs = document.querySelectorAll("input");
    inputs.forEach(function(input) {
        input.setAttribute("autocomplete", "off");
    });
    cargarListaUsuario();
    cargarEspecialidad(especialidad);
});
//SE CARGAR TODO LA TABLA USUARIO
function limpiarRegistroUsuario(){
    dni.value='';
    nombres.value='';
    apellidos.value='';
    telefono.value='';
    email.value='';
    titulacion.value='';
    
    ubicacion.value='';
    hrsanual.value='';
}
function cargarEspecialidad(select){
    const data= {novalor:'0'};   
    fetch('/especialidad', {
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
            nuevoOption.value =item.idEspecialidad;
            nuevoOption.text = item.Especialidad;
            select.appendChild(nuevoOption);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
});

}

function cargarListaUsuario()
{
    const data= {search:buscarUsuario.value};   
    fetch('/searchUsuario', {
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
        cargartablaUsuario(item);       
    });
    })
    .catch((error) => {
        console.error('Error:', error);
});
}
buscarUsuario.addEventListener('keyup',()=>{   
    const data= {search:buscarUsuario.value.trim()};   
    fetch('/searchUsuario', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {      
        console.log(data);
       tablabody.innerHTML='';
        data.forEach(item => {        
        cargartablaUsuario(item);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
});

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

btnRegistrar.addEventListener('click',()=>{
    numero=false;  
    validarNumero(hrsanual.value)?numero=false:numero=true
    hrsanual.value=hrsanual.value.replace(',','.');
    if(dni.value!='' && nombres.value!='' && apellidos.value!='' && telefono.value!='' && email.value!='' && titulacion.value!='' && especialidad.value!='' && ubicacion.value!='' && hrsanual.value!='')
    {
        const data= {
            nif:dni.value.trim(),
            nombre:nombres.value.trim(),
            apellidos:apellidos.value.trim(),
            telefono:telefono.value.trim(),
            email:email.value.trim(),
            titulacion:titulacion.value.trim(),
            especialidad:especialidad.value,
            ubicacion:ubicacion.value.trim(),
            hrsanual:hrsanual.value
        };   
        fetch('/registrarUsuario', {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {      
        console.log(data);
        tablabody.innerHTML='';          
            cargarListaUsuario()
      
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    }
    else
    {
        txtmessageUsuario.classList.remove('confirm');
        txtmessageUsuario.classList.add('alert');
        txtmessageUsuario.textContent=`SE REQUIEREN DATOS PARA EL REGISTRO`;                  
        ocultarLabel(txtmessageUsuario);
    }
});
function cargarEspecialidad(select){
    const data= {novalor:'0'};   
    fetch('/cargarEspecialidad', {
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
            nuevoOption.value =item.idEspecialidad;
            nuevoOption.text = item.Especialidad;
            select.appendChild(nuevoOption);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
});

}

function cargartablaUsuario(item){
    //aqui es el cargar
    const fila = tablabody.insertRow();//se crea una nueva fila           
    const tdnif_ = fila.insertCell(0);//primer columna
    const tdnombre_= fila.insertCell(1);//primer columna
    const tdapellidos_= fila.insertCell(2);//primer columna
    const tdtelefono_= fila.insertCell(3);//primer columna    
    const tdemail_= fila.insertCell(4);//primer columna
    const tdtitulacion_= fila.insertCell(5);//primer columna
    const tdEspecialidad_= fila.insertCell(6);//primer columna
    const tdUbicacion_= fila.insertCell(7);//primer columna
    const tdHrAnual_= fila.insertCell(8);//primer columna
    const tdregistro_= fila.insertCell(9);//primer columna
    const tdestado_= fila.insertCell(10);//primer columna
    const tdbutton_= fila.insertCell(11);//botones
    let btnModificarUsuario = document.createElement("button");    
    let btnPassUsuario = document.createElement("button");    
    btnModificarUsuario.innerHTML=`<span class="material-symbols-outlined update">manage_accounts</span>`;
    btnModificarUsuario.id = item.idUsuario;
    tdbutton_.appendChild(btnModificarUsuario);
    btnModificarUsuario.addEventListener("click", () => {
        containerUsuarioModificar.classList.remove('containerMostrarUsuarios');
        containerUsuarioModificar.classList.add('containerMostrarUsuariosSi');
        document.querySelector('#Especialidad').value=item.Especialidad;
        document.querySelector('#EstadoActual').value=item.estado;
        CambioEspecialidad = document.querySelector('#CambioEspecialidad');
        cargarEspecialidad(CambioEspecialidad);
        nidUsuario=item.idUsuario;
    });  
    btnPassUsuario.innerHTML=`<span class="material-symbols-outlined pass">password</span>`;
    btnPassUsuario.id = item.idUsuario;
    tdbutton_.appendChild(btnPassUsuario);
    btnPassUsuario.addEventListener("click", () => {
    console.log('hola 2');    
    });  
    tdnif_.setAttribute('data-id', item.idUsuario);
    tdnif_.id =`tdnif_`;
    tdnif_.contentEditable = true;
    tdnif_.textContent = item.nif;  
    // //
    tdnombre_.setAttribute('data-id', item.idUsuario);
    tdnombre_.id =`tdnombre_`;
    tdnombre_.contentEditable = true;
    tdnombre_.textContent = item.nombre;  
    // //
    tdapellidos_.setAttribute('data-id', item.idUsuario);
    tdapellidos_.id =`tdapellidos_`;
    tdapellidos_.contentEditable = true;
    tdapellidos_.textContent = item.apellidos;  
    //
    tdtelefono_.setAttribute('data-id', item.idUsuario);
    tdtelefono_.id =`tdtelefono_`;
    tdtelefono_.contentEditable = true;
    tdtelefono_.textContent = item.telefono;  
    tdtelefono_.classList.add('derecha');
    //
    tdemail_.setAttribute('data-id', item.idUsuario);
    tdemail_.id =`tdemail_`;
    tdemail_.contentEditable = true;
    tdemail_.textContent = item.email;  
    //   
    tdtitulacion_.setAttribute('data-id', item.idUsuario);
    tdtitulacion_.id =`tdtitulacion_`;
    tdtitulacion_.contentEditable = true;
    tdtitulacion_.textContent = item.titulacion;  
    tdtitulacion_.classList.add('celdaizq');
    //        
    tdEspecialidad_.setAttribute('data-id', item.idUsuario);
    tdEspecialidad_.id =`tdEspecialidad_`;   
    tdEspecialidad_.textContent = item.Especialidad;  
    //
    tdUbicacion_.setAttribute('data-id', item.idUsuario);
    tdUbicacion_.id =`tdUbicacion_`;
    tdUbicacion_.contentEditable = true;
    tdUbicacion_.textContent = item.Ubicacion;  
    // 
    tdHrAnual_.setAttribute('data-id', item.idUsuario);
    tdHrAnual_.id =`tdHrAnual_`;    
    tdHrAnual_.textContent = item.HrAnual;  
    tdHrAnual_.contentEditable = true;
    tdHrAnual_.classList.add('derecha');
    //
    tdregistro_.setAttribute('data-id', item.idUsuario);
    tdregistro_.id =`tdregistro_`;
    
    tdregistro_.textContent = item.registro;  
    tdregistro_.classList.add('celdaizq');
    //
    tdestado_.setAttribute('data-id', item.idUsuario);
    tdestado_.id =`tdestado_`;    
    tdestado_.textContent = item.estado;    
    //  
 
}

$(document).on("blur","#tbody td[data-id]",function(event){  
    let valor=this.innerHTML.trim();
    let id =event.currentTarget.dataset.id;  //obtener el valor del data-id    
    numero=false;    
  
    if (event.currentTarget.id =='tdHrAnual_')
    {  
        valor=valor.replace(',','.');
        this.innerText=valor.replace(',','.');
        validarNumero(valor)?numero=false:numero=true
    }
    
    if (valor != valorcelda && numero==false)
    {      
        if (valor!='<br>'&& valor!='')
        {        
            updateUsuario(event.currentTarget.id,id,valor);   
        }
        else
        {
            lblupdateUsuario.classList.remove('confirmlbl');
            lblupdateUsuario.textContent=`DATOS NO VALIDOS`;                
            lblupdateUsuario.classList.add('alertlbl');
            this.innerHTML=valorcelda;
            ocultarLabel(lblupdateUsuario);
        }
    }
    else{
        this.innerHTML=valorcelda;
    }
   
});
btnCambioUsuario.addEventListener('click',()=>{  
    est='D';
    
    CambioEstado.value == 'H' ? est='H': est='D';
    const data= {idEspecialidad:CambioEspecialidad.value,estado:est,idUsuario:nidUsuario};        
    Especialidad.value=CambioEspecialidad.options[CambioEspecialidad.selectedIndex].text;
    EstadoActual.value = CambioEstado.options[CambioEstado.selectedIndex].text;       
       fetch('/updateEstadoEspeacialidadUsuario', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {   
        cargarListaUsuario();        
        lblupdateCambiarUsuario.textContent=`SE REALIZO LA MODIFICACION`;
        lblupdateCambiarUsuario.classList.add('confirm');//clase para empresa y centor es lo mismo
        ocultarLabel(lblupdateCambiarUsuario);    
       
     })
    .catch((error) => {
        console.error('Error:', error);
    });  
    
});
//CAPTURAR LA CELDA
tablabody.addEventListener('click', function(event) {  
    if (event.target.tagName === 'TD') {       
         valorcelda = event.target.innerText; 
          
    }
});

//MODIFICAR USUARIO
function updateUsuario(atributo,id,valor){
    const data= {atributo,id,valor};
    fetch('/updateUsuario', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if(data.rowsAffected){
            lblupdateUsuario.classList.remove('alertlbl');
            lblupdateUsuario.textContent=`SE REALIZO LA MODIFICACION`;
            lblupdateUsuario.classList.add('confirmlbl');
        }
        else
        {
            lblupdateUsuario.classList.add('confirmlbl');
            lblupdateUsuario.textContent=`NO SE PUDO REALIZAR LA MODIFICACION`;                         
            lblupdateUsuario.classList.remove('alertlbl');
        }
        ocultarLabel(lblupdateUsuario);
    })
    .catch((error) => {
        console.error('Error:', error);
});
}

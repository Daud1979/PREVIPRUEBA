//BOTON
btncancelarCNAE = document.querySelector('#cancelarCNAE');
btnregistrarCNAE = document.querySelector('#registrarCNAE');
txtbuscarCNAE = document.querySelector('#buscarCNAE');
//input
txtcodigoCNAE =document.querySelector('#codigoCNAE');
txtdescripcionCNAE =document.querySelector('#descripcionCNAE');
txttarifaCNAE =document.querySelector('#tarifaCNAE');
txtcomplejidadCNAE =document.querySelector('#complejidadCNAE');
txtcodcomplejidadCNAE =document.querySelector('#codcomplejidad');
txtgrupo = document.querySelector('#grupo');
txtmessage = document.querySelector('#message');
tablabody= document.querySelector('#tbody');
lblupdateCNAE = document.querySelector('#updatelblCNAE');

valorcelda='';
//CARGAR AL PRINCIPIO
document.addEventListener("DOMContentLoaded", function() {
    var inputs = document.querySelectorAll("input");
    inputs.forEach(function(input) {
         input.setAttribute("autocomplete", "off");
    });
    cargarListaCNAE();   
});
//REGISTRAR CNAE
btnregistrarCNAE.addEventListener('click',()=>{
    
    if (txtcodigoCNAE.value != '' && txtdescripcionCNAE.value != '' && txttarifaCNAE.value != '' && txtcomplejidadCNAE.value != '' && txtcodcomplejidadCNAE.value != '' && txtgrupo.value != ''  )
    {        
        const data = {
            CNAE:txtcodigoCNAE.value,
            descripcionCNAE:txtdescripcionCNAE.value,
            tarifa:txttarifaCNAE.value.replace(',','.'),
            complejidadPreventiva:txtcomplejidadCNAE.value,
            codigoComplejidad:txtcodcomplejidadCNAE.value,
            grupo:txtgrupo.value
            };         
        fetch('/registrarCNAE',{
        method:'POST',
        headers:{
           'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
        }).then(response=>response.json()).then(data=>{
            limpiarinput();
            txtmessage.classList.remove('alert');
            txtmessage.textContent =`SE REGISTRO CORRECTAMENTE A LA BASE DE DATOS`;
            txtmessage.classList.add('confirm');
            cargarListaCNAE();   
        }).catch((error) => {
            console.error('Error:', error);
        });          
    }
    else
    {
        txtmessage.classList.remove('confirm');
        txtmessage.classList.add('alert');
        txtmessage.textContent=`SE REQUIEREN DATOS PARA EL REGISTRO`;                  
        ocultarLabel(txtmessage); 
    }
});
//CANCELAR FORMULARIO CNAE
btncancelarCNAE.addEventListener('click',()=>{
      limpiarinput();
});
//LIMPIAR LOS INPUT
function limpiarinput(){
    txtcodigoCNAE.value='';
    txtdescripcionCNAE.value='';
    txttarifaCNAE.value='';
    txtcomplejidadCNAE.value='';
    txtcodcomplejidadCNAE.value='';
    txtgrupo.value='';
}
//OCULTAR MESAJE
function ocultarLabel(lblcambio) {
    const lbl=lblcambio;
    setTimeout(() => {
        lbl.classList.remove('alertlbl');
        lbl.classList.remove('confirmtlbl');      
        lbl.classList.remove('alert'); 
        lbl.textContent='';
    }, 1500); // 3 segundos
}
//CARGAR LISTA DE CNAE
function cargarListaCNAE()
{
    const data= {search:txtbuscarCNAE.value.trim()};   
    fetch('/searchCNAE', {
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
       cargartabla(item);        
    });
    })
    .catch((error) => {
        console.error('Error:', error);
});
}

function cargartabla(item){
    //aqui es el cargar
    const fila = tablabody.insertRow();//se crea una nueva fila           
    const tdCNAE_ =                 fila.insertCell(0);//primer columna
    const tddescripcionCNAE_=       fila.insertCell(1);//primer columna
    const tdtarifaCNAE_=            fila.insertCell(2);//primer columna
    const tdcomplejidadPreventiva_= fila.insertCell(3);//primer columna    
    const tdcodigoComplejidad_=     fila.insertCell(4);//primer columna
    const tdgrupo_=                 fila.insertCell(5);//primer columna      
    const tdbutton_=                fila.insertCell(6);//botones
    let btnEliminar= document.createElement("button")
    
    tdCNAE_.setAttribute('data-id', item.idCNAE);
    tdCNAE_.id =`tdCNAE_`;
    tdCNAE_.contentEditable = true;
    tdCNAE_.textContent = item.CNAE;  
    
    tddescripcionCNAE_.setAttribute('data-id', item.idCNAE);
    tddescripcionCNAE_.id =`tddescripcionCNAE_`;
    tddescripcionCNAE_.contentEditable = true;
    tddescripcionCNAE_.textContent = item.descripcionCNAE;  
    
    tdtarifaCNAE_.setAttribute('data-id', item.idCNAE);
    tdtarifaCNAE_.id =`tdtarifaCNAE_`;
    tdtarifaCNAE_.contentEditable = true;
    tdtarifaCNAE_.classList.add('derecha');
    tdtarifaCNAE_.textContent = item.tarifa;  

    tdcomplejidadPreventiva_.setAttribute('data-id', item.idCNAE);
    tdcomplejidadPreventiva_.id =`tdcomplejidadPreventiva_`;
    tdcomplejidadPreventiva_.contentEditable = true;
    tdcomplejidadPreventiva_.textContent = item.complejidadPreventiva;  

    tdcodigoComplejidad_.setAttribute('data-id', item.idCNAE);
    tdcodigoComplejidad_.id =`tdcodigoComplejidad_`;
    tdcodigoComplejidad_.contentEditable = true;
    tdcodigoComplejidad_.textContent = item.codigoComplejidad; 

    tdgrupo_.setAttribute('data-id', item.idCNAE);
    tdgrupo_.id =`tdgrupo_`;
    tdgrupo_.contentEditable = true;
    tdgrupo_.classList.add('centrar');
    tdgrupo_.textContent = item.grupo; 
    
    btnEliminar.innerHTML=` <span class="material-symbols-outlined deletes">  delete </span>`;
    btnEliminar.id = item.idCNAE;
    tdbutton_.classList.add('centrar');
    tdbutton_.appendChild(btnEliminar);
    btnEliminar.addEventListener("click", () => {
        var userConfirmed = confirm('¿ ESTA SEGURO DE ELIMINAR EL CNAE ?');
        if (userConfirmed) {
            eliminarCNAE(item.idCNAE);
        } 
    });
}
//BUSCAR EN CNAE
  txtbuscarCNAE.addEventListener('keyup',()=>{   
   
    cargarListaCNAE();

});

//ELIMINAR UN ELEMENTO CNAE
function eliminarCNAE(idCNAE){
    const data = {
       idCNAE:idCNAE
        };         
    fetch('/eliminarCNAE',{
    method:'POST',
    headers:{
       'Content-Type':'application/json'
    },
    body: JSON.stringify(data)
    }).then(response=>response.json()).then(data=>{        
        cargarListaCNAE();   
    }).catch((error) => {
        console.error('Error:', error);
    });
}

//CAPTURAR LA CELDA
tablabody.addEventListener('click', function(event) {  
    if (event.target.tagName === 'TD') {       
         valorcelda = event.target.innerText; 
         console.log(valorcelda);      
    }
});

//MODIFICAR LOS DATOS DE CELDAS
function validarNumero(input) {
    if (typeof input === 'number' && !isNaN(input)) {
        return true;
    } else if (typeof input === 'string' && input.trim() !== '' && !isNaN(Number(input))) {
        return true;
    }
    return false;
}

$(document).on("blur","#tbody td[data-id]",function(event){  
    let valor=this.innerHTML.trim();  
    numero=false; 
    let id =event.currentTarget.dataset.id;  //obtener el valor del data-id    
    if (event.currentTarget.id =='tdtarifaCNAE_')
    {
        validarNumero(valor)?numero=false:numero=true
        valor=valor.replace(',','.');
    }   
    if (valor != valorcelda && numero==false)
    {      
        if (valor!='<br>'&& valor!='')
        {        
            updateCNAE(event.currentTarget.id,id,valor);   
        }
        else
        {
            lblupdateCNAE.classList.remove('confirmlbl');
            lblupdateCNAE.textContent=`DATOS NO VALIDOS`;                
            lblupdateCNAE.classList.add('alertlbl');
            this.innerHTML=valorcelda;
            ocultarLabel(lblupdateCNAE);
        }
    }
    else{
        this.innerHTML=valorcelda;
    }   
});

//FUNCION DE ACTUALIZAR captionSide: 
function updateCNAE(atributo,id,valor){
    const data= {atributo,id,valor};
    fetch('/updateCNAE', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if(data.rowsAffected){
            lblupdateCNAE.classList.remove('alertlbl');
            lblupdateCNAE.textContent=`SE REALIZO LA MODIFICACION`;
            lblupdateCNAE.classList.add('confirmlbl');
        }
        else
        {
            lblupdateCNAE.classList.add('confirmlbl');
            lblupdateCNAE.textContent=`NO SE PUDO REALIZAR LA MODIFICACION`;                         
            lblupdateCNAE.classList.remove('alertlbl');
        }
        ocultarLabel(lblupdateCNAE);
    })
    .catch((error) => {
        console.error('Error:', error);
});
}
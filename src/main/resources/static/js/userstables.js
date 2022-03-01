// Call the dataTables jQuery plugin
$(document).ready(function() {
    getUsers();
  $('#usersTable').DataTable();
  actualizarEmailUsuario();
});

function actualizarEmailUsuario(){
document.getElementById("txt-email-usuario").innerHTML=localStorage.email;
}

function getHeaders() {
return {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': localStorage.token
       }
}
async function getUsers(){

const request = await fetch('api/usuarios',{
    method: 'GET',
    headers: getHeaders()
   });
const usuarios = await request.json();
let listadoHtml='';

  for (let usuario of usuarios) {
    let botonEliminar = '<a href="#" onclick="eliminarUsuario(' + usuario.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';

    let telefonoTexto = usuario.telefono == null ? '-' : usuario.telefono;
    let usuarioHtml = '<tr><td>'+usuario.id+'</td><td>' + usuario.nombre + ' ' + usuario.apellido + '</td><td>'
                    + usuario.email+'</td><td>'+telefonoTexto
                    + '</td><td>' + botonEliminar + '</td></tr>';
    listadoHtml += usuarioHtml;
  }
document.querySelector('#usersTable tbody').innerHTML = listadoHtml;
console.log(usuarios);
}

async function eliminarUsuario(id){
    if(!confirm('Desea eliminar este usuario?')){
    return;
    }
    const request = await fetch('api/usuarios/' + id,{
    method:'DELETE',
    headers: getHeaders()
    });
    location.reload();
}

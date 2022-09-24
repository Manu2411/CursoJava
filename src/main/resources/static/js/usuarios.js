// Call the dataTables jQuery plugin
$(document).ready(function() {
  cargarUsuarios();
  $('#usuarios').DataTable();
});

function getHeaders(){
       return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        };
}


/*Funcion que solicita los datos guardadis de los usuarios
  de forma asincrona.
*/
async function cargarUsuarios(){
      const request = await fetch('api/usuarios', {
        method: 'GET',
        headers: getHeaders()
      });
      const usuarios = await request.json();

      //console.log(usuarios);

      let listadoHtml = '';

      //Se listan los datos para mostrarlos en forma ordenada en la tabla correspondiente
      for(let usuario of usuarios){
       let botonEliminar = '<a href="#" onclick="eliminarUsuario(' + usuario.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';

       let telefonoTexto = (usuario.telefono == null || usuario.telefono == '') ? '-' : usuario.telefono;

       let usuarioHtml = '<tr><td>'+ usuario.id +'</td><td>' + usuario.nombre + ' ' + usuario.apellido + '</td><td>'
       + usuario.email + '</td><td>'
       + telefonoTexto
       + '</td><td>' + botonEliminar +'</td></tr>'

        listadoHtml += usuarioHtml;
      }

      //Se crean las filas para los datos extraidos de la base de datos
      document.querySelector('#usuarios tbody').outerHTML = listadoHtml;

}

async function eliminarUsuario(id){

    if(!confirm('¿Desea eliminar este usuario?')){
        return;
    }

    const request = await fetch('api/usuarios/' + id, {
            method: 'DELETE',
            headers: getHeaders()
          });

    location.reload();
}

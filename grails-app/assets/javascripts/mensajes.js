
var convSel = null;		//Variable para controlar la conversacion actual.


//AJAX PARA CARGAR LOS MENSAJES DE UNA CONVERSACION Y MOSTRARLOS.
$(document).on('click','.contacto',function(){
	convSel = $(this).text();		//Obtengo UserName
	$.ajax({
		url: 'buscarMensajes',			//Llamo a buscarUsuario
		type: 'POST',
		dataType: 'json',					//Que el controlador me devuelva el objeto de tipo JSON.
		data: {
			userName: convSel			//Envio el nombre de usuario que tengo seleccionado.
		},
		success: function(data) {
			console.log(data);
			$('#mensajes').empty();
			for(obj in data){					
				$('#mensajes').append("<div class='mensaje'>"+data[obj].contenido+"</div>");	//En caso de ser exitoso el request, iterar por cada objeto(mensaje) y mostrar.
			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
        	alert(xhr.status);
        	alert(thrownError);
      	}
	});
});


//AJAX PARA CREAR UN NUEVO MENSAJE Y MOSTRARLO EN LA CONVERSACION.
$(document).on('click','#cm',function(event){
	event.preventDefault();
	if (convSel == null){
	
	}
	else{
		$.ajax({
			url: 'crearMensaje',			//Llamo a crearMensaje
			type: 'POST',
			dataType: 'text',					//Que el controlador me devuelva el objeto de tipo texto.
			data: {
				userName: convSel,			//Envio el nombre de usuario que tengo seleccionado.
				contenido: $('#contenido').val(),
			},
			success: function(data) {
				$('#mensajes').append("<div class='mensaje'>"+data+"</div>");		//Agrega el nuevo mensaje al gsp
			},
			error: function (xhr, ajaxOptions, thrownError) {
				alert(xhr.status);
				alert(thrownError);
			}
		});
	}
});


//FALTA CREAR UNA INTERFAZ PARA QUE EL USUARIO SELECCIONE A UN AMIGO O TODOS EN ESTE CASO.


//AJAX PARA CREAR UNA CONVERSACION Y MOSTRARLO EN LA PAGINA.
$(document).on('click','#cc',function(event){
	event.preventDefault();
	var user = $( "#friendSelect option:selected").text();		//Obtengo el nombre de usuario del destinatario en la conversacion desde el select
	$.ajax({
		url: 'crearConversacion',			//Llamo a crearConversacion
		type: 'POST',
		dataType: 'json',					//Que el controlador me devuelva el objeto de tipo texto.
		data: {
			userName: user,			//Envio el nombre de usuario que tengo seleccionado.
		},
		success: function(data) {		//Si creo la conversacion exitosamente.
			//Verifica el nombre de usuario  en sesion para identificar el otro usuario de la conversacion e imprimir en pantalla ese nombre.
			if (data.u1.nombre == nomUsuario){
				convSel = $(".contacto:contains("+data.u2.nombre+")").html();
				if (convSel.length < 1){
					$('#contactos').append("<div class='contacto'>"+data.u2.nombre+"</div>");	
				}
				convSel = $('.contacto:contains('+data.u2.nombre+')').html();		//dejar la conversacion seleccionada de una vez. Al escribir un mensaje queda asociado a esta conversacion
			}
			else{
				convSel = $(".contacto:contains("+data.u1.nombre+")").html();
				if (convSel.length < 1){
					$('#contactos').append("<div class='contacto'>"+data.u1.nombre+"</div>");	//Mostrar el nombre del destinatario en pantalla.
				}
				convSel = $('.contacto:contains('+data.u1.nombre+')').html();		//dejar la conversacion seleccionada de una vez.Al escribir un mensaje queda asociado a esta conversacion
			}
		},
		error: function (xhr, ajaxOptions, thrownError) {
			alert(xhr.status);
			alert(thrownError);
		}
	});
});

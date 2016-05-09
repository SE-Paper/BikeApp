package bikeapp

import grails.plugin.springsecurity.annotation.Secured

@Secured(['ROLE_USUARIO'])
class EventoController {

   def sesionService

   def index() {
      def usuario = sesionService.usuarioEnSesion()
      def eventos = UsuarioEvento.findAllByUsuario(usuario).collect{ it.evento }
      def fechaAc = new Date()
      eventos = eventos.findAll { it.fecha.compareTo(fechaAc) >= 0 }
      //print eventos
      [eventos:eventos]
   }

   def obtenerMisEventos(String tp){
      def usuario = sesionService.usuarioEnSesion()
      def eventos = UsuarioEvento.findAllByUsuario(usuario).collect{ it.evento }
      def fechaAc = new Date()
      if( tp == "ACTIVOS") {
         eventos = eventos.findAll { it.fecha.compareTo(fechaAc) >= 0 }
      }else{
         eventos = eventos.findAll { it.fecha.compareTo(fechaAc) < 0 }
      }
      //print eventos
      render(template:"listaEventos",model:[eventos:eventos])  
   }

   def obtenerEventos(String tp){
      def usuario = sesionService.usuarioEnSesion()
      def eventos = UsuarioEvento.findAll()
      eventos = eventos.findAll{ it.usuario != usuario }
      eventos = eventos.collect{ it.evento }
      def fechaAc = new Date()
      if(tp == "ACTIVOS") {
         eventos = eventos.findAll { it.fecha.compareTo(fechaAc) >= 0 }
      }else{
         eventos = eventos.findAll { it.fecha.compareTo(fechaAc) < 0 }
      }
      render(template:"listaEventos",model:[eventos:eventos])  
   }

   def nuevoEvento(){
      def rutas = Ruta.list()
      [rutas:rutas]
      //respond new Evento(params)
   }

   def guardar(Evento instance){
      def usuario = sesionService.usuarioEnSesion()
      def puntoInteres = new PuntoInteres()
      puntoInteres.usuario = usuario
      puntoInteres.lat = Double.parseDouble( params["lat"] )
      puntoInteres.lng = Double.parseDouble( params["lng"] )
      puntoInteres.tipo = "PUNTO_ENCUENTRO"

      puntoInteres.save flush:true,failOnError:true
      instance.puntoEncuentro = puntoInteres
      instance.descripcion = params["descripcion"]
      instance.lider = usuario
      instance.fecha = params["fecha"]
      instance.nombre = params["nombre"]
      instance.save flush:true,failOnError:true
      if( params["ruta"] != "Ninguna" ){
         instance.ruta = Ruta.findById(params["ruta"]);
      }

      def usuarioEvento = new UsuarioEvento()
      usuarioEvento.usuario = usuario
      usuarioEvento.evento = instance
      usuarioEvento.save flush:true,failOnError:true

      redirect(action:"index")
   }

   def mostrarEvento(){
      def ev = Evento.findById(params["evento"])
      def asistentes = UsuarioEvento.findAllByEvento(ev)
      def puntosRuta = ( ev.ruta == null )? [] : PuntoInteres.findAllByRuta( ev.ruta )
      def asis = !asistentes.any{ it.usuario == sesionService.usuarioEnSesion() }
      def fechaAc = new Date()
      def valido = ev.fecha.compareTo(fechaAc) >= 0
      [evento:ev,asistentes:asistentes,asis:asis,puntosRuta:puntosRuta,valido:valido]
   }

   def resumenEvento(){
   }

   def registrarme(){
      def evento = Evento.findById(params["evento"])
      def usuario = sesionService.usuarioEnSesion()
      def usuarioEvento = new UsuarioEvento(usuario:usuario,evento:evento)
      usuarioEvento.save flush:true,failOnError:true
      redirect(action:"mostrarEvento",params:[evento:evento.id])
   }
}

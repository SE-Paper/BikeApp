
<div id="modalCrearEvento" class="modal fade" role="dialog">
<div class="modal-dialog">

<g:form url="[resource:instance, action:'guardar']"  enctype="multipart/form-data">

<!-- Modal content-->
<div class="modal-content">
<div class="modal-header">
<button type="button" class="close" data-dismiss="modal">&times;</button>
<h4 class="modal-title">Nuevo Evento</h4>
</div>
<div class="modal-body">

<div class="form-group">
<label for="nombre">Nombre del evento:</label>
<g:textField  required="true" name="nombre" class="form-control" placeholder="Nombre"/>	  
</div>
<div class="form-group">
<label for="descripcion">Descripción del evento:</label>
<g:textArea required="true" name="descripcion" class="form-control" placeholder="Descripción" />					  
</div>

<div class="form-group">
<label for="fecha">Fecha:</label>
<g:datePicker  class="form-control" id="fecha" name="fecha" precision="minute"/>					  
</div>



<ul id="mod-tab1" class="nav nav-tabs">
<li class="active"><a href="#mod-tab1-item1" data-toggle="tab">Punto de Encuentro</a></li>
<li><a href="#mod-tab1-item2" data-toggle="tab" >Mapa de Ruta</a></li>
</ul>



<div class="tab-content">
<div class="tab-pane fade active in" id="mod-tab1-item1">
<div id="mod-map-pe" class="mapa">
</div>
</div>

<div class="tab-pane fade" id="mod-tab1-item2">
<div id="mod-map-rt" class="mapa">
</div>
</div>


</div>


</div>


<div class="modal-footer">
<g:submitButton class="btn btn-submit" name="create"  value="Crear" id="create" />
</div>
</div>


</g:form>

</div>
</div>


<div class="portfolio-items">

<g:each in="${eventos}" >

<div class="col-xs-6 col-sm-4 col-md-3 portfolio-item branded logos">
<div class="portfolio-wrapper">

<div class="portfolio-single">

<div class="portfolio-thumb">
<img src="${assetPath(src:'photo.gif')}" class="img-responsive" alt="">
</div>

<div class="portfolio-view">
<ul class="nav nav-pills">
<li><a href="portfolio-details.html"><i class="fa fa-link"></i></a></li>
<li><a href="${assetPath(src:'photo.gif')}" data-lightbox="example-set"><i class="fa fa-eye"></i></a></li>
</ul>
</div>

</div>

<div class="portfolio-info ">
<h2>
${it.lider.nombre}
</h2>
</div>

</div>
</div>

</g:each>

</div>

<div class="portfolio-pagination">
<ul class="pagination">
<li><a href="#">left</a></li>
<li><a href="#">1</a></li>
<li class="active"><a href="#">3</a></li>
<li><a href="#">9</a></li>
<li><a href="#">9</a></li>
<li><a href="#">9</a></li>
<li><a href="#">9</a></li>
<li><a href="#">right</a></li>
</ul>
</div>


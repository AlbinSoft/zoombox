
class ZoomBox {

	constructor(elm) {
		this.ready = false;

		this.elm_wrap  = elm;
		this.elm_zoomed = document.createElement('div');
		this.elm_zoomed.classList.add('zoomed');
		this.elm_wrap.append(this.elm_zoomed);

		this.elm_image = new Image();
		this.elm_image.addEventListener('load', this.preloaded.bind(this));
		this.elm_image.src = this.elm_wrap.href;

		this.elm_wrap.addEventListener('click',      this.click.bind(this));
		this.elm_wrap.addEventListener('mousemove',  this.tmove.bind(this),  { passive: true });
		this.elm_wrap.addEventListener('touchstart', this.tstart.bind(this), { passive: true });
		this.elm_wrap.addEventListener('touchmove',  this.tmove.bind(this),  { passive: true });
		this.elm_wrap.addEventListener('touchend',   this.tend.bind(this),   { passive: true });
	}

	preloaded(evt) {
		this.ready = true;
		this.elm_zoomed.style.setProperty('background-size', this.elm_image.width+'px '+this.elm_image.height+'px');
		this.elm_zoomed.style.setProperty('background-image', 'url('+this.elm_image.src+')');
	}

	click(evt) {
		evt.preventDefault();
	}

	tstart(evt) {
		this.elm_wrap.classList.add('hover');
		this.tmove(evt);
	}

	tmove(evt) {
		if(!this.ready) return;
		var cx  = evt.touches ? evt.touches[0].clientX :  evt.clientX;
		var cy  = evt.touches ? evt.touches[0].clientY :  evt.clientY;
		var bcr = this.elm_wrap.getBoundingClientRect();
		var mx  = cx - bcr.left, px = Math.max(0, Math.min(100, 100 * mx / bcr.width));
		var my  = cy - bcr.top,  py = Math.max(0, Math.min(100, 100 * my / bcr.height));
		this.elm_zoomed.style.setProperty('background-position', px+'% '+py+'%');
	}

	tend(evt) {
		this.elm_wrap.classList.remove('hover');
	}

}

window.addEventListener('DOMContentLoaded', function () {
	document.querySelectorAll('.zoombox').forEach(elm => new ZoomBox(elm));
});

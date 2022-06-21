// Copyright (c) 2022, Roque Vera and contributors
// For license information, please see license.txt

frappe.ui.form.on('Formulario Principal', {
	refresh(frm) {
		var map = frm.get_field("ubicacion").map
		map.setView([-24.9014724,-56.2298799], 7);
		
		$(".leaflet-draw-draw-polyline").remove()
		$(".leaflet-draw-draw-polygon").remove()
		$(".leaflet-draw-draw-rectangle").remove()
		$(".leaflet-draw-draw-circle").remove()
		$(".leaflet-draw-draw-circlemarker").remove()
		$(".leaflet-draw-draw-marker").remove()
		$(".leaflet-draw-edit-edit").remove()
		$(".leaflet-draw-edit-remove").remove()
		
		if (frm.is_new()) {
		    frm.set_value("usuario_del_operador", frappe.user.name)
		    frm.set_value("nombre_del_operador", frappe.user.full_name())
		    
		    navigator.geolocation.getCurrentPosition(function(location) {
    			var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
    			var marker = L.marker(latlng, {id:"ubicacion_marker", draggable:'true'})
    			frm.set_value("ubicacion", JSON.stringify(marker.toGeoJSON()))
    		})
		}
		
		$(".btn-attach").click(() => {
            setTimeout(()=>{
                $(".btn-modal-secondary").hide()
                if ($(".btn-file-upload").length == 4){
                    $(".btn-file-upload").first().remove()
                    $(".btn-file-upload").first().remove()
                    $(".btn-file-upload").first().remove()
                }
            }, 300)
        })
	},

	on_submit: function(frm){
		frappe.db.count('Formulario Principal', {
			filters: {'usuario_del_operador': frappe.user.name}
		}).then(r=>{
			$("#count_indicator").text(r)
		})
	}
});

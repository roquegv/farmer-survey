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
		// $(".leaflet-draw-edit-edit").remove()
		$(".leaflet-draw-edit-remove").remove()

		$(".leaflet-draw-edit-edit").attr("title", "Editar ubicación")
		$(".leaflet-draw-edit-edit").click(function(){
			$("a[title='Save changes']").attr("title", "Guardar cambios").text("Guardar")
			$("a[title='Cancel editing, discards all changes']").attr("title", "Cancelar edición").text("Cancelar")
			$("span:contains('Click cancel to undo changes.')").text("Click en cancelar para deshacer cambios")
			$("span:contains('Drag handles or markers to edit features.')").text("Arrastrar puntos para editar ubicación")
		})
		
		if (frm.is_new()) {
		    frm.set_value("usuario_del_operador", frappe.user.name)
		    frm.set_value("nombre_del_operador", frappe.user.full_name())
		    
		    navigator.geolocation.getCurrentPosition(function(location) {
    			var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
    			var marker = L.marker(latlng, {id:"ubicacion_marker", draggable:'true'})
    			frm.set_value("ubicacion", JSON.stringify(marker.toGeoJSON()))
				frm.set_value("ubicacion_original", JSON.stringify(marker.toGeoJSON()))
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

		frm.set_df_property("fecha", "reqd", 1)
		frm.set_df_property("lugar", "reqd", 1)
		frm.set_df_property("distrito", "reqd", 1)
		frm.set_df_property("finca", "reqd", 1)
		frm.set_df_property("propietario", "reqd", 1)
		frm.set_df_property("ubicacion", "reqd", 1)
		frm.set_df_property("foto_adjunta_1", "reqd", 1)
		frm.set_df_property("foto_adjunta_2", "reqd", 1)
		frm.set_df_property("foto_adjunta_3", "reqd", 1)
		// frm.set_df_property("foto_adjunta_4", "reqd", 1)
		frm.set_df_property("a_quien_vende_sus_frutas", "reqd", 1)
		frm.set_df_property("cantidad_de_plantas_por_finca", "reqd", 1)
		frm.set_df_property("cantidad_por_planta", "reqd", 1)
		// frm.set_df_property("cantidad_por_planta_otro", "reqd", 1)
		frm.set_df_property("con_alguna_enfermedad_o_plaga", "reqd", 1)
		frm.set_df_property("cuantos_anos_tienen_las_plantas_mas_viejas", "reqd", 1)
		frm.set_df_property("cuando_fue_la_ultima_vez_que_planto", "reqd", 1)
		frm.set_df_property("cuantas_plantas", "reqd", 1)
		frm.set_df_property("por_fruta", "reqd", 1)
		frm.set_df_property("por_bolsa", "reqd", 1)
		frm.set_df_property("por_planta", "reqd", 1)
		frm.set_df_property("por_peso", "reqd", 1)
		frm.set_df_property("cuantas_plantas_se_anima_a_planta_y_cuidar", "reqd", 1)

		map.eachLayer((layer) => {
			if (layer instanceof L.Marker){
				layer.remove();
			}
		});
		var geojson = JSON.parse(frm.doc.ubicacion)
		L.geoJSON(geojson).addTo(map);
		frm.refresh_field("ubicacion")

		if (frm.doc.docstatus == 1){
			$(".leaflet-draw-edit-edit").hide()
			$('[data-fieldname="ubicacion"] .control-value').hide()
		}else{
			$(".leaflet-draw-edit-edit").show()
		}
	},

	on_submit: function(frm){
		frappe.db.count('Formulario Principal', {
			filters: {'usuario_del_operador': frappe.user.name}
		}).then(r=>{
			$("#count_indicator").text(r)
		})
	}
});

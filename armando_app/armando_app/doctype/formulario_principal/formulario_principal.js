// Copyright (c) 2022, Roque Vera and contributors
// For license information, please see license.txt

frappe.ui.form.on('Formulario Principal', {
	refresh: function(frm) {
		console.log("refresh");
		var map = frm.get_field("ubicacion").map
		map.setView([-24.9014724,-56.2298799], 7);
		
		$(".leaflet-draw-draw-polyline").remove()
		$(".leaflet-draw-draw-polygon").remove()
		$(".leaflet-draw-draw-rectangle").remove()
		$(".leaflet-draw-draw-circle").remove()
		$(".leaflet-draw-draw-circlemarker").remove()
	},

	after_save: function(frm){
		frappe.db.count('Formulario Principal', {
			filters: {'usuario_del_operador': frappe.user.name}
		}).then(r=>{
			$("#count_indicator").text(r)
		})
	}
});

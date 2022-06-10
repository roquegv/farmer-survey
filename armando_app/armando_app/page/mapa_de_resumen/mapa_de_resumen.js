frappe.pages['mapa-de-resumen'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Mapa de Resumen',
		single_column: true
	});
}

frappe.pages['mapa-de-resumen'].refresh = function(wrapper) {
	setTimeout(() => {
		if ($("#map").length == 0 && window.location.pathname === "/app/mapa-de-resumen"){
			$("#page-mapa-de-resumen .layout-main-section").after("<div id='map' style='height:80vh'></div>")
			var map = L.map('map').setView([-24.7702289,-56.7368441], 7);
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(map);
	
			frappe.db.get_list("Formulario Principal", {
				fields: ["name", "ubicacion", "fecha", "lugar", "distrito", "finca", "propietario"]
			}).then(r => {
				var popup_content = ""
				r.forEach(element => {
					var ubi = element.ubicacion
					if (ubi){
						ubi = JSON.parse(ubi)
						if (ubi.features[0].geometry.type === "Point"){
							popup_content = `Fecha: ${element.fecha || ""}<br>
											Lugar: ${element.lugar || ""}<br>
											Distrito: ${element.distrito || ""}<br>
											Finca: ${element.finca || ""}<br>
											Propietario: ${element.propietario || ""}<br>
											<a href="/app/formulario-principal/${element.name}">Enlace</a>`
							L.marker(ubi.features[0].geometry.coordinates.reverse()).addTo(map).bindPopup(popup_content)
						}
					}
				});
			})
		}
	}, 1000);
}
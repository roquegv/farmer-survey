var route_to_new_doc = function(){
    if (frappe.user.has_role("Operador")){
        local_docname = frappe.model.make_new_doc_and_get_name('Formulario Principal')
        frappe.set_route('Form', 'Formulario Principal', local_docname)
    }
}

$(document).on("startup", function () {
    route_to_new_doc()

    $(".dropdown-notifications").hide()

    frappe.db.count('Formulario Principal', {
        filters: {'usuario_del_operador': frappe.user.name}
    }).then(r=>{
        var indicator = `<p id="count_indicator" style="background: var(--bg-orange);color: var(--text-on-orange); padding: 10px; border-radius: 50%;">${r}</p>`
        $(".dropdown-navbar-user").before(`<li class="nav-item">${indicator}<li>`)
    })
});

frappe.ui.form.on("Formulario Principal", {
    on_submit: function(frm){
        route_to_new_doc()
    }
});
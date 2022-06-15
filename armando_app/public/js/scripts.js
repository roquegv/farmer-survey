var route_to_new_doc = function(frm){
    local_docname = frappe.model.make_new_doc_and_get_name('Formulario Principal')
    frappe.set_route('Form', 'Formulario Principal', local_docname)
}

$(document).on("startup", function () {
    if (frappe.user.has_role("Operador")){
        route_to_new_doc()
    }
});

frappe.ui.form.on("Formulario Principal", {
    on_submit: function(frm){
        if (frappe.user.has_role("Operador")){
            route_to_new_doc()
        }
    }
});
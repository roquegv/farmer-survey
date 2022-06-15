var route_to_new_doc = function(){
    if (frappe.user.has_role("Operador")){
        local_docname = frappe.model.make_new_doc_and_get_name('Formulario Principal')
        frappe.set_route('Form', 'Formulario Principal', local_docname)
    }
}

$(document).on("startup", function () {
    route_to_new_doc()
});

frappe.ui.form.on("Formulario Principal", {
    on_submit: function(frm){
        route_to_new_doc()
    }
});
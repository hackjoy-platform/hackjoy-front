function ajaxDinamico(url, tipo, dados, sucesso, token = "") {
    $.ajax({
        url: url,
        type: tipo,
        data: dados,
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        },
        success: function (data, textStatus, xhr) {
            sucesso(data, textStatus, xhr);
        },
        error: function (response) {
            console.error(response);

            //swal(response.responseJSON[0], "", "error");
        }
    });
}

function get(url, dados, sucesso, auth = false) {
    ajaxDinamico(url, "GET", JSON.stringify(dados), sucesso, (auth ? getToken() : ""));
}

function post(url, dados, sucesso, auth = false) {
    ajaxDinamico(url, "POST", JSON.stringify(dados), sucesso, (auth ? getToken() : ""));
}

function put(url, dados, sucesso, auth = false) {
    ajaxDinamico(url, "PUT", JSON.stringify(dados), sucesso, (auth ? getToken() : ""));
}

function delet(url, dados, sucesso, auth = false) {
    ajaxDinamico(url, "DELETE", JSON.stringify(dados), sucesso, (auth ? getToken() : ""));
}

function patch(url, dados, sucesso, auth = false) {
    ajaxDinamico(url, "PATCH", JSON.stringify(dados), sucesso, (auth ? getToken() : ""));
}

function formularioEstaValido(id_formulario) {
    let form = $("#" + id_formulario)[0];
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return false;
    }
    return true;
}

function setUser(entity, id) {
    sessionStorage.setItem("entity", entity);
    switch (entity) {
        case "student":
            sessionStorage.setItem("id_student", id);
            break;
        case "instructor":
            sessionStorage.setItem("id_instructor", id);
    }
    console.log(sessionStorage.getItem("id_instructor"));
}

function getIdUserEntity() {
    switch (sessionStorage.getItem("entity")) {
        case "student":
            return sessionStorage.getItem("id_student");
        case "instructor":
            return sessionStorage.getItem("id_instructor");
    }
}

function setToken(token) {
    sessionStorage.setItem("token", token);
}

function getToken() {
    return sessionStorage.getItem("token");
}

$(document).ready(function () {

    $('#sidebarCollapse, #sidebarCollapse1').on('click', function () {
        $('#sidebar').toggleClass('active');
        $('#user').toggleClass('active');
        $("#sidebarCollapse").toggleClass('active');
    });

});
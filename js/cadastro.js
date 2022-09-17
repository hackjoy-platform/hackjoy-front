function cadastrarStudent(name, birth_date, nationality, document, gender, email, password) {
    $("#btnsubmit").attr("disabled", "disabled");
    $("#btnsubmit").html(
        "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>" +
        "<span class='visually-hidden'>Carregando...</span>&nbsp;&nbsp;Carregando..."
    );

    let student = {
        "user": {
            "name": name,
            "birth_date": birth_date,
            "nationality": nationality,
            "document": document,
            "gender": gender,
            "email": email,
            "password": password
        },
        "student": {
            "elo": 0
        }
    };

    post("https://hackjoy-api.herokuapp.com/students/new", student, function (data, textStatus, xhr) {
        if (typeof data == "object") {
            swal({
                title: "Cadastrado com sucesso!",
                icon: "success",
                buttons: true,
                dangerMode: false,
            }).then((willDelete) => {
                window.location = "login.html";
            });
        }

        $("#btnsubmit").removeAttr("disabled");
        $("#btnsubmit").html("Cadastrar");
    });
}


function ConfigPage() {

    document.getElementById('other').style.display = "none";
}

/*function check_user_login(type) {

    if (type == "user_student_login") {
        document.getElementById('student_login').style.display = "inline";

        document.getElementById('teacher_login').style.display = "none";
        document.getElementById('admin_login').style.display = "none";


    } else if (type == "user_teacher_login") {
        document.getElementById('teacher_login').style.display = "inline";

        document.getElementById('student_login').style.display = "none";
        document.getElementById('admin_login').style.display = "none";
    }
}*/

function check_user_cadastro(type) {

    if (type == "user_student_cadastro") {


    } else if (type == "user_teacher_cadastro") {


    }
}

function changeDocument(value) {
    if (value == "Brasil") {

        document.getElementById('cpf').style.display = "inline";
        document.getElementById('other').style.display = "none";

    } else {

        document.getElementById('other').style.display = "inline";
        document.getElementById('cpf').style.display = "none";

    }
}

function validacaoEmail(field) {
    usuario = field.value.substring(0, field.value.indexOf("@"));
    dominio = field.value.substring(field.value.indexOf("@") + 1, field.value.length);

    if ((usuario.length >= 1) &&
        (dominio.length >= 3) &&
        (usuario.search("@") == -1) &&
        (dominio.search("@") == -1) &&
        (usuario.search(" ") == -1) &&
        (dominio.search(" ") == -1) &&
        (dominio.search(".") != -1) &&
        (dominio.indexOf(".") >= 1) &&
        (dominio.lastIndexOf(".") < dominio.length - 1)) {
        document.getElementById("msgemail").innerHTML = "";
    }
    else {
        document.getElementById("msgemail").innerHTML = "<font color='red'>E-mail inválido </font>";
    }
}

$(document).ready(() => {

    $("body").ready(ConfigPage());

    $("#btnsubmit").on("click", (e) => {
        e.preventDefault();

        if (formularioEstaValido("formNovoStudent")) {
            let name = $("#name_cadastro").val();
            let birth_date = $("#birth_date_cadastro").val();
            let nationality = $("#nationality_cadastro").val();
            let cpf = $("#cpf_document_cadastro").val();
            let outro_documento = $("#other_document_cadastro").val();
            let gender = $("input[name='gender_cadastro']:checked").val();
            let email = $("#email_cadastro").val();
            let password = $("#password_cadastro").val();

            cadastrarStudent(name, birth_date, nationality, (nationality == "Brasil" ? cpf : outro_documento), gender, email, password);
        } else {
            console.log("is not valid");
        }
    })

    /*$("#user_student_login, #user_teacher_login").on("click", (e) => {
        check_user_login(e.target.value);
    })*/

    $("#user_student_cadastro, #user_teacher_cadastro").on("click", (e) => {
        check_user_cadastro(e.target.value);
    })

    $("#nationality_cadastro").on("change", (e) => {
        changeDocument(e.target.value);
    })

    $('.cpf, .other').mask('000.000.000-00', { reverse: true });
})
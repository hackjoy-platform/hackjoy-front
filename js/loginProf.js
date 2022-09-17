function loginInstructor(email, password) {
    $("#btnsubmit").attr("disabled", "disabled");
    $("#btnsubmit").html(
        "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>" +
        "<span class='visually-hidden'>Carregando...</span>&nbsp;&nbsp;Carregando..."
    );

    let instructor = {
        "email": email,
        "password": password,
    };


    post("https://hackjoy-api.herokuapp.com/instructors/login", instructor, function (data, textStatus, xhr) {
        //console.log(data);
        setUser("instructor", data["id_instructor"]);
        setToken(data["token"]);

        $("#btnsubmit").removeAttr("disabled");
        $("#btnsubmit").html("Entrar");

        window.location = "painel_instructor.html";
    });
}

$(document).ready(() => {

    $("#btnsubmit").on("click", (e) => {
        e.preventDefault();

        if (formularioEstaValido("formLoginInstructor")) {
            let email = $("#email_login").val();
            let password = $("#password_login").val();

            loginInstructor(email, password);
        } else {
            console.log("is not valid");
        }


    })

    let btn = document.querySelector('.lnr-eye');
    btn.addEventListener('click', function () {
        let input = document.querySelector('#password_login');
        if (input.getAttribute('type') == 'password') {
            input.setAttribute('type', 'text');
        } else {
            input.setAttribute('type', 'password');
        }
    });

})
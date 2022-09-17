function verificaSeInstructorEstaLogado() {
    console.log(getToken());

}

function carregaInstructorAtual() {
    get("https://hackjoy-api.herokuapp.com/instructors/" + getIdUserEntity(), {}, function (data, textStatus, xhr) {
        //console.log(data);
        //const [, match] = data["user"]["name"].match(/(\S+) /) || [];
        //Arrumar a formatão de apenas o primeiro nome inserido, ele da o erro de "undefined";
        $("#instructor_name").html("&nbsp" + data["user"]["name"]);
    }, true);
}

$(document).ready(() => {

    carregaInstructorAtual();

    $("#btnsubmit").on("click", (e) => {
        e.preventDefault();

        if (formularioEstaValido("formLoginInstructor")) {
            let email = $("#email_login").val();
            let password = $("#password_login").val();

            loginInstructor(email, password);
        }

    });

}) 
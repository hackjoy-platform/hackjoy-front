function carregaCurso(id) {
    get("https://hackjoy-api.herokuapp.com/courses/" + id, {}, function (data, textStatus, xhr) {
        $("#imagem_do_curso").attr("src", "data:image/png;charset=utf-8;base64," + data["image"]);
        $("#nome_do_curso").text(data["name"]);
        $("#sobre_o_curso").text(data["about"]);
        $("#descricao_do_curso").text(data["description"]);
    }, true);
}

$(document).ready(() => {

    carregaCurso(getParametroPorChave("id"));

    $("#adquirir_curso").on("click", function () {
        $("#adquirir_curso").attr("disabled", "disabled");
        $("#carregaAdquirirCurso").show();

        post("https://hackjoy-api.herokuapp.com/courses/" + getParametroPorChave("id") + "/students/" + getIdUserEntity(), {}, function (data, textStatus, xhr) {
            swal("Curso adquirido com sucesso!", "", "success");

            $("#adquirir_curso").removeAttr("disabled");
            $("#carregaAdquirirCurso").hide();
        }, true);
    });

})
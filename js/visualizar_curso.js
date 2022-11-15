function carregaCurso(id) {
    get("https://hackjoy-api.herokuapp.com/courses/" + id, {}, function (data, textStatus, xhr) {
        $("#imagem_do_curso").attr("src", "data:image/png;charset=utf-8;base64,"+data["image"]);
        $("#nome_do_curso").text(data["name"]);
        $("#sobre_o_curso").text(data["about"]);
        $("#descricao_do_curso").text(data["description"]);
    }, true);
}

$(document).ready(() => {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    carregaCurso(urlParams.get("id"));

})
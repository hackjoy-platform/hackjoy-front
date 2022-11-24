function carregaCurso() {

    get("https://hackjoy-api.herokuapp.com/courses", {}, function (data, textStatus, xhr) {

        var listCurso = data;

        for (let i = 0; i < data.length; i++) {
            $("#list tbody").append(
                "<tr>" +
                "<td>" +
                listCurso[i]["name"] +
                "</td>" +
                "<td>" +
                "<a href='../html/cursoEdit.html?id=" + listCurso[i]["id"] + "' class='btn btn-primary' id_curso=" + listCurso[i]["id"] + ">Visualizar curso</a>" +
                "</td>" +
                "</tr>"
            );
        }
        $("#loading").remove();

        $("#loadingCursosCadastrados").hide();
        $("#tabelaCursosCadastrados").show();
    }, true);
}

$(document).ready(() => {

    carregaCurso()

})
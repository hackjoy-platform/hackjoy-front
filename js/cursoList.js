function carregaCurso() {

    get("https://hackjoy-api.herokuapp.com/courses", {}, function (data, textStatus, xhr) {

        var listCurso = data;
        console.log(listCurso);

        for (let i = 0; i < data.length; i++) {
            $("#list tbody").append(
                "<tr>" +
                "<th scope='row'>" + listCurso[i]["id"] + "</th>" +
                "<td>" +
                listCurso[i]["name"] +
                "</td>" +

                "<td>" +
                "<a href='../html/cursoEdit.html?id=" + listCurso[i]["id"] + "' class='btn btn-outline-secondary' id_curso=" + listCurso[i]["id"] + ">Abrir Curso</a>" +
                "</td>" +

                "</tr>"
            );
        }
    }, true);
}

$(document).ready(() => {

    carregaCurso()

})
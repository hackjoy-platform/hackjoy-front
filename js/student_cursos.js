function listaCursosCadastrados() {
    get("https://hackjoy-api.herokuapp.com/courses", {}, function (data, textStatus, xhr) {
        for (let i = 0; i < data.length; i++) {
            $("#cursosEncontrados").append(
                "<div class='col-sm-12 col-md-3 cursoEncontrado shadow-sm py-3 text-dark'>" +
                "<a href='visualizar_curso.html?id=" + data[i]["id"] + "' class='text-decoration-none'>" +
                "<img src='data:image/png;charset=utf-8;base64," + data[i]["image"] + "' class='w-100 img-curso-encontrado my-2'/>" +
                "<h4 style='color: black !important;'>" + data[i]["name"] + "</h4>" +
                "</a>" +
                "</div>"
            );
        }

        $("#loading").remove();
        $("#cursosEncontrados").show();
    }, true);
}

function listaCursosVinculadosAoStudent() {
    get("https://hackjoy-api.herokuapp.com/students/"+getIdUserEntity()+"/courses/", {}, function (data, textStatus, xhr) {
        for (let i = 0; i < data.length; i++) {
            $("#meusCursosEncontrados").append(
                "<div class='col-sm-12 col-md-3 cursoEncontrado shadow-sm py-3 text-dark'>" +
                "<a href='visualizar_meu_curso.html?id=" + data[i]["id"] + "' class='text-decoration-none'>" +
                "<img src='data:image/png;charset=utf-8;base64," + data[i]["image"] + "' class='w-100 img-curso-encontrado my-2'/>" +
                "<h4 style='color: black !important;'>" + data[i]["name"] + "</h4>" +
                "</a>" +
                "</div>"
            );
        }

        $("#loading").remove();
        $("#meusCursosEncontrados").show();
    }, true);
}

$(document).ready(() => {

    // listaCursosCadastrados();

})
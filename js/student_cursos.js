function listaCursosCadastrados() {
    get("https://hackjoy-api.herokuapp.com/courses", {}, function (data, textStatus, xhr) {
        for (let i = 0; i < data.length; i++){
            $("#cursosEncontrados").append(
                "<div class='col-sm-12 col-md-3 cursoEncontrado shadow-sm py-3'>" +
                "<img src='data:image/png;charset=utf-8;base64," + data[i]["image"] + "' class='w-100 img-curso-encontrado my-2'/>" +
                "<h4>" + data[i]["name"] + "</h4>" +
                "</div>"
            );
        }
    }, true);
}

$(document).ready(() => {

    listaCursosCadastrados();

})
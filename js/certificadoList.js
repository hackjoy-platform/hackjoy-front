function carregaCertificados() {

    get("https://hackjoy-api.herokuapp.com/certificates", {}, function (data, textStatus, xhr) {

        var listCertificado = data;
        console.log(listCertificado);

        for (let i = 0; i < data.length; i++) {
            $("#list tbody").append(
                "<tr>" +
                "<th scope='row'>" + listCertificado[i]["id"] + "</th>" +
                "<td>" +
                listCertificado[i]["name"] +
                "</td>" +

                "<td>" +
                "<a href='../html/certificadoEdit.html?id=" + listCertificado[i]["id"] + "' class='btn btn-outline-secondary' id_certificado=" + listCertificado[i]["id"] + ">Abrir Certificado</a>" +
                "</td>" +

                "</tr>"
            );
        }
    }, true);
}

$(document).ready(() => {

    carregaCertificados();

})
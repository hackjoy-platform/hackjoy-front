function carregaCertificados() {

    get("https://hackjoy-api.herokuapp.com/certificates", {}, function (data, textStatus, xhr) {

        var listCertificado = data;

        for (let i = 0; i < data.length; i++) {
            $("#list tbody").append(
                "<tr>" +
                "<td>" +
                listCertificado[i]["name"] +
                "</td>" +

                "<td>" +
                "<a href='../html/certificadoEdit.html?id=" + listCertificado[i]["id"] + "' class='btn btn-primary' id_certificado=" + listCertificado[i]["id"] + ">Visualizar certificado</a>" +
                "</td>" +

                "</tr>"
            );
        }

        $("#loadingCertificadosCadastrados").hide();
        $("#tabelaCertificadosCadastrados").show();
    }, true);
}

$(document).ready(() => {

    carregaCertificados();

})
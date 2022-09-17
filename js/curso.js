function imagemAlterada(event) {
    var reader = new FileReader();
    reader.onload = function () {
        $('.note-editable').css('background-image', 'url(' + reader.result + ')');
        $('.note-editable').css('background-size', '842px 595px');
    }
    reader.readAsDataURL(event.target.files[0]);
}

function certificadoList() {

    get("https://hackjoy-api.herokuapp.com/certificates", {}, function (data, textStatus, xhr) {

        var listCertificado = data;
        console.log(listCertificado);

        for (let i = 0; i < data.length; i++) {
            $("#list").append(
                "<option>" + listCertificado[i]["name"] + "</option>"
                /*"<tr>" +
                "<th scope='row'>" + listCertificado[i]["id"] + "</th>" +
                "<td>" +
                listCertificado[i]["name"] +
                "</td>" +

                "<td>" +
                "<a href='../html/certificadoEdit.html?id=" + listCertificado[i]["id"] + "' class='btn btn-outline-secondary' id_certificado=" + listCertificado[i]["id"] + ">Abrir Certificado</a>" +
                "</td>" +

                "</tr>"*/
            );
        }
    }, true);
}

$(document).ready(() => {

    certificadoList();

})
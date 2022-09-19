let imagemEmBase64 = null;

function imagemAlterada(event) {
    var reader = new FileReader();
    reader.onload = function () {
        imagemEmBase64 = reader.result;

        $('.note-editable').css('background-image', 'url(' + reader.result + ')');
        $('.note-editable').css('background-size', '842px 595px');
    }
    reader.readAsDataURL(event.target.files[0]);
}

function alterarCurso(curso, id) {

    put("https://hackjoy-api.herokuapp.com/courses/" + id, curso, function (data, textStatus, xhr) {

        window.location = "cursoList.html";
    })

}

function verCurso(id) {

    get("https://hackjoy-api.herokuapp.com/courses/" + id, {}, function (data, textStatus, xhr) {
        console.log(data);

        document.getElementById("name").value = data["name"];
        document.getElementById("about").value = data["about"];
        document.getElementById("description").value = data["description"];

        let idCertificadoCurso = data["id_certificate"];
        get("https://hackjoy-api.herokuapp.com/certificates", {}, function (data, textStatus, xhr) {

            var listCertificado = data;
            console.log(listCertificado);

            for (let i = 0; i < data.length; i++) {
                if (idCertificadoCurso == listCertificado[i]["id"]) {
                    $("#list").append(
                        "<option selected='selected'>" + listCertificado[i]["id"] + " - " + listCertificado[i]["name"] + "</option>"
                    )
                } else {
                    $("#list").append(
                        "<option>" + listCertificado[i]["id"] + " - " + listCertificado[i]["name"] + "</option>"
                    )
                }
            }
        }, true);
    });
}

/*function certificadoList() {

    get("https://hackjoy-api.herokuapp.com/certificates", {}, function (data, textStatus, xhr) {

        var listCertificado = data;
        console.log(listCertificado);

        for (let i = 0; i < data.length; i++) {
            $("#list").append(
                "<option>" + listCertificado[i]["id"] + " - " + listCertificado[i]["name"] + "</option>"
            );
        }
    }, true);
}*/

$(document).ready(() => {

    //certificadoList();

    let getUrl = (window.location).href;
    let id = getUrl.substring(getUrl.lastIndexOf('=') + 1);

    verCurso(id);

    $('#editCurso').on('click', (e) => {
        e.preventDefault();

        let curso = {};
        let image = imagemEmBase64;
        let selectCertificate = document.getElementById("list");
        let id_certificate = selectCertificate.options[selectCertificate.selectedIndex].text;
        const [, match] = id_certificate.match(/(\S+) /) || [];

        if (document.getElementById('img').value != null) {

            curso = {
                "name": document.getElementById('name').value,
                "about": document.getElementById("about").value,
                "description": document.getElementById("description").value,
                "id_certificate": match,
                "image": image,
            }
        } else {
            curso = {
                "name": document.getElementById('name').value,
                "about": document.getElementById("about").value,
                "description": document.getElementById("description").value,
                "id_certificate": match,
            }
        }

        alterarCurso(curso, id);
    })
})
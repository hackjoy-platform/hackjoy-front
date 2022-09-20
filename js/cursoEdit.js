let imagemEmBase64 = null;
let image = 0;

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
    $("#editCurso").attr("disabled", "disabled");
    $("#editCurso").html(
        "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>" +
        "<span class='visually-hidden'>Carregando...</span>&nbsp;&nbsp;Carregando..."
    );

    put("https://hackjoy-api.herokuapp.com/courses/" + id, curso, function (data, textStatus, xhr) {

        swal({
            title: "Editado com sucesso!",
            icon: "success",
            buttons: true,
            dangerMode: false,
        }).then((willDelete) => {
            window.location = "cursoList.html";
        });

        $("#editCurso").removeAttr("disabled");
        $("#editCurso").html("Cadastrar");
    })

}

function verCurso(id) {

    get("https://hackjoy-api.herokuapp.com/courses/" + id, {}, function (data, textStatus, xhr) {
        console.log(data);

        image = data["image"];

        document.getElementById("name").value = data["name"];
        document.getElementById("loading-name").style.display = "none";
        document.getElementById("about").value = data["about"];
        document.getElementById("loading-about").style.display = "none";
        document.getElementById("description").value = data["description"];
        document.getElementById("loading-description").style.display = "none";

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
            document.getElementById("loading-certificate").style.display = "none";
        }, true);
    });
}

$(document).ready(() => {

    let getUrl = (window.location).href;
    let id = getUrl.substring(getUrl.lastIndexOf('=') + 1);

    verCurso(id);

    $('#editCurso').on('click', (e) => {
        e.preventDefault();

        let resultImage = image;
        if (imagemEmBase64 != null) {
            image = imagemEmBase64;

            resultImage = image.replace("data:image/jpeg;base64,", "");
            resultImage = image.replace("data:image/jpg;base64,", "");
            resultImage = image.replace("data:image/webp;base64,", "");
            resultImage = image.replace("data:image/png;base64,", "");
        }

        let selectCertificate = document.getElementById("list");

        let id_certificate = selectCertificate.options[selectCertificate.selectedIndex].text;
        const [, match] = id_certificate.match(/(\S+) /) || [];

        let curso = {
            "name": document.getElementById('name').value,
            "about": document.getElementById("about").value,
            "description": document.getElementById("description").value,
            "id_certificate": match,
            "image": resultImage,
        }

        console.log(curso);
        alterarCurso(curso, id);
    })

    /* Select more 'beautiful' */

})
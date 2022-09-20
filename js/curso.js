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

function certificadoList() {

    get("https://hackjoy-api.herokuapp.com/certificates", {}, function (data, textStatus, xhr) {

        var listCertificado = data;
        console.log(listCertificado);

        for (let i = 0; i < data.length; i++) {
            $("#list").append(
                "<option>" + listCertificado[i]["id"] + " - " + listCertificado[i]["name"] + "</option>"
            );
        }
        document.getElementById("loading-certificate").style.display = "none";
    }, true);
}

function cadastrarCurso(name, about, description, image, id_certificate) {
    $("#btnsubmit").attr("disabled", "disabled");
    $("#btnsubmit").html(
        "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>" +
        "<span class='visually-hidden'>Carregando...</span>&nbsp;&nbsp;Carregando..."
    );



    let curso = {
        "id_certificate": id_certificate,
        "name": name,
        "about": about,
        "description": description,
        "image": image,
    }

    post("https://hackjoy-api.herokuapp.com/courses/new", curso, function (data, textStatus, xhr) {
        if (typeof data == "object") {
            swal({
                title: "Cadastrado com sucesso!",
                icon: "success",
                buttons: true,
                dangerMode: false,
            }).then((willDelete) => {
                window.location = "cursoList.html";
            });
        }


        $("#btnsubmit").removeAttr("disabled");
        $("#btnsubmit").html("Cadastrar");

    })
}

$(document).ready(() => {

    certificadoList();

    $("#cadastroCurso").on("click", (e) => {
        e.preventDefault();

        let name = $("#name").val();
        let about = $("#about").val();
        let description = $("#description").val();
        let image = imagemEmBase64;

        let selectCertificate = document.getElementById("list");
        let id_certificate = selectCertificate.options[selectCertificate.selectedIndex].text;

        const [, match] = id_certificate.match(/(\S+) /) || [];

        cadastrarCurso(name, about, description, image, match);
    });

})
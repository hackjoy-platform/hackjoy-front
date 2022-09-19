let imagemEmBase64 = null;

function imagemAlterada(event) {
    var reader = new FileReader();
    reader.onload = function () {
        imagemEmBase64 = reader.result;

        $('.note-editable').css('background-image', 'url(' + imagemEmBase64 + ')');
        $('.note-editable').css('background-size', '842px 595px');
    }
    reader.readAsDataURL(event.target.files[0]);
}

function cadastrarCertificado(name, image, phrase) {
    $("#btnsubmit").attr("disabled", "disabled");
    $("#btnsubmit").html(
        "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>" +
        "<span class='visually-hidden'>Carregando...</span>&nbsp;&nbsp;Carregando..."
    );

    let certificado = {
        "name": name,
        "image": image,
        "phrase": phrase
    };

    post("https://hackjoy-api.herokuapp.com/certificates/new", certificado, function (data, textStatus, xhr) {
        if (typeof data == "object") {
            swal({
                title: "Cadastrado com sucesso!",
                icon: "success",
                buttons: true,
                dangerMode: false,
            }).then((willDelete) => {
                window.location = "certificadoList.html";
            });
        }

        $("#btnsubmit").removeAttr("disabled");
        $("#btnsubmit").html("Cadastrar");
    });
}

$(document).ready(() => {

    $("#cadastroCurriculo").on("click", (e) => {
        e.preventDefault();

        let name = $("#nome").val();
        let image = imagemEmBase64;
        let phrase = $("#frase").val();

        cadastrarCertificado(name, image, phrase);
    });

});
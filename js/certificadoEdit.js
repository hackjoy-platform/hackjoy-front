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

function verCertificado(id) {

    get("https://hackjoy-api.herokuapp.com/certificates/" + id, {}, function (data, textStatus, xhr) {
        console.log(data);

        image = data["image"];

        document.getElementById("name").value = data["name"];
        $("#frase").append(data['phrase']);

        iniciaSummernote()
    });
}

function alterarCertificado(certificado, id) {
    $("#certificadoEdit").attr("disabled", "disabled");
    $("#certificadoEdit").html(
        "<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>" +
        "<span class='visually-hidden'>Carregando...</span>&nbsp;&nbsp;Carregando..."
    );

    put("https://hackjoy-api.herokuapp.com/certificates/" + id, certificado, function (data, textStatus, xhr) {

        swal({
            title: "Editado com sucesso!",
            icon: "success",
            buttons: true,
            dangerMode: false,
        }).then((willDelete) => {
            window.location = "certificadoList.html";
        });

        $("#certificadoEdit").removeAttr("disabled");
        $("#certificadoEdit").html("Cadastrar");
    });
}

function iniciaSummernote() {
    $("#frase").summernote({
        width: 842,
        height: 595,
        lang: 'pt-BR',
        followingToolbar: false,
        disableResizeEditor: true,
        defaultFontName: 'Arial',
        fontsize: 24,
        toolbar: [
            // [groupName, [list of button]]
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['fontsize', ['fontname', 'fontsize']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['codeview', ['codeview']],
        ],
        fontNames: ['Arial', 'Courier New', 'Georgia', 'Lucida Sans Unicode', 'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana'],
        fontSizes: ['8', '9', '10', '11', '12', '14', '16', '18', '20',
            '22', '24', '26', '28', '30', '32', '34', '36', '38',
            '40', '42', '44', '46', '48', '50', '52', '54', '56', '58', '60', '62', '64'
        ],
        popatmouse: false,
    });

}

$(document).ready(() => {

    let getUrl = (window.location).href;
    let id = getUrl.substring(getUrl.lastIndexOf('=') + 1);


    verCertificado(id);

    $('#certificadoEdit').on('click', (e) => {
        e.preventDefault();

        if (imagemEmBase64 != null) {
            image = imagemEmBase64;
        }

        let certificado = {
            "name": document.getElementById('name').value,
            "image": image,
            "phrase": document.getElementById('frase').value,
        }

        alterarCertificado(certificado, id);
    })
})
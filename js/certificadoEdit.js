function imagemAlterada(event) {
    var reader = new FileReader();
    reader.onload = function () {
        imagemEmBase64 = reader.result;

        $('.note-editable').css('background-image', 'url(' + imagemEmBase64 + ')');
        $('.note-editable').css('background-size', '842px 595px');
    }
    reader.readAsDataURL(event.target.files[0]);
}

function verCertificado(id) {
    get("https://hackjoy-api.herokuapp.com/certificates/" + id, {}, function (data, textStatus, xhr) {
        document.querySelector(".frase").innerHTML = data['phrase'];

        iniciaSummernote();

        $('.note-editable').css('background-image', 'url(data:image/png;base64,' + data["image"] + ')');
        $('.note-editable').css('background-size', '842px 595px');

        document.getElementById("name").value = data["name"];
    });
}

function alterarCertificado(certificado, id) {
    put("https://hackjoy-api.herokuapp.com/certificates/" + id, certificado, function (data, textStatus, xhr) {

        window.location = "certificadoList.html";
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

    document.getElementById('name').disabled = true;
    document.getElementById('img').disabled = true;

    verCertificado(id);

    $('#alterar').on('click', () => {
        document.getElementById('name').disabled = false;
        document.getElementById('img').disabled = false;

        $('#cadastroCurriculo').on('click', (e) => {
            e.preventDefault();

            let certificado = {
                "name": document.getElementById('name').value,
                "image": document.getElementById('img').value,
                "phrase": document.getElementById('frase').value,
            }

            alterarCertificado(certificado, id);
        });
    });

    $('#cadastroCurriculo').on('click', (e) => {
        e.preventDefault();

        window.location = "certificadoList.html";
    });
});
let imagemEmBase64 = null;
let image = 0;
var arrayDosVideosCarregados;
var objetoDosVideosCarregados;
var idDoCurso = 0;

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

function carregaVideo(id) {

    get("https://hackjoy-api.herokuapp.com/contents/organized/course/" + id, {}, function (data, textStatus, xhr) {

        objetoDosVideosCarregados = data;
        arrayDosVideosCarregados = [];

        $(".videoEncontrado").remove();

        if (Array.isArray(objetoDosVideosCarregados) && objetoDosVideosCarregados.length == 0) {
            $("#listaDeVideosCadastrados tbody").append(
                "<p class='titulos'>Não possui video cadastrado</p>"
            );

            objetoDosVideosCarregados = null;
        } else {
            let i = 0;
            for (const indice in objetoDosVideosCarregados) {
                arrayDosVideosCarregados[i] = objetoDosVideosCarregados[indice]["id"];

                $("#listaDeVideosCadastrados tbody").append(
                    "<tr class='videoEncontrado'>" +
                    "<td>" +
                    objetoDosVideosCarregados[indice]["name"] +
                    "</td>" +

                    "<td>" +
                    "<a data-bs-toggle='modal' data-bs-target='#OpenVideo' id_video=" + parseInt(i + 1) + " class='btn btn-primary openVideoClass'" +
                    "id_curso='" + objetoDosVideosCarregados[indice]["id"] + "'" +
                    "nomeVideo='" + objetoDosVideosCarregados[indice]["name"] + "'" +
                    "linkVideo='" + objetoDosVideosCarregados[indice]["link"] + "'" +
                    "duracaoVideo='" + objetoDosVideosCarregados[indice]["workload"] + "'>Editar vídeo</a>" +
                    "</td>" +
                    "</tr>"
                );

                i++;
            }
        }

        $("#loadingVideosCadastrados").hide();
        $("#listaDeVideosCadastrados").show();
    })
}

function cadastrarVideo(video, content) {

    let conteudo = {
        "content": content,
        "video": video,
    }

    post("https://hackjoy-api.herokuapp.com/videos/new", conteudo, function (data, textStatus, xhr) {
        if (typeof data == "object") {
            swal({
                title: "Cadastrado com sucesso!",
                icon: "success",
                buttons: true,
                dangerMode: false,
            })

            $("#listaDeVideosCadastrados").hide();
            $("#loadingVideosCadastrados").show();
            carregaVideo(idDoCurso);
        }
    });
}

function atualizarVideo(conteudo, idVideo) {
    console.log(idVideo);
    
    put("https://hackjoy-api.herokuapp.com/videos/" + idVideo, conteudo, function (data, textStatus, xhr) {
        console.log("data: ");
        console.log(data);
        if (typeof data == "object") {
            swal({
                title: "Atualizado com sucesso!",
                icon: "success",
                buttons: true,
                dangerMode: false,
            })
        }

        $("#listaDeVideosCadastrados").hide();
        $("#loadingVideosCadastrados").show();
        carregaVideo(idDoCurso);
    })
}

$(document).ready(() => {

    let getUrl = (window.location).href;
    idDoCurso = getUrl.substring(getUrl.lastIndexOf('=') + 1);
    let idVideo = 0;

    verCurso(idDoCurso);
    carregaVideo(idDoCurso);

    $(document).on('click', ".openVideoClass", function () {
        idVideo = $(this).attr("id_video");

        let nomeDoVideoSelecionado = $(this).attr("nomeVideo");
        let urlDoVideoSelecionado = $(this).attr("linkVideo");
        let duracaoDoVideoSelecionado = $(this).attr("duracaoVideo");

        document.getElementById("infoNameVideo").value = nomeDoVideoSelecionado;
        document.getElementById("infoLinkVideo").value = urlDoVideoSelecionado;
        document.getElementById("infoWorkloadVideo").value = duracaoDoVideoSelecionado;
    })

    $('#atualizarVideo').on('click', (e) => {
        e.preventDefault();

        let video = {
            "id": idVideo,
            "name": document.getElementById("infoNameVideo").value,
            "link": document.getElementById("infoLinkVideo").value,
            "workload": document.getElementById("infoWorkloadVideo").value,
        }
        let content = {
            "name": document.getElementById("infoNameVideo").value,
            "sequence_number": 0,
            "entity": "Video",
        }

        let conteudo = {
            "content": content,
            "video": video,
        }

        atualizarVideo(conteudo, idVideo);
    })

    $('#adicionar').on('click', (e) => {
        e.preventDefault();

        let video = {
            "name": document.getElementById("nameVideo").value,
            "link": document.getElementById("linkVideo").value,
            "workload": document.getElementById("workloadVideo").value,
        }

        let content = {
            "id_course": idDoCurso,
            "name": document.getElementById("nameVideo").value,
            "sequence_number": arrayDosVideosCarregados.length + 1,
            "entity": "Video",
        }

        cadastrarVideo(video, content);
    })

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

        alterarCurso(curso, idDoCurso);
    })

})
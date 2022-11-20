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

<<<<<<< Updated upstream
=======
function carregaVideo(id) {

    get("https://hackjoy-api.herokuapp.com/contents/organized/course/" + id, {}, function (data, textStatus, xhr) {

        objetoDosVideosCarregados = data;
        arrayDosVideosCarregados = [];

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
                    "<tr>" +
                    "<td>" +
                    objetoDosVideosCarregados[indice]["name"] +
                    "</td>" +

                    "<td>" +
                    "<a data-bs-toggle='modal' data-bs-target='#AbrirVideo'" + objetoDosVideosCarregados[indice]["id"] + "'class='btn btn-outline-secondary' id_video=" + objetoDosVideosCarregados[indice]["id"] + ">Abrir Video</a>" +
                    "</td>" +
                    "</tr>"
                );

                i++;
            }
        }

    })
}

function cadastrarVideo(video, content) {

    let conteudo = {
        "content": content,
        "video": video,
    }

    post("https://hackjoy-api.herokuapp.com/videos/new", conteudo, function (data, textStatus, xhr) {
        console.log("Foi para o banco");
        if (typeof data == "object") {
            swal({
                title: "Cadastrado com sucesso!",
                icon: "success",
                buttons: true,
                dangerMode: false,
            })
        }
    });
}

>>>>>>> Stashed changes
$(document).ready(() => {

    let getUrl = (window.location).href;
    let id = getUrl.substring(getUrl.lastIndexOf('=') + 1);

    verCurso(id);
<<<<<<< Updated upstream
=======
    carregaVideo(id);

    $('#AbrirVideo').on('click', (e) => {
        e.preventDefault();
        console.log("ele abriu");

        get("https://hackjoy-api.herokuapp.com/contents/organized/course/" + id, {}, function (data, textStatus, xhr) {

            document.getElementById("editNameVideo").value = data["name"];
            document.getElementById("editLinkVideo").value = data["link"];
            document.getElementById("editWorkloadVideo").value = data["workload"];
        })
    })

    $('#adicionar').on('click', (e) => {
        e.preventDefault();

        let video = {
            "name": document.getElementById("nameVideo").value,
            "link": document.getElementById("linkVideo").value,
            "workload": document.getElementById("workloadVideo").value,
        }

        let content = {
            "id_course": id,
            "name": document.getElementById("nameVideo").value,
            "sequence_number": arrayDosVideosCarregados.length + 1,
            "entity": "Video",
        }

        cadastrarVideo(video, content);
    })
>>>>>>> Stashed changes

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
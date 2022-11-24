let objetoDosVideosCarregados;
let arrayDosVideosCarregados;

function carregaCurso(id) {
    get("https://hackjoy-api.herokuapp.com/courses/" + id, {}, function (data, textStatus, xhr) {
        $("#imagem_do_curso").attr("src", "data:image/png;charset=utf-8;base64," + data["image"]);
        $("#nome_do_curso").text(data["name"]);
        $("#sobre_o_curso").text(data["about"]);
        $("#descricao_do_curso").text(data["description"]);

        $("#loadingPainelDoCurso").hide();
        $("#painelDoCurso").show();
    }, true);
}

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
            let urlDoPrimeiroVideo = "";
            let nomeDoPrimeiroVideo = "";

            for (const indice in objetoDosVideosCarregados) {
                arrayDosVideosCarregados[i] = objetoDosVideosCarregados[indice]["id"];
                if (urlDoPrimeiroVideo == "") {
                    urlDoPrimeiroVideo = objetoDosVideosCarregados[indice]["link"];
                    nomeDoPrimeiroVideo = objetoDosVideosCarregados[indice]["name"];
                }

                $("#listaDeVideosCadastrados tbody").append(
                    "<tr>" +
                    "<td class='assistirVideo' urlDoVideo='" + objetoDosVideosCarregados[indice]["link"] + "' nomeDoVideo='" + objetoDosVideosCarregados[indice]["name"] + "'>" +
                    "<i class='fs-4 bi-play'></i>" +
                    objetoDosVideosCarregados[indice]["name"] +
                    "</td>" +
                    "</tr>"
                );

                i++;
            }

            $("td.assistirVideo:first").addClass("videoSelecionado");
            $("#iframeDoVideoAtual").attr("src", urlDoPrimeiroVideo);
            $("#nome_do_conteudo_atual").text(nomeDoPrimeiroVideo);
        }

        $("#loadingPainelDoCurso").hide();
        $("#painelDoCurso").show();
    })
}

$(document).ready(() => {

    carregaCurso(getParametroPorChave("id"));
    carregaVideo(getParametroPorChave("id"));

    $("#adquirir_curso").on("click", function () {
        $("#adquirir_curso").attr("disabled", "disabled");
        $("#carregaAdquirirCurso").show();

        post("https://hackjoy-api.herokuapp.com/courses/" + getParametroPorChave("id") + "/students/" + getIdUserEntity(), {}, function (data, textStatus, xhr) {
            swal("Curso adquirido com sucesso!", "", "success");

            $("#adquirir_curso").hide();
        }, true);
    });

    $(document).on("click", ".assistirVideo", function () {
        $(".videoSelecionado").removeClass("videoSelecionado");
        $(this).addClass("videoSelecionado");

        let urlDoVideoSelecionado = $(this).attr("urlDoVideo");
        let nomeDoVideoSelecionado = $(this).attr("nomeDoVideo");

        $("#iframeDoVideoAtual").attr("src", urlDoVideoSelecionado);
        $("#nome_do_conteudo_atual").text(nomeDoVideoSelecionado);

        window.scrollTo(0, 0);
    });

})
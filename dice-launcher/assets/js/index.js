// Emojis de números del 1 al 6
const emojiDados = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣'];

var IndexUtils = {
    agregarAlHistorial: function (dados) {
        const hora = new Date().toLocaleTimeString();
        const nuevoItem = $('<div>')
            .addClass('historial-item')
            .text(`🎲 ${dados.join(' ')} (${hora})`);
        $('#historialLista').prepend(nuevoItem);
    },

    convertirEmojisANumeros: function (texto) {
        return texto
            .replaceAll('1️⃣', '1')
            .replaceAll('2️⃣', '2')
            .replaceAll('3️⃣', '3')
            .replaceAll('4️⃣', '4')
            .replaceAll('5️⃣', '5')
            .replaceAll('6️⃣', '6');
    }
}

$('#btnLanzar').on('click', function () {
    const cantidad = parseInt($('#cantidad').val());
    let resultadoElem = $('#resultado');

    resultadoElem
        .removeClass('shaking')
        .text('🎲'.repeat(cantidad))
        .addClass('shaking');

    setTimeout(() => {
        let dados = [];

        for (let i = 0; i < cantidad; i++) {
            let numero = Math.floor(Math.random() * 6); // 0 a 5
            dados.push(emojiDados[numero]);
        }

        resultadoElem.removeClass('shaking').text(dados.join(' '));
        IndexUtils.agregarAlHistorial(dados);
    }, 500);
});



$('#btnExportar').on('click', function () {
    let lineas = [];

    $('.historial-item').each(function () {
        const limpio = IndexUtils.convertirEmojisANumeros($(this).text());
        lineas.push(limpio);
    });

    if (lineas.length === 0) {
        alert("No hay historial para exportar.");
        return;
    }

    const ahora = new Date();
    const hora = ahora.toLocaleTimeString().replaceAll(':', '-');
    const fecha = ahora.toLocaleDateString().replaceAll('/', '-');

    const contenido = lineas.join('\n');
    const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });

    const enlace = document.createElement('a');
    enlace.href = URL.createObjectURL(blob);
    enlace.download = `historial_dados_${fecha}_${hora}.txt`;
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
});

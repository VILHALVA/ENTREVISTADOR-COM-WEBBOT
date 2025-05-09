let USER_RESPONSES = [];
let QUESTION_INDEX = 0;
let APPROVAL_STATUS = "NÃO DEFINIDO";

$(document).ready(function() {
    addMessage('🤖ENTREVISTADOR', './imagens/ROBO.jpg', 
    "😃OLÁ! EU SOU O BOT ENTREVISTADOR!\n\n🌚IREI COMEÇAR COM A SEGUINTE PERGUNTA:");

    setTimeout(function() {
        addMessage('🤖ENTREVISTADOR', './imagens/ROBO.jpg', getBotResponse(), 'sender-2');
    }, 1500); 

    $('#send-btn').on('click', function() {
        sendMessage();
    });

    $('#user-input').on('keypress', function(event) {
        if (event.which === 13) {
            sendMessage();
        }
    });
});

function sendMessage() {
    let USER_INPUT = $('#user-input').val().trim();
    if (USER_INPUT) {
        addMessage('👤VOCÊ', './imagens/VOCE.jpg', USER_INPUT, 'sender-1');
        $('#user-input').val('');

        USER_RESPONSES.push(USER_INPUT);

        addTypingIndicator();

        setTimeout(function() {
            removeTypingIndicator();
            let BOT_COMMENT = getComment();
            if (BOT_COMMENT) {
                addMessage('🤖ENTREVISTADOR', './imagens/ROBO.jpg', BOT_COMMENT, 'sender-2');
            }

            setTimeout(function() {
                QUESTION_INDEX++;

                if (QUESTION_INDEX < 8) {
                    addMessage('🤖ENTREVISTADOR', './imagens/ROBO.jpg', getBotResponse(), 'sender-2');
                } 
                else {
                    determineApproval();
                    displayReport();
                }
            }, 1500);

        }, 1500);
    }
}

function addMessage(SENDER_NAME, AVATAR_URL, TEXT, SENDER_CLASS) {
    let MESSAGE_HTML = `
        <div class="message ${SENDER_CLASS}">
            <div class="avatar">
                <img src="${AVATAR_URL}" alt="${SENDER_NAME}">
            </div>
            <div class="arrow ${SENDER_CLASS === 'sender-1' ? 'arrow-left' : 'arrow-right'}"></div>
            <div class="message-bubble">
                <div class="sender-name">${SENDER_NAME}</div>
                <p>${TEXT.replace(/\n/g, '<br>')}</p>
            </div>
        </div>
    `;
    $('#chat-container').append(MESSAGE_HTML);
    $('#chat-container').scrollTop($('#chat-container')[0].scrollHeight);
}

function addTypingIndicator() {
    let TYPING_HTML = `
        <div class="message sender-2 typing-indicator" id="typing-indicator">
            <div class="avatar">
                <img src="./imagens/ROBO.jpg" alt="ROBÔ">
            </div>
            <div class="message-bubble">
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
            </div>
        </div>
    `;
    $('#chat-container').append(TYPING_HTML);
    $('#chat-container').scrollTop($('#chat-container')[0].scrollHeight);
}

function removeTypingIndicator() {
    $('#typing-indicator').remove();
}

function getBotResponse() {
    switch (QUESTION_INDEX) {
        case 0:
            return "😎Qual é o seu nome?";
        case 1:
            return "😎Informe o seu sexo[M/F]:";
        case 2:
            return "😎Qual é a sua idade?";
        case 3:
            return "😎Onde você mora?";
        case 4:
            return "😎Você trabalha em quê?";
        case 5:
            return "😎Você tem o ensino médio completo, ou está em outro nível de escolaridade? (Ensino Médio, Faculdade, Fundamental, etc.)";
        case 6:
            return "😎Quais são suas metas para o futuro?";
        case 7:
            return "😎Agora me conta: qual é a sua experiência profissional?";
        default:
            return "Desculpe, não tenho uma resposta para essa pergunta. Pode tentar outra?";
    }
}

function getComment() {
    switch (QUESTION_INDEX) {
        case 0:
            const name = USER_RESPONSES[0].toUpperCase();
            if (["SAMUEL", "DANIEL", "LUCAS", "MARIA", "ANA"].includes(name)) {
                return "😍Que nome lindo você tem!";
            } 
            else {
                return "😒Seu nome é tão comum!";
            }
        case 1:
            const sexo = USER_RESPONSES[1].toUpperCase();
            if (sexo === "M") {
                SEXO = "HOMEM";
                return "🌝Isso significa que você é HOMEM!!!";
            } 
            else if (sexo === "F") {
                SEXO = "MULHER";
                return "🌝Isso significa que você é MULHER!!!";
            } 
            else {
                SEXO = USER_RESPONSES[1];
                return "❓Você não inseriu um sexo válido!";
            }
        case 2:
            const idade = parseInt(USER_RESPONSES[2]);
            if (idade <= 30) {
                return "😱Nossa, como você é jovem!!!";
            } 
            else {
                return "💪É...Ainda dá pro gasto!";
            }
        case 3:
            const mora = USER_RESPONSES[3].toUpperCase();
            if (mora.includes("ACRE") || mora.includes("SERGIPE")) {
                return "🌚Sei, na terra dos dinossauros!";
            } 
            else if (mora.includes("BRASIL") || mora.includes("ARGENTINA")) {
                return "😏Sei, no país menos corrupto!";
            } 
            else {
                return "🌎Excelente!!!";
            }
        case 4:
            const trabalha = USER_RESPONSES[4].toUpperCase();
            if (trabalha.includes("NÃO") || trabalha.includes("DESEMPREGADO")) {
                return "😔Com essa crise fica difícil mesmo!";
            } 
            else {
                return "🙌Que bom!!!";
            }
        case 5:
            const escola = USER_RESPONSES[5].toUpperCase();
            if (escola.includes("FACULDADE")) {
                return "👏Parabéns por ter cursado Faculdade!";
            } 
            else if (escola.includes("ENSINO MÉDIO")) {
                return "👏Parabéns por completar o Ensino Médio!";
            } 
            else if (escola.includes("FUNDAMENTAL")) {
                return "😔Complicado com apenas Ensino Fundamental.";
            } 
            else {
                return "👏Continue se esforçando!";
            }
        case 6:
            const metas = USER_RESPONSES[6].toUpperCase();
            return "☺️Com estudo e dedicação, você vai alcançar suas metas!";
        case 7:
            const experiencia = USER_RESPONSES[7].toUpperCase();
            if (experiencia.includes("NÃO") || experiencia.includes("POUCO")) {
                return "😏Nunca é tarde para aprender coisas novas!";
            } 
            else {
                return "⚡A cada dia, um novo aprendizado!";
            }
    }
    return null;
}

function determineApproval() {
    const ESCOLARIDADE = USER_RESPONSES[5].toUpperCase();
    const EXPERIÊNCIA = USER_RESPONSES[7].toUpperCase();
    
    if ((ESCOLARIDADE.includes("FACULDADE") || ESCOLARIDADE.includes("ENSINO MÉDIO")) && 
        (!EXPERIÊNCIA.includes("NÃO") && !EXPERIÊNCIA.includes("POUCO"))) {
        APPROVAL_STATUS = "👍APROVADO";
    } 
    else {
        APPROVAL_STATUS = "👎REPROVADO";
    }
}

function displayReport() {
    const DATE = new Date();
    const FORMATTED_DATE = `${DATE.getDate()}/${DATE.getMonth() + 1}/${DATE.getFullYear()}`;
    const TIME = `${DATE.getHours()}:${DATE.getMinutes()}:${DATE.getSeconds()}`;
    
    let escolaridadeDetalhada = USER_RESPONSES[5].toUpperCase();
    if (escolaridadeDetalhada.includes("FACULDADE")) {
        escolaridadeDetalhada = "FACULDADE";
    } 
    else if (escolaridadeDetalhada.includes("ENSINO MÉDIO")) {
        escolaridadeDetalhada = "ENSINO MÉDIO";
    } 
    else if (escolaridadeDetalhada.includes("FUNDAMENTAL")) {
        escolaridadeDetalhada = "FUNDAMENTAL";
    } 
    else {
        escolaridadeDetalhada = USER_RESPONSES[5];
    }

    let report = `
        🔵RELATÓRIO DA ENTREVISTA:
        ⭐️TIME -> ${FORMATTED_DATE}, ${TIME}
        ⭐️NOME -> ${USER_RESPONSES[0].toUpperCase()}
        ⭐️SEXO -> ${SEXO}
        ⭐️IDADE -> ${USER_RESPONSES[2].toUpperCase()}
        ⭐️LOCALIZAÇÃO -> ${USER_RESPONSES[3].toUpperCase()}
        ⭐️TRABALHO -> ${USER_RESPONSES[4].toUpperCase()}
        ⭐️ESCOLARIDADE -> ${escolaridadeDetalhada}
        ⭐️METAS -> ${USER_RESPONSES[6].toUpperCase()}
        ⭐️EXPERIÊNCIA -> ${USER_RESPONSES[7].toUpperCase()}
        ⭐️RESULTADO FINAL => ${APPROVAL_STATUS}
    `;
    
    addMessage('🤖ENTREVISTADOR', './imagens/ROBO.jpg', '\n' + report, 'sender-2');
    addDownloadButton(report);
}

function addDownloadButton(REPORT_CONTENT) {
    const BUTTON_HTML = `
        <button id="save-report-btn">
            SALVAR
        </button>
    `;

    $('#chat-container').append(BUTTON_HTML);

    $('#save-report-btn').on('click', function() {
        downloadReport(REPORT_CONTENT);
    });
}

function downloadReport(CONTENT) {
    const DATE = new Date();
    const FORMATTED_DATE = `${DATE.getDate()}-${DATE.getMonth() + 1}-${DATE.getFullYear()}`;
    const TIME = `${DATE.getHours()}-${DATE.getMinutes()}-${DATE.getSeconds()}`;
    const FILENAME = `ENTREVISTADOR_${FORMATTED_DATE}_${TIME}.txt`;

    const BLOB = new Blob([CONTENT], { type: 'text/plain' });
    const LINK = document.createElement('a');
    
    LINK.href = URL.createObjectURL(BLOB);
    LINK.download = FILENAME;

    LINK.click();
    URL.revokeObjectURL(LINK.href);
}

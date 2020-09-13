const closeModal = document.querySelector(".close-modal");
const modalContainer = document.querySelector("#modal-container");
const sendMessageContainer = document.querySelector("#send-message");


async function showUser(id) {
    toggleClassList(modalContainer, 'show-user', 'hide');

    let { name, phone, buy, created_at, notes, _id } = await fetch(`/users/show/${id}`).then(res => res.json());

    created_at = formatDateToDDMMYYYY(created_at);

    buy = convertNumberToRealCoin(buy);

    modalContainer.innerHTML = `

        <div class="card text-center my-5 mx-auto" id="user-container">
            <div class="card-header justify-content-between d-flex">
                <h3 class="text-center m-auto h4">Ver Usuário</h3>
                <span class="close-modal mt-1" onclick="closeShowUserModal()">
                    <img src="https://image.flaticon.com/icons/svg/1828/1828665.svg" width="20" height="20" alt="">
                </span>
            </div>
            <div class="card-body px-5">
                <div class="row">
                    <p class="col-12 col-md-6  font-weight-bold my-auto text-center text-md-left pb-2 pb-md-0">Nome Completo</p>
                    <p class="col-12 col-md-6  bg-light border py-1 rounded">${name}</p>
                </div>
                <div class="row">
                    <p class="col-12 col-md-6 font-weight-bold my-auto text-center text-md-left pb-2 pb-md-0">Telefone</p>
                    <p class="col-12 col-md-6 bg-light border py-1 rounded">${phone}</p>
                </div>
                <div class="row">
                    <p class="col-12 col-md-6 font-weight-bold my-auto text-center text-md-left pb-2 pb-md-0">Comprou</p>
                    <p class="col-12 col-md-6 bg-light border py-1 rounded">${buy}</p>
                </div>
                <div class="row">
                    <p class="col-12 col-md-6 font-weight-bold my-auto text-center text-md-left pb-2 pb-md-0">Usuário Criado em:</p>
                    <p class="col-12 col-md-6 bg-light border py-1 rounded">${created_at}</p>
                </div>
                <div class="row">
                    <p class="col-12 col-md-6 font-weight-bold my-auto text-center text-md-left pb-2 pb-md-0">Notas sobre o Usuário</p>
                    <p class="col-12 col-md-6 bg-light border py-4 rounded">${notes}</p>
                </div>
                <div class="btn-group btn-block mt-3" role="group" aria-label="Basic example">
                    <a href="users/edit/${_id}" class="btn btn-primary">Editar</a>
                    <a href="#" class="btn btn-danger" onclick="deleteUser('${_id}')">Apagar</a>
                </div>
            </div>
        </div>
    `;
}


function sendMessage(number) {
    toggleClassList(sendMessageContainer, 'show-user', 'hide');

    sendMessageContainer.innerHTML = `
        <div class="card text-center my-5 mx-auto" id="message-modal">
            <div class="card-header justify-content-between d-flex">
                <h3 class="text-center m-auto h4">Enviar mensagem</h3>
                <span class="close-modal mt-1" onclick="closeSendMessageModal()">
                    <img src="https://image.flaticon.com/icons/svg/1828/1828665.svg" width="20" height="20" alt="">
                </span>
            </div>
            <div class="card-body px-5">
                <div class="form-group">
                    <label for="msgcontent">Mensagem</label>
                    <textarea class="form-control" name="msgcontent" rows="4"></textarea>

                </div>
                <div class="form-group">
                    <label for="number">Destino</label>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">55(85)</span>
                        </div>
                        <input type="number" class="form-control" id="number" value="${number}">
                    </div>
                </div>
                <a href="#" class="btn btn-block btn-success mt-3" id="msg-button">Enviar mensagem
                <i class="fab fa-whatsapp ml-2"></i>
                </a>
            </div>
        </div>
    `;

    const sendMessageButton = document.querySelector('#msg-button');
    const msgDestin = document.querySelector('input#number');
    const msgContent = document.querySelector('textarea[name="msgcontent"]');

    sendMessageButton.addEventListener('click', (el) => {
        if (msgContent.value === "" || msgDestin.value.length != 9) {
            msgContent.classList.add('is-invalid');
            msgDestin.classList.add('is-invalid');
            return;
        }

        console.log('existe');
        console.log(msgContent.value);
        msgContent.classList.add('is-valid');
        msgDestin.classList.add('is-valid');
        el.preventDefault();
        redirectToSendWhatsappMessage(msgDestin.value, msgContent.value);

    })
}

function closeSendMessageModal() {
    toggleClassList(sendMessageContainer, 'hide', 'show-user')
}

function closeShowUserModal() {
    toggleClassList(modalContainer, 'hide', 'show-user')
}

function toggleClassList(element, classToAdd, classToRemove) {
    element.classList.add(classToAdd);
    element.classList.remove(classToRemove);
}

function formatDateToDDMMYYYY(date) {
    return new Date(date).toLocaleDateString();
}

function convertNumberToRealCoin(number) {
    return number.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

function redirectToSendWhatsappMessage(destin, content) {
    return window.location.href = `https://api.whatsapp.com/send?phone=5585${destin}&text=${content}`;
}

async function deleteUser(id) {
    const data = confirm("Quer mesmo deletar esse usuário?")

    if (data) {
        await fetch(`users/${id}`, {
            method: 'DELETE'
        })
        window.location.reload();
    };
}

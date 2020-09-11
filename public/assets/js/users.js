const closeModal = document.querySelector(".close-modal");
const modalContainer = document.querySelector("#modal-container");

async function showUser(id) {
    modalContainer.classList.remove('hide')
    modalContainer.classList.add('show-user');
    const userData = await fetch(`/users/show/${id}`).then(res => res.json());
    modalContainer.innerHTML = `

    <div class="card text-center my-5 mx-auto" id="user-container">
    <div class="card-header justify-content-between d-flex">
        <h3 class="text-center m-auto h4">Ver Usuário</h3>
        <span class="close-modal mt-1" onclick="closeModalFC()">
            <img src="https://image.flaticon.com/icons/svg/1828/1828665.svg" width="20" height="20" alt="">
        </span>
    </div>
    <div class="card-body px-5">
        <div class="row">
            <p class="col-12 col-md-6  font-weight-bold my-auto text-center text-md-left pb-2 pb-md-0">Nome Completo</p>
            <p class="col-12 col-md-6  bg-light border py-1 rounded">${userData.name}</p>
        </div>
        <div class="row">
            <p class="col-12 col-md-6 font-weight-bold my-auto text-center text-md-left pb-2 pb-md-0">Telefone</p>
            <p class="col-12 col-md-6 bg-light border py-1 rounded">${userData.phone}</p>
        </div>
        <div class="row">
            <p class="col-12 col-md-6 font-weight-bold my-auto text-center text-md-left pb-2 pb-md-0">Comprou</p>
            <p class="col-12 col-md-6 bg-light border py-1 rounded">${userData.buy}</p>
        </div>
        <div class="row">
            <p class="col-12 col-md-6 font-weight-bold my-auto text-center text-md-left pb-2 pb-md-0">Usuário Criado em:</p>
            <p class="col-12 col-md-6 bg-light border py-1 rounded">${userData.created_at}</p>
        </div>
        <div class="row">
            <p class="col-12 col-md-6 font-weight-bold my-auto text-center text-md-left pb-2 pb-md-0">Notas sobre o Usuário</p>
            <p class="col-12 col-md-6 bg-light border py-4 rounded">${userData.notes}</p>
        </div>
        
        <div class="btn-group btn-block mt-3" role="group" aria-label="Basic example">
            <a href="#" class="btn btn-primary">Editar</a>
            <a href="#" class="btn btn-danger" onclick="deleteUser('${userData._id}')">Apagar</a>
        </div>
    </div>
    </div>
    `;
}
function closeModalFC() {
    modalContainer.classList.add('hide')
    modalContainer.classList.remove('show-user');
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
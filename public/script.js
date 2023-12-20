const showUser = (userData) => {
    const userListContainer = document.querySelector("#user-list-container");
    userListContainer.innerHTML = "";
    for (let i = 0; i < userData.length; i++) {
        const userCard = document.createElement("div");
        const userCardBody = document.createElement("div");
        userCard.classList.add("card", "m-3", "w-25", "d-flex");
        userCardBody.classList.add("card-body");
        const user = userData[i];
        userCardBody.innerHTML = `
        <div>
        <div class="input-group mb-3">
        <input type="text" class="w-100 form-control" placeholder="Name" aria-label="Name" aria-describedby="basic-addon1" value="${user.name}" id="name${user.id}">
        </div>
        <div class="input-group mb-3">
        <input type="text" class="w-100 form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" value='${user.email}' id="email${user.id}">
        </div>
        <div class="input-group mb-3">
        <input type="text" class="w-100 form-control" placeholder="Age" aria-label="Age" aria-describedby="basic-addon1" value='${user.age}' id="age${user.id}">
        </div></div>
        <div>
        <button class="btn btn-primary" id=${user.id} onclick="handleUpdateUser(event)">Update</button>
        <button class="btn btn-primary" id=${user.id} onclick="handleDeleteUser(event)">Delete</button>
        </div>
            `;
        userCard.append(userCardBody);
        userListContainer.append(userCard);
    }
};

const getUser = async () => {
    const apiUrl = localStorage.getItem("apiUrl");
    if (apiUrl) {
        const response = await fetch(`${apiUrl}/users`);
        const userData = await response.json();
        showUser(userData);
    } else {
        window.location.href = "/api";
    }
};

getUser();

const handleCreateRegister = async () => {
    const apiUrl = localStorage.getItem("apiUrl");
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const age = document.querySelector("#age").value;

    const newUser = { name, email, age };
    const response = await fetch(`${apiUrl}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
    });
    const userData = await response.json();
    showUser(userData);
};

const handleUpdateUser = async (e) => {
    const id = e.target.id;
    const updateName = document.querySelector(`#name${id}`).value;
    const updateEmail = document.querySelector(`#email${id}`).value;
    const updateAge = document.querySelector(`#age${id}`).value;

    const updateUser = { name: updateName, email: updateEmail, age: updateAge };

    const apiUrl = localStorage.getItem("apiUrl");
    const response = await fetch(`${apiUrl}/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateUser),
    });
    const userData = await response.json();
};

const handleDeleteUser = async (e) => {
    const apiUrl = localStorage.getItem("apiUrl");
    const id = e.target.id;
    const response = await fetch(`${apiUrl}/users/${id}`, {
        method: "DELETE",
    });
    const userData = await response.json();
    showUser(userData);
};

// const handleFileUpload = async () => {
//     const inputTag = document.getElementById("fileUpload");
//     console.log(inputTag.files);
//     const response = await fetch("http://localhost:3000/fileUpload", {
//         method: "POST",
//         body: inputTag.files[0],
//     });
//     const data = await response.json();
//     console.log(data);
// };

// const fetchData = async () => {
//     try {
//         const url = "https://dummyjson.com/products";
//         const response = await fetch(url);
//         const data = await response.json();
//         console.log(data.products);
//     } catch (err) {
//         console.log(err);
//     }
// };

// fetchData();

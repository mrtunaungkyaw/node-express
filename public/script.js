const profileImage = document.querySelector("#profile");
const plusIcon = document.querySelector(".bi-plus-square-dotted");
const nameTag = document.querySelector("#name");
const emailTag = document.querySelector("#email");
const ageTag = document.querySelector("#age");

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
        <div style="height:90%">
            <div class="d-flex justify-content-center" style="height:50%" >
                <div class="w-50 h-100 d-flex align-item-center mb-3">
                    <label class="position-relative" for="${user.id}">
                        <img
                            id="img${user.id}"
                            src="${user.image}"
                            class="rounded img-thumbnail d-block"
                            alt="profileImage"
                            style="cursor: pointer; object-fit: cover; position: relative"
                            for="${user.id}"
                        />
                    </label>
                    <input hidden id="${user.id}" type="file" accept="/image/*" onchange="handleUpdateImage(event)" />
                </div>
            </div>
            <div style="height:50%">
                <div class="input-group mb-3">
                     <input type="text" class="w-100 form-control" placeholder="Name" aria-label="Name" aria-describedby="basic-addon1" value="${user.name}" id="name${user.id}">
                </div>
                <div class="input-group mb-3">
                    <input type="text" class="w-100 form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" value='${user.email}' id="email${user.id}">
                </div>
                <div class="input-group mb-3">
                    <input type="text" class="w-100 form-control" placeholder="Age" aria-label="Age" aria-describedby="basic-addon1" value='${user.age}' id="age${user.id}">
                </div>
            </div>
        </div>
        <div>
            <button class="btn btn-primary" id=${user.id} onclick="handleUpdateUser(event)">Update</button>
            <button class="btn btn-danger" id=${user.id} onclick="handleDeleteUser(event)">Delete</button>
        </div>
            `;
        userCard.append(userCardBody);
        userListContainer.append(userCard);
    }
};

const handleUploadImage = async (e) => {
    const apiUrl = localStorage.getItem("apiUrl");
    const file = e.target.files;
    const response = await fetch(`${apiUrl}/uploadImage`, {
        method: "POST",
        headers: { "Content-Type": "image/jpg" },
        body: file[0],
    });
    const { fileName, type } = await response.json();
    profileImage.src = `/userImage/${fileName}.${type}`;
    plusIcon.style.display = "none";
};

const handleUpdateImage = async (e) => {
    const apiUrl = localStorage.getItem("apiUrl");
    const id = e.target.id;
    console.log(id);
    const file = e.target.files;
    console.log(file);
    const response = await fetch(`${apiUrl}/updateImage/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "image/jpg" },
        body: file[0],
    });
    const { updateProfileId, type } = await response.json();
    console.log(updateProfileId, type);
    const updateProfile = document.getElementById(`img${id}`);
    updateProfile.src = `/userImage/${updateProfileId}.${type}`;
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
    const newName = nameTag.value;
    const newEmail = emailTag.value;
    const newAge = ageTag.value;
    const newImage = String(profileImage.src).split("/").slice(-1);

    const newUser = { name: newName, email: newEmail, age: newAge, image: `/userImage/${newImage}` };
    const response = await fetch(`${apiUrl}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
    });
    const userData = await response.json();
    showUser(userData);
    nameTag.value = "";
    emailTag.value = "";
    ageTag.value = "";
    profileImage.src = "/userImage/default.webp";
    plusIcon.style.display = "block";
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

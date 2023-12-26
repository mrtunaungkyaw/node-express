const profileImage = document.querySelector("#profile");
const plusIcon = document.querySelector(".bi-plus-square-dotted");
const nameTag = document.querySelector("#name");
const emailTag = document.querySelector("#email");
const ageTag = document.querySelector("#age");

const showUser = (userData) => {
    const userListContainer = document.querySelector("#user-list-container");
    userListContainer.innerHTML = "";
    for (let i = 0; i < userData.length; i++) {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("card", "p-3");
        const users = userData[i];
        cardDiv.innerHTML = `
        <label class="position-relative h-100" for="input${users.id}">
            <img id="img${users.id}" src="${users.image}" class="card-img-top img-thumbnail h-100 object-fit-cover" style="cursor: pointer" alt="profileImage" />
        </label> 
        <input accept="/image/*" hidden type="file" id="input${users.id}" onchange="handleUpdateImage(event)"/>
        <div class="card-body">
            <div class="mb-2">
                <label for="name${users.id}" class="form-label">Name</label>
                <input type="text" class="form-control" id="name${users.id}" placeholder="Name" value="${users.name}" />
            </div>
            <div class="mb-2">
                <label for="email${users.email}" class="form-label">Email</label>
                <input type="email" class="form-control-plaintext" readonly id="email${users.id}" placeholder="name@example.com" value="${users.email}" />
            </div>
            <div class="mb-2">
                <label for="age${users.age}" class="form-label">Age</label>
                <input type="age" class="form-control" id="age${users.id}" placeholder="Age" value="${users.age}" />
            </div>
        </div>
        <div class="d-flex justify-content-end ">
            <button id="delete${users.id}" class="btn btn-danger me-3" onclick="handleDeleteUser(event)">Delete</button>
            <button id="${users.id}" class="btn btn-primary" onclick="handleUpdateUser(event)">Update</button>
        </div>
        `;
        userListContainer.append(cardDiv);
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
    // get id slice (input) text remove
    const id = e.target.id.slice(5, e.target.id.length);
    const file = e.target.files[0];
    const response = await fetch(`${apiUrl}/updateImage/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "image/jpg" },
        body: file,
    });
    const { updateProfileId, type } = await response.json();
    const updateProfile = document.getElementById(`img${updateProfileId}`);
    updateProfile.src = `/userImage/${updateProfileId}.${type}`;
};

const getUser = async () => {
    const apiUrl = localStorage.getItem("apiUrl");
    if (apiUrl) {
        const response = await fetch(`${apiUrl}/users`);
        const userData = await response.json();
        showUser(userData);
    } else {
        console.log("hello");
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
    const getUpdateImage = document.querySelector(`#img${id}`).src;
    const updateImage = String(getUpdateImage).split("/").slice(-1);
    const updateName = document.querySelector(`#name${id}`).value;
    const updateEmail = document.querySelector(`#email${id}`).value;
    const updateAge = document.querySelector(`#age${id}`).value;

    console.log(updateImage, updateName, updateEmail, updateAge);

    const updateUser = { image: updateImage, name: updateName, email: updateEmail, age: updateAge };

    const apiUrl = localStorage.getItem("apiUrl");
    const response = await fetch(`${apiUrl}/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateUser),
    });
    const userData = await response.json();
    showUser(userData);
};

const handleDeleteUser = async (e) => {
    const apiUrl = localStorage.getItem("apiUrl");
    const id = e.target.id.slice(6, e.target.id.length);
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

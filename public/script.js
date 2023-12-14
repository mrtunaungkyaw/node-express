const getUser = async () => {
    const apiUrl = localStorage.getItem("apiUrl");
    if (apiUrl) {
        const response = await fetch(`${apiUrl}/users`);
        const userData = await response.json();
        console.log(userData);
    } else {
        window.location.href = "/api";
    }
};

getUser();

const handleCreateRegister = async () => {
    const inputName = document.querySelector("#name");
    const inputEmail = document.querySelector("#email");
    const inputAge = document.querySelector("#age");

    console.log(inputName, inputEmail, inputAge);
    console.log("create");

    // const response = await fetch("http://localhost:3000/users", {
    //     method: "POST",
    //     body: JSON.stringify(user),
    // });
    // const userData = await response.json();
    // console.log(userData);
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

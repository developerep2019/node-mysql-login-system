// const password = document.getElementById('password');
// const passwordConfirm = document.getElementById('passwordConfirm');
// const isMatched = document.getElementById('isMatched');
// const isFailed = document.getElementsByClassName('failedBySpan');


// const unMatchedClass = ['alert', 'alert-danger'];
// const matchedClass = ['alert', 'alert-success'];

// // passwordConfirm.addEventListener('change', (e) => {
// //     const span = document.createElement('span');

// //     if (password.value === e.target.value) {
// //         span.innerText = "Password Matched"
// //         matchedClass.map(c => span.classList.add(c));
// //         span.classList.add('failedBySpan')
// //         isMatched.appendChild(span)
// //     }
// //     else if (password.value !== e.target.value) {
// //         span.innerText("Password Doesn't Matched")
// //         unMatchedClass.map(c => span.classList.add(c));
// //         span.classList.add('failedBySpan');
// //     }
// // })

// passwordConfirm.addEventListener('change', (e) => {
//     const span = document.createElement('span');
//     console.log(isFailed[0]);

//     if (password.value !== e.target.value) {
//         span.innerText = "Password doesn't matched";
//         unMatchedClass.map(c => span.classList.add(c));
//         if (isFailed[0] === undefined) {
//             span.classList.add('failedBySpan');
//             isMatched.appendChild(span);
//         }
//     }
//     else if (isFailed[0]) {
//         unMatchedClass.map(c => span.classList.remove(c));
//         matchedClass.map(c => span.classList.add(c));
//         span.innerText = "Password Matched"

//     }
//     else {
//     }
// })
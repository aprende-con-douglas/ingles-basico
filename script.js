// Funciones para manejar la visibilidad de los modales
function showModal(modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(() => modal.classList.add('opacity-100'), 10);
}

function hideModal(modal) {
    modal.classList.remove('opacity-100');
    setTimeout(() => {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
    }, 300); // Duración de la transición
}

// Obtener elementos del DOM
const registerModal = document.getElementById('registerModal');
const loginModal = document.getElementById('loginModal');
const forgotPasswordModal = document.getElementById('forgotPasswordModal');
const changePasswordModal = document.getElementById('changePasswordModal');
const profileModal = document.getElementById('profileModal');
const quizModal = document.getElementById('quizModal');
const resultModal = document.getElementById('resultModal');

const registerBtn = document.getElementById('registerBtn');
const loginBtn = document.getElementById('loginBtn');
const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
const changePasswordBtn = document.getElementById('changePasswordBtn');
const backToLoginFromRegister = document.getElementById('backToLoginFromRegister');
const backToLoginFromForgot = document.getElementById('backToLoginFromForgot');
const backToProfileFromChange = document.getElementById('backToProfileFromChange');
const logoutBtn = document.getElementById('logoutBtn');
const startQuizBtn = document.getElementById('startQuizBtn');
const closeQuizBtn = document.getElementById('closeQuizBtn');
const closeResultBtn = document.getElementById('closeResultBtn');

const registrationForm = document.getElementById('registrationForm');
const loginForm = document.getElementById('loginForm');
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const changePasswordForm = document.getElementById('changePasswordForm');
const quizForm = document.getElementById('quizForm');

const registrationMessage = document.getElementById('registrationMessage');
const loginMessage = document.getElementById('loginMessage');
const forgotPasswordMessage = document.getElementById('forgotPasswordMessage');
const changePasswordMessage = document.getElementById('changePasswordMessage');
const quizMessage = document.getElementById('quizMessage');
const quizResult = document.getElementById('quizResult');
const quizScore = document.getElementById('quizScore');
const quizFeedback = document.getElementById('quizFeedback');

const profileName = document.getElementById('profileName');
const profileEmail = document.getElementById('profileEmail');

let currentUserEmail = null; // Variable para almacenar el correo del usuario logueado

// Event Listeners para botones y formularios
if (registerBtn) {
    registerBtn.addEventListener('click', () => showModal(registerModal));
}
if (loginBtn) {
    loginBtn.addEventListener('click', () => showModal(loginModal));
}
if (forgotPasswordBtn) {
    forgotPasswordBtn.addEventListener('click', () => {
        hideModal(loginModal);
        showModal(forgotPasswordModal);
    });
}
if (changePasswordBtn) {
    changePasswordBtn.addEventListener('click', () => {
        hideModal(profileModal);
        showModal(changePasswordModal);
    });
}
if (backToLoginFromRegister) {
    backToLoginFromRegister.addEventListener('click', () => {
        hideModal(registerModal);
        showModal(loginModal);
    });
}
if (backToLoginFromForgot) {
    backToLoginFromForgot.addEventListener('click', () => {
        hideModal(forgotPasswordModal);
        showModal(loginModal);
    });
}
if (backToProfileFromChange) {
    backToProfileFromChange.addEventListener('click', () => {
        hideModal(changePasswordModal);
        showModal(profileModal);
    });
}

// Botones de cierre de modal
document.querySelectorAll('.close-modal').forEach(button => {
    button.addEventListener('click', (e) => {
        const modalId = e.target.closest('.modal').id;
        let modalToClose;
        switch (modalId) {
            case 'registerModal': modalToClose = registerModal; break;
            case 'loginModal': modalToClose = loginModal; break;
            case 'forgotPasswordModal': modalToClose = forgotPasswordModal; break;
            case 'changePasswordModal': modalToClose = changePasswordModal; break;
            case 'profileModal': modalToClose = profileModal; break;
            case 'quizModal': modalToClose = quizModal; break;
            case 'resultModal': modalToClose = resultModal; break;
        }
        if (modalToClose) hideModal(modalToClose);
    });
});

// Lógica de formularios

// Formulario de Registro
if (registrationForm) {
    registrationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        registrationMessage.textContent = 'Inscribiendo...';
        registrationMessage.className = 'text-center mt-4 text-lg font-medium text-gray-700';

        const formData = new FormData(registrationForm);
        const data = Object.fromEntries(formData.entries());

        try {
            // CONVERTIMOS EL OBJETO 'data' A UNA CADENA JSON PARA ENVIARLO A APPS SCRIPT
            const jsonData = JSON.stringify(data); 

            google.script.run
                .withSuccessHandler(response => {
                    if (response.success) {
                        registrationMessage.textContent = response.message;
                        registrationMessage.className = 'text-center mt-4 text-lg font-medium text-green-700';
                        registrationForm.reset();
                        setTimeout(() => hideModal(registerModal), 3000);
                    } else {
                        registrationMessage.textContent = response.message;
                        registrationMessage.className = 'text-center mt-4 text-lg font-medium text-red-700';
                    }
                })
                .withFailureHandler(error => {
                    registrationMessage.textContent = `Error al inscribirse: ${error.message || 'Error desconocido'}. Intenta de nuevo.`;
                    registrationMessage.className = 'text-center mt-4 text-lg font-medium text-red-700';
                    console.error('Error de Apps Script:', error);
                })
                .registerStudent(jsonData); // Enviamos la cadena JSON
        } catch (error) {
            registrationMessage.textContent = `Error inesperado: ${error.message}.`;
            registrationMessage.className = 'text-center mt-4 text-lg font-medium text-red-700';
            console.error('Error en JavaScript:', error);
        }
    });
}

// Formulario de Login
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        loginMessage.textContent = 'Iniciando sesión...';
        loginMessage.className = 'text-center mt-4 text-lg font-medium text-gray-700';

        const email = document.getElementById('loginCorreo').value;
        const password = document.getElementById('loginPassword').value;

        try {
            google.script.run
                .withSuccessHandler(response => {
                    if (response.success) {
                        loginMessage.textContent = response.message;
                        loginMessage.className = 'text-center mt-4 text-lg font-medium text-green-700';
                        loginForm.reset();
                        currentUserEmail = email; // Guarda el email del usuario logueado
                        profileName.textContent = response.studentName;
                        profileEmail.textContent = email;
                        setTimeout(() => {
                            hideModal(loginModal);
                            showModal(profileModal);
                        }, 500);
                    } else {
                        loginMessage.textContent = response.message;
                        loginMessage.className = 'text-center mt-4 text-lg font-medium text-red-700';
                    }
                })
                .withFailureHandler(error => {
                    loginMessage.textContent = `Error al iniciar sesión: ${error.message || 'Error desconocido'}. Intenta de nuevo.`;
                    loginMessage.className = 'text-center mt-4 text-lg font-medium text-red-700';
                    console.error('Error de Apps Script:', error);
                })
                .loginStudent(email, password);
        } catch (error) {
            loginMessage.textContent = `Error inesperado: ${error.message}.`;
            loginMessage.className = 'text-center mt-4 text-lg font-medium text-red-700';
            console.error('Error en JavaScript:', error);
        }
    });
}

// Formulario de Recuperar Contraseña
if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        forgotPasswordMessage.textContent = 'Enviando correo...';
        forgotPasswordMessage.className = 'text-center mt-4 text-lg font-medium text-gray-700';

        const email = document.getElementById('forgotEmail').value;

        try {
            google.script.run
                .withSuccessHandler(response => {
                    if (response.success) {
                        forgotPasswordMessage.textContent = response.message;
                        forgotPasswordMessage.className = 'text-center mt-4 text-lg font-medium text-green-700';
                        forgotPasswordForm.reset();
                        setTimeout(() => hideModal(forgotPasswordModal), 2000);
                    } else {
                        forgotPasswordMessage.textContent = response.message;
                        forgotPasswordMessage.className = 'text-center mt-4 text-lg font-medium text-red-700';
                    }
                })
                .withFailureHandler(error => {
                    forgotPasswordMessage.textContent = `Error al enviar correo: ${error.message || 'Error desconocido'}. Intenta de nuevo.`;
                    forgotPasswordMessage.className = 'text-center mt-4 text-lg font-medium text-red-700';
                    console.error('Error de Apps Script:', error);
                })
                .sendPasswordResetEmail(email);
        } catch (error) {
            forgotPasswordMessage.textContent = `Error inesperado: ${error.message}.`;
            forgotPasswordMessage.className = 'text-center mt-4 text-lg font-medium text-red-700';
            console.error('Error en JavaScript:', error);
        }
    });
}

// Formulario de Cambiar Contraseña
if (changePasswordForm) {
    changePasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        changePasswordMessage.textContent = 'Cambiando contraseña...';
        changePasswordMessage.className = 'text-center mt-4 text-lg font-medium text-gray-700';

        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmNewPassword = document.getElementById('confirmNewPassword').value;

        if (newPassword !== confirmNewPassword) {
            changePasswordMessage.textContent = 'Las nuevas contraseñas no coinciden.';
            changePasswordMessage.className = 'text-center mt-4 text-lg font-medium text-red-700';
            return;
        }

        try {
            google.script.run
                .withSuccessHandler(response => {
                    if (response.success) {
                        changePasswordMessage.textContent = response.message;
                        changePasswordMessage.className = 'text-center mt-4 text-lg font-medium text-green-700';
                        changePasswordForm.reset();
                        setTimeout(() => {
                            hideModal(changePasswordModal);
                            showModal(profileModal);
                        }, 2000);
                    } else {
                        changePasswordMessage.textContent = response.message;
                        changePasswordMessage.className = 'text-center mt-4 text-lg font-medium text-red-700';
                    }
                })
                .withFailureHandler(error => {
                    changePasswordMessage.textContent = `Error al cambiar contraseña: ${error.message || 'Error desconocido'}. Intenta de nuevo.`;
                    changePasswordMessage.className = 'text-center mt-4 text-lg font-medium text-red-700';
                    console.error('Error de Apps Script:', error);
                })
                .changeStudentPassword(currentUserEmail, currentPassword, newPassword);
        } catch (error) {
            changePasswordMessage.textContent = `Error inesperado: ${error.message}.`;
            changePasswordMessage.className = 'text-center mt-4 text-lg font-medium text-red-700';
            console.error('Error en JavaScript:', error);
        }
    });
}

// Botón de Cerrar Sesión
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        currentUserEmail = null; // Limpiar el usuario actual
        hideModal(profileModal);
        showModal(loginModal); // Regresar al login
        alert('Has cerrado sesión exitosamente.');
    });
}

// Simulación de Quiz (se llenaría dinámicamente)
const quizContent = document.getElementById('quizContent');
const quizQuestions = [
    {
        question: "¿Cuál es el pasado simple de 'go'?",
        options: ["went", "gone", "goed", "going"],
        answer: "went"
    },
    {
        question: "¿Cuál es el significado de 'hello'?",
        options: ["Adiós", "Hola", "Gracias", "Por favor"],
        answer: "Hola"
    },
    {
        question: "Completa la frase: 'I ___ happy'.",
        options: ["is", "am", "are", "be"],
        answer: "am"
    }
];

function renderQuiz() {
    quizContent.innerHTML = ''; // Limpiar preguntas anteriores
    quizQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'mb-4';
        questionDiv.innerHTML = `
            <p class="font-semibold text-gray-800">${index + 1}. ${q.question}</p>
            <div class="mt-2">
                ${q.options.map(option => `
                    <label class="inline-flex items-center mr-4">
                        <input type="radio" name="question${index}" value="${option}" class="form-radio text-blue-600">
                        <span class="ml-2 text-gray-700">${option}</span>
                    </label>
                `).join('')}
            </div>
        `;
        quizContent.appendChild(questionDiv);
    });
}

// Botón de Iniciar Quiz
if (startQuizBtn) {
    startQuizBtn.addEventListener('click', () => {
        if (!currentUserEmail) {
            alert('Debes iniciar sesión para comenzar un quiz.');
            hideModal(profileModal);
            showModal(loginModal);
            return;
        }
        renderQuiz();
        hideModal(profileModal);
        showModal(quizModal);
    });
}

// Botón de Cerrar Quiz
if (closeQuizBtn) {
    closeQuizBtn.addEventListener('click', () => {
        hideModal(quizModal);
        showModal(profileModal); // Volver al perfil
        quizForm.reset(); // Limpiar el formulario del quiz
    });
}

// Botón de Cerrar Resultados
if (closeResultBtn) {
    closeResultBtn.addEventListener('click', () => {
        hideModal(resultModal);
        showModal(profileModal); // Volver al perfil
    });
}

// Formulario de Quiz (Manejo de Respuestas)
if (quizForm) {
    quizForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        quizMessage.textContent = 'Calculando resultados...';
        quizMessage.className = 'text-center mt-4 text-lg font-medium text-gray-700';

        let score = 0;
        const totalQuestions = quizQuestions.length;
        let feedback = "";
        let passed = false;

        quizQuestions.forEach((q, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            if (selectedOption && selectedOption.value === q.answer) {
                score++;
            }
        });

        // Lógica de aprobación simple (ej. 70% para aprobar)
        const passingScore = totalQuestions * 0.7;
        if (score >= passingScore) {
            feedback = "¡Felicidades, has aprobado el quiz!";
            passed = true;
        } else {
            feedback = "Sigue practicando, ¡casi lo logras!";
        }

        quizScore.textContent = `${score} / ${totalQuestions}`;
        quizFeedback.textContent = feedback;
        quizResult.className = passed ? 'text-green-700' : 'text-red-700';

        const resultData = {
            studentEmail: currentUserEmail,
            studentName: profileName.textContent,
            topic: "Quiz de Prueba", // Puedes hacerlo dinámico si tienes varios quizzes
            score: score,
            totalQuestions: totalQuestions,
            passed: passed,
            feedback: feedback
        };

        try {
            // CONVERTIMOS EL OBJETO 'resultData' A UNA CADENA JSON
            const jsonResultData = JSON.stringify(resultData);

            google.script.run
                .withSuccessHandler(response => {
                    quizMessage.textContent = response.message;
                    if (response.success) {
                        quizMessage.className = 'text-center mt-4 text-lg font-medium text-green-700';
                    } else {
                        quizMessage.className = 'text-center mt-4 text-lg font-medium text-red-700';
                    }
                    setTimeout(() => {
                        hideModal(quizModal);
                        showModal(resultModal);
                        quizForm.reset();
                    }, 500);
                })
                .withFailureHandler(error => {
                    quizMessage.textContent = `Error al guardar resultados: ${error.message || 'Error desconocido'}.`;
                    quizMessage.className = 'text-center mt-4 text-lg font-medium text-red-700';
                    console.error('Error de Apps Script al guardar resultados:', error);
                })
                .saveQuizResult(jsonResultData); // Enviamos la cadena JSON
        } catch (error) {
            quizMessage.textContent = `Error inesperado: ${error.message}.`;
            quizMessage.className = 'text-center mt-4 text-lg font-medium text-red-700';
            console.error('Error en JavaScript al procesar quiz:', error);
        }
    });
}

// Lógica inicial para mostrar el modal de login al cargar la página
window.onload = () => {
    showModal(loginModal);
};

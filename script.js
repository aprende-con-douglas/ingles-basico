// Constantes y selectores de elementos del DOM
const introSection = document.getElementById('introSection');
const aulaVirtual = document.getElementById('aulaVirtual');
const navLoginBtn = document.getElementById('navLoginBtn');
const navRegisterBtn = document.getElementById('navRegisterBtn');
const startLearningBtn = document.getElementById('startLearningBtn');

const registerModal = document.getElementById('registerModal');
const closeRegisterModal = document.getElementById('closeRegisterModal');
const registrationForm = document.getElementById('registrationForm');
const registrationMessage = document.getElementById('registrationMessage');

const loginModal = document.getElementById('loginModal');
const closeLoginModal = document.getElementById('closeLoginModal');
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');
const togglePassword = document.getElementById('togglePassword');
const loginPassword = document.getElementById('loginPassword');
const forgotPasswordBtn = document.getElementById('forgotPasswordBtn'); // Botón para olvidar contraseña

const studentNameDisplay = document.getElementById('studentNameDisplay');
const logoutBtn = document.getElementById('logoutBtn');
const moduleMenu = document.getElementById('moduleMenu');
const contentTitle = document.getElementById('contentTitle');
const lessonContent = document.getElementById('lessonContent');
const evaluationSection = document.getElementById('evaluationSection');
const quizForm = document.getElementById('quizForm');
const submitQuizBtn = document.getElementById('submitQuizBtn');
const quizResult = document.getElementById('quizResult');
const repeatQuizBtn = document.getElementById('repeatQuizBtn');

const changePasswordSection = document.getElementById('changePasswordSection');
const changePasswordForm = document.getElementById('changePasswordForm');
const passwordChangeMessage = document.getElementById('passwordChangeMessage');

// Variable global para almacenar los datos del estudiante logueado
let loggedInStudent = null;

// Objeto para simular la estructura de los módulos y temas.
// En un proyecto real, esto podría cargarse dinámicamente desde Google Sheets o una base de datos.
const courseContent = [
    {
        module: 'Módulo 1: Fundamentos del Idioma',
        topics: [
            {
                id: 'saludos-despedidas',
                title: 'Saludos y Despedidas',
                type: 'lesson',
                content: `
                    <h3 class="text-3xl font-semibold text-blue-700 mb-4">Introducción a Saludos y Despedidas</h3>
                    <p class="mb-4">Aprender a saludar y despedirse es el primer paso crucial para cualquier conversación en inglés. ¡Te abrirá puertas y te permitirá interactuar con confianza desde el primer momento!</p>
                    
                    <h4 class="text-2xl font-semibold text-blue-600 mb-3">Saludos Comunes (Greetings)</h4>
                    <ul class="list-disc list-inside mb-4">
                        <li><strong>Hello / Hi:</strong> Hola (general, informal).</li>
                        <li><strong>Good morning:</strong> Buenos días (hasta el mediodía).</li>
                        <li><strong>Good afternoon:</strong> Buenas tardes (desde el mediodía hasta el anochecer).</li>
                        <li><strong>Good evening:</strong> Buenas noches (al saludar, cuando ya está oscuro).</li>
                        <li><strong>How are you?:</strong> ¿Cómo estás?</li>
                        <li><strong>I'm fine, thank you:</strong> Estoy bien, gracias.</li>
                        <li><strong>Nice to meet you:</strong> Encantado/a de conocerte.</li>
                    </ul>
                    <p class="mb-4"><strong>Ejemplos Prácticos:</strong></p>
                    <ul class="list-disc list-inside mb-4">
                        <li>A: "Good morning, John! How are you?"</li>
                        <li>B: "I'm fine, thank you. Nice to meet you, too!"</li>
                        <li>A: "Hi Sarah, how's your day going?"</li>
                        <li>B: "Hello! It's going well, thanks."</li>
                    </ul>

                    <h4 class="text-2xl font-semibold text-blue-600 mb-3">Despedidas Comunes (Farewells)</h4>
                    <ul class="list-disc list-inside mb-4">
                        <li><strong>Goodbye / Bye:</strong> Adiós (general, informal).</li>
                        <li><strong>Good night:</strong> Buenas noches (al despedirse).</li>
                        <li><strong>See you later:</strong> Nos vemos luego.</li>
                        <li><strong>See you soon:</strong> Nos vemos pronto.</li>
                        <li><strong>Have a good day:</strong> Que tengas un buen día.</li>
                        <li><strong>Take care:</strong> Cuídate.</li>
                    </ul>
                    <p class="mb-4"><strong>Ejemplos Prácticos:</strong></p>
                    <ul class="list-disc list-inside mb-4">
                        <li>A: "Well, I have to go now. Goodbye!"</li>
                        <li>B: "Goodbye! See you tomorrow."</li>
                        <li>A: "It was nice talking to you. Have a good day!"</li>
                        <li>B: "You too! Take care."</li>
                    </ul>

                    <h4 class="text-2xl font-semibold text-blue-600 mb-3">Recursos Adicionales:</h4>
                    <ul class="list-disc list-inside mb-4">
                        <li><a href="https://example.com/documento-saludos.pdf" target="_blank" class="text-blue-500 hover:underline">Documento PDF: Saludos y Despedidas Esenciales</a></li>
                        <li><a href="https://www.youtube.com/watch?v=tu_youtube_video_id" target="_blank" class="text-blue-500 hover:underline">Video: Cómo saludar y despedirse en inglés (¡Con Douglas!)</a></li>
                        <li><a href="https://example.com/audio-saludos.mp3" target="_blank" class="text-blue-500 hover:underline">Audio: Pronunciación de saludos y despedidas</a></li>
                    </ul>
                `,
                quiz: [
                    {
                        question: "¿Qué usarías para saludar a alguien en la mañana?",
                        type: "multiple-choice",
                        options: ["Good night", "Good afternoon", "Good morning", "Goodbye"],
                        answer: "Good morning"
                    },
                    {
                        question: "La frase 'See you later' significa 'Nos vemos pronto'. (Verdadero/Falso)",
                        type: "true-false",
                        answer: "Falso"
                    },
                    {
                        question: "Completa la frase: 'Nice to _______ you.'",
                        type: "completion",
                        answer: "meet"
                    },
                    {
                        question: "¿Cuál de las siguientes NO es una despedida?",
                        type: "multiple-choice",
                        options: ["Take care", "Good evening", "See you soon", "Goodbye"],
                        answer: "Good evening"
                    },
                    {
                        question: "Si te encuentras a alguien por la tarde, ¿cómo le saludarías?",
                        type: "completion",
                        answer: "Good afternoon"
                    }
                ]
            },
            { id: 'el-abecedario', title: 'El Abecedario', type: 'lesson', content: '<p>Contenido sobre El Abecedario...</p>', quiz: [] },
            { id: 'numeros', title: 'Números Ordinales y Cardinales', type: 'lesson', content: '<p>Contenido sobre Números...</p>', quiz: [] },
            { id: 'colores', title: 'Colores más utilizados', type: 'lesson', content: '<p>Contenido sobre Colores...</p>', quiz: [] },
            { id: 'meses', title: 'Meses del año', type: 'lesson', content: '<p>Contenido sobre Meses...</p>', quiz: [] },
            { id: 'dias', title: 'Días de la semana', type: 'lesson', content: '<p>Contenido sobre Días...</p>', quiz: [] },
            { id: 'la-hora', title: 'La hora', type: 'lesson', content: '<p>Contenido sobre La Hora...</p>', quiz: [] },
        ]
    },
    {
        module: 'Módulo 2: Estructuras Básicas',
        topics: [
            { id: 'to-be-to-have', title: 'Verbos "to be" y "to have"', type: 'lesson', content: '<p>Contenido sobre Verbos To Be/Have...</p>', quiz: [] },
            { id: 'pronombres', title: 'Pronombres personales', type: 'lesson', content: '<p>Contenido sobre Pronombres...</p>', quiz: [] },
            { id: 'sustantivos', title: 'Sustantivos singulares y plurales', type: 'lesson', content: '<p>Contenido sobre Sustantivos...</p>', quiz: [] },
            { id: 'a-an', title: 'Artículos indefinidos A-AN', type: 'lesson', content: '<p>Contenido sobre A/An...</p>', quiz: [] },
        ]
    },
    {
        module: 'Módulo 3: Construyendo Oraciones',
        topics: [
            { id: 'verbos-reg-irreg', title: 'Verbos regulares e irregulares', type: 'lesson', content: '<p>Contenido sobre Verbos Reg/Irreg...</p>', quiz: [] },
            { id: 'adjetivos-adverbios', title: 'Adjetivos y adverbios', type: 'lesson', content: '<p>Contenido sobre Adjetivos/Adverbios...</p>', quiz: [] },
            { id: 'preposiciones', title: 'Preposiciones', type: 'lesson', content: '<p>Contenido sobre Preposiciones...</p>', quiz: [] },
            { id: 'conectores', title: 'Conectores', type: 'lesson', content: '<p>Contenido sobre Conectores...</p>', quiz: [] },
            { id: 'contables-incontables', title: 'Contables e incontables', type: 'lesson', content: '<p>Contenido sobre Contables/Incontables...</p>', quiz: [] },
        ]
    },
    {
        module: 'Módulo 4: Tiempos Verbales Esenciales',
        topics: [
            { id: 'presente-simple', title: 'Presente Simple', type: 'lesson', content: '<p>Contenido sobre Presente Simple...</p>', quiz: [] },
            { id: 'presente-continuo', title: 'Presente Continuo', type: '<p>Contenido sobre Presente Continuo...</p>', quiz: [] },
        ]
    },
    {
        module: 'Módulo 5: Vocabulario y Entorno',
        topics: [
            { id: 'animales', title: 'Animales más conocidos', type: 'lesson', content: '<p>Contenido sobre Animales...</p>', quiz: [] },
            { id: 'cuerpo-humano', title: 'Partes del cuerpo humano', type: 'lesson', content: '<p>Contenido sobre Cuerpo Humano...</p>', quiz: [] },
            { id: 'casa', title: 'Partes y Objetos de la casa', type: 'lesson', content: '<p>Contenido sobre La Casa...</p>', quiz: [] },
            { id: 'comida', title: 'Comida: frutas, vegetales, otros', type: 'lesson', content: '<p>Contenido sobre Comida...</p>', quiz: [] },
            { id: 'lugares-ciudad', title: 'Lugares de la ciudad', type: 'lesson', content: '<p>Contenido sobre Lugares de la Ciudad...</p>', quiz: [] },
            { id: 'transporte', title: 'Transporte', type: 'lesson', content: '<p>Contenido sobre Transporte...</p>', quiz: [] },
            { id: 'ocio', title: 'Actividades de ocio', type: 'lesson', content: '<p>Contenido sobre Ocio...</p>', quiz: [] },
        ]
    }
];

// Asigna el año actual al footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// --- Funciones para mostrar/ocultar modales y secciones ---
function showModal(modalElement) {
    modalElement.classList.remove('hidden');
    // Para una animación más suave
    setTimeout(() => {
        modalElement.children[0].classList.remove('scale-95');
        modalElement.children[0].classList.add('scale-100');
    }, 10);
}

function hideModal(modalElement) {
    modalElement.children[0].classList.remove('scale-100');
    modalElement.children[0].classList.add('scale-95');
    setTimeout(() => {
        modalElement.classList.add('hidden');
    }, 200); // Coincide con la duración de la transición
}

function showAulaVirtual() {
    introSection.classList.add('hidden');
    aulaVirtual.classList.remove('hidden');
}

function hideAulaVirtual() {
    introSection.classList.remove('hidden');
    aulaVirtual.classList.add('hidden');
}

// --- Manejadores de Eventos de Botones Principales ---
navRegisterBtn.addEventListener('click', () => showModal(registerModal));
closeRegisterModal.addEventListener('click', () => hideModal(registerModal));

navLoginBtn.addEventListener('click', () => showModal(loginModal));
closeLoginModal.addEventListener('click', () => hideModal(loginModal));

startLearningBtn.addEventListener('click', () => {
    // Si el usuario ya está logueado, ir al aula. Si no, mostrar el modal de registro.
    if (loggedInStudent) {
        showAulaVirtual();
    } else {
        showModal(registerModal);
    }
});

logoutBtn.addEventListener('click', () => {
    loggedInStudent = null; // Limpia los datos del estudiante
    localStorage.removeItem('loggedInStudent'); // Elimina la sesión del almacenamiento local
    hideAulaVirtual();
    loginMessage.textContent = ''; // Limpia mensajes anteriores
    registrationMessage.textContent = '';
    // Ocultar sección de cambio de contraseña si estaba visible
    changePasswordSection.classList.add('hidden');
    // Reiniciar al contenido inicial del aula
    contentTitle.textContent = 'Selecciona un tema para comenzar...';
    lessonContent.innerHTML = '<p class="text-gray-600">Navega por el menú de la izquierda para explorar los diferentes módulos y temas del curso de inglés. ¡Mucho éxito en tu aprendizaje!</p>';
    evaluationSection.classList.add('hidden'); // Ocultar sección de evaluación
});

// --- Manejo del Formulario de Registro ---
registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    registrationMessage.textContent = 'Enviando solicitud de inscripción...';
    registrationMessage.className = 'text-center mt-4 text-lg font-medium text-gray-600';

    const formData = new FormData(registrationForm);
    const data = Object.fromEntries(formData.entries());

    try {
        // Llama a la función de Google Apps Script para registrar al estudiante
        // window.google.script.run es la API para comunicarse con Apps Script desde el frontend
        google.script.run
            .withSuccessHandler(response => {
                if (response.success) {
                    registrationMessage.textContent = response.message;
                    registrationMessage.className = 'text-center mt-4 text-lg font-medium text-green-700';
                    registrationForm.reset(); // Limpia el formulario
                    setTimeout(() => hideModal(registerModal), 3000); // Cierra el modal después de 3 segundos
                } else {
                    registrationMessage.textContent = response.message;
                    registrationMessage.className = 'text-center mt-4 text-lg font-medium text-red-700';
                }
            })
            .withFailureHandler(error => {
                registrationMessage.textContent = `Error al inscribirse: ${error.message}. Intenta de nuevo.`;
                registrationMessage.className = 'text-center mt-4 text-lg font-medium text-red-700';
                console.error('Error de Apps Script:', error);
            })
            .registerStudent(data);

    } catch (error) {
        registrationMessage.textContent = 'Error de conexión. Verifica tu internet e intenta de nuevo.';
        registrationMessage.className = 'text-center mt-4 text-lg font-medium text-red-700';
        console.error('Error general:', error);
    }
});

// --- Manejo del Formulario de Inicio de Sesión ---
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginMessage.textContent = 'Verificando credenciales...';
    loginMessage.className = 'text-center mt-4 text-lg font-medium text-gray-600';

    const email = document.getElementById('loginCorreo').value;
    const password = document.getElementById('loginPassword').value;

    try {
        google.script.run
            .withSuccessHandler(response => {
                if (response.success) {
                    loggedInStudent = response.student; // Guarda los datos del estudiante
                    localStorage.setItem('loggedInStudent', JSON.stringify(loggedInStudent)); // Guarda en localStorage
                    studentNameDisplay.textContent = loggedInStudent.nombre;
                    loginMessage.textContent = response.message;
                    loginMessage.className = 'text-center mt-4 text-lg font-medium text-green-700';
                    hideModal(loginModal);
                    showAulaVirtual();
                    renderModuleMenu(); // Carga el menú del aula
                } else {
                    loginMessage.textContent = response.message;
                    loginMessage.className = 'text-center mt-4 text-lg font-medium text-red-700';
                }
            })
            .withFailureHandler(error => {
                loginMessage.textContent = `Error al iniciar sesión: ${error.message}.`;
                loginMessage.className = 'text-center mt-4 text-lg font-medium text-red-700';
                console.error('Error de Apps Script:', error);
            })
            .loginStudent(email, password);

    } catch (error) {
        loginMessage.textContent = 'Error de conexión. Verifica tu internet e intenta de nuevo.';
        loginMessage.className = 'text-center mt-4 text-lg font-medium text-red-700';
        console.error('Error general:', error);
    }
});

// Mostrar/Ocultar contraseña
togglePassword.addEventListener('click', () => {
    const type = loginPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    loginPassword.setAttribute('type', type);
    // Cambiar ícono si es necesario (ej: ojo abierto/cerrado)
});

// Manejar olvido de contraseña
forgotPasswordBtn.addEventListener('click', async () => {
    const email = document.getElementById('loginCorreo').value;
    if (!email) {
        loginMessage.textContent = 'Por favor, introduce tu correo electrónico para restablecer la contraseña.';
        loginMessage.className = 'text-center mt-4 text-lg font-medium text-orange-600';
        return;
    }

    loginMessage.textContent = 'Enviando nueva contraseña a tu correo...';
    loginMessage.className = 'text-center mt-4 text-lg font-medium text-gray-600';

    try {
        google.script.run
            .withSuccessHandler(response => {
                if (response.success) {
                    loginMessage.textContent = response.message;
                    loginMessage.className = 'text-center mt-4 text-lg font-medium text-green-700';
                } else {
                    loginMessage.textContent = response.message;
                    loginMessage.className = 'text-center mt-4 text-lg font-medium text-red-700';
                }
            })
            .withFailureHandler(error => {
                loginMessage.textContent = `Error al enviar contraseña: ${error.message}.`;
                loginMessage.className = 'text-center mt-4 text-lg font-medium text-red-700';
                console.error('Error de Apps Script:', error);
            })
            .sendPasswordResetEmail(email);
    } catch (error) {
        loginMessage.textContent = 'Error de conexión. Verifica tu internet e intenta de nuevo.';
        loginMessage.className = 'text-center mt-4 text-lg font-medium text-red-700';
        console.error('Error general:', error);
    }
});


// --- Lógica del Aula Virtual ---

// Carga el menú de módulos y temas
function renderModuleMenu() {
    moduleMenu.innerHTML = ''; // Limpia el menú existente
    courseContent.forEach(module => {
        const moduleDiv = document.createElement('div');
        moduleDiv.className = 'mb-4';
        moduleDiv.innerHTML = `
            <button class="flex items-center justify-between w-full py-3 px-4 bg-blue-100 text-blue-800 rounded-lg font-bold text-left shadow-sm hover:bg-blue-200 transition duration-200" data-module-toggle="${module.module.replace(/\s/g, '-')}-topics">
                ${module.module}
                <svg class="w-5 h-5 ml-2 transform rotate-0 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <ul id="${module.module.replace(/\s/g, '-')}-topics" class="mt-2 pl-4 space-y-2 hidden">
                </ul>
        `;
        moduleMenu.appendChild(moduleDiv);

        const topicsList = moduleDiv.querySelector(`#${module.module.replace(/\s/g, '-')}-topics`);
        module.topics.forEach(topic => {
            const topicLi = document.createElement('li');
            topicLi.innerHTML = `
                <a href="#" class="block py-2 px-3 text-gray-700 hover:bg-gray-200 rounded-md transition duration-200" data-topic-id="${topic.id}">${topic.title}</a>
            `;
            topicsList.appendChild(topicLi);
        });

        // Añadir evento de toggle para los módulos
        const moduleToggleButton = moduleDiv.querySelector('button[data-module-toggle]');
        moduleToggleButton.addEventListener('click', () => {
            const targetId = moduleToggleButton.dataset.moduleToggle;
            const targetList = document.getElementById(targetId);
            const icon = moduleToggleButton.querySelector('svg');
            
            targetList.classList.toggle('hidden');
            icon.classList.toggle('rotate-180');
        });
    });

    // Añadir el botón de cambio de contraseña al menú
    const passwordChangeItem = document.createElement('div');
    passwordChangeItem.className = 'mt-6 pt-4 border-t border-gray-200';
    passwordChangeItem.innerHTML = `
        <button id="showChangePasswordBtn" class="flex items-center w-full py-3 px-4 bg-purple-100 text-purple-800 rounded-lg font-bold text-left shadow-sm hover:bg-purple-200 transition duration-200">
            Cambiar Contraseña
            <svg class="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2v5a2 2 0 01-2 2H9a2 2 0 01-2-2V9a2 2 0 012-2h6z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14v1m0-5V8m0 4a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
        </button>
    `;
    moduleMenu.appendChild(passwordChangeItem);

    document.getElementById('showChangePasswordBtn').addEventListener('click', () => {
        lessonContent.innerHTML = ''; // Limpia el contenido actual
        evaluationSection.classList.add('hidden'); // Oculta la sección de evaluación
        changePasswordSection.classList.remove('hidden'); // Muestra la sección de cambio de contraseña
        contentTitle.textContent = 'Cambiar tu Contraseña';
        passwordChangeMessage.textContent = ''; // Limpia mensajes anteriores
        changePasswordForm.reset();
    });

}

// Carga el contenido de un tema
moduleMenu.addEventListener('click', (e) => {
    e.preventDefault();
    const topicLink = e.target.closest('a[data-topic-id]');
    if (topicLink) {
        const topicId = topicLink.dataset.topicId;
        const selectedTopic = courseContent.flatMap(m => m.topics).find(t => t.id === topicId);

        if (selectedTopic) {
            contentTitle.textContent = selectedTopic.title;
            lessonContent.innerHTML = selectedTopic.content;
            
            // Oculta la sección de cambio de contraseña si estaba visible
            changePasswordSection.classList.add('hidden');

            // Carga la evaluación si existe para el tema
            if (selectedTopic.quiz && selectedTopic.quiz.length > 0) {
                renderQuiz(selectedTopic.quiz);
                evaluationSection.classList.remove('hidden');
            } else {
                evaluationSection.classList.add('hidden');
                quizForm.innerHTML = ''; // Limpia preguntas si no hay evaluación
                quizResult.classList.add('hidden');
                repeatQuizBtn.classList.add('hidden');
            }
        }
    }
});


// --- Lógica de Evaluaciones ---
function renderQuiz(quizQuestions) {
    quizForm.innerHTML = ''; // Limpia preguntas anteriores
    quizResult.classList.add('hidden');
    repeatQuizBtn.classList.add('hidden');
    submitQuizBtn.classList.remove('hidden');

    quizQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50';
        
        let optionsHtml = '';
        if (q.type === 'multiple-choice') {
            optionsHtml = q.options.map(option => `
                <label class="block mt-2 cursor-pointer text-lg">
                    <input type="radio" name="question-${index}" value="${option}" class="mr-2 accent-blue-500">
                    ${option}
                </label>
            `).join('');
        } else if (q.type === 'true-false') {
            optionsHtml = `
                <label class="block mt-2 cursor-pointer text-lg">
                    <input type="radio" name="question-${index}" value="Verdadero" class="mr-2 accent-blue-500">
                    Verdadero
                </label>
                <label class="block mt-2 cursor-pointer text-lg">
                    <input type="radio" name="question-${index}" value="Falso" class="mr-2 accent-blue-500">
                    Falso
                </label>
            `;
        } else if (q.type === 'completion') {
            optionsHtml = `
                <input type="text" name="question-${index}" placeholder="Escribe tu respuesta aquí..." class="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg">
            `;
        }

        questionDiv.innerHTML = `
            <p class="font-semibold text-xl mb-3 text-gray-800">Pregunta ${index + 1}: ${q.question}</p>
            <div>${optionsHtml}</div>
        `;
        quizForm.appendChild(questionDiv);
    });
}

submitQuizBtn.addEventListener('click', async () => {
    let score = 0;
    const totalQuestions = quizForm.children.length; // Cada hijo es una pregunta
    const quizData = courseContent.flatMap(m => m.topics).find(t => t.title === contentTitle.textContent)?.quiz;

    if (!quizData) {
        alert('No se encontraron preguntas para esta evaluación.');
        return;
    }

    const studentAnswers = [];

    quizData.forEach((q, index) => {
        let userAnswer = '';
        const questionElement = quizForm.children[index];

        if (q.type === 'multiple-choice' || q.type === 'true-false') {
            const selectedOption = questionElement.querySelector(`input[name="question-${index}"]:checked`);
            if (selectedOption) {
                userAnswer = selectedOption.value;
            }
        } else if (q.type === 'completion') {
            const inputField = questionElement.querySelector(`input[name="question-${index}"]`);
            if (inputField) {
                userAnswer = inputField.value.trim().toLowerCase(); // Normaliza para comparar
            }
        }
        studentAnswers.push(userAnswer);

        // Comparación de la respuesta (insensible a mayúsculas/minúsculas para completación)
        const correctAnswer = q.answer.toLowerCase();
        if (userAnswer.toLowerCase() === correctAnswer) {
            score++;
            // Marcar respuesta correcta visualmente (opcional)
            questionElement.classList.add('border-green-500', 'bg-green-50');
            questionElement.classList.remove('border-red-500', 'bg-red-50');
        } else {
            // Marcar respuesta incorrecta visualmente (opcional)
            questionElement.classList.add('border-red-500', 'bg-red-50');
            questionElement.classList.remove('border-green-500', 'bg-green-50');
        }
    });

    const passed = score >= 3; // Pasa con 3/5 o más
    let feedback = '';
    let resultClass = '';

    if (passed) {
        feedback = `¡Felicidades! Has aprobado esta evaluación con ${score} de ${totalQuestions} respuestas correctas. ¡Excelente trabajo!`;
        resultClass = 'text-green-700';
        repeatQuizBtn.classList.add('hidden'); // Ocultar si aprueba
    } else {
        feedback = `¡Ánimo! Has obtenido ${score} de ${totalQuestions} respuestas correctas. Puedes repetirla para mejorar tu puntaje. ¡Tú puedes!`;
        resultClass = 'text-red-700';
        repeatQuizBtn.classList.remove('hidden'); // Mostrar si no aprueba
    }

    quizResult.textContent = feedback;
    quizResult.className = `mt-6 text-center text-2xl font-bold ${resultClass}`;
    quizResult.classList.remove('hidden');
    submitQuizBtn.classList.add('hidden'); // Ocultar el botón de enviar una vez calificado

    // Enviar resultados a Google Sheets y al profesor
    if (loggedInStudent) {
        const resultData = {
            studentEmail: loggedInStudent.correo,
            studentName: loggedInStudent.nombre + ' ' + loggedInStudent.apellido,
            topic: contentTitle.textContent,
            score: score,
            totalQuestions: totalQuestions,
            passed: passed,
            timestamp: new Date().toLocaleString()
        };

        try {
            google.script.run
                .withSuccessHandler(response => {
                    console.log('Resultado de evaluación enviado:', response.message);
                })
                .withFailureHandler(error => {
                    console.error('Error al enviar resultado de evaluación:', error);
                })
                .saveQuizResult(resultData);
        } catch (error) {
            console.error('Error llamando a Apps Script para guardar resultado:', error);
        }
    }
});

repeatQuizBtn.addEventListener('click', () => {
    const currentTopicQuiz = courseContent.flatMap(m => m.topics).find(t => t.title === contentTitle.textContent)?.quiz;
    if (currentTopicQuiz) {
        renderQuiz(currentTopicQuiz); // Volver a renderizar el quiz
        evaluationSection.classList.remove('hidden');
    }
});

// --- Manejo del Formulario de Cambio de Contraseña ---
changePasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    passwordChangeMessage.textContent = 'Cambiando contraseña...';
    passwordChangeMessage.className = 'text-center mt-4 text-lg font-medium text-gray-600';

    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;

    if (newPassword !== confirmNewPassword) {
        passwordChangeMessage.textContent = 'Las nuevas contraseñas no coinciden.';
        passwordChangeMessage.className = 'text-center mt-4 text-lg font-medium text-red-700';
        return;
    }

    if (loggedInStudent) {
        try {
            google.script.run
                .withSuccessHandler(response => {
                    if (response.success) {
                        passwordChangeMessage.textContent = response.message;
                        passwordChangeMessage.className = 'text-center mt-4 text-lg font-medium text-green-700';
                        changePasswordForm.reset(); // Limpia el formulario
                        // No es necesario actualizar loggedInStudent.password porque la lógica de validación está en el servidor
                    } else {
                        passwordChangeMessage.textContent = response.message;
                        passwordChangeMessage.className = 'text-center mt-4 text-lg font-medium text-red-700';
                    }
                })
                .withFailureHandler(error => {
                    passwordChangeMessage.textContent = `Error al cambiar contraseña: ${error.message}.`;
                    passwordChangeMessage.className = 'text-center mt-4 text-lg font-medium text-red-700';
                    console.error('Error de Apps Script:', error);
                })
                .changeStudentPassword(loggedInStudent.correo, currentPassword, newPassword);
        } catch (error) {
            passwordChangeMessage.textContent = 'Error de conexión. Verifica tu internet e intenta de nuevo.';
            passwordChangeMessage.className = 'text-center mt-4 text-lg font-medium text-red-700';
            console.error('Error general:', error);
        }
    } else {
        passwordChangeMessage.textContent = 'No hay sesión de estudiante activa para cambiar la contraseña.';
        passwordChangeMessage.className = 'text-center mt-4 text-lg font-medium text-red-700';
    }
});


// --- Inicialización: Verificar sesión al cargar la página ---
document.addEventListener('DOMContentLoaded', () => {
    const storedStudent = localStorage.getItem('loggedInStudent');
    if (storedStudent) {
        loggedInStudent = JSON.parse(storedStudent);
        studentNameDisplay.textContent = loggedInStudent.nombre;
        showAulaVirtual();
        renderModuleMenu();
    }
});
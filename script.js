let isModalOpen = false;
let contrastToggle = false;

function toggleContrast() {
    contrastToggle = !contrastToggle;
    if (contrastToggle) {
        document.body.classList += " dark-theme";
    } else {
        document.body.classList.remove("dark-theme");
    }
}

console.log('script.js loaded');
const contactForm = document.getElementById('contact__form');
const loadingOverlay = document.querySelector('.modal__overlay--loading');
const successOverlay = document.querySelector('.modal__overlay--success');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    loadingOverlay.classList.add('active');

    emailjs.sendForm('service_ch6zilp', 'template_7ltcjrr', this)
        .then(function () {
            loadingOverlay.classList.remove('active');
            successOverlay.classList.add('active');
        })
        .catch(function (error) {
            loadingOverlay.classList.remove('active');
            console.error('EmailJS error:', error);
            alert('The email service is currently unavailable. Please try again later or email me directly at noah.pricemvrk@gmail.com.');
        });
});

function openModal() {
    document.body.classList.add('modal--open');
}

function closeModal() {
    document.body.classList.remove('modal--open');
    // reset after the slide-out finishes so the user doesn't see it snap back
    setTimeout(function () {
        successOverlay.classList.remove('active');
        contactForm.reset();
    }, 400);
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
});

const shapeLayers = document.querySelectorAll('.shapes');

document.addEventListener('mousemove', function (e) {
    // convert the cursor position to a number from -1 (left/top edge) to 1 (right/bottom edge)
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    shapeLayers.forEach(function (layer) {
        layer.style.setProperty('--mx', x);
        layer.style.setProperty('--my', y);
    });
});

// ease the shapes back to center when the mouse leaves the window
document.documentElement.addEventListener('mouseleave', function () {
    shapeLayers.forEach(function (layer) {
        layer.style.setProperty('--mx', 0);
        layer.style.setProperty('--my', 0);
    });
});
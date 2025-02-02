// AOS keliye time delay
AOS.init({
    duration: 1000,
    once: true
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const floatingElements = document.getElementById('floatingElements');
for (let i = 0; i < 30; i++) {
    const element = document.createElement('div');
    element.className = 'floating-element';
    element.style.width = Math.random() * 10 + 'px';
    element.style.height = element.style.width;
    element.style.left = Math.random() * 100 + '%';
    element.style.top = Math.random() * 100 + '%';
    element.style.animationDuration = (Math.random() * 20 + 10) + 's';
    element.style.animationDelay = (Math.random() * 20) + 's';
    floatingElements.appendChild(element);
}

tippy('[data-tippy-content]', {
    theme: 'blockchain',
    animation: 'shift-away'
});

// SMOOTH SCROLLINGGGGGG YAYAYAYAYAY
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
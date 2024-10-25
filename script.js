
document.querySelectorAll('nav a').forEach(anchor => {
anchor.addEventListener('click', function (e) {
    if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault(); 
    }

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        targetElement.scrollIntoView({
            behavior: 'smooth'
        });
    });
});
const sections = document.querySelectorAll('.about, .catalog');

const options = {
    root: null,
    rootMargin: '0px',
    hreshold: 0.1
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
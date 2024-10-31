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
    threshold: 0.1
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

function toggleCart() {
    const cartPanel = document.getElementById('cartPanel');
    cartPanel.classList.toggle('open');
}

document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', (event) => {
        const bookCard = event.target.closest('.card-item');
        const bookTitle = bookCard.querySelector('h3').innerText;
        const bookPrice = bookCard.querySelector('.book-price').innerText;
        const bookImage = bookCard.querySelector('.card-image').src; 

        toggleCart(); 

        const cartContent = document.querySelector('.cart-content');
        const existingItem = Array.from(cartContent.children).find(
            item => item.querySelector('.cart-item-title').innerText === bookTitle
        );

        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <img src="${bookImage}" alt="${bookTitle}" class="cart-item-image" style="width: 50px; height: auto; margin-right: 10px;">
            <div class="cart-item-details" style="flex-grow: 1;">
                <h3 class="cart-item-title">${bookTitle}</h3>
                <p class="cart-item-price">${bookPrice}</p>
            </div>
            <button class="remove-item">Remover</button>
        `;
        cartContent.appendChild(itemElement);

        itemElement.querySelector('.remove-item').addEventListener('click', () => {
            itemElement.remove();
        });
    });
});

document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', (event) => {
        const bookCard = event.target.closest('.card-item');
        const bookTitle = bookCard.querySelector('h3').innerText;

        const cartPanel = document.getElementById('cartPanel');
        if (!cartPanel.classList.contains('open')) {
            cartPanel.classList.add('open');
        }

        const cartContent = document.querySelector('.cart-content');
        const existingItem = Array.from(cartContent.children).find(
            item => item.querySelector('p').innerText === bookTitle
        );

        cartContent.appendChild(itemElement);

        itemElement.querySelector('.remove-item').addEventListener('click', () => {
            itemElement.remove();
        });
    });
});


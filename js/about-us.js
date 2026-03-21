let faqItems = document.querySelectorAll('.faq');

faqItems.forEach(item => {
    item.addEventListener('click', () => {
        // Close all others
        faqItems.forEach(faq => {
            if (faq !== item) {
                faq.classList.remove('active');
            }
        });
        
        item.classList.toggle('active');
    });
});
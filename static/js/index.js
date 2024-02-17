const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');
const header = document.querySelector('.header');
const intro = document.querySelector('.intro');

navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');

    })
})

window.addEventListener('scroll', () => {
    const bottomOfIntro = intro.getBoundingClientRect().height;
    const headerHeight = header.getBoundingClientRect().height;
    const threshold = bottomOfIntro - headerHeight;
    if (window.scrollY >= threshold) {
        header.classList.add('header--scrolled');
    } else {
        header.classList.remove('header--scrolled');
    }
});
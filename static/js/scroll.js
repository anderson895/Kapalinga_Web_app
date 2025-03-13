document.addEventListener("DOMContentLoaded", function () {
    const scrollContainer = document.querySelector(".scroll-container");
    let isDown = false;
    let startX;
    let scrollLeft;
    let momentum = 0;
    const friction = 0.92; // Controls how quickly the momentum decreases

    scrollContainer.addEventListener("mousedown", (e) => {
        isDown = true;
        scrollContainer.classList.add("active");
        startX = e.pageX - scrollContainer.offsetLeft;
        scrollLeft = scrollContainer.scrollLeft;
        momentum = 0;
    });

    scrollContainer.addEventListener("mouseleave", () => {
        isDown = false;
        scrollContainer.classList.remove("active");
        applyMomentum();
    });

    scrollContainer.addEventListener("mouseup", () => {
        isDown = false;
        scrollContainer.classList.remove("active");
        applyMomentum();
    });

    scrollContainer.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollContainer.offsetLeft;
        const walk = (x - startX) * 2;
        momentum = walk * 0.1; // Store some momentum for smooth deceleration
        scrollContainer.scrollLeft = scrollLeft - walk;
    });

    // Enable smooth touch swiping
    let touchStartX = 0;
    let touchScrollLeft = 0;
    let lastTouchX = 0;
    let touchMomentum = 0;

    scrollContainer.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].pageX;
        lastTouchX = touchStartX;
        touchScrollLeft = scrollContainer.scrollLeft;
        touchMomentum = 0;
        scrollContainer.style.scrollBehavior = 'auto';
    });

    scrollContainer.addEventListener("touchmove", (e) => {
        const touchMoveX = e.touches[0].pageX;
        const move = touchMoveX - touchStartX;
        const delta = touchMoveX - lastTouchX;
        touchMomentum = delta * 0.8;
        lastTouchX = touchMoveX;
        scrollContainer.scrollLeft = touchScrollLeft - move;
    });

    scrollContainer.addEventListener("touchend", () => {
        scrollContainer.style.scrollBehavior = 'smooth';
        applyTouchMomentum();
    });

    function applyMomentum() {
        if (Math.abs(momentum) < 0.1) return;
        scrollContainer.scrollLeft -= momentum;
        momentum *= friction;
        requestAnimationFrame(applyMomentum);
    }

    function applyTouchMomentum() {
        if (Math.abs(touchMomentum) < 0.1) return;
        scrollContainer.scrollLeft -= touchMomentum;
        touchMomentum *= friction;
        requestAnimationFrame(applyTouchMomentum);
    }
});
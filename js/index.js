const containers = document.querySelectorAll('.parallex-container');

const applyParallaxEffect = (container) => {
    const parallaxLayers = container.querySelectorAll('.slow');
    const scrollPosition = window.scrollY;

    parallaxLayers.forEach(layer => {
        if (container.dataset.visible === 'true') {
            const speed = layer.getAttribute('data-speed') || 0.4;
            const offsetTop = container.dataset.offsetTop;
            const layerOffset = scrollPosition - offsetTop;
            
            requestAnimationFrame(() => {
                layer.style.transform = `translateY(-${layerOffset * speed}px)`;
            });
        }
    });
};

const handleIntersection = (entries) => {
    entries.forEach(entry => {
        const container = entry.target;

        if (entry.isIntersecting) {
            container.dataset.visible = 'true';
            if (!container.dataset.offsetTop) {
                container.dataset.offsetTop = entry.boundingClientRect.top - window.scrollY;
            }
            // Apply parallax effect for the container
            applyParallaxEffect(container);
        } else {
            container.dataset.visible = 'false';
            // Reset transform for layers when not visible
            const parallaxLayers = container.querySelectorAll('.parallax-layer');
            parallaxLayers.forEach(layer => {
                layer.style.transform = 'none';
            });
        }
    });
};

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};



const throttle = (func, limit) => {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    }
};











const observer = new IntersectionObserver(handleIntersection, observerOptions);

containers.forEach(container => observer.observe(container));

window.addEventListener('scroll', throttle(() => {
    containers.forEach(container => applyParallaxEffect(container));
}, 16))



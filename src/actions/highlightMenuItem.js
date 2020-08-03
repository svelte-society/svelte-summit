import { writable } from 'svelte/store'

export const currentSection = writable(`#${document.location.hash}`);

export const highlightMenuItem = (node, options) => {
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                currentSection.set(`#${node.id}`)
            }
        })
    }, { threshold: 0.75 });
    observer.observe(node);
}
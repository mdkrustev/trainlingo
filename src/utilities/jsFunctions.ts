export const scrollToSection = (id: string, behavior: ScrollBehavior = 'smooth') => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior });
    }
};
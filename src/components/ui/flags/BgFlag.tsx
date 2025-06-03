export default function BgFlag() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" width="22" height="20">
            {/* Горна бяла полоса */}
            <path fill="#ffffff" d="M0 0h640v160H0z" />
            {/* Средна зелена полоса */}
            <path fill="#009648" d="M0 160h640v160H0z" />
            {/* Долна червена полоса */}
            <path fill="#d0103c" d="M0 320h640v160H0z" />
        </svg>
    );
}
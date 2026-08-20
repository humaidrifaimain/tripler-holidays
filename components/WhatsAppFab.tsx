export default function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/94776661272"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="wa-pulse fixed z-[70] inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_28px_rgba(37,211,102,0.46)] transition duration-300 hover:scale-110 hover:bg-[#20c05a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] sm:h-[58px] sm:w-[58px]"
      style={{
        bottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))",
        right: "calc(0.875rem + env(safe-area-inset-right, 0px))"
      }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="h-6 w-6 sm:h-7 sm:w-7"
      >
        <path d="M19.05 4.95A9.87 9.87 0 0 0 12.01 2C6.49 2 2 6.48 2 12c0 1.77.46 3.49 1.35 5L2 22l5.14-1.34A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10 0-2.67-1.04-5.18-2.95-7.05zM12 20.22c-1.51 0-2.99-.4-4.28-1.16l-.31-.18-3.05.8.81-2.97-.2-.31A8.15 8.15 0 0 1 3.79 12c0-4.53 3.68-8.21 8.21-8.21a8.2 8.2 0 0 1 5.81 2.41A8.16 8.16 0 0 1 20.22 12c0 4.53-3.69 8.22-8.22 8.22zm4.5-6.17c-.25-.13-1.48-.73-1.71-.81-.23-.09-.39-.13-.55.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.07-.25-.12-1.04-.38-1.98-1.21-.73-.65-1.23-1.46-1.37-1.7-.14-.24-.02-.37.1-.5.11-.1.25-.27.37-.4.12-.14.16-.24.25-.4.08-.17.04-.31-.02-.44-.07-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.31-.22.25-.84.82-.84 2s.86 2.31.98 2.47c.12.17 1.68 2.57 4.06 3.6.57.25 1.02.39 1.36.5.57.18 1.1.16 1.51.1.46-.07 1.48-.6 1.69-1.18.21-.58.21-1.08.14-1.18-.06-.1-.23-.16-.48-.28z" />
      </svg>
    </a>
  );
}

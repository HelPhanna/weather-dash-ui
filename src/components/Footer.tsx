export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 pt-5 text-xs text-slate-300/90 sm:text-sm">
      <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between sm:gap-4">
        <p className="leading-relaxed">
          Weather data provided by{" "}
          <a
            href="https://open-meteo.com/"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-sky-300 transition hover:text-sky-200 hover:underline"
          >
            Open-Meteo
          </a>
          .
        </p>
        <p className="leading-relaxed sm:text-right">
          Developed by{" "}
          <span className="font-semibold text-white">Hel Phanna</span>
        </p>
      </div>
    </footer>
  );
}

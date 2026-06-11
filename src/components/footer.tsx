export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-foreground/10 mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-6 text-center text-sm text-foreground/40">
        © {year} Catopia de Chen Antúnez
      </div>
    </footer>
  );
}

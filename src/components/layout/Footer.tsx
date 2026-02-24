export function Footer() {
  return (
    <footer className="border-t border-foreground/10 py-6">
      <p className="text-center text-sm text-foreground/40">
        &copy; {new Date().getFullYear()} Cameron Moeller
      </p>
    </footer>
  );
}

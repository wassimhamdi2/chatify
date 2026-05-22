function BorderAnimatedContainer({ children }) {
  return (
    <div
      className="w-full h-full rounded-2xl border border-transparent animate-border flex overflow-hidden"
      style={{
        background: `
          linear-gradient(45deg, var(--color-bg), var(--color-surface) 50%, var(--color-bg)) padding-box,
          conic-gradient(
            from var(--border-angle),
            color-mix(in srgb, var(--color-border) 48%, transparent) 80%,
            var(--color-primary) 86%,
            color-mix(in srgb, var(--color-primary) 70%, white) 90%,
            var(--color-primary) 94%,
            color-mix(in srgb, var(--color-border) 48%, transparent)
          ) border-box
        `,
      }}
    >
      {children}
    </div>
  );
}
export default BorderAnimatedContainer;

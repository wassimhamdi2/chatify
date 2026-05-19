function UsersLoadingSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3].map((item) => (
        <div key={item} className="p-4 rounded-lg animate-pulse"
          style={{ backgroundColor: "color-mix(in srgb, var(--color-surface) 50%, transparent)" }}>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full" style={{ backgroundColor: "var(--color-border)" }} />
            <div className="flex-1">
              <div className="h-4 rounded w-3/4 mb-2" style={{ backgroundColor: "var(--color-border)" }} />
              <div className="h-3 rounded w-1/2" style={{ backgroundColor: "var(--color-border)", opacity: 0.7 }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default UsersLoadingSkeleton;

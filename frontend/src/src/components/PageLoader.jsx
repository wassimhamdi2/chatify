import { LoaderIcon } from "lucide-react";
function PageLoader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <LoaderIcon className="size-10 animate-spin" style={{ color: "var(--color-primary)" }} />
    </div>
  );
}
export default PageLoader;

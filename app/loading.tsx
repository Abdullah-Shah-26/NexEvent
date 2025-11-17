export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue/30 border-t-blue rounded-full animate-spin" />
        <p className="text-light-200 text-sm">Loading...</p>
      </div>
    </div>
  );
}

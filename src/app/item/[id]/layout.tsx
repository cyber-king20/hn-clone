import { Suspense } from "react";

export default function StoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
      
      {/* Add streaming boundary */}
      <Suspense fallback={null}>
        <div id="comments-streaming" />
      </Suspense>
    </div>
  );
}

// Enable streaming for this layout
export const dynamic = 'force-dynamic';

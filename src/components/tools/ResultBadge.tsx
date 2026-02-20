interface ResultBadgeProps {
  success: boolean;
  error?: string;
}

export default function ResultBadge({ success, error }: ResultBadgeProps) {
  if (success) {
    return (
      <div className="flex items-center gap-2 rounded-md px-3 py-2 text-sm bg-success-bg text-success font-medium">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        Success
      </div>
    );
  }

  return (
    <div className="rounded-md px-3 py-2 text-sm bg-error-bg text-error">
      <div className="flex items-center gap-2 font-medium">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
        Error
      </div>
      {error && <p className="mt-1 text-xs opacity-90 whitespace-pre-wrap">{error}</p>}
    </div>
  );
}

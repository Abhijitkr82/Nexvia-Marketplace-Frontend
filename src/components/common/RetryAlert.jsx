// Red error box with a "Try again" link-style button.
export default function RetryAlert({
  message,
  onRetry,
  retryLabel = 'Try again',
  className = 'mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700',
  buttonClassName = 'ml-2 font-semibold underline',
}) {
  if (!message) return null;

  return (
    <div className={className}>
      {message}
      <button type="button" onClick={onRetry} className={buttonClassName}>
        {retryLabel}
      </button>
    </div>
  );
}

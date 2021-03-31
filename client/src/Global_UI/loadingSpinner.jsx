export function LoadingSpinner({ show }) {
  if (show) return <div data-test="loading-spinner" className="loader"></div>;
  return null;
}

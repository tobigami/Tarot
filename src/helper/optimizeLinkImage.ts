export default function optimizeLinkImage(url: string, width: number): string {
  const parts = url.split('/upload/');
  if (parts.length === 2) {
    return `${parts[0]}/upload/q_auto,w_${width}/${parts[1]}`;
  }
  // Return the original URL if it doesn't match the expected format
  return url;
}

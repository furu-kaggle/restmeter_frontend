import { toBlob } from 'html-to-image';

export const captureResultImage = async (
  node: HTMLElement,
  filename = 'restmeter-result.png'
) => {
  const blob = await toBlob(node, {
    pixelRatio: 2,
    cacheBust: true,
    backgroundColor: '#f8fafc'
  });

  if (!blob) {
    throw new Error('Failed to create image');
  }

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
};

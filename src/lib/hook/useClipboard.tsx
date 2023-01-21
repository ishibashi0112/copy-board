import { useState } from "react";

export const useClipboard = ({ timeout = 2000 } = {}) => {
  const [error, setError] = useState<Error | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyTimeout, setCopyTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleCopyResult = (value: boolean) => {
    clearTimeout(copyTimeout as NodeJS.Timeout);
    setCopyTimeout(setTimeout(() => setCopied(false), timeout));
    setCopied(value);
  };

  const copy = async (elementToCopy: HTMLElement) => {
    if ("clipboard" in navigator) {
      const text = elementToCopy.innerText;
      const html = elementToCopy.innerHTML;
      console.log(text, html);

      const item = new ClipboardItem({
        "text/plain": new Blob([text], { type: "text/plain" }),
        "text/html": new Blob([html], { type: "text/html" }),
      });

      try {
        await navigator.clipboard.write([item]);
        handleCopyResult(true);
      } catch (error) {
        setError(new Error("copy error!"));
      }
    } else {
      setError(new Error("useClipboard: navigator.clipboard is not supported"));
    }
  };

  const reset = () => {
    setCopied(false);
    setError(null);
    clearTimeout(copyTimeout as NodeJS.Timeout);
  };

  return { copy, reset, error, copied };
};

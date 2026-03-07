import { useEffect, useRef, useState } from 'react';

interface FacebookPostProps {
  url: string;
  width?: number;
}

declare global {
  interface Window {
    FB?: {
      XFBML: {
        parse: (element?: HTMLElement) => void;
      };
    };
  }
}

// Ładowanie Facebook SDK (raz dla całej aplikacji)
let sdkLoaded = false;
const loadFacebookSDK = (): Promise<void> => {
  return new Promise((resolve) => {
    if (sdkLoaded && window.FB) {
      resolve();
      return;
    }

    if (document.getElementById('facebook-jssdk')) {
      // SDK jest już ładowane, czekaj na załadowanie
      const checkFB = setInterval(() => {
        if (window.FB) {
          clearInterval(checkFB);
          resolve();
        }
      }, 100);
      return;
    }

    // Dodaj root div dla FB
    if (!document.getElementById('fb-root')) {
      const fbRoot = document.createElement('div');
      fbRoot.id = 'fb-root';
      document.body.prepend(fbRoot);
    }

    // Załaduj SDK
    const script = document.createElement('script');
    script.id = 'facebook-jssdk';
    script.src = 'https://connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v18.0';
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    script.onload = () => {
      sdkLoaded = true;
      // Poczekaj aż FB się zainicjalizuje
      const checkFB = setInterval(() => {
        if (window.FB) {
          clearInterval(checkFB);
          resolve();
        }
      }, 100);
    };
    document.body.appendChild(script);
  });
};

const FacebookPost = ({ url, width = 500 }: FacebookPostProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadFacebookSDK().then(() => {
      if (containerRef.current && window.FB) {
        window.FB.XFBML.parse(containerRef.current);
        const iframe = containerRef.current.querySelector('iframe');
        if (iframe) {
          const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
              if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                observer.disconnect();
                setIsLoaded(true);
              }
            }
          });
          observer.observe(iframe, { childList: true });
        }
      }
    });
  }, [url]);

  return (
    <div ref={containerRef} className="facebook-post-container">
      <div
        className="fb-post"
        data-href={url}
        data-width={width}
        data-show-text="true"
      />
      {isLoaded && <div className="hidden">Loaded</div>}
    </div>
  );
};

export default FacebookPost;

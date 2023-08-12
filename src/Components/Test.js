import React, { useEffect, useState } from 'react';

const IframeDisplay = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(() => {
//         console.log(iframeLoaded);
//     }, 10000); // Check every minute

//     return () => clearInterval(interval); // Cleanup interval on component unmount
//   }, []);

useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        console.log('Stream has paused or stopped.');
      }
    };
  
    document.addEventListener('visibilitychange', handleVisibilityChange);
  
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  
  
  


  const handleIframeLoad = () => {
    setIframeLoaded(!iframeLoaded);
  };

  const handleIframeMessage = (event) => {
    // Handle postMessage events here
    console.log("IS PLAYING " + iframeLoaded)
    console.log('Received message from iframe:', event.data);
    
  };

  useEffect(() => {
    window.addEventListener('message', handleIframeMessage);

    return () => {
      window.removeEventListener('message', handleIframeMessage);
    };
  }, []);

  return (
    <div>
      <h2>IFrame Data Information</h2>
      <iframe
        id="myIframe"
        src="https://embedstream.me/philadelphia-phillies-vs-washington-nationals-stream-1"
        title="External Content"
        width="100%"
        height="400"
        onClick={handleIframeLoad}
      >
        <p>Your browser does not support iframes.</p>
      </iframe>
      
      {iframeLoaded && (
        <button
          onClick={() => {
            const iframe = document.getElementById('myIframe');
            if (iframe) {
              iframe.contentWindow.postMessage('hry', '*');
            }
          }}
        >
          Trigger Action in IFrame
        </button>
      )}
    </div>
  );
};

export default IframeDisplay;


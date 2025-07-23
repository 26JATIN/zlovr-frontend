'use client';

import { useState, useEffect } from 'react';

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const checkIfInstalled = () => {
      return window.matchMedia('(display-mode: standalone)').matches || 
             window.navigator.standalone ||
             document.referrer.includes('android-app://');
    };

    // Handle beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      if (!checkIfInstalled()) {
        setShowButton(true);
      }
    };

    // Handle app installation
    const handleAppInstalled = () => {
      setShowButton(false);
      setDeferredPrompt(null);
    };

    // Check installation state on load
    if (!checkIfInstalled()) {
      setTimeout(() => {
        if (!deferredPrompt) {
          setShowButton(true);
        }
      }, 3000);
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [deferredPrompt]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      setIsInstalling(true);
      deferredPrompt.prompt();
      
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setShowButton(false);
      }
      
      setDeferredPrompt(null);
      setIsInstalling(false);
    } else {
      // Fallback for browsers that don't support the prompt
      alert('To install: Use browser menu → "Install ZLOVR"');
    }
  };

  if (!showButton) return null;

  return (
    <>
      <div className={`install-popup ${showButton ? 'show' : ''}`}>
        <div className="install-content">
          <span className="install-text">Install ZLOVR? </span>
          <div className="install-buttons">
            <button 
              className="install-btn" 
              onClick={handleInstallClick}
              disabled={isInstalling}
            >
              {isInstalling ? 'Installing...' : 'Yes'}
            </button>
            <button 
              className="cancel-btn" 
              onClick={() => setShowButton(false)}
            >
              No
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .install-popup {
          position: fixed;
          z-index: 10000;
          transition: all 0.3s ease-out;
          background: white;
          border: 1px solid #e0e0e0;
          transform: translateY(100%);
        }

        /* Mobile: Bottom bar */
        @media (max-width: 768px) {
          .install-popup {
            bottom: 0;
            left: 0;
            right: 0;
            border-top: 1px solid #e0e0e0;
            border-left: none;
            border-right: none;
            border-bottom: none;
          }

          .install-popup.show {
            transform: translateY(0);
          }
        }

        /* Desktop: Bottom right popup */
        @media (min-width: 769px) {
          .install-popup {
            bottom: 20px;
            right: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
            max-width: 300px;
          }

          .install-popup.show {
            transform: translateY(0);
          }
        }

        .install-content {
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .install-text {
          font-size: 14px;
          color: #333;
          font-weight: 500;
        }

        .install-buttons {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .install-btn {
          background: #007bff;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .install-btn:hover:not(:disabled) {
          background: #0056b3;
        }

        .install-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .cancel-btn {
          background: #f8f9fa;
          border: 1px solid #dee2e6;
          color: #6c757d;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .cancel-btn:hover {
          background: #e9ecef;
          color: #495057;
        }
      `}</style>
    </>
  );
}

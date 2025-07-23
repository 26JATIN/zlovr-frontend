import './globals.css'

export const metadata = {
  title: 'zlovr',
  description: 'dating app',
  generator: 'Team',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="zlovr" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body>
        {children}
        <div id="install-button" style={{display: 'none', position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000}}>
          <button id="install-btn" style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '25px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,123,255,0.3)'
          }}>
            Install App
          </button>
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              let deferredPrompt;
              let isInstalled = false;

              // Check if app is already installed
              function checkIfInstalled() {
                if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
                  isInstalled = true;
                  return true;
                }
                return false;
              }

              // Handle beforeinstallprompt event
              window.addEventListener('beforeinstallprompt', (e) => {
                console.log('beforeinstallprompt fired');
                e.preventDefault();
                deferredPrompt = e;
                
                if (!checkIfInstalled()) {
                  showInstallButton();
                }
              });

              // Show custom install button
              function showInstallButton() {
                const installButton = document.getElementById('install-button');
                const installBtn = document.getElementById('install-btn');
                
                if (installButton) {
                  installButton.style.display = 'block';
                  
                  installBtn.addEventListener('click', async () => {
                    if (deferredPrompt) {
                      deferredPrompt.prompt();
                      const { outcome } = await deferredPrompt.userChoice;
                      console.log('User choice:', outcome);
                      
                      if (outcome === 'accepted') {
                        hideInstallButton();
                      }
                      deferredPrompt = null;
                    }
                  });
                }
              }

              // Hide install button
              function hideInstallButton() {
                const installButton = document.getElementById('install-button');
                if (installButton) {
                  installButton.style.display = 'none';
                }
              }

              // Handle app installation
              window.addEventListener('appinstalled', (evt) => {
                console.log('App was installed');
                isInstalled = true;
                hideInstallButton();
                localStorage.setItem('pwa-installed', 'true');
              });

              // Check for installation state changes
              window.addEventListener('load', () => {
                if (checkIfInstalled()) {
                  hideInstallButton();
                } else {
                  // Reset installation state if app was uninstalled
                  localStorage.removeItem('pwa-installed');
                  
                  // Force show install option after a delay to handle uninstall case
                  setTimeout(() => {
                    if (!isInstalled && !deferredPrompt) {
                      // If no prompt available, create a fallback
                      const installButton = document.getElementById('install-button');
                      if (installButton && window.location.protocol === 'https:') {
                        installButton.style.display = 'block';
                        document.getElementById('install-btn').addEventListener('click', () => {
                          alert('Please use your browser menu to install this app or add to home screen.');
                        });
                      }
                    }
                  }, 2000);
                }
              });

              // Service Worker registration
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                      
                      // Check for updates
                      registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New content available, refresh to update
                            if (confirm('New version available! Refresh to update?')) {
                              window.location.reload();
                            }
                          }
                        });
                      });
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}

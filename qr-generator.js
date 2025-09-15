// QR Generator App - Main JavaScript
class QRGeneratorApp {
    constructor() {
        this.qrcode = null;
        this.currentQRDataURL = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupServiceWorker();
        this.setupTabNavigation();
    }

    bindEvents() {
        // Get DOM elements
        this.urlInput = document.getElementById('url-input');
        this.generateBtn = document.getElementById('generate-btn');
        this.downloadBtn = document.getElementById('download-btn');
        this.qrContainer = document.getElementById('qr-container');
        this.errorMessage = document.getElementById('error-message');

        // Bind event listeners
        this.generateBtn.addEventListener('click', () => this.generateQRCode());
        this.downloadBtn.addEventListener('click', () => this.downloadQRCode());
        this.urlInput.addEventListener('input', () => this.validateURL());
        this.urlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.generateQRCode();
            }
        });
    }

    setupTabNavigation() {
        const tabButtons = document.querySelectorAll('.nav-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');

                // Remove active class from all tabs and buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Add active class to clicked button and corresponding tab
                button.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
            });
        });
    }

    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('./sw.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }

    validateURL() {
        const url = this.urlInput.value.trim();
        const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

        // Clear previous error states
        this.urlInput.classList.remove('error');
        this.hideError();

        if (url === '') {
            return true; // Empty input is valid (not required to show error)
        }

        if (!urlPattern.test(url)) {
            this.showError('Please enter a valid URL (e.g., https://example.com)');
            this.urlInput.classList.add('error');
            return false;
        }

        return true;
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.classList.remove('hidden');
    }

    hideError() {
        this.errorMessage.classList.add('hidden');
    }

    async generateQRCode() {
        const url = this.urlInput.value.trim();

        // Validate URL before proceeding
        if (!url) {
            this.showError('Please enter a URL');
            this.urlInput.focus();
            return;
        }

        if (!this.validateURL()) {
            return;
        }

        // Show loading state
        this.generateBtn.disabled = true;
        this.generateBtn.classList.add('loading');
        this.generateBtn.textContent = 'Generating...';

        try {
            // Clear previous QR code
            const qrcodeElement = document.getElementById('qrcode');
            qrcodeElement.innerHTML = '';

            // Create new QR code
            this.qrcode = new QRCode(qrcodeElement, {
                text: url,
                width: 256,
                height: 256,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            });

            // Wait for QR code to be generated
            await this.waitForQRGeneration();

            // Show QR code and download button
            this.qrContainer.classList.remove('hidden');
            this.downloadBtn.classList.remove('hidden');

            // Store the QR code data URL for download
            this.currentQRDataURL = this.getQRCodeDataURL();

            this.hideError();

        } catch (error) {
            console.error('QR Code generation failed:', error);
            this.showError('Failed to generate QR code. Please try again.');
        } finally {
            // Reset button state
            this.generateBtn.disabled = false;
            this.generateBtn.classList.remove('loading');
            this.generateBtn.textContent = 'Generate QR Code';
        }
    }

    waitForQRGeneration() {
        return new Promise((resolve) => {
            // Wait a short time for QR code to be rendered
            setTimeout(() => {
                resolve();
            }, 100);
        });
    }

    getQRCodeDataURL() {
        const canvas = document.querySelector('#qrcode canvas');
        if (canvas) {
            return canvas.toDataURL('image/png');
        }

        // Fallback for table-based QR codes
        const qrcodeElement = document.getElementById('qrcode');
        if (qrcodeElement) {
            // Create a canvas from the QR code element
            return this.createCanvasFromElement(qrcodeElement);
        }

        return null;
    }

    createCanvasFromElement(element) {
        // This is a fallback method for table-based QR codes
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set canvas size
        canvas.width = 256;
        canvas.height = 256;

        // Fill with white background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 256, 256);

        // For simplicity, we'll rely on the canvas-based QR code
        // This fallback could be enhanced to convert table to canvas
        return canvas.toDataURL('image/png');
    }

    downloadQRCode() {
        if (!this.currentQRDataURL) {
            this.showError('No QR code to download');
            return;
        }

        try {
            // Create download link
            const link = document.createElement('a');
            const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
            const filename = `qr-code-${timestamp}.png`;

            link.download = filename;
            link.href = this.currentQRDataURL;

            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Show success feedback
            const originalText = this.downloadBtn.textContent;
            this.downloadBtn.textContent = 'Downloaded!';
            this.downloadBtn.style.background = 'linear-gradient(135deg, #059669, #10b981)';

            setTimeout(() => {
                this.downloadBtn.textContent = originalText;
                this.downloadBtn.style.background = '';
            }, 2000);

        } catch (error) {
            console.error('Download failed:', error);
            this.showError('Failed to download QR code. Please try again.');
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new QRGeneratorApp();
});

// Handle app installation prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;

    // Update UI to notify the user they can install the PWA
    console.log('App can be installed');
});

window.addEventListener('appinstalled', () => {
    // Hide the app-provided install promotion
    console.log('PWA was installed');
});

// Handle app updates
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        // Show update notification or refresh the page
        if (confirm('A new version is available! Refresh to update?')) {
            window.location.reload();
        }
    });
}
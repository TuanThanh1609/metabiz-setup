/**
 * Smax.ai Embed Bridge
 * Handles 2-way postMessage integration with Smax LiveChat & Webview modules
 * (Referenced from Smax technical docs: 8.5.5. NHÚNG WEBVIEW/FORM)
 */

class SmaxBridge {
  constructor() {
    this.isEmbedded = window.parent && window.parent !== window;
    this.customerData = null;
    this.listeners = [];

    this._initMessageListener();
  }

  _initMessageListener() {
    window.addEventListener('message', (event) => {
      // Validate origin in production if needed
      const payload = event.data;
      if (typeof payload === 'object' && payload !== null) {
        if (payload.name === '__SM_FORM_CUSTOMER') {
          console.log('[SmaxBridge] Customer data received from Smax:', payload.data?.customer);
          this.customerData = payload.data?.customer || null;
          this._notifyListeners('customer', this.customerData);
        }
      }
    }, false);
  }

  on(event, callback) {
    this.listeners.push({ event, callback });
  }

  _notifyListeners(event, data) {
    this.listeners
      .filter(l => l.event === event)
      .forEach(l => l.callback(data));
  }

  getIntegrationId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') || urlParams.get('integration_id') || 'demo_smax_integration_01';
  }

  requestCustomerData() {
    if (this.isEmbedded) {
      window.parent.postMessage({
        name: '__SM_FORM_CUSTOMER',
        data: {
          integration_id: this.getIntegrationId()
        }
      }, '*');
    } else {
      console.log('[SmaxBridge] Running in standalone mode. Using mock customer profile.');
      this.customerData = {
        name: 'Nguyễn Văn An',
        phone: '0987654321',
        gender: 'male',
        tags: ['Khách quan tâm', 'Messenger']
      };
      this._notifyListeners('customer', this.customerData);
    }
  }

  showPopup(url, title = 'Smax AI Studio', height = '85vh') {
    if (this.isEmbedded) {
      window.parent.postMessage({
        name: '__SM_FORM_POPUP',
        action: 'SHOW',
        data: {
          integration_id: this.getIntegrationId(),
          url: url,
          title: title,
          height: height
        }
      }, '*');
    } else {
      console.log('[SmaxBridge] Standalone popup requested:', { url, title, height });
    }
  }

  closePopup() {
    if (this.isEmbedded) {
      window.parent.postMessage({
        name: '__SM_FORM_POPUP',
        action: 'HIDE',
        data: {
          integration_id: this.getIntegrationId()
        }
      }, '*');
    }
  }
}

// Global instance
window.smaxBridge = new SmaxBridge();

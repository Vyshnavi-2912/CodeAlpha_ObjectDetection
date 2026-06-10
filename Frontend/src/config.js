// Dynamic Backend URL configuration
const getBackendUrls = () => {
  const envApiUrl = import.meta.env.VITE_API_URL;
  if (envApiUrl) {
    // Trim trailing slash if present
    const cleanApiUrl = envApiUrl.replace(/\/$/, '');
    // Derive WebSocket URL from API URL (replace http/https with ws/wss)
    const wsUrl = import.meta.env.VITE_WS_URL || cleanApiUrl.replace(/^http/, 'ws');
    return {
      api: cleanApiUrl,
      ws: wsUrl,
    };
  }

  // Fallback for local development
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const hostname = isLocal ? '127.0.0.1' : window.location.hostname;
  return {
    api: `http://${hostname}:8000`,
    ws: `ws://${hostname}:8000`,
  };
};

export const { api: API_URL, ws: WS_URL } = getBackendUrls();

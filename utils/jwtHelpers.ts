export const base64UrlEncode = (str: string): string => {
  try {
    return btoa(str)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  } catch (e) {
    return "Error";
  }
};

export const base64UrlDecode = (str: string): string => {
  try {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) {
      str += '=';
    }
    return atob(str);
  } catch (e) {
    return "Invalid Base64";
  }
};

// A simple non-secure hash function for educational simulation of a signature
// We don't need real crypto here, just a deterministic string based on input
export const mockSignature = (header: string, payload: string, secret: string): string => {
  const input = `${header}.${payload}.${secret}`;
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  // Make it look like a scary signature
  return base64UrlEncode(`SIG${Math.abs(hash).toString(16).repeat(4)}`);
};
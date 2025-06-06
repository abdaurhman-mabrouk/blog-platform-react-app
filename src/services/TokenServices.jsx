const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;
const UI_BASE_URL = import.meta.env.VITE_BASE_URL;

// Generate Login Token Service
export async function GenerateLoginTokenService({ email, password }) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/users?email=${email}&password=${password}`
    );
    const data = await response.json();

    if (data.length === 0) throw new Error('User not found');

    const token = Date.now().toString(36) + Math.random().toString(36).slice(2);
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000;

    localStorage.setItem('token', JSON.stringify({ token, expiresAt }));

    await fetch(`${API_BASE_URL}/users/${data[0].id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, expiresAt }),
    });

    return { token, expiresAt };
  } catch (err) {
    console.error('Error generating token:', err);
    return null;
  }
}

// Fetch Token Service
export async function LoginTokenService() {
  const tokenData = JSON.parse(localStorage.getItem('token') || '{}');

  if (!tokenData.token || Date.now() > tokenData.expiresAt) {
    localStorage.removeItem('token');
    return false;
  }

  const response = await fetch(
    `${API_BASE_URL}/users?token=${tokenData.token}`
  );
  const data = await response.json();

  if (Array.isArray(data) && data.length > 0) {
    return data[0]; // Return user data
  }

  return false;
}

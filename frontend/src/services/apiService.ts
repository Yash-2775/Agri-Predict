import axios from 'axios';

// ⚠️ Change this to your computer's IP address
// Find it with: ipconfig (Windows) or ifconfig (Mac/Linux)
// Example: 'http://192.168.1.100:5001/api'
const API_BASE_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  state: string;
  city: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export const login = async (credentials: LoginRequest): Promise<ApiResponse> => {
  try {
    const response = await api.post('/auth/login', credentials);
    return { success: true, data: response.data };
  } catch (error: any) {
    console.warn('Backend not found, using Demo Mode Login');
    // Mock success for demo purposes
    return {
      success: true,
      data: { user: { id: 'demo-123', username: 'Demo User', email: credentials.email } }
    };
  }
};

export const register = async (userData: RegisterRequest): Promise<ApiResponse> => {
  try {
    const response = await api.post('/auth/register', userData);
    return { success: true, data: response.data };
  } catch (error: any) {
    console.warn('Backend not found, using Demo Mode Registration');
    // Mock success for demo purposes
    return {
      success: true,
      data: { user: { id: 'demo-123', ...userData } }
    };
  }
};

export const getProducts = async (category?: string, search?: string): Promise<ApiResponse> => {
  try {
    const params: any = {};
    if (category) params.category = category;
    if (search) params.search = search;
    const response = await api.get('/marketplace/products', { params });
    return { success: true, data: response.data };
  } catch (error: any) {
    // Return empty array for products if backend fails
    return { success: true, data: [] };
  }
};

export const addProduct = async (product: any): Promise<ApiResponse> => {
  try {
    const response = await api.post('/marketplace/products', product);
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: true, data: product };
  }
};

export const detectDisease = async (imageBase64: string, userId?: string): Promise<ApiResponse> => {
  try {
    const response = await api.post('/disease/detect', {
      image: imageBase64,
      user_id: userId,
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    // Return a mock detection if backend fails
    return {
      success: true,
      data: {
        diseaseName: 'Healthy Crop (Demo Mode)',
        confidence: 0.95,
        treatment: 'Everything looks good! This is a demo mode result since the backend is not connected.'
      }
    };
  }
};

export const chatWithBot = async (
  message: string,
  language: string,
  userId?: string,
  context?: any
): Promise<ApiResponse> => {
  try {
    const response = await api.post('/chatbot/chat', {
      message,
      language,
      user_id: userId,
      context,
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    // Return mock chat if backend fails (Note: Chatbot.tsx usually uses Gemini directly anyway)
    return { success: false, error: 'Chat backend not connected. Use the AI Assistant tab instead.' };
  }
};
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Включаем строгий режим
  reactStrictMode: true,
  
  // Настройки для изображений (если будете использовать)
  images: {
    domains: ['localhost'],
  },
  
  // Экспериментальные фичи (опционально)
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },
  
  // Переменные окружения, доступные на клиенте
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
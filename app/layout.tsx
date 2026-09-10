import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '蔡臻晗｜个人作品集',
  description: '中山大学新闻传播硕士蔡臻晗的新闻采编、健康传播、项目策划与数据新闻作品集。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

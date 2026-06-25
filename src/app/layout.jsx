import '../styles/globals.css'

export const metadata = {
  title: 'Abhishek Kumar Maurya - Full Stack Developer',
  description: 'Portfolio of Abhishek Kumar Maurya, Full Stack Developer.',
  keywords: ['Abhishek Kumar Maurya', 'Full Stack Developer', 'React', 'Next.js']
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

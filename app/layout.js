import './globals.css'

export const metadata = {
  title: 'zlovr',
  description: 'dating app',
  generator: 'Team',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

import { AuthContextProvider } from './ToDoloo/_utils/auth-context';
import './globals.css'

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <AuthContextProvider>
                    {children}
                </AuthContextProvider>
            </body>
        </html>
    );
}
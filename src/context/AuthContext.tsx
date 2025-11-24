import { createContext, useContext, useState, type ReactNode } from 'react';

interface User {
    phoneNumber?: string;
    email?: string;
    name: string;
    authMethod: 'phone' | 'google';
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loginWithPhone: (phoneNumber: string) => Promise<void>;
    verifyOtp: (otp: string) => Promise<boolean>;
    loginWithGoogle: () => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [tempPhone, setTempPhone] = useState<string>('');
    const [generatedOtp, setGeneratedOtp] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const loginWithPhone = async (phoneNumber: string) => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Generate "Real" OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(otp);
        setTempPhone(phoneNumber);

        console.log(`%c[PlotTrust Auth] OTP for ${phoneNumber}: ${otp}`, 'color: #FF6B00; font-weight: bold; font-size: 14px;');

        setIsLoading(false);
    };

    const verifyOtp = async (otp: string): Promise<boolean> => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        setIsLoading(false);

        if (otp === generatedOtp || otp === '123456') {
            setUser({
                phoneNumber: tempPhone || '9876543210',
                name: 'Verified User',
                authMethod: 'phone'
            });
            setGeneratedOtp(''); // Clear OTP after success
            return true;
        }
        return false;
    };

    const loginWithGoogle = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setUser({
            email: 'demo.user@gmail.com',
            name: 'Demo User',
            authMethod: 'google'
        });
        setIsLoading(false);
    };

    const logout = () => {
        setUser(null);
        setTempPhone('');
        setGeneratedOtp('');
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            loginWithPhone,
            verifyOtp,
            loginWithGoogle,
            logout,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

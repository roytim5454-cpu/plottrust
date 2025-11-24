import { useState } from 'react';
import { Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const SignInScreen = () => {
    const { loginWithPhone, verifyOtp, isLoading } = useAuth();
    const [step, setStep] = useState<'phone' | 'otp'>('phone');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');

    const handlePhoneSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (phoneNumber.length < 10) {
            setError('Please enter a valid phone number');
            return;
        }
        setError('');
        await loginWithPhone(phoneNumber);
        setStep('otp');
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = await verifyOtp(otp);
        if (!isValid) {
            setError('Invalid OTP. Try 123456');
        }
    };

    return (
        <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-brand-accent/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-brand-safe/10 rounded-full blur-[120px]" />

            <div className="w-full max-w-md z-10">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-accent/10 mb-4 border border-brand-accent/20">
                        <ShieldCheck className="w-8 h-8 text-brand-accent" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">PlotTrust</h1>
                    <p className="text-brand-text-muted">Verify Real Estate with Confidence</p>
                </div>

                <div className="bg-brand-secondary/50 backdrop-blur-xl border border-brand-border rounded-3xl p-8 shadow-2xl">
                    {step === 'phone' ? (
                        <form onSubmit={handlePhoneSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-brand-text-muted mb-2">Phone Number</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Phone className="h-5 w-5 text-brand-text-muted" />
                                    </div>
                                    <input
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        className="block w-full pl-11 pr-4 py-4 bg-brand-surface border border-brand-border rounded-xl text-white placeholder-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                            </div>

                            {error && <p className="text-brand-risky text-sm text-center">{error}</p>}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex items-center justify-center py-4 px-6 rounded-xl bg-brand-accent hover:bg-brand-accent-light text-white font-semibold transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-brand-accent/25"
                            >
                                {isLoading ? 'Sending...' : 'Continue'}
                                {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleOtpSubmit} className="space-y-6">
                            <div className="text-center mb-6">
                                <p className="text-brand-text-muted text-sm">Enter the code sent to</p>
                                <p className="text-white font-medium">{phoneNumber}</p>
                            </div>

                            <div>
                                <input
                                    type="text"
                                    maxLength={6}
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="block w-full text-center py-4 bg-brand-surface border border-brand-border rounded-xl text-2xl tracking-[0.5em] text-white placeholder-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all font-mono"
                                    placeholder="000000"
                                />
                            </div>

                            {error && <p className="text-brand-risky text-sm text-center">{error}</p>}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex items-center justify-center py-4 px-6 rounded-xl bg-brand-accent hover:bg-brand-accent-light text-white font-semibold transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-brand-accent/25"
                            >
                                {isLoading ? 'Verifying...' : 'Verify & Sign In'}
                            </button>

                            <button
                                type="button"
                                onClick={() => setStep('phone')}
                                className="w-full text-brand-text-muted text-sm hover:text-white transition-colors"
                            >
                                Change Phone Number
                            </button>
                        </form>
                    )}
                </div>

                <div className="mt-8 text-center">
                    <p className="text-brand-text-muted text-xs">
                        By continuing, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </div>
            </div>
        </div>
    );
};

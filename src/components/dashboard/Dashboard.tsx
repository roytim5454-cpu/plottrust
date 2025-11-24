import { useState } from 'react';
import { Home, Map, User, Bell, Plus, Calculator } from 'lucide-react';
import { PropertyList } from './PropertyList';
import { MapView } from './MapView';
import { AnalyzeView } from './AnalyzeView';
import { AddPropertyView } from './AddPropertyView';
import { UnitConverterView } from './UnitConverterView';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

type View = 'home' | 'map' | 'analyze' | 'add' | 'profile' | 'converter';

export const Dashboard = () => {
    const { user } = useAuth();
    const { language, setLanguage, t } = useLanguage();
    const [currentView, setCurrentView] = useState<View>('home');

    const renderView = () => {
        switch (currentView) {
            case 'home':
                return <PropertyList />;
            case 'map':
                return <MapView />;
            case 'analyze':
                return <AnalyzeView />;
            case 'add':
                return <AddPropertyView onBack={() => setCurrentView('home')} />;
            case 'converter':
                return <UnitConverterView />;
            case 'profile':
                return <div className="text-white text-center pt-20">{t.profile} Coming Soon</div>;
            default:
                return <PropertyList />;
        }
    };

    const toggleLanguage = () => {
        const nextLang = language === 'en' ? 'gu' : language === 'gu' ? 'hi' : 'en';
        setLanguage(nextLang);
    };

    return (
        <div className="min-h-screen bg-brand-dark flex flex-col relative overflow-hidden">
            {/* Header */}
            <header className="px-6 py-6 flex items-center justify-between z-10 bg-brand-dark/80 backdrop-blur-md sticky top-0">
                <div>
                    <p className="text-brand-text-muted text-sm">{t.welcome},</p>
                    <h1 className="text-xl font-bold text-white">{user?.name || 'User'}</h1>
                </div>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={toggleLanguage}
                        className="w-10 h-10 rounded-full bg-brand-secondary border border-brand-border flex items-center justify-center text-white font-bold text-xs hover:bg-brand-surface transition-colors"
                    >
                        {language.toUpperCase()}
                    </button>
                    <div className="w-10 h-10 rounded-full bg-brand-secondary border border-brand-border flex items-center justify-center relative">
                        <Bell className="w-5 h-5 text-white" />
                        <div className="absolute top-2 right-2 w-2 h-2 bg-brand-accent rounded-full border border-brand-secondary" />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 px-4 overflow-y-auto pb-24 z-10">
                {renderView()}
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-brand-secondary/90 backdrop-blur-xl border-t border-brand-border pb-safe pt-2 px-6 z-50">
                <div className="flex items-center justify-between max-w-md mx-auto h-16">
                    <button
                        onClick={() => setCurrentView('home')}
                        className={`flex flex-col items-center space-y-1 ${currentView === 'home' ? 'text-brand-accent' : 'text-brand-text-muted hover:text-white'}`}
                    >
                        <Home className="w-6 h-6" />
                        <span className="text-[10px] font-medium">{t.watchlist}</span>
                    </button>

                    <button
                        onClick={() => setCurrentView('map')}
                        className={`flex flex-col items-center space-y-1 ${currentView === 'map' ? 'text-brand-accent' : 'text-brand-text-muted hover:text-white'}`}
                    >
                        <Map className="w-6 h-6" />
                        <span className="text-[10px] font-medium">{t.map}</span>
                    </button>

                    <div className="relative -top-6">
                        <button
                            onClick={() => setCurrentView('add')}
                            className="w-14 h-14 rounded-full bg-brand-accent shadow-lg shadow-brand-accent/30 flex items-center justify-center transform transition-transform active:scale-95"
                        >
                            <Plus className="w-7 h-7 text-white" />
                        </button>
                    </div>

                    <button
                        onClick={() => setCurrentView('converter')}
                        className={`flex flex-col items-center space-y-1 ${currentView === 'converter' ? 'text-brand-accent' : 'text-brand-text-muted hover:text-white'}`}
                    >
                        <Calculator className="w-6 h-6" />
                        <span className="text-[10px] font-medium">{t.converter}</span>
                    </button>

                    <button
                        onClick={() => setCurrentView('profile')}
                        className={`flex flex-col items-center space-y-1 ${currentView === 'profile' ? 'text-brand-accent' : 'text-brand-text-muted hover:text-white'}`}
                    >
                        <User className="w-6 h-6" />
                        <span className="text-[10px] font-medium">{t.profile}</span>
                    </button>
                </div>
            </nav>
        </div>
    );
};

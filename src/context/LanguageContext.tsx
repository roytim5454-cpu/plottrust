import { createContext, useContext, useState, type ReactNode } from 'react';

type Language = 'en' | 'gu' | 'hi';

interface Translations {
    welcome: string;
    signIn: string;
    phonePlaceholder: string;
    verify: string;
    watchlist: string;
    map: string;
    analyze: string;
    profile: string;
    uploadText: string;
    uploadSubtext: string;
    safe: string;
    risky: string;
    caution: string;
    price: string;
    area: string;
    owner: string;
    surveyNo: string;
    village: string;
    zone: string;
    legal: string;
    converter: string;
    unitConverter: string;
    vigha: string;
    guntha: string;
    sqft: string;
    clear: string;
    enterValue: string;
}

const translations: Record<Language, Translations> = {
    en: {
        welcome: "Welcome back",
        signIn: "Sign in with Phone",
        phonePlaceholder: "Enter Phone Number",
        verify: "Verify & Sign In",
        watchlist: "Your Watchlist",
        map: "Map",
        analyze: "Analyze",
        profile: "Profile",
        uploadText: "Upload 7/12 or Index-2",
        uploadSubtext: "Get an instant legal & zoning report",
        safe: "Safe",
        risky: "Risky",
        caution: "Caution",
        price: "Price",
        area: "Area",
        owner: "Owner",
        surveyNo: "Survey No",
        village: "Village",
        zone: "Zone",
        legal: "Legal Status",
        converter: "Converter",
        unitConverter: "Unit Converter",
        vigha: "Vigha",
        guntha: "Guntha",
        sqft: "Square Feet",
        clear: "Clear",
        enterValue: "Enter value to convert"
    },
    gu: {
        welcome: "સ્વાગત છે",
        signIn: "ફોન નંબરથી લોગ ઇન કરો",
        phonePlaceholder: "ફોન નંબર દાખલ કરો",
        verify: "ચકાસો અને લોગ ઇન કરો",
        watchlist: "તમારી વોચલિસ્ટ",
        map: "નકશો",
        analyze: "વિશ્લેષણ",
        profile: "પ્રોફાઇલ",
        uploadText: "7/12 અથવા ઇન્ડેક્સ-2 અપલોડ કરો",
        uploadSubtext: "કાનૂની અને ઝોનિંગ રિપોર્ટ મેળવો",
        safe: "સુરક્ષિત",
        risky: "જોખમી",
        caution: "ચેતવણી",
        price: "કિંમત",
        area: "વિસ્તાર",
        owner: "માલિક",
        surveyNo: "સર્વે નંબર",
        village: "ગામ",
        zone: "ઝોન",
        legal: "કાનૂની સ્થિતિ",
        converter: "કન્વર્ટર",
        unitConverter: "એકમ કન્વર્ટર",
        vigha: "વિઘા",
        guntha: "ગુંઠા",
        sqft: "ચોરસ ફૂટ",
        clear: "સાફ કરો",
        enterValue: "રૂપાંતરણ માટે મૂલ્ય દાખલ કરો"
    },
    hi: {
        welcome: "वापसी पर स्वागत है",
        signIn: "फ़ोन नंबर से साइन इन करें",
        phonePlaceholder: "फ़ोन नंबर दर्ज करें",
        verify: "सत्यापित करें और साइन इन करें",
        watchlist: "आपकी वॉचलिस्ट",
        map: "नक्शा",
        analyze: "विश्लेषण",
        profile: "प्रोफ़ाइल",
        uploadText: "7/12 या इंडेक्स-2 अपलोड करें",
        uploadSubtext: "कानूनी और ज़ोनिंग रिपोर्ट प्राप्त करें",
        safe: "सुरक्षित",
        risky: "जोखिम",
        caution: "सावधानी",
        price: "कीमत",
        area: "क्षेत्रफल",
        owner: "मालिक",
        surveyNo: "सर्वे नंबर",
        village: "गाँव",
        zone: "ज़ोन",
        legal: "कानूनी स्थिति",
        converter: "कनवर्टर",
        unitConverter: "इकाई कनवर्टर",
        vigha: "बीघा",
        guntha: "गुंठा",
        sqft: "वर्ग फुट",
        clear: "साफ़ करें",
        enterValue: "रूपांतरण के लिए मान दर्ज करें"
    }
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>('en');

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

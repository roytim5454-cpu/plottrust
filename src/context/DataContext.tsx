import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Property, PropertyReport } from '../types';

interface DataContextType {
    properties: Property[];
    analyzeDocument: (file: File) => Promise<PropertyReport>;
    searchBySurveyNumber: (surveyNo: string, village: string) => Promise<Property | null>;
    isAnalyzing: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Mock Database of "Government Records"
const LAND_RECORDS: Property[] = [
    {
        id: 1,
        location: "Nr. Gota Flyover, SG Highway",
        village: "Gota",
        area: 24000, // Vigha conversion logic can be added later
        price: 150000000,
        status: "Safe",
        surveyNumber: "124/A",
        tpNumber: "12",
        fpNumber: "45",
        landType: "Non-Agricultural",
        lat: 23.1086,
        lng: 72.5276
    },
    {
        id: 2,
        location: "Behind Acropolis Mall",
        village: "Thaltej",
        area: 36000,
        price: 450000000,
        status: "Caution",
        surveyNumber: "89/2",
        tpNumber: "28",
        fpNumber: "112",
        landType: "Residential",
        lat: 23.0500,
        lng: 72.5000
    },
    {
        id: 3,
        location: "Nr. SP Ring Road",
        village: "Bopal",
        area: 12000,
        price: 85000000,
        status: "Risky",
        surveyNumber: "Pending",
        landType: "Agricultural",
        lat: 23.0333,
        lng: 72.4667
    }
];

export const DataProvider = ({ children }: { children: ReactNode }) => {
    const [properties] = useState<Property[]>(LAND_RECORDS);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const searchBySurveyNumber = async (surveyNo: string, village: string): Promise<Property | null> => {
        // Simulate DB Lookup
        await new Promise(resolve => setTimeout(resolve, 800));
        const found = LAND_RECORDS.find(p =>
            p.surveyNumber.toLowerCase() === surveyNo.toLowerCase() &&
            p.village.toLowerCase() === village.toLowerCase()
        );
        return found || null;
    };

    const analyzeDocument = async (_file: File): Promise<PropertyReport> => {
        setIsAnalyzing(true);
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Return a hardcoded report for demo purposes
        // In a real app, this would parse the uploaded PDF/Image
        const report: PropertyReport = {
            id: Math.random().toString(36).substr(2, 9),
            status: 'Safe',
            confidenceScore: 0.98,
            extractedData: {
                surveyNumber: "124/A",
                village: "Gota",
                landArea: "24000 sqft",
                ownerCount: 3,
                landType: "Non-Agricultural"
            },
            zoningInfo: {
                zone: "R1 (Residential)",
                fsi: 2.7,
                tpScheme: "TP 12 (Gota)"
            },
            legalCheck: {
                hasDispute: false,
                isGovernmentLand: false,
                lastTransactionYear: "2021"
            }
        };

        setIsAnalyzing(false);
        return report;
    };

    return (
        <DataContext.Provider value={{ properties, analyzeDocument, searchBySurveyNumber, isAnalyzing }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

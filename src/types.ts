export type PropertyStatus = 'Safe' | 'Caution' | 'Risky' | 'Pending';
export type LandType = 'Agricultural' | 'Non-Agricultural' | 'Industrial' | 'Residential';

export interface Property {
    id: number;
    location: string; // e.g. "Opp. Shell Petrol Pump"
    village: string;
    area: number; // in sqft
    price: number;
    status: PropertyStatus;
    surveyNumber: string;
    tpNumber?: string;
    fpNumber?: string;
    landType: LandType;
    lat: number;
    lng: number;
}

export interface PropertyReport {
    id: string;
    status: PropertyStatus;
    confidenceScore: number;
    extractedData: {
        surveyNumber: string;
        village: string;
        landArea: string;
        ownerCount: number; // Privacy: only show count
        landType: string;
    };
    zoningInfo: {
        zone: string;
        fsi: number;
        tpScheme?: string;
    };
    legalCheck: {
        hasDispute: boolean;
        isGovernmentLand: boolean;
        lastTransactionYear?: string;
    };
}

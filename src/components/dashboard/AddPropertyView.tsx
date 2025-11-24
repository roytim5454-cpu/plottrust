import React, { useState } from 'react';
import { ArrowLeft, Search, MapPin } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';

interface AddPropertyViewProps {
    onBack: () => void;
}

export const AddPropertyView = ({ onBack }: AddPropertyViewProps) => {
    const { searchBySurveyNumber } = useData();
    const { t } = useLanguage();
    const [village, setVillage] = useState('');
    const [surveyNo, setSurveyNo] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!village || !surveyNo) {
            setError('Please fill all fields');
            return;
        }

        setIsSearching(true);
        setError('');

        const result = await searchBySurveyNumber(surveyNo, village);

        if (result) {
            // In a real app, this would add to the user's list or navigate to details
            alert(`Found property in ${result.village}! This would add it to your list.`);
            onBack();
        } else {
            setError('Property not found in government records. Try "Gota" and "124/A".');
        }

        setIsSearching(false);
    };

    return (
        <div className="animate-fade-in pb-24">
            <div className="flex items-center mb-6">
                <button
                    onClick={onBack}
                    className="w-10 h-10 rounded-full bg-brand-secondary border border-brand-border flex items-center justify-center text-white hover:bg-brand-surface transition-colors mr-4"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h2 className="text-xl font-bold text-white">Add Property</h2>
            </div>

            <div className="bg-brand-secondary/50 border border-brand-border rounded-3xl p-6">
                <div className="mb-6">
                    <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center mb-4">
                        <MapPin className="w-6 h-6 text-brand-accent" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">Find Land Records</h3>
                    <p className="text-brand-text-muted text-sm">Enter details exactly as per 7/12 document.</p>
                </div>

                <form onSubmit={handleSearch} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-brand-text-muted mb-2 uppercase tracking-wider">{t.village}</label>
                        <input
                            type="text"
                            value={village}
                            onChange={(e) => setVillage(e.target.value)}
                            className="block w-full px-4 py-3 bg-brand-surface border border-brand-border rounded-xl text-white placeholder-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all"
                            placeholder="e.g. Gota"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-brand-text-muted mb-2 uppercase tracking-wider">{t.surveyNo}</label>
                        <input
                            type="text"
                            value={surveyNo}
                            onChange={(e) => setSurveyNo(e.target.value)}
                            className="block w-full px-4 py-3 bg-brand-surface border border-brand-border rounded-xl text-white placeholder-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all"
                            placeholder="e.g. 124/A"
                        />
                    </div>

                    {error && <p className="text-brand-risky text-sm">{error}</p>}

                    <button
                        type="submit"
                        disabled={isSearching}
                        className="w-full flex items-center justify-center py-4 px-6 rounded-xl bg-brand-accent hover:bg-brand-accent-light text-white font-semibold transition-all mt-6"
                    >
                        {isSearching ? 'Searching Records...' : 'Find Property'}
                        {!isSearching && <Search className="ml-2 h-4 w-4" />}
                    </button>
                </form>
            </div>
        </div>
    );
};

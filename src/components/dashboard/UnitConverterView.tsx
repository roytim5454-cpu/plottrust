import { useState } from 'react';
import { Calculator } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import {
    vighaToSqft,
    vighaToGuntha,
    gunthaToSqft,
    gunthaToVigha,
    sqftToVigha,
    sqftToGuntha,
} from '../../utils/unitConverter';

export const UnitConverterView = () => {
    const { t } = useLanguage();
    const [vigha, setVigha] = useState<string>('');
    const [guntha, setGuntha] = useState<string>('');
    const [sqft, setSqft] = useState<string>('');

    const handleVighaChange = (value: string) => {
        setVigha(value);
        if (value === '' || isNaN(Number(value))) {
            setGuntha('');
            setSqft('');
            return;
        }
        const num = Number(value);
        setGuntha(vighaToGuntha(num).toString());
        setSqft(vighaToSqft(num).toString());
    };

    const handleGunthaChange = (value: string) => {
        setGuntha(value);
        if (value === '' || isNaN(Number(value))) {
            setVigha('');
            setSqft('');
            return;
        }
        const num = Number(value);
        setVigha(gunthaToVigha(num).toString());
        setSqft(gunthaToSqft(num).toString());
    };

    const handleSqftChange = (value: string) => {
        setSqft(value);
        if (value === '' || isNaN(Number(value))) {
            setVigha('');
            setGuntha('');
            return;
        }
        const num = Number(value);
        setVigha(sqftToVigha(num).toString());
        setGuntha(sqftToGuntha(num).toString());
    };

    const handleClear = () => {
        setVigha('');
        setGuntha('');
        setSqft('');
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl">
                    <Calculator className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{t.unitConverter}</h1>
                    <p className="text-sm text-gray-600">{t.enterValue}</p>
                </div>
            </div>

            {/* Conversion Cards */}
            <div className="space-y-4">
                {/* Vigha */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t.vigha}
                    </label>
                    <input
                        type="number"
                        value={vigha}
                        onChange={(e) => handleVighaChange(e.target.value)}
                        placeholder="0"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                    />
                    <p className="mt-2 text-xs text-gray-500">1 Vigha = 3025 sqft</p>
                </div>

                {/* Guntha */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t.guntha}
                    </label>
                    <input
                        type="number"
                        value={guntha}
                        onChange={(e) => handleGunthaChange(e.target.value)}
                        placeholder="0"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                    />
                    <p className="mt-2 text-xs text-gray-500">1 Guntha = 1089 sqft</p>
                </div>

                {/* Square Feet */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t.sqft}
                    </label>
                    <input
                        type="number"
                        value={sqft}
                        onChange={(e) => handleSqftChange(e.target.value)}
                        placeholder="0"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                    />
                    <p className="mt-2 text-xs text-gray-500">International standard unit</p>
                </div>
            </div>

            {/* Clear Button */}
            <button
                onClick={handleClear}
                className="w-full mt-6 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
            >
                {t.clear}
            </button>

            {/* Info Box */}
            <div className="mt-8 p-4 bg-orange-50 border border-orange-100 rounded-xl">
                <p className="text-sm text-orange-800">
                    <strong>Note:</strong> Conversions are based on Gujarat standards.
                    1 Vigha = 3025 sqft, 1 Guntha = 1089 sqft.
                </p>
            </div>
        </div>
    );
};

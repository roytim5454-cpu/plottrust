import { useState } from 'react';
import { ArrowRightLeft } from 'lucide-react';

type Unit = 'vigha' | 'guntha' | 'sqft';

export const UnitConverter = () => {
    const [value, setValue] = useState<string>('');
    const [fromUnit, setFromUnit] = useState<Unit>('vigha');
    const [toUnit, setToUnit] = useState<Unit>('sqft');
    const [result, setResult] = useState<number | null>(null);

    // Conversion rates (approximate for Gujarat)
    // 1 Vigha = 16 Guntha
    // 1 Guntha = 1089 Sqft
    // 1 Vigha = 17424 Sqft

    const convert = () => {
        const val = parseFloat(value);
        if (isNaN(val)) return;

        let sqft = 0;

        // Convert to base unit (sqft)
        switch (fromUnit) {
            case 'vigha':
                sqft = val * 17424;
                break;
            case 'guntha':
                sqft = val * 1089;
                break;
            case 'sqft':
                sqft = val;
                break;
        }

        // Convert from base unit to target unit
        let finalResult = 0;
        switch (toUnit) {
            case 'vigha':
                finalResult = sqft / 17424;
                break;
            case 'guntha':
                finalResult = sqft / 1089;
                break;
            case 'sqft':
                finalResult = sqft;
                break;
        }

        setResult(parseFloat(finalResult.toFixed(4)));
    };

    return (
        <div className="p-6 max-w-md mx-auto w-full">
            <div className="bg-brand-surface border border-brand-border rounded-3xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-brand-secondary rounded-xl">
                        <ArrowRightLeft className="w-6 h-6 text-brand-accent" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Unit Converter</h2>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm text-brand-text-muted mb-2">Value</label>
                        <input
                            type="number"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Enter value"
                            className="w-full bg-brand-secondary border border-brand-border rounded-xl p-3 text-white focus:border-brand-accent outline-none transition-colors"
                        />
                    </div>

                    <div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-end">
                        <div>
                            <label className="block text-sm text-brand-text-muted mb-2">From</label>
                            <select
                                value={fromUnit}
                                onChange={(e) => setFromUnit(e.target.value as Unit)}
                                className="w-full bg-brand-secondary border border-brand-border rounded-xl p-3 text-white focus:border-brand-accent outline-none appearance-none"
                            >
                                <option value="vigha">Vigha</option>
                                <option value="guntha">Guntha</option>
                                <option value="sqft">Sq. Ft.</option>
                            </select>
                        </div>

                        <div className="pb-3 text-brand-text-muted">
                            <ArrowRightLeft className="w-4 h-4" />
                        </div>

                        <div>
                            <label className="block text-sm text-brand-text-muted mb-2">To</label>
                            <select
                                value={toUnit}
                                onChange={(e) => setToUnit(e.target.value as Unit)}
                                className="w-full bg-brand-secondary border border-brand-border rounded-xl p-3 text-white focus:border-brand-accent outline-none appearance-none"
                            >
                                <option value="vigha">Vigha</option>
                                <option value="guntha">Guntha</option>
                                <option value="sqft">Sq. Ft.</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={convert}
                        className="w-full bg-brand-accent text-white font-bold py-3 rounded-xl hover:bg-opacity-90 transition-all mt-4"
                    >
                        Convert
                    </button>

                    {result !== null && (
                        <div className="mt-6 p-4 bg-brand-secondary/50 rounded-xl border border-brand-border text-center">
                            <p className="text-sm text-brand-text-muted mb-1">Result</p>
                            <p className="text-2xl font-bold text-white">
                                {result} <span className="text-sm font-normal text-brand-text-muted capitalize">{toUnit === 'sqft' ? 'Sq. Ft.' : toUnit}</span>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

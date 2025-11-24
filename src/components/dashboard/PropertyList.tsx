import { MapPin, Shield, AlertTriangle, XCircle, LandPlot } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import type { PropertyStatus } from '../../types';

const StatusBadge = ({ status }: { status: PropertyStatus }) => {
    const { t } = useLanguage();
    const styles = {
        Safe: 'bg-brand-safe/10 text-brand-safe border-brand-safe/20',
        Caution: 'bg-brand-caution/10 text-brand-caution border-brand-caution/20',
        Risky: 'bg-brand-risky/10 text-brand-risky border-brand-risky/20',
        Pending: 'bg-brand-text-muted/10 text-brand-text-muted border-brand-text-muted/20',
    };

    const icons = {
        Safe: Shield,
        Caution: AlertTriangle,
        Risky: XCircle,
        Pending: MapPin,
    };

    const Icon = icons[status];
    const label = status === 'Safe' ? t.safe : status === 'Risky' ? t.risky : t.caution;

    return (
        <div className={`flex items-center space-x-1 px-2.5 py-1 rounded-full border text-xs font-medium ${styles[status]}`}>
            <Icon className="w-3 h-3" />
            <span>{label}</span>
        </div>
    );
};

export const PropertyList = () => {
    const { properties } = useData();
    const { t } = useLanguage();

    return (
        <div className="space-y-4 pb-24">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">{t.watchlist}</h2>
            </div>

            {properties.map((property) => (
                <div key={property.id} className="bg-brand-secondary/50 border border-brand-border rounded-2xl overflow-hidden hover:bg-brand-secondary transition-colors group cursor-pointer">
                    <div className="flex p-4">
                        <div className="w-20 h-20 rounded-xl bg-brand-surface flex items-center justify-center flex-shrink-0 border border-brand-border">
                            <LandPlot className="w-10 h-10 text-brand-text-muted group-hover:text-brand-accent transition-colors" />
                        </div>
                        <div className="ml-4 flex-1 flex flex-col justify-between py-0.5">
                            <div>
                                <div className="flex justify-between items-start">
                                    <h3 className="text-white font-semibold line-clamp-1">{property.location}</h3>
                                    <StatusBadge status={property.status} />
                                </div>
                                <div className="flex items-center text-brand-text-muted text-xs mt-1 space-x-2">
                                    <span>{t.village}: {property.village}</span>
                                    <span>•</span>
                                    <span>{t.surveyNo}: {property.surveyNumber}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-3">
                                <div>
                                    <p className="text-[10px] text-brand-text-muted uppercase tracking-wider">{t.price}</p>
                                    <p className="text-white font-medium">₹{(property.price / 10000000).toFixed(2)} Cr</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-brand-text-muted uppercase tracking-wider">{t.area}</p>
                                    <p className="text-white font-medium">{property.area.toLocaleString()} sqft</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

import { useState } from 'react';
import { UploadCloud, FileText, Shield, Loader2, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import type { PropertyReport } from '../../types';

export const AnalyzeView = () => {
    const { analyzeDocument, isAnalyzing } = useData();
    const { t } = useLanguage();
    const [report, setReport] = useState<PropertyReport | null>(null);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const result = await analyzeDocument(file);
            setReport(result);
        }
    };

    if (report) {
        return (
            <div className="space-y-6 pb-24 animate-fade-in">
                <div className="bg-brand-secondary/50 border border-brand-border rounded-3xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Analysis Report</h2>
                            <p className="text-brand-text-muted text-sm">Generated just now</p>
                        </div>
                        <div className={`px-4 py-2 rounded-full ${report.status === 'Safe' ? 'bg-brand-safe/20 text-brand-safe' : 'bg-brand-risky/20 text-brand-risky'}`}>
                            <span className="font-bold">{report.status}</span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-brand-surface rounded-2xl p-4">
                            <h3 className="text-brand-text-muted text-xs uppercase tracking-wider mb-3">Extracted Data</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-brand-text-muted text-xs">{t.owner}</p>
                                    <p className="text-white font-medium">{report.extractedData.ownerCount} Owners</p>
                                </div>
                                <div>
                                    <p className="text-brand-text-muted text-xs">{t.surveyNo}</p>
                                    <p className="text-white font-medium">{report.extractedData.surveyNumber}</p>
                                </div>
                                <div>
                                    <p className="text-brand-text-muted text-xs">{t.village}</p>
                                    <p className="text-white font-medium">{report.extractedData.village}</p>
                                </div>
                                <div>
                                    <p className="text-brand-text-muted text-xs">{t.area}</p>
                                    <p className="text-white font-medium">{report.extractedData.landArea}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-brand-surface rounded-2xl p-4">
                            <h3 className="text-brand-text-muted text-xs uppercase tracking-wider mb-3">Zoning & Legal</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-brand-text-muted text-sm">{t.zone}</span>
                                    <span className="text-white font-medium bg-brand-accent/10 px-2 py-0.5 rounded">{report.zoningInfo.zone}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-brand-text-muted text-sm">FSI Permissible</span>
                                    <span className="text-white font-medium">{report.zoningInfo.fsi}</span>
                                </div>
                                {report.zoningInfo.tpScheme && (
                                    <div className="flex justify-between items-center">
                                        <span className="text-brand-text-muted text-sm">TP Scheme</span>
                                        <span className="text-white font-medium">{report.zoningInfo.tpScheme}</span>
                                    </div>
                                )}
                                <div className="h-px bg-brand-border my-2" />
                                <div className="flex justify-between items-center">
                                    <span className="text-brand-text-muted text-sm">{t.legal}</span>
                                    <span className={`font-medium ${report.legalCheck.hasDispute ? 'text-brand-risky' : 'text-brand-safe'}`}>
                                        {report.legalCheck.hasDispute ? 'Dispute Detected' : 'Clear Title'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setReport(null)}
                        className="w-full mt-6 py-4 rounded-xl bg-brand-secondary border border-brand-border text-white font-medium hover:bg-brand-surface transition-colors"
                    >
                        Analyze Another Document
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col items-center justify-center p-4 text-center pb-24">
            <div className="w-full max-w-sm bg-brand-secondary/30 border border-brand-border border-dashed rounded-3xl p-8 hover:bg-brand-secondary/50 transition-all group cursor-pointer relative">
                <input
                    type="file"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    disabled={isAnalyzing}
                />

                <div className="flex flex-col items-center">
                    <div className={`w-20 h-20 rounded-full bg-brand-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${isAnalyzing ? 'animate-pulse' : ''}`}>
                        {isAnalyzing ? (
                            <Loader2 className="w-10 h-10 text-brand-accent animate-spin" />
                        ) : (
                            <UploadCloud className="w-10 h-10 text-brand-accent" />
                        )}
                    </div>

                    <h2 className="text-xl font-bold text-white mb-2">
                        {isAnalyzing ? 'Analyzing Document...' : t.uploadText}
                    </h2>
                    <p className="text-brand-text-muted text-sm mb-6">
                        {isAnalyzing ? 'Checking government records & zoning info' : t.uploadSubtext}
                    </p>

                    {!isAnalyzing && (
                        <div className="flex items-center text-brand-accent text-sm font-medium">
                            <span>Select File</span>
                            <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-sm">
                <div className="bg-brand-surface p-4 rounded-2xl flex flex-col items-center">
                    <FileText className="w-6 h-6 text-brand-text-muted mb-2" />
                    <span className="text-xs text-brand-text-muted">Supports PDF/JPG</span>
                </div>
                <div className="bg-brand-surface p-4 rounded-2xl flex flex-col items-center">
                    <Shield className="w-6 h-6 text-brand-safe mb-2" />
                    <span className="text-xs text-brand-text-muted">Secure & Private</span>
                </div>
            </div>
        </div>
    );
};

import React, { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { X, Check, Upload, AlertCircle, User, Hash, MapPin, Image as ImageIcon } from 'lucide-react';
import type { Account } from '../../constants/accounts';
import { AWS_REGIONS } from '../../constants/regions';
import MultiRegionSelector from '../ui/MultiRegionSelector';
import type { AccountFormProps, AccountFormData, AccountFormErrors } from '../../interfaces/forms/accountForm.interfaces';
import { validateAccountForm, parseActiveRegions } from '../../utils/validations/accountForm.validation';



const AccountForm: React.FC<AccountFormProps> = memo(({ isOpen, onClose, onSubmit, account, title, mode }) => {
    const [formData, setFormData] = useState<AccountFormData>({
        accountName: account?.AccountName || '',
        accountId: account?.AccountID || '',
        activeRegions: []
    });

    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<AccountFormErrors>({});



    // Reset form when account changes
    useEffect(() => {
        if (account) {
            setFormData({
                accountName: account.AccountName || '',
                accountId: account.AccountID || '',
                activeRegions: parseActiveRegions(account.ActiveRegions)
            });
            setLogoPreview(null);
        } else {
            setFormData({ accountName: '', accountId: '', activeRegions: [] });
            setLogoPreview(null);
        }
        setLogoFile(null);
        setErrors({});
    }, [account, isOpen]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setLogoFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setLogoPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const validateFormData = () => {
        const validationResult = validateAccountForm(formData, mode, logoFile);
        setErrors(validationResult.errors);
        return validationResult.isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateFormData()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            await onSubmit({
                accountName: formData.accountName,
                accountId: formData.accountId,
                activeRegions: formData.activeRegions,
                logoFile: logoFile || undefined
            });

            // Reset form after successful submission
            setFormData({ accountName: '', accountId: '', activeRegions: [] });
            setLogoFile(null);
            setLogoPreview(null);
            setErrors({});
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to submit form. Please try again.';
            setErrors({ general: errorMessage });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center z-50 p-4 overflow-y-auto"
            onClick={handleBackdropClick}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl my-8"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                    >
                        <X className="w-6 h-6 text-slate-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* General Error Display */}
                    {errors.general && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3"
                        >
                            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                            <p className="text-red-700 text-sm">{errors.general}</p>
                        </motion.div>
                    )}
                    
                    {/* Account Name */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            <User className="w-4 h-4 inline mr-2" />
                            Account Name
                        </label>
                        <input
                            type="text"
                            value={formData.accountName}
                            onChange={(e) => setFormData(prev => ({ ...prev, accountName: e.target.value }))}
                            data-field="accountName"
                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 ${errors.accountName ? 'border-red-300 bg-red-50 animate-pulse' : 'border-slate-300'
                                }`}
                            placeholder="Enter account name"
                            required
                        />
                        {errors.accountName && (
                            <div className="flex items-center mt-2 text-red-600 text-sm">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                {errors.accountName}
                            </div>
                        )}
                    </div>

                    {/* Account ID */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            <Hash className="w-4 h-4 inline mr-2" />
                            Account ID
                        </label>
                        {mode === 'update' ? (
                            <div className="relative">
                                <input
                                    type="text"
                                    value={formData.accountId}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-xl bg-slate-50 text-slate-600 cursor-not-allowed"
                                    disabled
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <span className="text-xs bg-slate-100 text-slate-800 px-2 py-1 rounded-full">Read Only</span>
                                </div>
                            </div>
                        ) : (
                            <>
                                <input
                                    type="text"
                                    value={formData.accountId}
                                    onChange={(e) => setFormData(prev => ({ ...prev, accountId: e.target.value }))}
                                    data-field="accountId"
                                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 ${errors.accountId ? 'border-red-300 bg-red-50 animate-pulse' : 'border-slate-300'
                                        }`}
                                    placeholder="Enter 12-digit AWS Account ID"
                                    required
                                    maxLength={12}
                                    pattern="\d{12}"
                                />
                                {errors.accountId && (
                                    <div className="flex items-center mt-2 text-red-600 text-sm">
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {errors.accountId}
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Active Regions */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            <MapPin className="w-4 h-4 inline mr-2" />
                            Active Regions <span className="text-red-500">*</span>
                        </label>

                        {/* Region Selector */}
                        <MultiRegionSelector
                            regionGroups={AWS_REGIONS}
                            selectedRegions={formData.activeRegions}
                            onRegionsChange={(regions) => setFormData(prev => ({ ...prev, activeRegions: regions }))}
                            placeholder="Select regions..."
                            error={!!errors.activeRegions}
                        />

                        {errors.activeRegions && (
                            <div className="flex items-center mt-2 text-red-600 text-sm">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                {errors.activeRegions}
                            </div>
                        )}
                    </div>

                    {/* Account Logo */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            <ImageIcon className="w-4 h-4 inline mr-2" />
                            Account Logo
                        </label>
                        <div className="space-y-4">
                            {logoPreview && (
                                <div className="relative w-24 h-24 mx-auto">
                                    <img
                                        src={logoPreview}
                                        alt="Logo preview"
                                        className="w-full h-full rounded-xl object-cover border-2 border-slate-200 shadow-md"
                                    />
                                </div>
                            )}
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors group">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Upload className="w-8 h-8 mb-2 text-slate-400 group-hover:text-slate-500 transition-colors" />
                                    <p className="mb-2 text-sm text-slate-500">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-slate-500">PNG, JPG, GIF (MAX. 2MB)</p>
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>
                        {errors.logo && (
                            <div className="flex items-center mt-2 text-red-600 text-sm">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                {errors.logo}
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4 pt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-6 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-900 disabled:opacity-50 transition-all duration-200 flex items-center justify-center font-medium shadow-lg hover:shadow-xl"
                        >
                            {isSubmitting ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Check className="w-4 h-4 mr-2" />
                                    {mode === 'create' ? 'Create Account' : 'Update Account'}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
});

AccountForm.displayName = 'AccountForm';

export default AccountForm;
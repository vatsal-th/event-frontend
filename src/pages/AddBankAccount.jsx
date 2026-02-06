import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LuArrowLeft, LuBuilding, LuUser, LuCreditCard, LuHash, LuCheck, LuInfo, LuLoader, LuX } from 'react-icons/lu';
import Button from '../components/common/Button';
import { Select } from '../components/common/Forms';
import { saveBankDetails, fetchBankDetails } from '../store/slices/bankSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const AddBankAccount = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { details: bankDetails, loading, error: apiError } = useSelector((state) => state.bank);

    const [formData, setFormData] = useState({
        accountHolderName: '',
        accountNumber: '',
        confirmAccountNumber: '',
        ifscCode: '',
        bankName: '',
        branch: '',
        accountType: 'savings'
    });

    const [error, setError] = useState('');

    useEffect(() => {
        if (!bankDetails) {
            dispatch(fetchBankDetails());
        }
    }, [dispatch, bankDetails]);

    useEffect(() => {
        if (bankDetails) {
            setFormData({
                accountHolderName: bankDetails.accountHolderName || '',
                accountNumber: bankDetails.accountNumber || '',
                confirmAccountNumber: bankDetails.accountNumber || '',
                ifscCode: bankDetails.ifscCode || '',
                bankName: bankDetails.bankName || '',
                branch: bankDetails.branch || '',
                accountType: bankDetails.accountType || 'savings'
            });
        }
    }, [bankDetails]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic Validation
        if (formData.accountNumber !== formData.confirmAccountNumber) {
            setError('Account numbers do not match');
            return;
        }

        if (formData.ifscCode.length < 11) {
            setError('Please enter a valid 11-digit IFSC code');
            return;
        }

        const resultAction = await dispatch(saveBankDetails({
            accountHolderName: formData.accountHolderName,
            accountNumber: formData.accountNumber,
            ifscCode: formData.ifscCode,
            bankName: formData.bankName,
            branch: formData.branch,
            accountType: formData.accountType
        }));

        if (saveBankDetails.fulfilled.match(resultAction)) {
            navigate('/wallet');
        }
    };

    return (
        <div className="min-h-[calc(100vh-5rem)] bg-gray-50">
            {/* Header - Aligned with form */}
            <div className="sticky top-20 backdrop-blur-md z-30">
                <div className="max-w-xl mx-auto px-4 py-4 flex items-center">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 active:bg-gray-200 rounded-full transition-colors cursor-pointer">
                        <LuArrowLeft size={24} />
                    </button>
                    <h1 className="ml-2 text-xl font-extrabold text-gray-900">Add Bank Account</h1>
                </div>
            </div>

            <div className="max-w-xl mx-auto px-4">
                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-purple-900/5 border border-gray-100 overflow-hidden">
                    <div className="p-6 sm:p-10">
                        {bankDetails?.status === 'rejected' && bankDetails?.rejectionReason && (
                            <div className="bg-red-50 p-6 rounded-2xl border border-red-100 flex items-start space-x-4 mb-8">
                                <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center shrink-0">
                                    <LuX size={20} />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-bold text-red-900 text-sm">Previous Details Rejected</h4>
                                    <p className="text-xs text-red-700 leading-relaxed font-medium">
                                        Reason: {bankDetails.rejectionReason}
                                    </p>
                                    <p className="text-[10px] text-red-600 font-black uppercase tracking-widest mt-2">Please correct the information below and re-save.</p>
                                </div>
                            </div>
                        )}

                        <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 flex items-start space-x-3 mb-8">
                            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                                <LuInfo size={18} />
                            </div>
                            <p className="text-xs text-blue-800 leading-relaxed font-semibold">
                                Please ensure the bank details are correct. Incorrect details may lead to failed transactions or money sent to the wrong account.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Account Holder Name */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Account Holder Name</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-brand-purple text-gray-400">
                                        <LuUser size={20} />
                                    </div>
                                    <input
                                        required
                                        name="accountHolderName"
                                        value={formData.accountHolderName}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Enter name as per bank record"
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-brand-purple transition-all text-gray-900 font-medium placeholder:text-gray-300"
                                    />
                                </div>
                            </div>

                            {/* Account Number */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Account Number</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-purple">
                                        <LuHash size={20} />
                                    </div>
                                    <input
                                        required
                                        name="accountNumber"
                                        value={formData.accountNumber}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Enter account number"
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-brand-purple transition-all text-gray-900 font-medium placeholder:text-gray-300"
                                    />
                                </div>
                            </div>

                            {/* Confirm Account Number */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Confirm Account Number</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-purple">
                                        <LuCheck size={20} />
                                    </div>
                                    <input
                                        required
                                        name="confirmAccountNumber"
                                        value={formData.confirmAccountNumber}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Re-enter account number"
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-brand-purple transition-all text-gray-900 font-medium placeholder:text-gray-300"
                                    />
                                </div>
                            </div>

                            {/* IFSC Code & Bank Name */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">IFSC Code</label>
                                    <input
                                        required
                                        name="ifscCode"
                                        value={formData.ifscCode}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="HDFC0001234"
                                        className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-brand-purple transition-all uppercase tracking-widest text-gray-900 font-medium placeholder:text-gray-300"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Bank Name</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-purple">
                                            <LuBuilding size={20} />
                                        </div>
                                        <input
                                            required
                                            name="bankName"
                                            value={formData.bankName}
                                            onChange={handleChange}
                                            type="text"
                                            placeholder="e.g. HDFC Bank"
                                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-brand-purple transition-all text-gray-900 font-medium placeholder:text-gray-300"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Branch & Account Type */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Branch Name</label>
                                    <input
                                        name="branch"
                                        value={formData.branch}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="e.g. Navrangpura"
                                        className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-brand-purple transition-all text-gray-900 font-medium placeholder:text-gray-300"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Select
                                        label="Account Type"
                                        value={formData.accountType}
                                        onChange={(value) => setFormData(prev => ({ ...prev, accountType: value }))}
                                        options={[
                                            { label: 'Savings', value: 'savings' },
                                            { label: 'Current', value: 'current' }
                                        ]}
                                    />
                                </div>
                            </div>

                            {(error || apiError) && (
                                <div className="flex items-center space-x-2 text-red-500 text-sm font-bold bg-red-50 p-4 rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-1">
                                    <LuInfo size={18} />
                                    <span>{error || apiError}</span>
                                </div>
                            )}

                            <div className="pt-6">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-full font-black text-lg flex items-center justify-center"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <LuLoader className="animate-spin" />
                                            <span>Verifying...</span>
                                        </>
                                    ) : (
                                        <span>Save Bank Account</span>
                                    )}
                                </Button>
                                <p className="text-center text-[10px] text-gray-400 mt-6 font-black uppercase tracking-[0.25em]">
                                    Secure 256-bit encrypted bank connection
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBankAccount;

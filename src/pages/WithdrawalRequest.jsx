import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LuArrowLeft, LuWallet, LuShieldCheck, LuChevronDown, LuCheck, LuLoader, LuInfo, LuSend, LuPlus } from 'react-icons/lu';
import Button from '../components/common/Button';
import { requestMockWithdrawal, clearWalletState } from '../store/slices/walletSlice';

const WithdrawalRequest = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { balance, bankAccounts } = useSelector((state) => state.wallet);

    const [amount, setAmount] = useState('');
    const [selectedBankId, setSelectedBankId] = useState(bankAccounts[0]?._id || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.dropdown-container')) {
                setIsDropdownOpen(false);
            }
        };
        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isDropdownOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const withdrawAmount = parseFloat(amount);

        if (!withdrawAmount || withdrawAmount <= 0) {
            setError('Please enter a valid amount');
            return;
        }

        if (withdrawAmount > balance) {
            setError('Insufficient balance');
            return;
        }

        if (withdrawAmount < 100) {
            setError('Minimum withdrawal amount is ₹100');
            return;
        }

        if (!selectedBankId) {
            setError('Please select a bank account');
            return;
        }

        setLoading(true);
        setError('');

        // Simulate API call
        setTimeout(() => {
            dispatch(requestMockWithdrawal({
                amount: withdrawAmount,
                bankAccountId: selectedBankId
            }));
            setLoading(false);
            setSuccess(true);

            // Redirect after 2 seconds
            setTimeout(() => {
                navigate('/wallet');
            }, 2500);
        }, 1500);
    };

    if (success) {
        return (
            <div className="min-h-[calc(100vh-5rem)] bg-white flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <LuCheck size={48} />
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Request Submitted!</h2>
                <p className="text-gray-500 mb-8 max-w-xs">
                    Your withdrawal request of <span className="text-gray-900 font-bold">₹{amount}</span> has been sent for approval.
                </p>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 w-full max-w-xs text-sm text-gray-500">
                    Expected processing time: <span className="font-bold text-gray-800">24-48 Hours</span>
                </div>
                <p className="mt-8 text-xs text-brand-purple font-bold animate-pulse">Redirecting to wallet...</p>
            </div>
        );
    }

    const selectedBank = bankAccounts.find(b => b._id === selectedBankId);

    return (
        <div className="min-h-[calc(100vh-5rem)] bg-gray-50 pb-12">
            {/* Header - Aligned with form */}
            <div className="sticky top-20 z-30">
                <div className="max-w-xl mx-auto px-4 py-4 flex items-center">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 active:bg-gray-200 rounded-full transition-colors cursor-pointer">
                        <LuArrowLeft size={24} />
                    </button>
                    <h1 className="ml-2 text-xl font-extrabold text-gray-900">Withdraw Rewards</h1>
                </div>
            </div>

            <div className="max-w-xl mx-auto px-4">
                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-purple-900/5 border border-gray-100 overflow-hidden">
                    <div className="p-6 sm:p-10">
                        {/* Balance Summary */}
                        <div className="bg-brand-purple p-8 rounded-3xl shadow-lg shadow-purple-900/20 mb-8 flex items-center justify-between text-white relative overflow-hidden">
                            {/* Decor */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>

                            <div className="relative z-10">
                                <p className="text-[10px] font-black text-purple-200 uppercase tracking-widest mb-1">Available to withdraw</p>
                                <h2 className="text-4xl font-black">₹{balance.toLocaleString('en-IN')}</h2>
                            </div>
                            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md relative z-10">
                                <LuWallet size={28} />
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Amount Input */}
                            <div className="space-y-3">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Withdrawal Amount</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-2xl font-black text-gray-300 group-focus-within:text-brand-purple transition-colors">
                                        ₹
                                    </div>
                                    <input
                                        required
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        type="number"
                                        placeholder="0.00"
                                        className="w-full pl-12 pr-24 py-6 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-brand-purple transition-all text-3xl font-black text-gray-900 placeholder:text-gray-200"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setAmount(balance.toString())}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-purple-100 text-brand-purple px-4 py-2 rounded-xl text-xs font-black hover:bg-purple-200 active:scale-95 transition-all cursor-pointer"
                                    >
                                        MAX
                                    </button>
                                </div>
                            </div>

                            {/* Bank Selection */}
                            <div className="space-y-3">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Transfer to</label>
                                {bankAccounts.length > 0 ? (
                                    <div className="relative dropdown-container">
                                        <button
                                            type="button"
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                            className="w-full pl-5 pr-12 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-brand-purple transition-all text-gray-900 font-bold text-left flex items-center justify-between cursor-pointer"
                                        >
                                            <span>{selectedBank ? `${selectedBank.bankName} - ${selectedBank.accountNumber}` : 'Select Bank Account'}</span>
                                            <LuChevronDown className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} size={20} />
                                        </button>
                                        {isDropdownOpen && (
                                            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-lg z-10 max-h-48 overflow-y-auto">
                                                {bankAccounts.map(bank => (
                                                    <button
                                                        key={bank._id}
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedBankId(bank._id);
                                                            setIsDropdownOpen(false);
                                                        }}
                                                        className="w-full px-5 py-3 text-left hover:bg-gray-50 transition-colors first:rounded-t-2xl last:rounded-b-2xl font-bold text-gray-900"
                                                    >
                                                        {bank.bankName} - {bank.accountNumber}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => navigate('/wallet/add-bank')}
                                        type="button"
                                        className="w-full p-8 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold flex flex-col items-center justify-center hover:border-brand-purple hover:text-brand-purple hover:bg-purple-50 transition-all cursor-pointer"
                                    >
                                        <LuPlus className="mb-2" size={24} />
                                        <span>Add a Bank Account First</span>
                                    </button>
                                )}
                            </div>

                            {/* Security Tip */}
                            <div className="bg-green-50/50 p-5 rounded-2xl border border-green-100 flex items-start space-x-3">
                                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center shrink-0">
                                    <LuShieldCheck size={18} />
                                </div>
                                <p className="text-xs text-green-800 leading-relaxed font-bold">
                                    Your transaction is secured with military-grade encryption. Money will be credited within 2 days.
                                </p>
                            </div>

                            {error && (
                                <div className="flex items-center space-x-2 text-red-500 text-sm font-bold bg-red-50 p-4 rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-1">
                                    <LuInfo size={18} />
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-full font-black text-lg flex items-center justify-center space-x-3"
                                    disabled={loading || !selectedBankId}
                                >
                                    {loading ? (
                                        <>
                                            <LuLoader className="animate-spin" />
                                            <span>Processing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <LuSend size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            <span>Request Withdrawal</span>
                                        </>
                                    )}
                                </Button>
                                <p className="text-center text-[10px] text-gray-400 mt-6 font-black uppercase tracking-[0.25em]">
                                    Direct bank transfer via IMPS/NEFT
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WithdrawalRequest;

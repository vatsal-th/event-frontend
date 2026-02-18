import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LuSearch, LuLoader, LuInfo, LuArrowLeft,
    LuBanknote, LuFilter, LuChevronLeft, LuChevronRight,
    LuDownload, LuCalendar, LuUser
} from 'react-icons/lu';
import { searchSalaryByTalentId } from '../api/salaryApi';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import dayjs from 'dayjs';

const SALARY_PER_PAGE = 10;

const StatusBadge = ({ status }) => {
    const isPaid = (status || 'Paid').toLowerCase() === 'paid';
    return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
            isPaid ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
        }`}>
            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isPaid ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            {status || 'Paid'}
        </span>
    );
};

const Salary = () => {
    const navigate = useNavigate();
    const [searchId, setSearchId] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searched, setSearched] = useState(false);
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState('all');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchId.trim()) return;
        setLoading(true);
        setError(null);
        setSearched(true);
        setPage(1);
        setStatusFilter('all');
        try {
            const res = await searchSalaryByTalentId(searchId.trim());
            if (res.success && res.data) {
                const data = Array.isArray(res.data) ? res.data : [res.data];
                setResults(data);
            } else {
                setResults([]);
                setError(res.message || 'No salary record found for this Talent ID.');
            }
        } catch (err) {
            setResults([]);
            setError(err.message || 'Failed to fetch salary details.');
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = (item) => {
        const doc = new jsPDF();
        doc.setFillColor(79, 70, 229);
        doc.rect(0, 0, 210, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.text('RAJPUT ENTERTAINMENT HUB', 105, 20, { align: 'center' });
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Official Salary Payment Advice', 105, 30, { align: 'center' });
        doc.setTextColor(31, 41, 55);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('SALARY SLIP', 20, 55);
        doc.setDrawColor(229, 231, 235);
        doc.line(20, 60, 190, 60);
        const tableData = [
            ['Talent ID', item.talentId || item.targetUserId || 'N/A'],
            ['Nickname', item.targetUserName || 'N/A'],
            ['Payment Date', dayjs(item.createdAt).format('MMMM D, YYYY')],
            ['Status', item.status || 'Paid']
        ];
        doc.autoTable({
            startY: 70,
            head: [['Description', 'Details']],
            body: tableData,
            theme: 'grid',
            headStyles: { fillColor: [79, 70, 229] },
            styles: { fontSize: 11, cellPadding: 5 },
            columnStyles: { 0: { fontStyle: 'bold' }, 1: { halign: 'right' } }
        });
        const finalY = doc.lastAutoTable.finalY + 20;
        doc.setFillColor(243, 244, 246);
        doc.rect(20, finalY - 10, 170, 25, 'F');
        doc.setFontSize(14);
        doc.setTextColor(5, 150, 105);
        doc.setFont('helvetica', 'bold');
        doc.text('Total Amount Paid', 30, finalY + 5);
        doc.text(`INR ${item.amount}`, 180, finalY + 5, { align: 'right' });
        doc.setFontSize(10);
        doc.setTextColor(156, 163, 175);
        doc.setFont('helvetica', 'italic');
        doc.text('This is a computer-generated document and does not require a physical signature.', 105, 280, { align: 'center' });
        doc.text(`Generated on: ${dayjs().format('DD/MM/YYYY HH:mm')}`, 105, 285, { align: 'center' });
        doc.save(`Salary_Slip_${item.talentId || item.targetUserId}.pdf`);
    };

    const filtered = results.filter(item => {
        if (statusFilter === 'all') return true;
        return (item.status || 'Paid').toLowerCase() === statusFilter.toLowerCase();
    });
    const totalPages = Math.ceil(filtered.length / SALARY_PER_PAGE);
    const paginated = filtered.slice((page - 1) * SALARY_PER_PAGE, page * SALARY_PER_PAGE);

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="sticky top-0 z-40">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-2xl transition-all cursor-pointer"
                        >
                            <LuArrowLeft size={22} />
                        </button>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">Salary Records</h1>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden sm:block">Search by Talent ID</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-2xl">
                        <LuBanknote size={16} className="text-green-600" />
                        <span className="text-[10px] font-black text-green-700 uppercase tracking-widest hidden sm:inline">Salary Portal</span>
                    </div>
                </div>
            </div>

            <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-4 space-y-5">
                {/* Search Bar */}
                <form onSubmit={handleSearch} className="flex gap-3">
                    <div className="relative flex-1 group">
                        <LuSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Enter Talent ID to search salary records..."
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                            className="w-full bg-white border border-gray-100 rounded-2xl py-3.5 pl-11 pr-5 text-sm font-bold focus:outline-none focus:border-green-300 focus:ring-4 focus:ring-green-50 transition-all placeholder:text-gray-300 shadow-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={!searchId.trim() || loading}
                        className="px-6 py-3 bg-green-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-green-100 hover:bg-green-600 active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 whitespace-nowrap"
                    >
                        {loading ? <LuLoader className="animate-spin" size={16} /> : <LuSearch size={16} />}
                        <span className="hidden sm:inline">Search</span>
                    </button>
                </form>

                {/* Filter + Count Bar */}
                {searched && results.length > 0 && (
                    <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center space-x-1.5 text-gray-400">
                            <LuFilter size={13} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Filter:</span>
                        </div>
                        {['all', 'Paid', 'Pending'].map(f => (
                            <button
                                key={f}
                                onClick={() => { setStatusFilter(f); setPage(1); }}
                                className={`px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                                    statusFilter === f
                                        ? 'bg-green-500 text-white shadow-md shadow-green-100'
                                        : 'bg-white border border-gray-100 text-gray-500 hover:bg-gray-50'
                                }`}
                            >
                                {f === 'all' ? 'All' : f}
                            </button>
                        ))}
                        <span className="ml-auto text-[10px] font-bold text-gray-400">
                            {filtered.length} record{filtered.length !== 1 ? 's' : ''} found
                        </span>
                    </div>
                )}

                {/* Loading */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
                        <div className="w-12 h-12 border-4 border-green-100 border-t-green-500 rounded-full animate-spin mb-4" />
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest animate-pulse">Searching Records...</p>
                    </div>
                )}

                {/* Error */}
                {!loading && searched && error && (
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-gray-100 shadow-sm">
                        <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center mb-4 text-rose-400">
                            <LuInfo size={28} />
                        </div>
                        <p className="text-gray-900 font-black text-lg mb-1">No Record Found</p>
                        <p className="text-gray-500 text-sm font-medium max-w-xs">{error}</p>
                    </div>
                )}

                {/* Empty initial state */}
                {!loading && !searched && (
                    <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-3xl border border-gray-100 shadow-sm">
                        <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center mb-5 text-green-400">
                            <LuBanknote size={40} />
                        </div>
                        <h2 className="text-xl font-black text-gray-900 mb-2">Search Salary Records</h2>
                        <p className="text-gray-500 text-sm max-w-xs font-medium leading-relaxed">
                            Enter your Talent ID above to view salary payment history and download slips.
                        </p>
                    </div>
                )}

                {/* Results */}
                {!loading && paginated.length > 0 && (
                    <>
                        {/* ── Desktop Table ── */}
                        <div className="hidden md:block bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100">
                                        <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest w-10">#</th>
                                        <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                            <div className="flex items-center space-x-1"><LuUser size={12} /><span>Talent ID</span></div>
                                        </th>
                                        <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                            <div className="flex items-center space-x-1"><LuUser size={12} /><span>Nickname</span></div>
                                        </th>
                                        <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                            <div className="flex items-center space-x-1"><LuBanknote size={12} /><span>Amount</span></div>
                                        </th>
                                        <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                            <div className="flex items-center space-x-1"><LuCalendar size={12} /><span>Date</span></div>
                                        </th>
                                        <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                        <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Slip</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {paginated.map((item, idx) => (
                                        <tr key={item._id || idx} className="hover:bg-gray-50/60 transition-colors group">
                                            <td className="px-5 py-4 text-xs font-black text-gray-300">
                                                {(page - 1) * SALARY_PER_PAGE + idx + 1}
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className="text-sm font-bold text-gray-700 font-mono">
                                                    {item.talentId || item.targetUserId || 'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className="text-sm font-black text-gray-900">
                                                    {item.nickname || 'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className="text-base font-black text-green-600">
                                                    ₹{Number(item.amount).toLocaleString('en-IN')}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className="text-sm font-bold text-gray-700">
                                                    {item.createdAt ? dayjs(item.createdAt).format('DD MMM YYYY') : 'N/A'}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <StatusBadge status={item.status} />
                                            </td>
                                            <td className="px-5 py-4 text-center">
                                                <button
                                                    onClick={() => handleDownload(item)}
                                                    className="p-2 rounded-xl bg-gray-50 hover:bg-green-500 hover:text-white text-gray-400 transition-all cursor-pointer"
                                                    title="Download Slip"
                                                >
                                                    <LuDownload size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* ── Mobile Cards ── */}
                        <div className="md:hidden space-y-3">
                            {paginated.map((item, idx) => (
                                <div key={item._id || idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                                    {/* Top Row */}
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600 shrink-0">
                                                <LuBanknote size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-gray-900 leading-tight">
                                                    {item.targetUserName || 'N/A'}
                                                </p>
                                                <p className="text-[10px] font-bold text-gray-400 font-mono">
                                                    {item.talentId || item.targetUserId || 'N/A'}
                                                </p>
                                            </div>
                                        </div>
                                        <StatusBadge status={item.status} />
                                    </div>

                                    {/* Amount */}
                                    <div className="bg-green-50 rounded-xl px-4 py-2.5 mb-3 flex items-center justify-between">
                                        <span className="text-[10px] font-black text-green-600/60 uppercase tracking-widest">Amount</span>
                                        <span className="text-xl font-black text-green-600">
                                            ₹{Number(item.amount).toLocaleString('en-IN')}
                                        </span>
                                    </div>

                                    {/* Details */}
                                    <div className="grid grid-cols-2 gap-2 mb-3">
                                        <div className="bg-gray-50 rounded-xl p-2.5">
                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Talent ID</p>
                                            <p className="text-xs font-bold text-gray-700 font-mono">
                                                {item.talentId || item.targetUserId || 'N/A'}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 rounded-xl p-2.5">
                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Date</p>
                                            <p className="text-xs font-bold text-gray-700">
                                                {item.createdAt ? dayjs(item.createdAt).format('DD MMM YYYY') : 'N/A'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Download */}
                                    <button
                                        onClick={() => handleDownload(item)}
                                        className="w-full py-2.5 rounded-xl border border-gray-100 bg-gray-50 hover:bg-green-500 hover:text-white hover:border-green-500 text-gray-500 font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all cursor-pointer"
                                    >
                                        <LuDownload size={14} />
                                        <span>Download Slip</span>
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* ── Pagination ── */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between pt-2">
                                <p className="text-xs font-bold text-gray-400">
                                    Page {page} of {totalPages} &nbsp;·&nbsp; {filtered.length} records
                                </p>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => setPage(p => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                        className="p-2.5 rounded-xl bg-white border border-gray-100 text-gray-500 hover:bg-green-50 hover:text-green-600 disabled:opacity-40 transition-all cursor-pointer shadow-sm"
                                    >
                                        <LuChevronLeft size={16} />
                                    </button>
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                        <button
                                            key={p}
                                            onClick={() => setPage(p)}
                                            className={`w-9 h-9 rounded-xl text-sm font-black transition-all cursor-pointer ${
                                                page === p
                                                    ? 'bg-green-500 text-white shadow-md shadow-green-100'
                                                    : 'bg-white border border-gray-100 text-gray-500 hover:bg-green-50 hover:text-green-600'
                                            }`}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                        disabled={page === totalPages}
                                        className="p-2.5 rounded-xl bg-white border border-gray-100 text-gray-500 hover:bg-green-50 hover:text-green-600 disabled:opacity-40 transition-all cursor-pointer shadow-sm"
                                    >
                                        <LuChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default Salary;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LuCloudUpload, LuMic, LuSettings, LuLoader, LuX } from 'react-icons/lu';
import { Input, Select, Textarea } from '../components/common/Forms';
import Button from '../components/common/Button';
import {
    fetchMyComplaints,
    createComplaint,
    clearComplaintStatus
} from '../store/slices/complaintSlice';

const FeedbackIssues = () => {
    const dispatch = useDispatch();
    const {
        complaints,
        loading,
        submitLoading,
        success,
        error
    } = useSelector((state) => state.complaints);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [photos, setPhotos] = useState([]);
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    useEffect(() => {
        dispatch(fetchMyComplaints());

        return () => {
            dispatch(clearComplaintStatus());
        };
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            showToast('Complaint submitted successfully', 'success');
            setTitle('');
            setDescription('');
            setType('');
            setPhotos([]);
            dispatch(clearComplaintStatus());
        }
        if (error) {
            showToast(error, 'error');
            dispatch(clearComplaintStatus());
        }
    }, [success, error, dispatch]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const totalPhotos = photos.length + files.length;

        if (totalPhotos > 5) {
            showToast('Maximum 5 photos allowed', 'error');
            return;
        }

        setPhotos((prev) => [...prev, ...files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description || !type) {
            alert('Please fill all required fields');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('type', type);
        photos.forEach((photo) => {
            formData.append('photos', photo);
        });

        dispatch(createComplaint(formData));
    };

    const getStatusStyle = (status) => {
        switch (status.toLowerCase()) {
            case 'pending': return 'bg-amber-100 text-amber-600 border-amber-200';
            case 'in progress': return 'bg-blue-100 text-blue-600 border-blue-200';
            case 'resolved': return 'bg-emerald-100 text-emerald-600 border-emerald-200';
            default: return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };

    return (
        <div className="space-y-8 md:space-y-10 animate-in fade-in duration-700">
            {/* Header Banner */}
            <section className="relative overflow-hidden bg-gradient-to-r from-violet-100 via-purple-50 to-pink-100 py-8 sm:py-12 md:py-16 lg:py-24 border-b border-purple-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center">
                    <div className="space-y-4 sm:space-y-5 md:space-y-6 text-center lg:text-left">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight px-2 sm:px-0">
                            Complaints & Feedback <br className="hidden sm:block" /> Handling
                        </h1>
                        <p className="text-gray-600 text-base sm:text-lg md:text-xl font-medium max-w-xl mx-auto lg:mx-0 px-2 sm:px-0">
                            We value your feedback. Please share your concerns so we can assist you effectively.
                        </p>
                    </div>
                    {/* Floating Creator Image - Placeholder matches the reference theme */}
                    <div className="hidden lg:flex justify-end">
                        <div className="relative w-full max-w-md">
                            <img
                                src="https://images.unsplash.com/photo-1598550874175-4d0fe4a2c90b?q=80&w=800"
                                className="w-full h-auto object-contain drop-shadow-2xl rounded-[3rem] opacity-80"
                                alt="Support Representative"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
                {/* Left: Issue Form */}
                <div className="space-y-6 sm:space-y-8 bg-white/60 backdrop-blur-xl border border-white p-6 sm:p-8 md:p-10 rounded-[20px] shadow-sm">
                    <div className="space-y-2">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900">Complaint Form: Let Us Help You</h2>
                        <p className="text-gray-500 text-xs sm:text-sm">Please fill out the form below to report any issues or grievances. Attach relevant files if needed.</p>
                    </div>

                    <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
                        <Input
                            label="Title"
                            placeholder="Enter complaint title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />

                        <Select
                            label="Category"
                            value={type}
                            onChange={setType}
                            options={[
                                { label: 'Select Category', value: '' },
                                { label: 'Payment Issue', value: 'Payment Issue' },
                                { label: 'Technical Issue', value: 'Technical Issue' },
                                { label: 'Account Issue', value: 'Account Issue' },
                                { label: 'Other', value: 'Other' }
                            ]}
                            required
                        />

                        <Textarea
                            label="Description"
                            placeholder="Describe your complaint in detail"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />

                        {/* File Upload Area */}
                        <div className="space-y-4">
                            <div className="group relative border-2 border-dashed border-gray-200 rounded-2xl p-6 sm:p-8 transition-all hover:border-brand-purple/40 hover:bg-purple-50/30 flex flex-col items-center justify-center space-y-3 cursor-pointer">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-brand-purple group-hover:scale-110 transition-transform">
                                    <LuCloudUpload size={20} className="sm:w-6 sm:h-6" />
                                </div>
                                <p className="text-xs sm:text-sm font-bold text-gray-500 text-center px-2">
                                    <span className="text-brand-purple">Upload photos</span>
                                </p>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>

                            {/* Image Previews */}
                            {photos.length > 0 && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {photos.map((photo, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={URL.createObjectURL(photo)}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-20 sm:h-24 object-cover rounded-lg border border-gray-200"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setPhotos(photos.filter((_, i) => i !== index));
                                                }}
                                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                            >
                                                <LuX size={12} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {photos.length > 0 && (
                                <p className="text-xs text-gray-400 text-center">{photos.length} file(s) selected</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full py-3 sm:py-4 text-base sm:text-lg shadow-xl shadow-purple-200"
                            disabled={submitLoading}
                        >
                            {submitLoading ? (
                                <>
                                    <LuLoader className="animate-spin mr-2" />
                                    Submitting...
                                </>
                            ) : (
                                'Submit Complaint'
                            )}
                        </Button>
                    </form>
                </div>

                {/* Right: Status Tracker */}
                <div className="space-y-6 sm:space-y-8 mt-8 lg:mt-0">
                    <div className="space-y-2">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900">Track Your Complaints</h2>
                        <p className="text-gray-500 text-xs sm:text-sm">Monitor the status of your submitted complaints. Stay updated with real-time progress.</p>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                        {loading ? (
                            <div className="flex justify-center py-8">
                                <LuLoader className="animate-spin text-2xl text-gray-400" />
                            </div>
                        ) : complaints.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-50 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                                    <LuSettings className="text-3xl sm:text-4xl text-purple-300" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">No Complaints Yet</h3>
                                <p className="text-sm sm:text-base text-gray-500 text-center max-w-sm">
                                    You haven't submitted any complaints. When you do, they'll appear here.
                                </p>
                            </div>
                        ) : (
                            complaints.map((complaint, idx) => (
                                <div key={complaint.complaintNo || idx} className="group relative bg-[#F4F6F8] rounded-3xl p-4 sm:p-6 border border-gray-100 hover:shadow-md transition-all duration-300">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3 sm:gap-0">
                                        <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0">
                                                <LuSettings size={24} className="text-purple-500" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-none mb-1 break-words">
                                                    {complaint.title}
                                                </h3>
                                                <div className="flex items-center space-x-2 sm:space-x-4 text-[10px] sm:text-[11px] text-gray-400 font-bold uppercase tracking-wider">
                                                    <span>Submitted: {new Date(complaint.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider border flex-shrink-0 ${getStatusStyle(complaint.status)}`}>
                                            {complaint.status}
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-[#EAECEF] flex justify-bet ween items-center text-[10px] sm:text-[11px] text-gray-400 font-bold">
                                        <span>Description: {complaint.description}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Toast Notification */}
            {toast && (
                <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl shadow-2xl font-bold text-sm transition-all duration-300 animate-in slide-in-from-bottom-4 ${toast.type === 'success'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-red-500 text-white'
                    }`}>
                    {toast.message}
                </div>
            )}
        </div>
    );
};

export default FeedbackIssues;

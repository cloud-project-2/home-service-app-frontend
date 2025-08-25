import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Booking() {
    const [name, setName] = useState("");
    const [service, setService] = useState("");
    const [datetime, setDatetime] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [currentStep, setCurrentStep] = useState(1);
    const navigate = useNavigate();

    // Predefined service options with icons and descriptions
    const serviceOptions = [
        { id: "plumber", name: "Plumber", icon: "🔧", description: "Pipe repairs, installations, maintenance", color: "blue" },
        { id: "electrician", name: "Electrician", icon: "⚡", description: "Electrical repairs, installations, wiring", color: "yellow" },
        { id: "cleaner", name: "House Cleaner", icon: "🧹", description: "Regular cleaning, deep cleaning, maintenance", color: "green" },
        { id: "gardener", name: "Gardener", icon: "🌿", description: "Lawn care, landscaping, plant maintenance", color: "emerald" },
        { id: "painter", name: "Painter", icon: "🎨", description: "Interior/exterior painting, touch-ups", color: "purple" },
        { id: "carpenter", name: "Carpenter", icon: "🔨", description: "Furniture repair, installations, woodwork", color: "orange" },
        { id: "other", name: "Other Service", icon: "🔧", description: "Custom service not listed above", color: "gray" }
    ];

    const timeSlots = [
        "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
    ];
    
    const [customTime, setCustomTime] = useState("");
    const [useCustomTime, setUseCustomTime] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
        if (token && currentUser.name) {
            setName(currentUser.name);
        }
    }, [navigate]);

    const handleServiceSelect = (serviceId) => {
        setService(serviceId);
        setCurrentStep(2);
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
        setUseCustomTime(false);
        setCustomTime("");
        setCurrentStep(4);
    };

    const handleCustomTimeChange = (time) => {
        setCustomTime(time);
        setSelectedTime(time);
        setUseCustomTime(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage("");
        
        // Combine date and time
        const combinedDateTime = selectedDate && selectedTime ? `${selectedDate}T${selectedTime}` : datetime;
        
                try {
            const token = localStorage.getItem("token");
            
            if (!token) {
                setMessage("Please login to book a service");
                setIsSubmitting(false);
                return;
            }
            
            const response = await fetch('http://localhost:3001/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ service, datetime: combinedDateTime }),
            });
            
            const data = await response.json();
            
            if (response.ok) {
                // Success message
                setMessage("✅ Booking created successfully! Redirecting to booking requests...");
                
                // Clear form
                setName("");
                setService("");
                setDatetime("");
                setSelectedDate("");
                setSelectedTime("");
                setCustomTime("");
                setUseCustomTime(false);
                setCurrentStep(1);
                
                // Set flag to show success message on booking requests page
                sessionStorage.setItem('justBooked', 'true');
                
                // Redirect to booking requests page after successful booking
                setTimeout(() => {
                    navigate("/requests");
                }, 1500);
            } else {
                setMessage(data.msg || "❌ Booking failed. Please try again.");
            }
        } catch (error) {
            setMessage("❌ Network error. Please try again later.");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl shadow-2xl mb-6">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-900 via-blue-700 to-blue-400 bg-clip-text text-transparent mb-4">
                            Book Your Service
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Choose from our professional services and schedule your appointment with ease
                        </p>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex justify-center mb-12">
                        <div className="flex items-center space-x-4">
                            {[1, 2, 3, 4].map((step) => (
                                <div key={step} className="flex items-center">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                                        currentStep >= step 
                                            ? 'bg-blue-600 text-white shadow-lg' 
                                            : 'bg-slate-200 text-slate-400'
                                    }`}>
                                        {step}
                                    </div>
                                    {step < 4 && (
                                        <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
                                            currentStep > step ? 'bg-blue-600' : 'bg-slate-200'
                                        }`}></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main Booking Card */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/50 overflow-hidden">
                        {/* Step 1: Service Selection */}
                        {currentStep === 1 && (
                            <div className="p-8">
                                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">1</span>
                                    Choose Your Service
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {serviceOptions.map((option) => (
                                        <div
                                            key={option.id}
                                            onClick={() => handleServiceSelect(option.id)}
                                            className="group cursor-pointer bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white/80"
                                        >
                                            <div className="text-4xl mb-4">{option.icon}</div>
                                            <h3 className="font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                                                {option.name}
                                            </h3>
                                            <p className="text-slate-600 text-sm leading-relaxed">
                                                {option.description}
                                            </p>
                                            <div className="mt-4 flex items-center text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                                Select Service
                                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 2: Date Selection */}
                        {currentStep === 2 && (
                            <div className="p-8">
                                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">2</span>
                                    Select Date
                                </h2>
                                <div className="max-w-md mx-auto">
                                    <input
                                        type="date"
                                        value={selectedDate}
                                        onChange={(e) => handleDateSelect(e.target.value)}
                                        className="w-full px-6 py-4 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-lg"
                                    />
                                    
                                    {selectedDate && (
                                        <div className="mt-6 text-center">
                                            <div className="mb-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                                                <p className="text-sm text-slate-600 mb-2">Selected Date:</p>
                                                <p className="font-semibold text-blue-700">
                                                    {new Date(selectedDate).toLocaleDateString('en-US', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => setCurrentStep(3)}
                                                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                                            >
                                                Continue to Time Selection
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Step 3: Time Selection */}
                        {currentStep === 3 && (
                            <div className="p-8">
                                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">3</span>
                                    Select Time
                                </h2>
                                
                                {/* Predefined Time Slots */}
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-slate-700 mb-4">Quick Select</h3>
                                    <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                                        {timeSlots.map((time) => (
                                            <button
                                                key={time}
                                                onClick={() => handleTimeSelect(time)}
                                                className={`px-6 py-4 border rounded-xl transition-all duration-200 font-semibold ${
                                                    selectedTime === time && !useCustomTime
                                                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                        : 'border-slate-300 text-slate-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700'
                                                }`}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Custom Time Input */}
                                <div className="max-w-md mx-auto">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="flex-1 h-px bg-slate-200"></div>
                                        <span className="text-slate-500 font-medium">OR</span>
                                        <div className="flex-1 h-px bg-slate-200"></div>
                                    </div>
                                    
                                    <div className="bg-slate-50 rounded-2xl p-6">
                                        <h3 className="text-lg font-semibold text-slate-700 mb-4">Custom Time</h3>
                                        <div className="flex items-center gap-4">
                                            <input
                                                type="time"
                                                value={customTime}
                                                onChange={(e) => handleCustomTimeChange(e.target.value)}
                                                className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-lg"
                                                min="06:00"
                                                max="22:00"
                                            />
                                            <button
                                                onClick={() => {
                                                    if (customTime) {
                                                        setCurrentStep(4);
                                                    }
                                                }}
                                                disabled={!customTime}
                                                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Use Time
                                            </button>
                                        </div>
                                        
                                    </div>
                        </div>
                    </div>
                        )}

                        {/* Step 4: Confirmation */}
                        {currentStep === 4 && (
                            <div className="p-8">
                                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">4</span>
                                    Confirm Booking
                                </h2>
                                <div className="max-w-2xl mx-auto">
                                    <div className="bg-slate-50 rounded-2xl p-6 mb-8">
                                        <h3 className="font-bold text-slate-800 mb-4">Booking Summary</h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-slate-600">Service:</span>
                                                <span className="font-semibold">
                                                    {serviceOptions.find(s => s.id === service)?.name}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-600">Date:</span>
                                                <span className="font-semibold">{selectedDate}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-600">Time:</span>
                                                <span className="font-semibold">{selectedTime}</span>
                            </div>
                            </div>
                        </div>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                Full Name *
                                            </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                                placeholder="Enter your full name"
                                    required
                                                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                            />
                            </div>
                            <button
                                type="submit"
                                            disabled={isSubmitting || !name}
                                            className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed text-lg flex items-center justify-center gap-3"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Creating Booking...
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    Confirm Booking
                                                </>
                                            )}
                            </button>
                        </form>
                                </div>
                            </div>
                        )}

                        {/* Success/Error Messages */}
                        {message && (
                            <div className="px-8 pb-8">
                                <div className={`p-4 rounded-xl border ${
                                    message.includes('✅') 
                                        ? 'bg-green-50 border-green-200 text-green-700' 
                                        : 'bg-red-50 border-red-200 text-red-700'
                                }`}>
                                    <div className="flex items-center gap-2">
                                        {message.includes('✅') ? (
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                        <span className="font-semibold">{message}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
}

import React from 'react';

const WardenDetails = () => {
    return (
        <div className="min-h-screen bg-gray-50 pt-[12vh] px-6 md:px-16">
            {/* Header Section */}
            <div className="bg-[#2B4B7E] text-white py-4 px-6 mb-8">
                <h1 className="text-2xl font-bold text-center">Warden Details</h1>
                <p className="text-center text-sm mt-2">Fee 2024-25</p>
            </div>

            {/* Warden Details Table */}
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full border-collapse">
                    <thead className="bg-[#E8EBF3]">
                        <tr>
                            <th className="py-3 px-4 text-left text-[#2B4B7E] border border-gray-200 font-semibold">
                                DESIGNATION
                            </th>
                            <th className="py-3 px-4 text-left text-[#2B4B7E] border border-gray-200 font-semibold">
                                NAME AND DETAILS
                            </th>
                            <th className="py-3 px-4 text-left text-[#2B4B7E] border border-gray-200 font-semibold">
                                DESIGNATION
                            </th>
                            <th className="py-3 px-4 text-left text-[#2B4B7E] border border-gray-200 font-semibold">
                                NAME AND DETAILS
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-4 px-4 border border-gray-200">
                                <div className="flex flex-col">
                                    <span className="font-medium">Chief Warden,</span>
                                    <span>Boys Hostel</span>
                                </div>
                            </td>
                            <td className="py-4 px-4 border border-gray-200">
                                <div className="flex items-center gap-6">
                                    {/* Updated image container */}
                                    <div className="w-32 h-32 overflow-hidden border-2 border-[#2B4B7E] flex-shrink-0">
                                        <img 
                                            src="/images/warden-boys.jpg" 
                                            alt="Boys Warden" 
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = '/images/default-avatar.png';
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-[#2B4B7E] text-lg">
                                            Dr. Santosh Kumar Sahoo
                                        </p>
                                        <p className="text-gray-600 mt-1">
                                            Email-id: cw@vitbhopal.ac.in
                                        </p>
                                        <p className="text-gray-600">
                                            Phone No: +91 7024240866
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="py-4 px-4 border border-gray-200">
                                <div className="flex flex-col">
                                    <span className="font-medium">Chief Warden,</span>
                                    <span>Girls Hostel</span>
                                </div>
                            </td>
                            <td className="py-4 px-4 border border-gray-200">
                                <div className="flex items-center gap-6">
                                    {/* Updated image container */}
                                    <div className="w-32 h-32 overflow-hidden border-2 border-[#2B4B7E] flex-shrink-0">
                                        <img 
                                            src="/images/warden-girls.jpg" 
                                            alt="Girls Warden" 
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = '/images/default-avatar.png';
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-[#2B4B7E] text-lg">
                                            Dr. S. Periyanayagi
                                        </p>
                                        <p className="text-gray-600 mt-1">
                                            Email-id: cw.lh@vitbhopal.ac.in
                                        </p>
                                        <p className="text-gray-600">
                                            Phone No: +91 7024240867
                                        </p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="text-center mt-8 py-4 bg-[#2B4B7E] text-white rounded-lg">
                <p>For any queries contact admissions@vitbhopal.ac.in</p>
            </div>
        </div>
    );
};

export default WardenDetails;
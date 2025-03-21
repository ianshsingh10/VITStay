import React from 'react';
import { useNavigate } from 'react-router-dom';

const HostelFeeStructure = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 pt-[12vh] px-6 md:px-16 pb-8">
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <button 
                    onClick={() => navigate(-1)}
                    className="mb-6 px-4 py-2 bg-[#2B4B7E] text-white rounded-lg hover:bg-[#1a3a6d] transition-colors"
                >
                    Back
                </button>

                {/* Main Content Container */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    {/* Header */}
                    <div className="bg-[#2B4B7E] text-white py-4 px-6 rounded-t-lg mb-8">
                        <h2 className="text-2xl font-bold text-center">Hostel Fee Structure 2024-25</h2>
                    </div>

                    {/* Girls Hostels Section */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-[#2B4B7E] mb-4">Girls Hostels</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th rowSpan="2" className="border border-gray-300 bg-[#2B4B7E] text-white p-3">Particulars</th>
                                        <th colSpan="2" className="border border-gray-300 bg-[#2B4B7E] text-white p-3">Single</th>
                                        <th colSpan="2" className="border border-gray-300 bg-[#2B4B7E] text-white p-3">2 Seater</th>
                                        <th colSpan="2" className="border border-gray-300 bg-[#2B4B7E] text-white p-3">3 Seater</th>
                                        <th colSpan="2" className="border border-gray-300 bg-[#2B4B7E] text-white p-3">4 Seater</th>
                                    </tr>
                                    <tr>
                                        <th className="border border-gray-300 bg-[#2B4B7E] text-white p-3">AC</th>
                                        <th className="border border-gray-300 bg-[#2B4B7E] text-white p-3">Non AC</th>
                                        <th className="border border-gray-300 bg-[#2B4B7E] text-white p-3">AC</th>
                                        <th className="border border-gray-300 bg-[#2B4B7E] text-white p-3">Non AC</th>
                                        <th className="border border-gray-300 bg-[#2B4B7E] text-white p-3">AC</th>
                                        <th className="border border-gray-300 bg-[#2B4B7E] text-white p-3">Non AC</th>
                                        <th className="border border-gray-300 bg-[#2B4B7E] text-white p-3">AC</th>
                                        <th className="border border-gray-300 bg-[#2B4B7E] text-white p-3">Non AC</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 p-3">Hostel Fees</td>
                                        <td className="border border-gray-300 p-3">2,00,000</td>
                                        <td className="border border-gray-300 p-3">1,50,000</td>
                                        <td className="border border-gray-300 p-3">1,75,000</td>
                                        <td className="border border-gray-300 p-3">1,25,000</td>
                                        <td className="border border-gray-300 p-3">1,50,000</td>
                                        <td className="border border-gray-300 p-3">1,00,000</td>
                                        <td className="border border-gray-300 p-3">1,25,000</td>
                                        <td className="border border-gray-300 p-3">75,000</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 p-3">Mess Charges</td>
                                        <td className="border border-gray-300 p-3">75,750</td>
                                        <td className="border border-gray-300 p-3">75,750</td>
                                        <td className="border border-gray-300 p-3">75,750</td>
                                        <td className="border border-gray-300 p-3">75,750</td>
                                        <td className="border border-gray-300 p-3">75,750</td>
                                        <td className="border border-gray-300 p-3">75,750</td>
                                        <td className="border border-gray-300 p-3">75,750</td>
                                        <td className="border border-gray-300 p-3">75,750</td>
                                    </tr>
                                    <tr className="bg-gray-100 font-semibold">
                                        <td className="border border-gray-300 p-3">Total</td>
                                        <td className="border border-gray-300 p-3">2,75,750</td>
                                        <td className="border border-gray-300 p-3">2,25,750</td>
                                        <td className="border border-gray-300 p-3">2,50,750</td>
                                        <td className="border border-gray-300 p-3">2,00,750</td>
                                        <td className="border border-gray-300 p-3">2,25,750</td>
                                        <td className="border border-gray-300 p-3">1,75,750</td>
                                        <td className="border border-gray-300 p-3">2,00,750</td>
                                        <td className="border border-gray-300 p-3">1,50,750</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Boys Hostels Section */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-[#2B4B7E] mb-4">Boys Hostels</h3>
                        
                        {/* Block 1 */}
                        <div className="mb-8">
                            <h4 className="text-lg font-medium text-[#2B4B7E] mb-4">BLOCK 1 - HOSTEL & MESS FEES (10 MONTHS FEE)</h4>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr>
                                            <th rowSpan="2" className="border border-gray-300 bg-[#2B4B7E] text-white p-3">Particulars</th>
                                            <th colSpan="2" className="border border-gray-300 bg-[#2B4B7E] text-white p-3">Single</th>
                                            <th colSpan="2" className="border border-gray-300 bg-[#2B4B7E] text-white p-3">2 Seater</th>
                                            <th colSpan="2" className="border border-gray-300 bg-[#2B4B7E] text-white p-3">3 Seater</th>
                                            <th colSpan="2" className="border border-gray-300 bg-[#2B4B7E] text-white p-3">4 Seater</th>
                                        </tr>
                                        <tr>
                                            <th className="border border-gray-300 bg-[#2B4B7E] text-white p-3">AC</th>
                                            <th className="border border-gray-300 bg-[#2B4B7E] text-white p-3">Non AC</th>
                                            <th className="border border-gray-300 bg-[#2B4B7E] text-white p-3">AC</th>
                                            <th className="border border-gray-300 bg-[#2B4B7E] text-white p-3">Non AC</th>
                                            <th className="border border-gray-300 bg-[#2B4B7E] text-white p-3">AC</th>
                                            <th className="border border-gray-300 bg-[#2B4B7E] text-white p-3">Non AC</th>
                                            <th className="border border-gray-300 bg-[#2B4B7E] text-white p-3">AC</th>
                                            <th className="border border-gray-300 bg-[#2B4B7E] text-white p-3">Non AC</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border border-gray-300 p-3">Hostel Fees</td>
                                            <td className="border border-gray-300 p-3">2,00,000</td>
                                            <td className="border border-gray-300 p-3">1,65,000</td>
                                            <td className="border border-gray-300 p-3">1,60,000</td>
                                            <td className="border border-gray-300 p-3">1,25,000</td>
                                            <td className="border border-gray-300 p-3">1,40,000</td>
                                            <td className="border border-gray-300 p-3">1,05,000</td>
                                            <td className="border border-gray-300 p-3">1,20,000</td>
                                            <td className="border border-gray-300 p-3">85,000</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-3">Mess Charges</td>
                                            <td className="border border-gray-300 p-3">75,750</td>
                                            <td className="border border-gray-300 p-3">75,750</td>
                                            <td className="border border-gray-300 p-3">75,750</td>
                                            <td className="border border-gray-300 p-3">75,750</td>
                                            <td className="border border-gray-300 p-3">75,750</td>
                                            <td className="border border-gray-300 p-3">75,750</td>
                                            <td className="border border-gray-300 p-3">75,750</td>
                                            <td className="border border-gray-300 p-3">75,750</td>
                                        </tr>
                                        <tr className="bg-gray-100 font-semibold">
                                            <td className="border border-gray-300 p-3">Total</td>
                                            <td className="border border-gray-300 p-3">2,75,750</td>
                                            <td className="border border-gray-300 p-3">2,40,750</td>
                                            <td className="border border-gray-300 p-3">2,35,750</td>
                                            <td className="border border-gray-300 p-3">2,00,750</td>
                                            <td className="border border-gray-300 p-3">2,15,750</td>
                                            <td className="border border-gray-300 p-3">1,80,750</td>
                                            <td className="border border-gray-300 p-3">1,95,750</td>
                                            <td className="border border-gray-300 p-3">1,60,750</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Block 2-6 */}
                        <div>
                            <h4 className="text-lg font-medium text-[#2B4B7E] mb-4">BLOCK 2, 3, 4, 5 & 6 - HOSTEL & MESS FEES (10 MONTHS FEE)</h4>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr>
                                            <th rowSpan="2" className="border border-gray-300 bg-[#2B4B7E] text-white p-3">Particulars</th>
                                            <th colSpan="2" className="border border-gray-300 bg-[#2B4B7E] text-white p-3">2 Seater</th>
                                            <th colSpan="2" className="border border-gray-300 bg-[#2B4B7E] text-white p-3">3 Seater</th>
                                            <th colSpan="2" className="border border-gray-300 bg-[#2B4B7E] text-white p-3">4 Seater</th>
                                        </tr>
                                        <tr>
                                            <th className="border border-gray-300 bg-[#2B4B7E] text-white p-3">AC</th>
                                            <th className="border border-gray-300 bg-[#2B4B7E] text-white p-3">Non AC</th>
                                            <th className="border border-gray-300 bg-[#2B4B7E] text-white p-3">AC</th>
                                            <th className="border border-gray-300 bg-[#2B4B7E] text-white p-3">Non AC</th>
                                            <th className="border border-gray-300 bg-[#2B4B7E] text-white p-3">AC</th>
                                            <th className="border border-gray-300 bg-[#2B4B7E] text-white p-3">Non AC</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border border-gray-300 p-3">Hostel Fees</td>
                                            <td className="border border-gray-300 p-3">1,55,000</td>
                                            <td className="border border-gray-300 p-3">1,20,000</td>
                                            <td className="border border-gray-300 p-3">1,35,000</td>
                                            <td className="border border-gray-300 p-3">1,00,000</td>
                                            <td className="border border-gray-300 p-3">1,15,000</td>
                                            <td className="border border-gray-300 p-3">80,000</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 p-3">Mess Charges</td>
                                            <td className="border border-gray-300 p-3">75,750</td>
                                            <td className="border border-gray-300 p-3">75,750</td>
                                            <td className="border border-gray-300 p-3">75,750</td>
                                            <td className="border border-gray-300 p-3">75,750</td>
                                            <td className="border border-gray-300 p-3">75,750</td>
                                            <td className="border border-gray-300 p-3">75,750</td>
                                        </tr>
                                        <tr className="bg-gray-100 font-semibold">
                                            <td className="border border-gray-300 p-3">Total</td>
                                            <td className="border border-gray-300 p-3">2,30,750</td>
                                            <td className="border border-gray-300 p-3">1,95,750</td>
                                            <td className="border border-gray-300 p-3">2,10,750</td>
                                            <td className="border border-gray-300 p-3">1,75,750</td>
                                            <td className="border border-gray-300 p-3">1,90,750</td>
                                            <td className="border border-gray-300 p-3">1,55,750</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HostelFeeStructure;
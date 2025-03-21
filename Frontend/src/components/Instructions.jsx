import React from 'react';
import { useNavigate } from 'react-router-dom';

const Instructions = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white">
            {/* Main Content */}
            <div className="pt-[12vh] px-4 md:px-8 max-w-5xl mx-auto">
                {/* Instructions Box */}
                <div className="bg-[#E8EBF3] rounded shadow-sm p-8">
                    {/* Title - Added font-bold for bold text */}
                    <h1 className="text-center text-2xl mb-6 font-bold">
                        Hostel Counselling Instructions
                    </h1>

                    {/* Introduction Text */}
                    <p className="mb-6">
                        Please go through the instructions carefully before proceeding to fill your preferences for the hostel counselling
                    </p>

                    {/* Instructions List */}
                    <div className="space-y-2">
                        <p>1. It is advised to use Google Chrome/Firefox on a laptop/desktop to fill the hostel counselling preferences.</p>
                        <p>2. The number of choices shown in the form are based on the availability of the hostel rooms.</p>
                        <p>3. All the choices are mandatory and you need to fill all the preferences.</p>
                        <p>4. No two preferences can be same, select the room preferences in order of your priority.</p>
                        <p>5. The room allotment will be done on the basis of the preferences provided by you and your Rank/Score in the qualifying exam.</p>
                        <p>6. Once submitted the preferences can not be changed on a later stage, so please be very careful while selecting the preferences.</p>
                        <p>7. For the mock allotment process the allotment results will not be shown, the process is there for you to get familiar with the system.</p>
                        <p>8. You must fill your preferences during the allotted window, the preference filling option will not be available after the choice filling window</p>
                        <p>9. You can only select the room type while filling the preferences, hostel block will be allotted as per the availability and hostel regulations.</p>
                        <p>10. In case you face any technical difficulties while filling the form, you need to contact on sdc@vitbhopal.ac.in</p>
                        <p>11. For any other non-technical queries please contact the admissions office.</p>
                    </div>
                </div>

                {/* Proceed Button Section */}
                <div className="bg-[#2B4B7E] text-white text-center py-3 mt-4">
                    <button 
                        onClick={() => navigate('/hostels')}
                        className="text-white hover:underline"
                    >
                        Please proceed for choice filling
                    </button>
                </div>
            </div>

            {/* Footer */}
            <div className="fixed bottom-0 w-full bg-[#2B4B7E] text-white text-center py-3">
                <p>For any queries contact admissions@vitbhopal.ac.in</p>
            </div>
        </div>
    );
};

export default Instructions;
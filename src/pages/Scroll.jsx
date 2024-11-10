import { useState } from 'react'
import Section from '../components/Section.jsx';


function ColorChangeScroll() {
    const [activeSection, setActiveSection] = useState(0);
    const sections = [
        { color: 'bg-sky-200', content: 'Section 1' },
        { color: 'bg-purple-400', content: 'Section 2' },
        { color: 'bg-pink-200', content: 'Section 3' },
        { color: 'bg-emerald-200', content: 'Section 4' }
    ];

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            {/* Centered container with max width */}
            <div className="w-full max-w-2xl h-[80vh] relative overflow-hidden rounded-xl shadow-lg">
                {/* Color changing container */}
                <div className={`w-full h-full border-b-2 ${sections[activeSection].color} transition-colors duration-700`}>
                    {/* Scrollable content */}
                    <div className="h-full overflow-y-auto snap-y snap-mandatory">
                        {sections.map((section, index) => (
                            <Section
                                key={index}
                                index={index}
                                {...section}
                                setActiveSection={setActiveSection}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ColorChangeScroll
import { useEffect } from 'react';

function Section({ index, content, setActiveSection }) {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection(index);
                    }
                });
            },
            { threshold: 0.5 }
        );

        const element = document.getElementById(`section-${index}`);
        if (element) observer.observe(element);

        return () => observer.disconnect();
    }, [index, setActiveSection]);

    return (
        <div
            id={`section-${index}`}
            className="h-full snap-start flex items-center justify-center gap-4"
        >
            <div className="p-8 rounded-xl bg-white/20 backdrop-blur-sm">
                <h2 className="text-4xl font-bold text-gray-800">{content}</h2>
            </div>
        </div>
    );
}
export default Section
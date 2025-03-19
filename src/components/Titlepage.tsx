import React, { useEffect, useRef, useState } from 'react';
import '../static/css/titlepage.scss';
import 'animate.css';
import { FaAnchor } from 'react-icons/fa';

interface TitlepageProps {
    name: string;
}

const Titlepage: React.FC<TitlepageProps> = ({ name }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    return (
        <div ref={sectionRef} className="titlepage-container">
            <p className={`titlepage ${isVisible ? 'animate__animated animate__fadeInUp' : 'opacity-0'}`}>
                <FaAnchor className="my-anchor-icon" /> {name}
            </p>
            <hr className={`${isVisible ? 'animate__animated animate__fadeInRight' : 'opacity-0'}`} />
        </div>
    );
};

export default Titlepage;

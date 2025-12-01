// import { useEffect, useState } from 'react';

// const CustomCursor = () => {
//     const [position, setPosition] = useState({ x: 0, y: 0 });
//     const [isPointer, setIsPointer] = useState(false);
//     const [isHidden, setIsHidden] = useState(false);
//     const [isClicking, setIsClicking] = useState(false);

//     useEffect(() => {
//         const updateCursor = (e) => {
//             setPosition({ x: e.clientX, y: e.clientY });

//             // Check if hovering over clickable element
//             const target = e.target;
//             setIsPointer(
//                 window.getComputedStyle(target).cursor === 'pointer' ||
//                 target.tagName === 'BUTTON' ||
//                 target.tagName === 'A' ||
//                 target.tagName === 'INPUT' ||
//                 target.tagName === 'SELECT'
//             );
//         };

//         const handleMouseDown = () => setIsClicking(true);
//         const handleMouseUp = () => setIsClicking(false);

//         // Hide on mobile
//         if (window.matchMedia("(max-width: 768px)").matches) {
//             setIsHidden(true);
//         }

//         window.addEventListener('mousemove', updateCursor);
//         window.addEventListener('mousedown', handleMouseDown);
//         window.addEventListener('mouseup', handleMouseUp);

//         return () => {
//             window.removeEventListener('mousemove', updateCursor);
//             window.removeEventListener('mousedown', handleMouseDown);
//             window.removeEventListener('mouseup', handleMouseUp);
//         };
//     }, []);

//     if (isHidden) return null;

//     return (
//         <div
//             className="fixed pointer-events-none z-[9999] transition-transform duration-100 ease-out flex items-center justify-center"
//             style={{
//                 left: `${position.x}px`,
//                 top: `${position.y}px`,
//                 transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : isPointer ? 1.5 : 1})`,
//             }}
//         >
//             {/* React Logo SVG */}
//             <svg
//                 viewBox="-10.5 -9.45 21 18.9"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 className={`w-6 h-6 text-[#61DAFB] drop-shadow-react-glow ${isPointer ? 'animate-spin-slow' : ''}`}
//             >
//                 <circle cx="0" cy="0" r="2" fill="currentColor"></circle>
//                 <g stroke="currentColor" strokeWidth="1" fill="none">
//                     <ellipse rx="10" ry="4.5"></ellipse>
//                     <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
//                     <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
//               </g>
//             </svg>

//             {/* Outer Glow Ring */}
//             <div className={`absolute rounded-full border border-[#61DAFB]/30 transition-all duration-300 ${isPointer ? 'w-12 h-12 opacity-100' : 'w-8 h-8 opacity-50'}`}></div>
//         </div>
//     );
// };

// export default CustomCursor;

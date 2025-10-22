import { useState, useRef } from "react";

interface RuletaProps {
  isSpinning: boolean;
  rotation: number;
}

const colores = [
  { color: "hsl(48, 100%, 50%)", nombre: "Amarillo" },
  { color: "hsl(142, 71%, 45%)", nombre: "Verde" },
  { color: "hsl(210, 100%, 50%)", nombre: "Azul" },
  { color: "hsl(330, 100%, 71%)", nombre: "Rosa" },
  { color: "hsl(270, 100%, 60%)", nombre: "Morado" },
  { color: "hsl(0, 100%, 50%)", nombre: "Rojo" },
  { color: "hsl(25, 100%, 50%)", nombre: "Naranja" },
];

export const Ruleta = ({ isSpinning, rotation }: RuletaProps) => {
  const segmentAngle = 360 / colores.length;

  return (
    <div className="relative flex items-center justify-center">
      {/* Puntero triangular */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20">
        <div 
          className="w-0 h-0 border-l-[20px] border-r-[20px] border-t-[40px] border-l-transparent border-r-transparent"
          style={{ borderTopColor: "hsl(25, 100%, 50%)" }}
        />
      </div>

      {/* Contenedor de la ruleta con sombra */}
      <div 
        className="relative transition-transform duration-[4000ms] ease-[cubic-bezier(0.17,0.67,0.12,0.99)]"
        style={{ 
          transform: `rotate(${rotation}deg)`,
          filter: "drop-shadow(0 20px 60px rgba(251, 146, 60, 0.4))"
        }}
      >
        {/* Borde exterior con remaches */}
        <div className="relative">
          <svg width="400" height="400" viewBox="0 0 400 400" className="relative">
            {/* Borde naranja grueso */}
            <circle
              cx="200"
              cy="200"
              r="195"
              fill="none"
              stroke="hsl(25, 100%, 50%)"
              strokeWidth="10"
            />
            
            {/* Segmentos de colores */}
            {colores.map((colorData, index) => {
              const startAngle = (index * segmentAngle - 90) * (Math.PI / 180);
              const endAngle = ((index + 1) * segmentAngle - 90) * (Math.PI / 180);
              
              const x1 = 200 + 185 * Math.cos(startAngle);
              const y1 = 200 + 185 * Math.sin(startAngle);
              const x2 = 200 + 185 * Math.cos(endAngle);
              const y2 = 200 + 185 * Math.sin(endAngle);

              const largeArcFlag = segmentAngle > 180 ? 1 : 0;

              return (
                <g key={index}>
                  <path
                    d={`M 200 200 L ${x1} ${y1} A 185 185 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                    fill={colorData.color}
                    stroke="white"
                    strokeWidth="3"
                  />
                </g>
              );
            })}

            {/* Remaches decorativos alrededor del borde */}
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (i * 15) * (Math.PI / 180);
              const x = 200 + 195 * Math.cos(angle);
              const y = 200 + 195 * Math.sin(angle);
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="hsl(40, 90%, 70%)"
                  stroke="hsl(30, 80%, 40%)"
                  strokeWidth="1"
                />
              );
            })}

            {/* Centro naranja */}
            <circle
              cx="200"
              cy="200"
              r="30"
              fill="hsl(25, 100%, 50%)"
              stroke="white"
              strokeWidth="3"
            />
            
            {/* Efecto 3D en el centro */}
            <circle
              cx="200"
              cy="200"
              r="25"
              fill="url(#centerGradient)"
            />

            <defs>
              <radialGradient id="centerGradient">
                <stop offset="0%" stopColor="hsl(25, 100%, 60%)" />
                <stop offset="100%" stopColor="hsl(25, 100%, 45%)" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

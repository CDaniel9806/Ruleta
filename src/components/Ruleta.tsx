import { useState, useRef } from "react";

interface RuletaProps {
  isSpinning: boolean;
  rotation: number;
}

const colores = [
  { color: "hsl(48, 100%, 50%)", nombre: "Cena romántica" },
  { color: "hsl(142, 71%, 45%)", nombre: "Noche de películas" },
  { color: "hsl(210, 100%, 50%)", nombre: "Paseo al atardecer" },
  { color: "hsl(330, 100%, 71%)", nombre: "Baile juntos" },
  { color: "hsl(270, 100%, 60%)", nombre: "Masajes relajantes" },
  { color: "hsl(0, 100%, 50%)", nombre: "Juegos de mesa" },
  { color: "hsl(25, 100%, 50%)", nombre: "Sorpresa romántica" },
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
        className="relative transition-transform"
        style={{ 
          transform: `rotate(${rotation}deg)`,
          filter: "drop-shadow(0 20px 60px rgba(251, 146, 60, 0.4))",
          transition: `transform ${(20000 + (Math.floor(Math.random() * 10) + 15) * 150)}ms cubic-bezier(0.1, 0.7, 0.1, 1.0)`
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

              // Calcular posición y orientación del texto
              const midAngle = (startAngle + endAngle) / 2;
              const textRadius = 130; // Punto intermedio entre el centro y el borde
              const textX = 200 + textRadius * Math.cos(midAngle);
              const textY = 200 + textRadius * Math.sin(midAngle);
              // Ajustar la rotación para que el texto apunte hacia afuera
              let rotation = (midAngle * 180 / Math.PI) + (midAngle > Math.PI ? 270 : 90);
              // Ajustes especiales para mejor legibilidad
              if (colorData.nombre === "Juegos de mesa" || colorData.nombre === "Sorpresa romántica") {
                rotation += 180; // Girar 180 grados para mejor legibilidad
              }
              
              return (
                <g key={index}>
                  <path
                    d={`M 200 200 L ${x1} ${y1} A 185 185 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                    fill={colorData.color}
                    stroke="white"
                    strokeWidth="3"
                  />
                  <g transform={`rotate(${rotation}, ${textX}, ${textY})`}>
                    <text
                      x={textX}
                      y={textY}
                      textAnchor="middle"
                      fill="white"
                      fontSize="12"
                      fontWeight="bold"
                      style={{
                        textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                        pointerEvents: 'none',
                        userSelect: 'none',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                    >
                      {colorData.nombre.split(' ').map((word, i, arr) => (
                        <tspan 
                          key={i} 
                          x={textX} 
                          dy={i === 0 ? '0' : '1.2em'}
                          textAnchor="middle"
                          style={{
                            display: 'block'
                          }}
                        >
                          {word}
                        </tspan>
                      ))}
                    </text>
                  </g>
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

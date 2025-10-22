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
  { color: "hsl(25, 100%, 50%)", nombre: "Ir aguas termales" },
];

export const Ruleta = ({ isSpinning, rotation }: RuletaProps) => {
  const segmentAngle = 360 / colores.length;

  return (
    <div className="relative flex items-center justify-center bg-transparent">
      <div className="relative bg-transparent">
        {/* Puntero personalizado con animación */}
        <div className={`absolute -top-6 left-1/2 -translate-x-1/2 z-20 ${isSpinning ? 'ruleta-girando' : ''}`}>
          <div className="ruleta-puntero"></div>
        </div>

        {/* Contenedor de la ruleta con sombra */}
        <div 
          className="relative transition-transform"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: `transform ${(20000 + (Math.floor(Math.random() * 10) + 15) * 150)}ms cubic-bezier(0.1, 0.7, 0.1, 1.0)`
          }}
        >
          {/* Borde exterior con remaches */}
          <div className="relative">
            <svg width="400" height="400" viewBox="0 0 400 400" className="relative" style={{backgroundColor: 'transparent'}}>
              {/* Borde naranja grueso */}
              <circle
                cx="200"
                cy="200"
                r="195"
                fill="none"
                stroke="hsl(25, 100%, 50%)"
                strokeWidth="10"
              />

              {/* Puntos decorativos en el borde */}
              {Array.from({ length: 36 }).map((_, i) => {
                const angle = (i * 10) * (Math.PI / 180);
                const x1 = 200 + 190 * Math.cos(angle);
                const y1 = 200 + 190 * Math.sin(angle);
                
                return (
                  <circle
                    key={`dot-${i}`}
                    cx={x1}
                    cy={y1}
                    r="4"
                    fill="white"
                    stroke="hsl(25, 100%, 40%)"
                    strokeWidth="1"
                  />
                );
              })}
              
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
                if (colorData.nombre === "Juegos de mesa" || colorData.nombre === "Ir aguas termales") {
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
                            dy={i > 0 ? '1.2em' : 0}
                            style={{
                              fill: 'white',
                              fontSize: i === 0 ? '12px' : '10px',
                              fontWeight: i === 0 ? 'bold' : 'normal',
                              textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                              letterSpacing: '0.5px'
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

              {/* Círculo central */}
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
    </div>
  );
};

import { useState, useRef } from "react";
import { COLORES } from "@/constants/colors";

interface RuletaProps {
  isSpinning: boolean;
  rotation: number;
  segmentAngle: number;
  selectedOption?: string | null;
}

export const Ruleta = ({ isSpinning, rotation, segmentAngle, selectedOption }: RuletaProps) => {
  // Use the shared COLORES constant

  return (
    <div className="relative flex items-center justify-center bg-transparent">
      <div className="relative bg-transparent ruleta-container">
        {/* Puntero personalizado con animación */}
        <div className={`absolute -top-6 left-1/2 -translate-x-1/2 z-20 ${isSpinning ? 'ruleta-girando' : ''}`}>
          <div className="ruleta-puntero"></div>
        </div>

        {/* Contenedor de la ruleta con sombra */}
        <div 
          className="relative transition-transform"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning 
              ? `transform ${(20000 + (Math.floor(Math.random() * 10) + 15) * 150)}ms cubic-bezier(0.1, 0.7, 0.1, 1.0)`
              : 'none',
            transformOrigin: 'center',
            willChange: 'transform'
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
              {COLORES.map((colorData, index) => {
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
                        fontSize="14"
                        fontWeight="bold"
                        style={{
                          textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                          pointerEvents: 'none',
                          userSelect: 'none',
                          textTransform: 'uppercase',
                          letterSpacing: '0.8px'
                        }}
                      >
                        {colorData.nombre.split(' ').map((word, i, arr) => (
                          <tspan 
                            key={i} 
                            x={textX} 
                            dy={i > 0 ? '1.2em' : 0}
                            style={{
                              fill: 'white',
                              fontSize: i === 0 ? '14px' : '12px',
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

              {/* Círculo central con opción seleccionada */}
              <circle
                cx="200"
                cy="200"
                r="60"
                fill="url(#centerGradient)"
                className="transition-all duration-300"
              />
              {selectedOption && !isSpinning && (
                <text
                  x="200"
                  y="200"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs font-bold text-white text-center"
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {selectedOption}
                </text>
              )}

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

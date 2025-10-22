import { useState, useEffect } from "react";
import { Ruleta } from "@/components/Ruleta";
import { BotonGirar } from "@/components/BotonGirar";
import { ShareModal } from "@/components/ShareModal";
import { COLORES } from "@/constants/colors";

const Index = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  // Clean up timeout on component unmount
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  // Función para calcular la opción seleccionada basada en la rotación
  const calcularOpcionSeleccionada = (rotacion: number): string => {
    // Ajustar la rotación para que 0 grados esté en la parte superior
    const rotacionAjustada = (360 - (rotacion % 360) + 90) % 360;
    const segmentAngle = 360 / COLORES.length;
    const selectedIndex = Math.floor(rotacionAjustada / segmentAngle) % COLORES.length;
    return COLORES[selectedIndex].nombre;
  };

  const girarRuleta = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedOption(null);
    
    // Generar un valor aleatorio para la selección
    const randomValue = Math.random();
    
    // Número de vueltas (entre 5 y 15)
    const vueltasMinimas = 5;
    const vueltasMaximas = 15;
    const vueltasAleatorias = Math.floor(randomValue * (vueltasMaximas - vueltasMinimas + 1)) + vueltasMinimas;
    
    // Ángulo por segmento
    const segmentAngle = 360 / COLORES.length;
    
    // Selección de segmento aleatorio (índice de la opción que debe ganar)
    const indiceGanador = Math.floor(randomValue * COLORES.length);
    
    // Calcular la rotación necesaria para que el puntero apunte al segmento ganador
    // Ajustamos para que el puntero apunte al centro del segmento
    const rotacionDestino = 360 - (indiceGanador * segmentAngle + segmentAngle / 2);
    
    // Añadir vueltas completas para que la ruleta gire varias veces antes de detenerse
    const rotacionTotal = vueltasAleatorias * 360 + rotacionDestino;
    
    // Duración del giro (entre 3 y 8 segundos)
    const duracionBase = 3000 + (randomValue * 5000);
    const duracionExtra = vueltasAleatorias * 50;
    const duracionGiro = Math.min(duracionBase + duracionExtra, 8000);
    
    // Añadir un pequeño retraso para asegurar que la animación se inicie
    setTimeout(() => {
      // Iniciar la animación
      setRotation(prev => prev + rotacionTotal);
      
      // Configurar un listener para cuando termine la transición
      const ruletaElement = document.querySelector('.ruleta-container');
      
      const handleTransitionEnd = () => {
        // Usar el índice del ganador que ya calculamos
        const opcionGanadora = COLORES[indiceGanador].nombre;
        
        setSelectedOption(opcionGanadora);
        setIsSpinning(false);
        
        // Mostrar el modal después de un pequeño retraso
        setTimeout(() => {
          setShowShareModal(true);
        }, 300);
        
        // Limpiar el event listener
        ruletaElement?.removeEventListener('transitionend', handleTransitionEnd);
      };
      
      // Añadir el event listener para cuando termine la transición
      ruletaElement?.addEventListener('transitionend', handleTransitionEnd, { once: true });
      
      // Limpiar el event listener si el componente se desmonta
      return () => {
        ruletaElement?.removeEventListener('transitionend', handleTransitionEnd);
      };
      
    }, 50); // Pequeño retraso para asegurar que la animación se inicie correctamente
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-4 gap-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 via-red-400 to-orange-400 bg-clip-text text-transparent mb-3">
          Nuestra Ruleta del Amor
        </h1>
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
          <div className="relative px-4 py-2 bg-gradient-to-r from-pink-900/30 to-orange-900/30 backdrop-blur-sm rounded-lg border border-pink-500/30">
            <p className="text-xs md:text-sm font-medium text-pink-100 text-center leading-tight">
              <span className="text-pink-200">✨</span> Cada giro es una nueva aventura juntos mi amor <span className="text-pink-200">✨</span>
            </p>
            <p className="text-pink-100/80 text-center text-xs md:text-sm">
              Gira la ruleta y descubre qué nos depara el destino hoy
            </p>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-transparent via-pink-400/50 to-transparent"></div>
          </div>
        </div>
      </div>

      <Ruleta 
        isSpinning={isSpinning} 
        rotation={rotation} 
        segmentAngle={360 / COLORES.length}
        selectedOption={!isSpinning ? selectedOption : null}
      />

      <BotonGirar onClick={girarRuleta} disabled={isSpinning} />
      
      {showShareModal && selectedOption && (
        <ShareModal 
          selectedOption={selectedOption}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
};

export default Index;

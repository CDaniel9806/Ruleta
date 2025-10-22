import { useState } from "react";
import { Ruleta } from "@/components/Ruleta";
import { BotonGirar } from "@/components/BotonGirar";
const colores = [
  { color: "hsl(48, 100%, 50%)", nombre: "Amarillo" },
  { color: "hsl(142, 71%, 45%)", nombre: "Verde" },
  { color: "hsl(210, 100%, 50%)", nombre: "Azul" },
  { color: "hsl(330, 100%, 71%)", nombre: "Rosa" },
  { color: "hsl(270, 100%, 60%)", nombre: "Morado" },
  { color: "hsl(0, 100%, 50%)", nombre: "Rojo" },
  { color: "hsl(25, 100%, 50%)", nombre: "Naranja" },
];

const Index = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const girarRuleta = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    
    // Generar un número aleatorio criptográficamente seguro si está disponible
    const randomBuffer = new Uint32Array(1);
    let randomValue: number;
    if (window.crypto && window.crypto.getRandomValues) {
      window.crypto.getRandomValues(randomBuffer);
      randomValue = randomBuffer[0] / (0xffffffff + 1);
    } else {
      randomValue = Math.random();
    }
    
    // Número de vueltas más aleatorio (entre 12 y 30)
    const vueltasMinimas = 12;
    const vueltasMaximas = 30;
    const vueltasAleatorias = Math.floor(randomValue * (vueltasMaximas - vueltasMinimas + 1)) + vueltasMinimas;
    
    const segmentAngle = 360 / colores.length;
    
    // Selección de segmento con distribución más aleatoria
    const tiempo = new Date().getTime();
    const seed = (randomValue * tiempo) % 1;
    const segmentoBase = Math.floor(seed * colores.length);
    
    // Aplicar un pequeño desplazamiento aleatorio adicional
    const desplazamiento = (Math.sin(tiempo * 0.001) * 0.5 + 0.5) * segmentAngle * 0.8;
    
    // Calcular rotación total con múltiples factores de aleatoriedad
    const rotacionBase = vueltasAleatorias * 360;
    const rotacionSegmento = segmentoBase * segmentAngle;
    
    // Usar múltiples funciones trigonométricas con diferentes frecuencias para mayor aleatoriedad
    const ruido1 = Math.sin(tiempo * 0.002) * 0.5 + 0.5; // Valor entre 0 y 1
    const ruido2 = Math.cos(tiempo * 0.003) * 0.5 + 0.5; // Valor entre 0 y 1
    const rotacionExtra = (randomValue * segmentAngle * 0.9) + (ruido1 * segmentAngle * 0.4);
    
    // Añadir ruido aleatorio adicional basado en el tiempo y la posición del ratón
    const ruido = (ruido2 * segmentAngle * 0.3);
    
    const totalRotation = rotacionBase + rotacionSegmento + rotacionExtra + ruido + desplazamiento;
    
    // Iniciar la animación con la nueva rotación
    setRotation(prev => prev + totalRotation);
    
    // Hacer la duración más variable (entre 18 y 28 segundos)
    const duracionBase = 18000 + (randomValue * 10000);
    const duracionExtra = vueltasAleatorias * 120; // 120ms extra por vuelta
    const duracionGiro = Math.min(duracionBase + duracionExtra, 30000); // Máximo 30 segundos
    
    // Deshabilitar el botón temporalmente
    setTimeout(() => {
      setIsSpinning(false);
    }, duracionGiro);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 gap-12">
      <div className="text-center space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground">
          Ruleta de la Suerte
        </h1>
        <p className="text-xl text-muted-foreground">
          ¡Gira y descubre tu color ganador!
        </p>
      </div>

      <Ruleta isSpinning={isSpinning} rotation={rotation} />

      <BotonGirar onClick={girarRuleta} disabled={isSpinning} />
    </div>
  );
};

export default Index;

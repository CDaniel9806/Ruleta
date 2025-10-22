import { useState } from "react";
import { Ruleta } from "@/components/Ruleta";
import { BotonGirar } from "@/components/BotonGirar";
import { toast } from "sonner";

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
    
    // Calcular rotación aleatoria (múltiples vueltas + posición final)
    const vueltas = 5; // 5 vueltas completas
    const segmentAngle = 360 / colores.length;
    const randomSegment = Math.floor(Math.random() * colores.length);
    const extraRotation = Math.random() * segmentAngle;
    const totalRotation = rotation + (vueltas * 360) + (randomSegment * segmentAngle) + extraRotation;

    setRotation(totalRotation);

    // Calcular el color ganador
    // El puntero está arriba, así que calculamos qué segmento queda arriba
    const finalAngle = totalRotation % 360;
    const normalizedAngle = (360 - finalAngle) % 360;
    const winningIndex = Math.floor(normalizedAngle / segmentAngle) % colores.length;
    const colorGanador = colores[winningIndex];

    // Mostrar resultado después de la animación
    setTimeout(() => {
      setIsSpinning(false);
      toast.success(`¡Has ganado ${colorGanador.nombre}! 🎉`, {
        description: "¡Qué suerte tienes, amor!",
        duration: 4000,
      });
    }, 4000);
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

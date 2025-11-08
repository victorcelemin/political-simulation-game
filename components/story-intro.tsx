"use client";

import Image from "next/image";
import { useState } from "react";

interface StoryImage {
  file: string;
  alt: string;
  description: string;
}

const storyImages: StoryImage[] = [
  {
    file: "/assets/game/country_view.jpg",
    alt: "Vista panorámica del país",
    description: "Una nación en la encrucijada de su historia. Un territorio vasto y diverso, desde modernas metrópolis hasta campos fértiles, unidos bajo una misma bandera."
  },
  {
    file: "/assets/game/city_sunrise.jpg",
    alt: "Amanecer sobre la capital",
    description: "La capital despierta con la promesa de un nuevo amanecer. Las calles cobran vida mientras los ciudadanos sueñan con un futuro mejor."
  },
  {
    file: "/assets/game/palace_morning.jpg",
    alt: "Vista del palacio presidencial al amanecer",
    description: "El Palacio Presidencial, símbolo del poder ejecutivo. Sus pasillos han sido testigos de decisiones que han cambiado el rumbo de la nación."
  },
  {
    file: "/assets/game/palace_hall.jpg",
    alt: "Pasillo del palacio presidencial",
    description: "Cada paso por estos pasillos resuena con el peso de la responsabilidad. Asesores y funcionarios trabajan incansablemente entre estas paredes históricas."
  },
  {
    file: "/assets/game/parliament_day.jpg",
    alt: "Sesión del congreso nacional",
    description: "El Congreso Nacional, donde las leyes toman forma. Aquí, las diferentes voces del país se encuentran para debatir el futuro de la nación."
  },
  {
    file: "/assets/game/office_evening.jpg",
    alt: "Oficina presidencial al atardecer",
    description: "Tu oficina, donde cada firma y cada decisión puede cambiar la vida de millones. El peso del poder se siente más fuerte cuando el sol se pone."
  },
  {
    file: "/assets/game/protests.jpg",
    alt: "Manifestaciones en la plaza",
    description: "El pueblo alzará su voz cuando sienta que no es escuchado. Tus decisiones pueden inspirar apoyo o desatar la ira de las masas."
  },
  {
    file: "/assets/game/parliament_night.jpg",
    alt: "Sesión nocturna del parlamento",
    description: "Las crisis no respetan horarios. En momentos críticos, las luces del Congreso permanecen encendidas hasta el amanecer."
  },
  {
    file: "/assets/game/celebration.jpg",
    alt: "Celebración popular",
    description: "Los momentos de triunfo, cuando tus decisiones llevan a la prosperidad, serán celebrados por todo el país."
  },
  {
    file: "/assets/game/palace_dark.jpg",
    alt: "Palacio en la oscuridad",
    description: "Pero cuidado: el poder puede corromper. Un líder autoritario puede sumir al país en la oscuridad."
  },
  {
    file: "/assets/game/ruins.jpg",
    alt: "Ciudad en ruinas",
    description: "Las malas decisiones tienen consecuencias devastadoras. Una nación puede caer en el caos si no es dirigida con sabiduría."
  },
  {
    file: "/assets/game/palace_dawn.jpg",
    alt: "Palacio al amanecer, años después",
    description: "Tu legado perdurará en la historia. ¿Serás recordado como el líder que llevó a la nación hacia la prosperidad o hacia la ruina?"
  }
];

interface StoryIntroProps {
  onComplete: () => void;
}

export function StoryIntro({ onComplete }: StoryIntroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [showText, setShowText] = useState<boolean>(true);

  const nextImage = () => {
    if (isTransitioning) return;

    if (currentImageIndex === storyImages.length - 1) {
      onComplete();
      return;
    }

    setShowText(false);
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1));
      setTimeout(() => {
        setShowText(true);
        setIsTransitioning(false);
      }, 500);
    }, 500);
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none" />
        
        <Image
          src={storyImages[currentImageIndex].file}
          alt={storyImages[currentImageIndex].alt}
          fill
          className={`object-cover transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 px-4">
          <div 
            className={`max-w-2xl text-center mb-8 transition-all duration-500 transform ${
              showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <p 
              className="text-retro-light mb-8 leading-relaxed"
              style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.75rem", lineHeight: "1.8" }}
            >
              {storyImages[currentImageIndex].description}
            </p>
            
            <button 
              onClick={nextImage}
              disabled={isTransitioning}
              className={`retro-btn px-8 transition-all duration-300 ${
                isTransitioning ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              }`}
              style={{ fontFamily: "Press Start 2P, monospace", fontSize: "0.65rem" }}
            >
              {currentImageIndex < storyImages.length - 1 ? "CONTINUAR" : "COMENZAR"}
            </button>
          </div>
        </div>

        {/* Indicador de progreso */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {storyImages.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? 'bg-retro-yellow w-4' : 'bg-retro-gray/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
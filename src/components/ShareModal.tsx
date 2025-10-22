import { useEffect } from 'react';

interface ShareModalProps {
  selectedOption: string;
  onClose: () => void;
}

export const ShareModal = ({ selectedOption, onClose }: ShareModalProps) => {
  const shareMessage = `¡La ruleta ha elegido: ${selectedOption}! 💖`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;

  useEffect(() => {
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-pink-900/90 to-rose-900/90 backdrop-blur-md rounded-2xl p-6 max-w-md w-full mx-4 border border-pink-500/30 shadow-2xl transform transition-all animate-fade-in">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-pink-100 mb-4">¡Selección Lista!</h3>
          
          <div className="bg-pink-900/50 rounded-xl p-6 mb-6 border border-pink-500/30">
            <p className="text-pink-100 text-lg font-medium">La ruleta ha elegido:</p>
            <p className="text-2xl font-bold text-pink-50 mt-2">{selectedOption}</p>
          </div>

          <p className="text-pink-200 mb-6">¡Comparte esta aventura con tu pareja!</p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.273-.099-.471-.148-.67.15-.197.297-.767.963-.94 1.16-.173.199-.347.221-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.795-1.484-1.781-1.66-2.08-.173-.297-.018-.458.13-.605.136-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.508-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.29A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.55 4.142 1.595 5.945L0 24l6.335-1.652a11.882 11.882 0 005.723 1.465h.006c6.554 0 11.89-5.335 11.89-11.893 0-3.18-1.262-6.17-3.553-8.418z" />
              </svg>
              Compartir por WhatsApp
            </a>
            
            <button
              onClick={onClose}
              className="bg-pink-500/20 hover:bg-pink-500/30 text-pink-100 font-medium py-3 px-6 rounded-lg border border-pink-500/30 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

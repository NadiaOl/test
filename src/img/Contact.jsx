export const Contacts = () => {
    return (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Голова (круг) */}
        <circle 
          cx="12" 
          cy="8" 
          r="4" 
          strokeWidth="2.2" 
          strokeLinecap="round" 
        />
        {/* Плечи (дуга) */}
        <path
          d="M5 21C5 17.134 8.134 14 12 14C15.866 14 19 17.134 19 21"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };
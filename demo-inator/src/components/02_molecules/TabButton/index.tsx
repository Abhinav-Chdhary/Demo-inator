// src/components/02_molecules/TabButton/index.tsx
const TabButton = ({ isActive, label, onClick }: any) => (
    <button
        onClick={onClick}
        className={`
      flex-1 py-2 text-sm font-semibold rounded-t-lg transition-colors duration-200
      ${isActive ? "bg-blue-600 shadow-inner" : ""}
    `}
    >
        {label}
    </button>
);

export default TabButton;

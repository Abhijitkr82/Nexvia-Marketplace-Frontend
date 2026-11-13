
import StatCard from './StatCard';

export default function StatsGrid({ cards, loading }) {
  return (
    <div
      aria-label="Marketplace statistics"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
    >
      {cards.map((card) => (
        <StatCard
          key={card.title}
          card={card}
          loading={loading}
        />
      ))}
    </div>
  );
}

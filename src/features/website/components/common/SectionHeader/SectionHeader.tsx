interface SectionHeaderProps {
  title: string;
  highlight: string;
  description: string;
}

export default function SectionHeader({
  title,
  highlight,
  description,
}: SectionHeaderProps) {
  return (
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-text mb-3">
        {title} <span className="text-red-600 animate-pulse">{highlight}</span>
      </h2>
      <p className="text-gray-400 text-sm md:text-base">{description}</p>
    </div>
  );
}

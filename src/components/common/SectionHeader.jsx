// Title block used at the top of each admin management section:
// icon + title + description on the left, a count badge on the right.
export default function SectionHeader({
  icon: Icon,
  iconClassName,
  title,
  description,
  badge,
  badgeClassName,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <div className="flex items-center gap-2">
          <Icon className={iconClassName} size={24} />
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        </div>

        <p className="mt-2 text-sm text-gray-500">{description}</p>
      </div>

      <span
        className={`rounded-full px-3 py-1 text-sm font-semibold ${badgeClassName}`}
      >
        {badge}
      </span>
    </div>
  );
}

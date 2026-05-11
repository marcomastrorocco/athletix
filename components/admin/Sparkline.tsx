type Props = {
  values: number[];
  color?: string;
  height?: number;
};

export default function Sparkline({
  values,
  color = "var(--accent)",
  height = 36,
}: Props) {
  if (!values.length) return null;
  const max = Math.max(1, ...values);
  const min = Math.min(0, ...values);
  const range = Math.max(1, max - min);
  const w = 100;
  const h = 30;
  const step = w / Math.max(1, values.length - 1);
  const points = values
    .map((v, i) => {
      const x = i * step;
      const y = h - ((v - min) / range) * h;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const area = `0,${h} ${points} ${w},${h}`;

  return (
    <svg
      className="sparkline"
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      style={{ height }}
    >
      <polyline
        points={area}
        fill={color}
        opacity={0.12}
        stroke="none"
      />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function StarRating({ score = 0, clickable = false, onChange = () => {} }) {
  const s = Math.round(score);

  return (
    <div className="flex gap-1/2">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          onClick={() => clickable && onChange(i)}
          className={`text-xl ${
            clickable ? "cursor-pointer" : "cursor-default"
          } ${i <= s ? "text-yellow-400" : "text-gray-300"}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

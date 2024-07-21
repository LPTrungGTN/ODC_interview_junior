type Player = 'X' | 'O' | 'BOTH' | null;

function Square({
  onClick,
  value,
  winner,
}: {
  onClick: () => void;
  value: Player;
  winner: Player;
}) {
  let className =
    'h-24 w-24 bg-gray-200 rounded-md flex justify-center items-center text-2xl font-semibold';
  if (value) {
    className += ` bg-${value.toLowerCase()}-500`;
  }
  return (
    <button className={className} onClick={onClick} disabled={Boolean(winner)}>
      {value}
    </button>
  );
}

export default Square;

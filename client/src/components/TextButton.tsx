export function TextButton({
  text,
  selected,
  onClick,
}: {
  text: string;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <div style={{ marginRight: 16, cursor: "pointer" }} onClick={onClick}>
      <span style={{ fontWeight: selected ? "bold" : "normal", fontSize: 20 }}>
        {text}
      </span>
    </div>
  );
}

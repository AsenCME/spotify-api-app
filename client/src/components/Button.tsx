export function Button({
  text,
  onClick,
  renderIcon,
}: {
  text: string;
  onClick: () => void;
  renderIcon?: () => JSX.Element;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        marginBottom: 16,
      }}
    >
      <div style={{ flex: 1 }} />
      <div
        style={{
          display: "flex",
          cursor: "pointer",
          alignItems: "center",
          padding: "8px 16px",
          borderRadius: "100vw",
          backgroundColor: "var(--color-8)",
          color: "var(--color-1)",
        }}
        onClick={onClick}
      >
        <span style={{ fontWeight: "bold", marginBottom: 2, marginRight: 8 }}>
          {text}
        </span>
        {!!renderIcon && renderIcon()}
      </div>
    </div>
  );
}

import React from "react";
import { Me } from "../interfaces/Me";

export default function Header({ me }: { me: Me }) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        marginBottom: 16,
        justifyContent: "flex-end",
        paddingTop: 16,
        paddingBottom: 16,
      }}
    >
      <div
        style={{
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          borderRadius: "100vw",
          justifyContent: "center",
          backgroundColor: "var(--color-2)",
        }}
      >
        <img
          width="32px"
          height="32px"
          src={me.image}
          style={{ borderRadius: 16 }}
        />
        <div style={{ marginLeft: 16, fontSize: 14 }}>
          <div style={{ fontWeight: "bold" }}>{me.name}</div>
          <div>{me.followers} followers</div>
        </div>
      </div>
    </div>
  );
}

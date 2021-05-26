import React from "react";
import { Me } from "../interfaces/Me";
import { Page } from "../interfaces/Page";

export default function Header({
  me,
  page,
  changePage,
}: {
  me: Me;
  page: Page;
  changePage: (p: Page) => void;
}) {
  const _renderLink = (text: string, p: Page) => {
    return (
      <div
        style={{ marginRight: 16, cursor: "pointer" }}
        onClick={() => changePage(p)}
      >
        <span
          style={{ fontWeight: page === p ? "bold" : "normal", fontSize: 20 }}
        >
          {text}
        </span>
      </div>
    );
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        marginBottom: 16,
        paddingTop: 16,
        paddingBottom: 16,
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex" }}>
        {_renderLink("Top tracks", "top_tracks")}
        {_renderLink("Custom playlist", "custom_playlist")}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", flex: 1 }}>
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
    </div>
  );
}

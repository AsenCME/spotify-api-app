import React from "react";
import { CloseSharp } from "react-ionicons";

export const Modal: React.FC<{ onClose: () => void }> = ({
  onClose,
  children,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        width: "calc(100vw - 32px)",
        height: "calc(100vh - 32px)",
        backgroundColor: "rgba(0,0,0,0.8)",
        padding: 16,
        overflowY: "auto",
      }}
    >
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }} />
          <CloseSharp
            color="white"
            width="48px"
            height="48px"
            style={{ cursor: "pointer" }}
            onClick={onClose}
          />
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            paddingBottom: 64,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

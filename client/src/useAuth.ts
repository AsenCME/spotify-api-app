import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth(code: string) {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [expiresIn, setExpiresIn] = useState(60);

  useEffect(() => {
    axios
      .post("http://localhost:3001/login", { code })
      .then((res: any) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        // @ts-ignore
        window.history.pushState({}, null, "/");
      })
      .catch(() => {
        // @ts-ignore
        window.location = "/";
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      fetch("http://localhost:3001/refresh", {
        method: "POST",
        body: JSON.stringify({ refreshToken }),
        headers: { ContentType: "application/json" },
      })
        .then((res: any) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch(() => {});
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return { accessToken, refreshToken };
}

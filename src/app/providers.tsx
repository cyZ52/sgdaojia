"use client";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import { AppProvider } from "../context/AppContext";
import BottomNav from "../components/BottomNav";
import Dialogs from "../components/Dialogs";
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{ token: { colorPrimary: "#406e55", borderRadius: 10 } }}
    >
      <AppProvider>
        <div className="app">
          {children}
          <BottomNav />
          <Dialogs />
        </div>
      </AppProvider>
    </ConfigProvider>
  );
}

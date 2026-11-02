"use client";
import { useRouter } from "next/navigation";
import { people } from "../data/technicians";
import { useApp } from "../context/AppContext";
import { TechnicianList } from "../components/TechnicianList";
export default function My() {
  const { user, setAuth, avatar, setNotice, setSettings, save, upload } =
    useApp();
  const router = useRouter();
  const nav = (path: string) => router.push(path);
  const renderCards = (list: typeof people) => <TechnicianList list={list} />;
  return (
    <>
      <header>
        <h2>我的</h2>
        <p>照顾好自己，从这里开始</p>
      </header>
      <main>
        <section className="profile">
          <label className="avatar">
            {user?.avatar ? <img src={user.avatar} /> : <span>☺</span>}
            {user && (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => upload(e.target.files?.[0])}
              />
            )}
          </label>
          <div>
            <h2>{user?.name || "欢迎来到测试"}</h2>
            <p>
              {user
                ? user.phone.slice(0, 3) + "****" + user.phone.slice(-4)
                : "登录后，开启你的舒适时光"}
            </p>
            {!user && (
              <button className="primary" onClick={() => setAuth(true)}>
                登录 / 注册
              </button>
            )}
            {user && <small>点击头像可更换图片</small>}
          </div>
        </section>
        <div className="menu">
          {["我的预约", "优惠券", "联系客服"].map((s, i) => (
            <button
              key={s}
              onClick={() =>
                setNotice(
                  user
                    ? [
                        "暂无预约，去服务页挑选心仪的技师吧",
                        "新客优惠 ¥30，预约时可使用（演示）",
                        "客服服务时间：09:00—22:00，当前为前端演示",
                      ][i]
                    : "请先登录后查看",
                )
              }
            >
              <span>
                {["▤", "◇", "☏"][i]}　{s}
              </span>
              <span>›</span>
            </button>
          ))}
          <button onClick={() => setSettings(true)}>
            <span>⚙　基本设置</span>
            <span>›</span>
          </button>
        </div>
        {user && (
          <button
            className="logout"
            onClick={() => {
              save(null);
              setNotice("已退出登录");
            }}
          >
            退出登录
          </button>
        )}
        <p className="footnote">
          测试到家 · 让生活慢一点
          <br />
          前端演示版，暂无实际预约及支付服务
        </p>
      </main>
    </>
  );
}

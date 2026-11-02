import { Button, Input, Switch } from "antd";
import { useApp } from "../context/AppContext";
export default function Dialogs() {
  const {
    user,
    auth,
    setAuth,
    register,
    setRegister,
    avatar,
    notice,
    setNotice,
    selected,
    setSelected,
    settings,
    setSettings,
    push,
    setPush,
    save,
    upload,
  } = useApp();
  return (
    <>
      {auth && (
        <div className="overlay">
          <section className="modal">
            <Button className="close" onClick={() => setAuth(false)}>
              ×
            </Button>
            <small className="accent">WELCOME TO MUHE</small>
            <h2>{register ? "创建你的账号" : "欢迎回来"}</h2>
            <p className="muted">开启属于你的放松时光</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                const phone = String(data.get("phone"));
                const password = String(data.get("password"));
                const accounts = JSON.parse(
                  localStorage.getItem("care-accounts") || "{}",
                );
                if (register) {
                  if (accounts[phone]) {
                    setNotice("该手机号已注册，请登录");
                    return;
                  }
                  accounts[phone] = {
                    name: String(data.get("name")),
                    phone,
                    avatar,
                    password,
                  };
                  localStorage.setItem(
                    "care-accounts",
                    JSON.stringify(accounts),
                  );
                  save({ name: accounts[phone].name, phone, avatar });
                } else {
                  if (
                    !accounts[phone] ||
                    accounts[phone].password !== password
                  ) {
                    setNotice("手机号或密码不正确，请先注册");
                    return;
                  }
                  const a = accounts[phone];
                  save({ name: a.name, phone, avatar: a.avatar });
                }
                setAuth(false);
                setNotice(register ? "注册成功" : "登录成功");
              }}
            >
              {register && (
                <>
                  <label className="upload">
                    {avatar ? <img src={avatar} /> : <span>＋ 上传头像</span>}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => upload(e.target.files?.[0])}
                    />
                  </label>
                  <Input
                    name="name"
                    placeholder="昵称"
                    required
                    maxLength={20}
                  />
                </>
              )}
              <Input
                name="phone"
                placeholder="手机号"
                type="tel"
                pattern="1[0-9]{10}"
                title="请输入11位手机号"
                required
              />
              <Input
                name="password"
                placeholder="密码（至少6位）"
                type="password"
                minLength={6}
                required
              />
              <Button type="primary" htmlType="submit" block className="wide">
                {register ? "注册并登录" : "登录"}
              </Button>
            </form>
            <Button className="switch" onClick={() => setRegister(!register)}>
              {register ? "已有账号？去登录" : "还没有账号？立即注册"}
            </Button>
            <p className="footnote">仅用于本地演示，请勿使用真实密码。</p>
          </section>
        </div>
      )}
      {selected && (
        <div className="overlay">
          <section className="modal">
            <Button className="close" onClick={() => setSelected(null)}>
              ×
            </Button>
            <span className="accent">专业认证技师</span>
            <h2>{selected.name}</h2>
            <p>{selected.tag}</p>
            <p className="muted">
              ★ {selected.score} · 已服务 {selected.orders} 单
            </p>
            <p>
              90
              分钟专业护理，帮助舒缓日常疲惫。服务时间与地址将在正式预约时确认。
            </p>
            <h2 className="price">¥{selected.price}</h2>
            <Button
              className="primary wide"
              onClick={() => {
                if (!user) {
                  setSelected(null);
                  setAuth(true);
                } else
                  setNotice(
                    "已收到预约意向。当前为演示版本，暂不生成真实订单。",
                  );
              }}
            >
              预约服务
            </Button>
          </section>
        </div>
      )}
      {settings && (
        <div className="overlay">
          <section className="modal">
            <Button className="close" onClick={() => setSettings(false)}>
              ×
            </Button>
            <h2>基本设置</h2>
            <label className="row">
              接收活动推送
              <Switch
                checked={push}
                onChange={(checked) => {
                  setPush(checked);
                  localStorage.setItem("care-push", String(checked));
                }}
              />
            </label>
            <p className="muted">此设置仅保存在当前浏览器。</p>
            <p>版本 1.0.0 · 测试到家</p>
          </section>
        </div>
      )}
      {notice && (
        <div className="overlay alert-overlay">
          <section className="modal">
            <h2>温馨提示</h2>
            <p>{notice}</p>
            <Button className="primary wide" onClick={() => setNotice("")}>
              知道了
            </Button>
          </section>
        </div>
      )}
    </>
  );
}

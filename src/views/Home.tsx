"use client";
import {useRouter} from 'next/navigation';import {people} from '../data/technicians';import {useApp} from '../context/AppContext';import {TechnicianList} from '../components/TechnicianList';export default function Home(){const {setNotice, setQuery, setFilter}=useApp();const router=useRouter();const nav=(path:string)=>router.push(path);const renderCards=(list:typeof people)=><TechnicianList list={list}/>;return (            <>
              <header>
                <div className="row">
                  <strong className="logo">
                    沐禾<span>到家</span>
                  </strong>
                  <button
                    className="location"
                    onClick={() =>
                      setNotice("当前展示深圳地区服务，其他城市敬请期待")
                    }
                  >
                    深圳⌄
                  </button>
                </div>
                <p>把舒适与放松，送到你身边</p>
              </header>
              <main>
                <div className="search" onClick={() => nav("/service")}>
                  ⌕ <span>搜索技师、服务项目</span>
                </div>
                <section className="hero">
                  <small>给忙碌生活，一次深呼吸</small>
                  <h1>
                    好好放松
                    <br />
                    自在到家。
                  </h1>
                  <p>专业护理 · 预约上门 · 安心享受</p>
                  <button onClick={() => nav("/service")}>
                    探索舒心服务 ↗
                  </button>
                  <div className="orb" />
                  <span className="hero-label">RELAX & RECHARGE</span>
                </section>
                <div className="assurances">
                  <span>✓ 实名认证</span>
                  <span>✓ 专业技师</span>
                  <span>✓ 安心保障</span>
                </div>
                <div className="categories">
                  {["肩颈舒缓", "中式推拿", "精油护理", "运动放松"].map(
                    (s, i) => (
                      <button
                        onClick={() => {
                          setQuery("");
                          setFilter("全部");
                          nav("/service");
                        }}
                        key={s}
                      >
                        <span>{["♧", "◈", "❀", "〰"][i]}</span>
                        {s}
                      </button>
                    ),
                  )}
                </div>
                <div
                  className="promo"
                  onClick={() =>
                    setNotice("新客优惠：预约时可享首单立减 ¥30（演示活动）")
                  }
                >
                  <div>
                    <b>初次见面，送你一份松弛感</b>
                    <p>新客专享 · 首单立减</p>
                  </div>
                  <strong>
                    ¥30 <small>领取 →</small>
                  </strong>
                </div>
                <div className="section-title">
                  <div>
                    <h2>人气技师</h2>
                    <p>用专业与温度，照顾每一份疲惫</p>
                  </div>
                  <button onClick={() => nav("/service")}>查看全部 ›</button>
                </div>
                {renderCards(people.slice(0, 3))}
              </main>
            </>
 );}
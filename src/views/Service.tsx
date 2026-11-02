"use client";
import {useRouter} from 'next/navigation';import {people} from '../data/technicians';import {useApp} from '../context/AppContext';import {TechnicianList} from '../components/TechnicianList';export default function Service(){const {selected, query, setQuery, filter, setFilter}=useApp();const router=useRouter();const nav=(path:string)=>router.push(path);const renderCards=(list:typeof people)=><TechnicianList list={list}/>;return (            <>
              <header>
                <h2>发现好服务</h2>
                <p>总有一位专业技师，懂你的需要</p>
              </header>
              <main>
                <div className="search">
                  <span>⌕</span>
                  <input
                    placeholder="搜索姓名或服务项目"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <div className="filters">
                  {["全部", "评分优先", "价格优先"].map((f) => (
                    <button
                      className={filter === f ? "selected" : ""}
                      onClick={() => setFilter(f)}
                      key={f}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                <p className="muted">专业认证 · 明码标价 · 按需预约</p>
                {renderCards(
                  people
                    .filter((p) => (p.name + p.tag).includes(query))
                    .sort((a, b) =>
                      filter === "价格优先"
                        ? a.price - b.price
                        : filter === "评分优先"
                          ? Number(b.score) - Number(a.score)
                          : 0,
                    ),
                )}
                {!people.some((p) => (p.name + p.tag).includes(query)) && (
                  <p className="empty">暂未找到相关技师，试试其他关键词</p>
                )}
              </main>
            </>
 );}
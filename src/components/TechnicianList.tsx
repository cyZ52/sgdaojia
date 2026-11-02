import {people} from '../data/technicians';import {useApp} from '../context/AppContext';export function TechnicianList({list}:{list:typeof people}){const {setSelected}=useApp();  function cards(list: typeof people) {
    return (
      <div className="technicians">
        {list.map((p, i) => (
          <article className="tech" key={p.name} onClick={() => setSelected(p)}>
            <div className="portrait" style={{ background: p.color }}>
              <span>{p.initial}</span>
              <small>{i % 2 ? "可预约" : "最快30分钟"}</small>
            </div>
            <div className="tech-info">
              <div className="row">
                <h3>
                  {p.name}
                  <em>实名认证</em>
                </h3>
                <b className="rating">★ {p.score}</b>
              </div>
              <p>{p.tag}</p>
              <div className="tags">
                <span>专业认证</span>
                <span>服务保障</span>
              </div>
              <div className="row">
                <strong className="price">
                  ¥{p.price}
                  <small> / 90分钟</small>
                </strong>
                <span className="muted">已服务 {p.orders} 单</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    );
  }
return cards(list)}
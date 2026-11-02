"use client";
import {createContext,useContext,useState,useEffect,type ReactNode} from 'react';import {people} from '../data/technicians';type User={name:string;phone:string;avatar:string};function useStateValue(){  const [user, setUser] = useState<User | null>(null);
  const [auth, setAuth] = useState(false);
  const [register, setRegister] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [notice, setNotice] = useState("");
  const [selected, setSelected] = useState<(typeof people)[number] | null>(
    null,
  );
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("全部");
  const [settings, setSettings] = useState(false);
  const [push, setPush] = useState(true);
useEffect(()=>{try{setUser(JSON.parse(localStorage.getItem("care-user")||"null"));setPush(localStorage.getItem("care-push")!=="false")}catch{}},[]);

  function save(u: User | null) {
    setUser(u);
    u
      ? localStorage.setItem("care-user", JSON.stringify(u))
      : localStorage.removeItem("care-user");
  }
  function upload(file?: File) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setNotice("请选择图片文件");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      setNotice("请选择 3MB 以内的图片");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const value = String(reader.result);
      setAvatar(value);
      if (user) save({ ...user, avatar: value });
    };
    reader.readAsDataURL(file);
  }
return {user, auth, setAuth, register, setRegister, avatar, notice, setNotice, selected, setSelected, query, setQuery, filter, setFilter, settings, setSettings, push, setPush, save, upload}}const Context=createContext<ReturnType<typeof useStateValue>|null>(null);export function AppProvider({children}:{children:ReactNode}){const value=useStateValue();return <Context.Provider value={value}>{children}</Context.Provider>}export function useApp(){const v=useContext(Context);if(!v)throw Error('Provider missing');return v}
import Cookies from 'universal-cookie';  
const cookie = new Cookies();
const EXPIRES_IN = 1000 * 60 * 60 * 24 * 7 ; // 7 days

export const saveCookie = ({
  name ,
  data 
}: {name: string, data: any}) => {
  let now = new Date() 
  cookie.set(name, data, {
    path: "/",
    expires: new Date(now.getTime() + EXPIRES_IN),
  });
};

export const loadCookie = (name: string) => {
  const result = cookie.get(name);
  return typeof result !== "undefined" ? result : false;
};
export const removeCookie = (name: string) => {
  cookie.remove(name,{
  path: "/"
});
}; 

import { Outlet } from "react-router";

export function DashboardLayout(){
  return(
    <div className="">
      <header>Cabecalho</header>
      <div>
        <Outlet/>
      </div>
    </div>  
  )
}
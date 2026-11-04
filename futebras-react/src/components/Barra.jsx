// Barra de progresso (antes: <div class="barra"><div style="width:78%"></div></div>)
export default function Barra({ valor }) {
  return (
    <div className="barra">
      <div style={{ width: `${valor}%` }}></div>
    </div>
  )
}

/* Etiqueta amarela do perk (antes: perkHtml() do comum.js) */
import { DESCRICAO_PERKS } from "../jogo/regras";

export default function Perk({ perk }) {
    if (!perk) return <span className="sutil">Sem perk</span>;
    return <span className="perk" title={DESCRICAO_PERKS[perk]}>{perk}</span>;
}

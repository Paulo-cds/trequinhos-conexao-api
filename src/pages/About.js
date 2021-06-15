import React from 'react'
import {Link} from 'react-router-dom'
import perfil from '../images/perfil.jpg'

import { makeStyles } from '@material-ui/core/styles'

import * as S from '../styles/AboutStyle'

import {
    //Tittle,
    //sobre,
 } from '../styles/AboutStyle'

function About(){
    return(
        <S.sobre>
            <S.perfil src={perfil} />

            <S.Tittle>
                Quem sou eu?
            </S.Tittle>

            <p>Sou uma caiçara, formada em Educação Física, que desde criança tem paixão por trabalhos manuais. Aliando essa paixão, com a vontade de estudar e de buscar alternativas para cosméticos menos agressivos, surgiu a ideia de montar uma lojinha virtual de Trequinhos artesanais, feitos a mão, com muito carinho. Todo o processo para fabricação de cada Trequinho, envolve estudo, escolha de matéria prima de qualidade, cheiros, cores e bases para uso cosmético, dessa forma garantindo a qualidade e segurança de cada produto. Tudo pode ser utilizado na pele, pois são insumos testados de fábrica, e antes de disponibilizar para venda, faço questão de testar cada um deles. O carro chefe aqui sempre serão os itens cheirosos, sabonetes artesanais,  fitoterápicos e cosméticos com uma pegada mais natural. Mas de vez em quando vão aparecer outros tipos de artesanato, porque minha mente e minhas mãos são inquietas, e buscam novas habilidades sempre que possível. Entre, conheça os meus trabalhos, e fique a vontade. A casa é sua!</p>      
        </S.sobre>
    )
}


export default About
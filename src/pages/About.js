import React from 'react'

import perfil from '../images/perfil.jpg'

import * as S from '../styles/AboutStyle'

import Img3 from '../images/av3.jpeg'
import Img4 from '../images/av4.jpeg'
import Img5 from '../images/av5.jpeg'
import Img6 from '../images/av6.jpeg'
import Img7 from '../images/av7.jpeg'

import {
    //Tittle,
    //sobre,
 } from '../styles/AboutStyle'


 import { makeStyles, useTheme } from '@material-ui/core/styles';
 import MobileStepper from '@material-ui/core/MobileStepper';
 import Paper from '@material-ui/core/Paper';
 import Typography from '@material-ui/core/Typography';
 import Button from '@material-ui/core/Button';
 import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
 import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
 import SwipeableViews from 'react-swipeable-views';
 import { autoPlay } from 'react-swipeable-views-utils';
 
 const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
 
 const tutorialSteps = [
   {
     label: '',
     imgPath: Img5,
   },
   {
     label: '',
     imgPath: Img6,
   },
   {
     label: '',
     imgPath: Img3,
   },
   {
     label: '',
     imgPath: Img4,
   },
   {
     label: '',
     imgPath: Img7,
   },
 ];
 
 const useStyles = makeStyles((theme) => ({
   root: {
     maxWidth: '25rem',     
     flexGrow: 1,
     margin: '3rem auto 7rem',
   },
   header: {
     display: 'flex',
     alignItems: 'center',
     height: 50,
     paddingLeft: theme.spacing(4),
     backgroundColor: theme.palette.background.default,
   },
   img: {
     height: '100%',
     display: 'block',    
     overflow: 'hidden',
     width: '100%',
     marginBottom: 0,
   },
 }));







function About(){
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = tutorialSteps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return(
        <S.sobre>
            <S.perfil src={perfil} />

            <S.Tittle>
                Quem sou eu?
            </S.Tittle>

            <p>Sou uma cai??ara, formada em Educa????o F??sica, que desde crian??a tem paix??o por trabalhos manuais. Aliando essa paix??o, com a vontade de estudar e de buscar alternativas para cosm??ticos menos agressivos, surgiu a ideia de montar uma lojinha virtual de Trequinhos artesanais, feitos a m??o, com muito carinho. Todo o processo para fabrica????o de cada Trequinho, envolve estudo, escolha de mat??ria prima de qualidade, cheiros, cores e bases para uso cosm??tico, dessa forma garantindo a qualidade e seguran??a de cada produto. Tudo pode ser utilizado na pele, pois s??o insumos testados de f??brica, e antes de disponibilizar para venda, fa??o quest??o de testar cada um deles. O carro chefe aqui sempre ser??o os itens cheirosos, sabonetes artesanais,  fitoter??picos e cosm??ticos com uma pegada mais natural. Mas de vez em quando v??o aparecer outros tipos de artesanato, porque minha mente e minhas m??os s??o inquietas, e buscam novas habilidades sempre que poss??vel. Entre, conhe??a os meus trabalhos, e fique a vontade. A casa ?? sua!</p>     


            <S.aval>
              <S.Tittle>
                  Avalia????es
              </S.Tittle>
            
              <div className={classes.root}>
                  <Paper square elevation={0} className={classes.header}>
                      <Typography>{tutorialSteps[activeStep].label}</Typography>
                  </Paper>
                  <AutoPlaySwipeableViews
                      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                      index={activeStep}
                      onChangeIndex={handleStepChange}
                      enableMouseEvents
                  >
                      {tutorialSteps.map((step, index) => (
                      <div key={step.label}>
                          {Math.abs(activeStep - index) <= 2 ? (
                          <img className={classes.img} src={step.imgPath} alt={step.label} />
                          ) : null}
                      </div>
                      ))}
                  </AutoPlaySwipeableViews>
                  <MobileStepper
                      steps={maxSteps}
                      position="static"
                      variant="text"
                      activeStep={activeStep}
                      nextButton={
                      <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                          Next
                          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                      </Button>
                      }
                      backButton={
                      <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                          Back
                      </Button>
                      }
                  />
              </div>
            </S.aval>
        </S.sobre>
    )
}


export default About
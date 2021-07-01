import React from 'react'

import perfil from '../images/perfil.jpg'

import * as S from '../styles/AboutStyle'

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
     imgPath:
       'https://scontent.fubt2-1.fna.fbcdn.net/v/t1.6435-9/204253101_327243838979913_8130571153715559543_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=a26aad&_nc_ohc=z6mNKgX-PSAAX__tOkm&_nc_ht=scontent.fubt2-1.fna&oh=9b16145a42fc720a83b6f5ffed2fe297&oe=60E14B84',
   },
   {
     label: '',
     imgPath:
       'https://scontent.fubt2-1.fna.fbcdn.net/v/t1.6435-9/172702222_287635809607383_4781564641135775517_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=a26aad&_nc_ohc=XDVJSfQTjTYAX_mUJ9V&_nc_ht=scontent.fubt2-1.fna&oh=bb661f66aecabe8ea502e78eb23b6694&oe=60E17FD7',
   },
   {
     label: '',
     imgPath:
       'https://scontent.fubt2-1.fna.fbcdn.net/v/t1.6435-9/170142423_283417893362508_4053100304321035394_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=a26aad&_nc_ohc=MeDkXncUrBoAX9QNyFg&_nc_ht=scontent.fubt2-1.fna&oh=0025c8c758405a567f3305fd2f97afaa&oe=60E09E3E',
   },
   {
     label: '',
     imgPath:
       'https://scontent.fubt2-1.fna.fbcdn.net/v/t1.6435-9/199050101_328991105471853_6963530686327284014_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=a26aad&_nc_ohc=gCcCfFL3lV4AX_KfYry&_nc_ht=scontent.fubt2-1.fna&oh=ca15778f0f9505b1058372c00c998e56&oe=60E08F46',
   },
   {
     label: '',
     imgPath:
       'https://scontent.fubt2-1.fna.fbcdn.net/v/t1.6435-9/174800339_288331916204439_2171936338854003043_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=a26aad&_nc_ohc=D4LNMdgb25oAX-Q2qmZ&_nc_ht=scontent.fubt2-1.fna&oh=4849b8da05724ba7b202436b60943e18&oe=60E12B49',
   },
 ];
 
 const useStyles = makeStyles((theme) => ({
   root: {
     maxWidth: '30rem',
     maxHeight: '30rem',
     flexGrow: 1,
     margin: '7rem auto',
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

            <p>Sou uma caiçara, formada em Educação Física, que desde criança tem paixão por trabalhos manuais. Aliando essa paixão, com a vontade de estudar e de buscar alternativas para cosméticos menos agressivos, surgiu a ideia de montar uma lojinha virtual de Trequinhos artesanais, feitos a mão, com muito carinho. Todo o processo para fabricação de cada Trequinho, envolve estudo, escolha de matéria prima de qualidade, cheiros, cores e bases para uso cosmético, dessa forma garantindo a qualidade e segurança de cada produto. Tudo pode ser utilizado na pele, pois são insumos testados de fábrica, e antes de disponibilizar para venda, faço questão de testar cada um deles. O carro chefe aqui sempre serão os itens cheirosos, sabonetes artesanais,  fitoterápicos e cosméticos com uma pegada mais natural. Mas de vez em quando vão aparecer outros tipos de artesanato, porque minha mente e minhas mãos são inquietas, e buscam novas habilidades sempre que possível. Entre, conheça os meus trabalhos, e fique a vontade. A casa é sua!</p>     


            <S.aval>
            <S.Tittle>
                Avaliações
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
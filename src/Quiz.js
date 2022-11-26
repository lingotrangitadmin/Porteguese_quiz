import React, {useEffect, useState } from 'react'
import shuffle from 'shuffle-array';
import { useSpeechSynthesis } from 'react-speech-kit';
import './Quiz.css'

export const Quiz = () => {
  const [value, setValue] = useState('_____________')
  const [randomQuestions , setRandomQuestions] = useState()
  const [correctAns, setCorrectAns] = useState()
  const [getValues, setGetValue] = useState([])
  const { speak } = useSpeechSynthesis();
  const pronouns = {
    'i' : 'eu' ,
    'you' : 'tu',
    'he' : 'ele',
    'we': 'nos',
    'they': 'elas',
    'she' : 'ela'
  }
 
  const userQuestions = {
    // 'i speak' : 'falo',
    // 'you speak' : 'falas',
    // 'he speaks': 'fala',
    'we speak': 'falamous',
    'they speak' : 'falam',
    'she eats' : 'come',
    'we ate' : 'comemos',
    'we party' : 'festa'
  }

  const nextQuestion = () => {
    const randomQuestion = Object.keys(userQuestions)[Math.floor(Math.random()*Object.keys(userQuestions).length)];
    const correctAns = userQuestions[randomQuestion]
    setRandomQuestions(randomQuestion)
    setCorrectAns(correctAns)
    const ranOptions =  getRandomOptions(correctAns, userQuestions)
    setGetValue(ranOptions)
  }

  useEffect(() => {
    nextQuestion()
  },[])

  useEffect(() => {
    speak({ text: randomQuestions })
  }, [randomQuestions])


  const getRandomOptions = (correctAns, question) => {
    let correctValue = [correctAns]
    while (correctValue.length < 4) {
     let option =  Object.keys(question)[Math.floor(Math.random()*Object.keys(question).length)];
    //To get the (4)options other than correct one and push to the options array
      if(correctValue.indexOf(question[option]) === -1) {
        correctValue.push(question[option])
      }
    }
    return shuffle(correctValue)
  }

  const userClickValue = (event) =>{
    if( correctAns === event.target.innerText) {
      setValue(event.target.innerText)
      setTimeout(() => {
        setValue('_____________')
        nextQuestion()
      }, 2000)
    }
  }


  const cards = getValues.map((val, i) => <li key={i} className="cards">{val}</li> )

    return(
      <>
        <div className='main'>
          <p>Choose the correct word</p>
          <h2>{randomQuestions ?  pronouns[randomQuestions.split(' ')[0]] : ' '}  <span className='value'> {value} </span></h2>
          <p> <span className='english-1'> { randomQuestions ? randomQuestions.split(' ')[0] : '' } </span>
          <span className='english-2'> { randomQuestions ? randomQuestions.split(' ')[1] : '' } </span>
          </p>  
        </div>
        <ul className='options' onClick={(event) => userClickValue(event)}>{cards}</ul>
      </>
    )
}
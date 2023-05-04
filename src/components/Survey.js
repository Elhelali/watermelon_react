import React, { useState, useEffect } from 'react';
import Question from './Question'
import '../App.css';
import CurrencyDropdown from './CurrencyDropdown';
import * as requests from '../requests'
import { v4 as uuidv4 } from 'uuid';

const Survey = () => {

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [validationMessage, setValidationMessage] = useState(false);
  const [complete, setComplete] = useState(false);
  const [surveyData, setSurveyData] = useState({
    "uuid":uuidv4(),
    "name":"",
    "balance":"",
    "currency":"USD",
    "sell_price":"",
    "sell_currency":"USD",
    "photo":false,
    "network":"Polygon",
    "recipient_address":"",
    "email":""

  })
  const handleSurveyData =(key,value) =>{
    const surveyDataCopy = {...surveyData}
    surveyDataCopy[key] = value
    setSurveyData(surveyDataCopy)
  }
  const validateNotEmpty = (key) =>{
    if (surveyData[key]){
        return true
    }
    else{
        return false
    }
  }
useEffect(()=>{requests.update_survey(surveyData)},
[surveyData])
//   const validatePhotoSize = () =>{
//     if (surveyData.photo && surveyData.photo.size > 3000000){
//         return false
//     }
//     else{
//         return true
//     }
//   }
  const questions = [
    {
    key:0,
    component:<Question
    title={"What is the name of your store?"}    
    subtitle={"Example: Razer Gold, Amazon, Target. (If you have multiple stores, choose your top gift card -- you can always add more later.)"}
    inputs={
        <input onChange={(e)=>{handleSurveyData('name',e.target.value)}} value={surveyData.name} className='input text_input' />
    }
    />,
    validations:[]
    },
    {   key:1,
        component:<Question
                title={"Balance:"}   
                subtitle={"What is the balance left on your gift card? If possible, please double check your balance before entering the number here. Example answer: $100, 2,000 INR, 200 EUR."}
                inputs={
                <>
                <input onChange={(e)=>{handleSurveyData('balance',e.target.value)}} value={surveyData.balance} className='input text_input' style={{width:"100px"}} />
                <CurrencyDropdown value={surveyData.currency} onChange={(e)=>{handleSurveyData('currency',e.target.value)}}  />
                </> }
                
                />
    ,
    validations:[{valid:validateNotEmpty('balance'),message:"Please Enter Balance left on Gift Card"}]   
    }
    ,
    {   key:2,
        component:<Question
                title={"What price are you selling at?"}   
                subtitle={"Example Answer: $70. Please remember a low prices generally results in a faster and more successful sale, and we recommend a substantial discount. \
                 This number must be strictly at least ten percent less than the face value of the card, as we only sell discounted gift cards."}
                inputs={
                <>
                <input onChange={(e)=>{handleSurveyData('sell_price',e.target.value)}} value={surveyData.sell_price} className='input text_input' style={{width:"100px"}} />
                <CurrencyDropdown value={surveyData.sell_currency} onChange={(e)=>{handleSurveyData('sell_currency',e.target.value)}}  />
                </> }
                
                />
    ,
    validations:[{valid:validateNotEmpty('sell_price'),message:"Please Enter Sell Price"}]   
    },
    // {   key:3,
    //     component:<Question
    //             title={"Upload a photo of your gift card:"}   
    //             subtitle={"Please pick an image less than 3MB in size. You may skip this step."}
    //             inputs={
    //             <>
    //             <input type="file"  onChange={(e)=>{handleSurveyData('photo',e.target.files[0])}} />
    //             </> }
                
    //             />
    // },
    {   
    key:4,
    component:<Question
            title={"Which network would you like to receive funds at?"}   
            subtitle={"If you are unsure, please select Polygon. (You may change this later.)"}
            inputs={
             <select onChange={(e)=>{handleSurveyData('network',e.target.value)}} value={surveyData.network} className='input' style={{width: "150px",padding:"20px 0", fontSize:"14px"}}>                  
                <option value="Polygon">Polygon</option>
                <option value="Ethereum">Ethereum</option>
            </select>
            }            
            />,
    validations:[]
}
,
{   
    key:5,
    component:<Question
            title={"What Polygon or Ethereum address would you like to receive funds at?"}   
            subtitle={"You may change this later. Example: 0xfA63Ca5caF1D88f42e1A73aE0E0cb7060B9E7292"}
            inputs={
            <input onChange={(e)=>{handleSurveyData('recipient_address',e.target.value)}} value={surveyData.recipient_address} className='input text_input' />
            }
                       
            />,
    validations:[]
}
,
{   
    key:6,
    component:<Question
            title={"Almost done! What is your email address?"}   
            subtitle={"We will only use this to reach out about the transaction. Please check this often as we'll use this as the main way of getting in touch."}
            inputs={
            <input onChange={(e)=>{handleSurveyData('email',e.target.value)}} value={surveyData.email} className='input text_input' />
            }
                       
            />,
    validations:[]
}
,
    
  ];

  const handleNextClick = () => {
    setValidationMessage("")
    const validations = questions[currentQuestionIndex].validations
    for (const validation of validations) {
        if (!validation.valid){
            setValidationMessage(validation.message)
            return
        }
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    else{
        setComplete(true)
    }
  };

  const handlePrevClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  const renderDots = () => {
    return questions.map((question, index) => (
      <span
        key={question.id}
        className={`dot ${index <= currentQuestionIndex ? 'active' : ''}`}
        onClick={()=>{
            if (index < currentQuestionIndex){
                setCurrentQuestionIndex(index)
            } 
        }}
      ></span>
    ));
  };
  
  return (
    <div>
      <h1>Watermelon Markets - Seller Survey</h1>
      {complete?
      <h2 style={{fontWeight:'400'}}>
            Thank You!
            We will be in touch soon.
        </h2>:
      <div id="survey">
      {questions[currentQuestionIndex].component}
      <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
      { currentQuestionIndex !== 0 &&<button className="nav_button" onClick={handlePrevClick} >
        Back
      </button>}
      <button className='nav_button'style={{color:"white", backgroundColor:"#007bff"}} onClick={handleNextClick}>
        {currentQuestionIndex === questions.length - 1? "Complete" : "Next"}
      </button>
      </div>
      {validationMessage && <p style={{color:'red'}}>{validationMessage}</p>}
      <div className="dots_container">{renderDots()}</div>
      </div>}
    </div>
  );
};

export default Survey;
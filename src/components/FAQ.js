import React from 'react';
import * as utils from './utils';


const faqItems = [
  [
    "What is the Seattle Flu Study?",
    "We're mapping the spread of the flu in Seattle. Today, up to 80,000 people in the United States die from the flu each year, and more than 30 million people get sick and suffer. We know that the flu is spread from person to person, and we know that it causes outbreaks every year. What we don't know is how it spreads, and why certain flu strains are stronger and more dangerous than others. The Seattle Flu Study is on a mission to change that."
  ],
  [
    "How do I participate?",
    (<>
    {"You can find a kiosk "}
    <utils.InternalLink to="/kiosks">here</utils.InternalLink>
    {"."}
    <p/>
    {"If you are feeling ill with two or more cold or flu-like symptoms, you can participate. These symptoms include:"}
    <ul>
      <li>{"Fever* or feeling feverish/chills"}</li>
      <li>{"Cough"}</li>
      <li>{"Sore throat"}</li>
      <li>{"Runny or stuffy nose"}</li>
      <li>{"Muscle or body aches"}</li>
      <li>{"Headaches"}</li>
      <li>{"Fatigue (tiredness)"}</li>
      <li>{"Some people may have vomiting and diarrhea, though this is more common in children than adults."}</li>
    </ul>
    <i>{"*Note: not everyone with flu will have a fever."}</i>
    </>)
  ],
  [
    "Who should participate in the study?",
    "Anyone (including infants and the elderly) who is sick with a cold or the flu. If you are experiencing cold/flu-like symptoms you could help our study and our ability to understand and fight the flu."
  ],
  [
    "Is there any reason that I shouldn't participate?",
    "Please do not enroll if you don’t have at least two symptoms of a cold or flu."
  ],
  [
    "What is the process and how long does it take?",
    (<>
      <span>{"It takes 15 minutes to participate, and we'll work extra hard to distract you from feeling crummy."}</span>
      <br/>
      <ol>
        <li>{"You'll answer some questions about your health and where you live (geography matters because we are mapping where the flu is.)"}</li>
        <li>{"We'll take a swab from your nose."}</li>
        <li>{"You're done! Collect your $10 gift card and be on your way."}</li>
      </ol>
    </>)
  ],
  [
    "Can you tell me more about the nose swab? Is it painful?",
    "It takes 5-10 seconds and it might tickle a bit. We take the nose swab from the front of your nose with a soft cotton-like Q-tip."
  ],
  [
    "What data are you gathering from my nose swab?",
    "We'll use your nose swab to figure out what germs are making you sick."
  ],
  [
    "Will I get personalized results after participating in the study?",
    "No, but in the future we hope to make a map of the flu in Seattle available."
  ],
  [
    "Will my results be anonymous?",
    "We will record your name for the purposes of obtaining your consent to participate the study, and your address in order to map how the flu spreads. No identifiable data will ever be made publicly available. All links between your limited personal data and swab results will be destroyed at the end of the overall study."
  ],
  [
    "What will happen to my sample after the study?",
    "We will keep it frozen in case we need to repeat the experiment to figure out what germs are in your sample. At the end of the study, all links between your personal data and the swab data will be deleted."
  ],
  [
    "Could participating in this study affect my insurance in any way?",
    "No, because all of the information we collect will be confidential."
  ],
  [
    "Will I be tracked after the study?",
    "No. At the end of the study, all links between your personal data and swab data will be deleted."
  ],
  [
    "Can I get a flu shot from the Seattle Flu Study?",
    "No, but thank you for asking! We are gathering data to track and study the flu. We are NOT administering the flu vaccine."
  ],
  [
    "Can I help to stop the spread of the flu? ",
    (<>
      <span>{"Yes you can, and here's how:"}</span>
      <br/>
      <ul>
        <li>{"Wash your hands"}</li>
        <li>{"Sneeze into your arm"}</li>
        <li>{"Stay home when you are sick"}</li>
      </ul>
    </>)
  ]  
]


export const FAQ = () => (
  <utils.OuterContainer>
    <utils.ContentContainer>
      <utils.H1>Frequently Asked Questions</utils.H1>
      <utils.Ordered items={faqItems}/>
    </utils.ContentContainer>
  </utils.OuterContainer>
);

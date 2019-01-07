import React from 'react';
import * as utils from './utils';


const faqItems = [
  [
    "What is the Seattle Flu Study?",
    "We're mapping the spread of the flu in Seattle"
  ],
  [
    "How do I participate?",
    "You may see kiosks around town. If you are feeling ill with cold or flu-like symptoms, you can participate."
  ],
  [
    "Who should participate in the study?",
    "Everyone (infants to the elderly) who is sick with a cold or the flu. If you are experiencing cold/flu-like symptoms you could help our study and our ability to understand and fight the flu."
  ],
  [
    "Is there any reason that I shouldn't participate?",
    (<>
      <ul>
        <li>{"Please do not enroll if you are NOT feeling 2 or more cold or flu-like symptoms."}</li>
        <li>{"Please don't enroll if you are seriously ill."}</li>
      </ul>
    </>)
  ],
  [
    "What is the process and how long does it take?",
    (<>
      <span>{"It takes 15 minutes to participate, and we'll work extra hard to distract you from feeling crummy."}</span>
      <br/>
      <ol>
        <li>{"You'll answer some questions about your health and where you live (geography matters because we are mapping where the flu is.)"}</li>
        <li>{"We'll take a swab from your nose to collect the exact germs that you have."}</li>
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
    "Not yet, but we plan on doing that in the future. Stay tuned."
  ],
  [
    "Will my results be anonymous?",
    "We are collecting your personal information to understand who gets the flu and to map where the flu exists. Your exact information will not be saved or tracked."
  ],
  [
    "What will happen to my sample after the study?",
    "We will keep it frozen in case we need to repeat the experiment to figure out what germs are in your sample."
  ],
  [
    "Could participating in this study affect my insurance in any way?",
    "No, because the swab from your nose will not be linked to your personal information."
  ],
  [
    "Will I be tracked after the study? ",
    "No. We are not tracking you. We are tracking the germs that are making you sick."
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
  ],
  [
    "What are the symptoms of the flu? ",
    (<>
      <span>{"(If you are feeling 2 or more of these symptoms you could help our study.)"}</span>
      <br/>
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
    "Why does this study matter?",
    "Today, up to 80,000 people in the United States die from the flu each year, and more than double that number get sick and suffer. We know that the flu is spread from person to person, and we know that it causes outbreaks every year. What we don't know is how it spreads, and why certain flu strains are stronger and more dangerous than others. The Seattle Flu Study is on a mission to change that."
  ],
  [
    "Can I get a flu shot from the Seattle Flu Study?",
    "No, and thank you for asking! We are gathering data to track and study the flu. We are NOT administering the flu vaccine."
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

import React from 'react';
import * as utils from './utils';


const faqItems = [
  [
    ' What is the Seattle Flu Study?',
    'We are a study dedicated to mapping the spread of the flu in Seattle. (Do we want to add anymore to this?)'
  ],
  [
    'How do I participate?',
    "TBD"
  ],
  [
    'Who should participate in the study?',
    `Everyone (infants to the elderly) who is sick with a cold. If you are experiencing cold/flu-like symptoms you could help our study and our ability to understand and fight the flu.`
  ],
  [
    "Is there any reason that I shouldn’t participate?",
    (<>
      <span>{`• Please do not enroll if you are NOT feeling 2 or more flu symptoms.`}</span>
      <br/>
      <span>{`• Please don’t enroll if you are seriously ill.`}</span>
    </>)
  ],
  [
    "What is the process and how long does it take?",
    (<>
      <span>{"It takes 15 minutes to participate, and we’ll work extra hard to distract you from feeling crummy."}</span>
      <br/>
      <ol>
        <li>{"Have the flu? We’ll make sure you have 2 or more flu-like symptoms."}</li>
        <li>{"Questionnaire: Tell us a bit about your health and where you live (geography matters because we’re mapping where the flu is.)"}</li>
        <li>{"Swab Time: We’ll take a quick swab from the front of your nose to collect the exact virus you have."}</li>
        <li>{"Finished! Thank you for participating and enjoy your $10 Starbucks card!"}</li>
      </ol>
    </>)
  ],
  [
    "Can you tell me more about the nose swab? Is it painful?",
    "It takes 5-10 seconds and it might tickle a bit. We take the nose swab from the front of the nose with a soft cotton-like Q-tip."
  ],
  [
    "What data are you gathering from my nose swab?",
    "We’ll use your nose swab to figure out what germs are making you sick."
  ],
  [
    "Will I get personalized results after participating in the study?",
    "Not yet, but we plan on doing that in the future. Stay tuned."
  ],
  [
    "Will my results be anonymous? ",
    "We are collecting your personal information, but… birth date>> address >>"
  ],
  [
    "What will happen to my sample after the Study?",
    "We will keep it in the freezer for future use (WHAT FUTURE USE?)"
  ],
  [
    "Could participating in this study affect my insurance in any way?",
    (<>
      <span>{`• No, because by the time we get the information from your swab the virus results will not be linked to your personal data. `}</span>
      <br/>
      <span>{`• No, because the swab will not be linked to your personal information. `}</span>
    </>)
  ],
  [
    "Will I be tracked after the study? ",
    "No. We are not tracking you. We are tracking the virus that is making you sick."
  ],
  [
    "Can I help to stop the spread of the flu? ",
    (<>
      <span>{"Yes you can, and here’s how:"}</span>
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
      <i>{"*It’s important to note that not everyone with flu will have a fever."}</i>
    </>)
  ],
  [
    "Why does this study matter?",
    (<>
      <p>
        {`Today, more than 80,000 people in the United States die from the flu each year, 
        and more than double that number get sick and suffer. We know that the flu is spread 
        from person to person, and we know that it causes outbreaks every year. What we don’t 
        know is how it spreads, and why certain flu strains are stronger and more dangerous than others. 
        The Seattle Flu Study is on a mission to change that.`}
      </p>
      <utils.Quote 
        who={(
          <>
            <span>Bill Gates</span>
            <br/>
            <utils.ExternalLink href="something">What I learned at work this year</utils.ExternalLink>
          </>
        )}
      >
        <p>In 1918, the Spanish flu killed 50 million people worldwide. It still ranks as one of the deadliest natural disasters ever.</p>
        <p>People rightly worry about dangers like terrorism and climate change (and, more remotely, an asteroid hitting the Earth). But if anything is going to kill tens of millions of people in a short time, it will probably be a global epidemic. And the disease would most likely be a form of the flu, because the flu virus spreads easily through the air. Today a flu as contagious and lethal as the 1918 one would kill nearly 33 million people in just six months.</p>
        <p>I have been studying this for several years. To be prepared, we need a plan for national governments to work together. We need to think through how to handle quarantines, make sure supply chains will reach affected areas, decide how to involve the military, and so on. There was not much progress on these questions in 2018.</p>
        <p>To make the most of these scientific efforts (some of which our foundation is funding), the world needs to develop a global system for monitoring and responding to epidemics. That is a political matter that requires international cooperation among government leaders. This issue deserves a lot more focus.”</p>
      </utils.Quote>

      
    </>)
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
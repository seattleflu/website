import React, { useState, useContext, Fragment } from 'react';

import { getBarcodeResults } from '../../../../services/results';
import { resultsContext } from '../ReturnOfResults';
import { Feature, FeatureButton, Form, Input, SubmitButton, BarcodeFaq} from '../styledComponents';

export default function BarcodeSearchForm() {
    const [barcode, setBarcode] = useState("")
    const { setResults, defaultContent, barcodeFaqs } = useContext(resultsContext)

    const handleChange = (event) => {
        setBarcode(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        getBarcodeResults(barcode)
        .then(returnedResults => {
          if (returnedResults) {
            // Convert ID3C lineages to generic pathogen names used in the rest of the app
            if(returnedResults["organisms_present"]){
              returnedResults["organisms_present"] = returnedResults["organisms_present"].map(lineage => {
                const lineageMap = {
                  "Adenovirus": "adenovirus",
                  "Human_coronavirus": "coronavirus",
                  "Enterovirus": "enterovirus",
                  "Influenza": "flu",
                  "Human_metapneumovirus": "hmpv",
                  "Human_parainfluenza": "parainfluenza",
                  "Rhinovirus": "rhinovirus",
                  "RSV": "rsv"
                }
                return lineageMap[lineage]
              });
            }
          setResults(returnedResults)
          }
        })
        .catch(console.error)
    }

    return (
      <Fragment>
        {/* <Feature title = {defaultContent.paragraphOne}>
            <Form onSubmit={handleSubmit}>
                <Input required type="text" value={barcode} onChange={handleChange} />
                <SubmitButton type="submit">{defaultContent.paragraphTwo}</SubmitButton>
            </Form>
        </Feature> */}
        <div className="row">
          <ul className="list-group col-12">
            {barcodeFaqs.map( faq => <BarcodeFaq key={faq.fields.id} faq={faq}/>)}
          </ul>
        </div>

      </Fragment>
    )

}

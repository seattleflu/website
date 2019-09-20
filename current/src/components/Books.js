import * as d3 from 'd3';
import React, { useState } from 'react';

const initialBooks = [
    {
        name: "Harry Potter and the Philosophers Stone",
        author: "J. K. Rowling",
        genre: "fantasy"
    },{
        name: "The Pedagogy of Freedom",
        author: "Bell hooks",
        genre: "non-fiction"
    },{
        name: "Harry Potter and the Chamber of Secrets",
        author: "J. K. Rowling",
        genre: "fantasy"
    },{
        name: "Gilgamesh",
        author: "Derrek Hines",
        genre: "poetry"
    }
]

export default class Books extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            temperatureData = [8, 5, 13, 9, 12];
        }
    }

    d3.select("#myDiv")
        .style("background-color", "blue")

    d3.select("#myDiv")
        .selectAll("h2")
        .data(temperatureData)
        .enter()
            .append("h")
            .text("New Temperature")

    return(
        <div id="myDiv">
            some text goes here
        <h2>Test</h2>
        </div>
    );
};

import React from 'react';
import ReactDOM from 'react-dom'

    // propTypes: {
    //     h:React.PropTypes.number,
    //     axis:React.PropTypes.func,
    //     axisType:React.PropTypes.oneOf(['x','y'])

    // },

export default class Axis extends React.Component {

    componentDidUpdate() {
        this.renderAxis();
    }

    componentDidMount() {
        this.renderAxis();
    }

    renderAxis() {
        var node = ReactDOM.findDOMNode(this);
        d3.select(node).call(this.props.axis);
    }

    render() {

        var translate = "translate(0,"+(this.props.h)+")";

        return (
            <g className="axis" transform={this.props.axisType=='x'?translate:""} >
            </g>
        );
    }

};

    // propTypes: {
    //     h:React.PropTypes.number,
    //     grid:React.PropTypes.func,
    //     gridType:React.PropTypes.oneOf(['x','y'])
    // },

class Grid extends React.Component {
    componentDidUpdate() {
        this.renderGrid();
    }

    componentDidMount() {
        this.renderGrid();
    }

    renderGrid() {
        var node = ReactDOM.findDOMNode(this);
        d3.select(node).call(this.props.grid);
    }

    render() {
        var translate = "translate(0,"+(this.props.h)+")";
        return (
            <g className="y-grid" transform={this.props.gridType=='x'?translate:""}>
            </g>
        );
    }

};

const Dots = (props) => {
    // propTypes: {
    //     data:React.PropTypes.array,
    //     x:React.PropTypes.func,
    //     y:React.PropTypes.func

    // },
    var _self=this;

    //remove last & first point
    var data=this.props.data.splice(1);
    data.pop();

    var circles=data.map(function(d,i){

        return (<circle className="dot" r="7" cx={_self.props.x(d.date)}
                    cy= {_self.props.y(d.count)} fill="#7dc7f4"
                    stroke="#3f5175" strokeWidth="5px" key={i} />);
    });

    return(
        <g>
            {circles}
        </g>
    );
};


// var LineChart=React.createClass({

//     propTypes: {
//         width:React.PropTypes.number,
//         height:React.PropTypes.number,
//         chartId:React.PropTypes.string
//     },

class LineChart extends React.Component {
    getDefaultProps() {
        return {
            width: 600,
            height: 300,
            chartId: 'v1_chart'
        };
    }

    getInitialState() {
        return {
            width:this.props.width
        };
    }

    render() {
        var data=[
            {day:'02-11-2016',count:180},
            {day:'02-12-2016',count:250},
            {day:'02-13-2016',count:150},
            {day:'02-14-2016',count:496},
            {day:'02-15-2016',count:140},
            {day:'02-16-2016',count:380},
            {day:'02-17-2016',count:100},
            {day:'02-18-2016',count:150}
        ];

        var margin = {top: 5, right: 50, bottom: 20, left: 50},
            w = this.state.width - (margin.left + margin.right),
            h = this.props.height - (margin.top + margin.bottom);

        var parseDate = d3.time.format("%m-%d-%Y").parse;

        data.forEach(function (d) {
            d.date = parseDate(d.day);
        });

        var x = d3.time.scale()
            .domain(d3.extent(data, function (d) {
                return d.date;
            }))
            .rangeRound([0, w]);

        var y = d3.scale.linear()
            .domain([0,d3.max(data,function(d){
                return d.count+100;
            })])
            .range([h, 0]);

      var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left')
            .ticks(5);

       var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom')
            .tickValues(data.map(function(d,i){
                if(i>0)
                    return d.date;
            }).splice(1))
            .ticks(4);

        var yGrid = d3.svg.axis()
            .scale(y)
            .orient('left')
            .ticks(5)
            .tickSize(-w, 0, 0)
            .tickFormat("");

        var line = d3.svg.line()
            .x(function (d) {
                return x(d.date);
            })
            .y(function (d) {
                return y(d.count);
            }).interpolate('cardinal');


        var transform='translate(' + margin.left + ',' + margin.top + ')';

        return (
            <div>
                <svg id={this.props.chartId} width={this.state.width} height={this.props.height}>

                    <g transform={transform}>
                        <Grid h={h} grid={yGrid} gridType="y"/>
                        <Axis h={h} axis={yAxis} axisType="y" />
                        <Axis h={h} axis={xAxis} axisType="x"/>
                        <path className="line shadow" d={line(data)} strokeLinecap="round"/>
                        <Dots data={data} x={x} y={y}/>
                    </g>
                </svg>
            </div>
        );
    }
};

const Visitors = () => {
    return (
            <div>
                <h3>Visitors to your site</h3>
                <div className="bottom-right-svg">
                    <LineChart/>
                </div>
            </div>
        )
};

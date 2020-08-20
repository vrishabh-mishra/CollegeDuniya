import React, { Component } from 'react';

import CollegeCardContent from '../college-card-content/CollegeCardContent';
import './CollegeCard.css';

export default class CollegeCard extends Component {

    render() {
        return (
            <div className="college-card">
                {
                    this.props.colleges.map((collegeInfo, i) => {
                        return (
                            <div className="college-card-content" key={i}>
                                <CollegeCardContent collegeDetails={collegeInfo} />
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

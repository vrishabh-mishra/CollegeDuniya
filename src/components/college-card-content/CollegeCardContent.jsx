import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import './CollegeCardContent.css';

export default class CollegeCardContent extends Component {

    /**
     *
     * @param {*} num
     * @return {*} 
     * @memberof CollegeCardContent
     * @description Seperates digits with commas as per Indian Format
     */
    translateToIndianFormat(num) {
        let inputNumber = num.toString();
        let afterPoint = '';
        if (inputNumber.indexOf('.') > 0) {
            afterPoint = inputNumber.substring(inputNumber.indexOf('.'), inputNumber.length);
        }

        inputNumber = Math.floor(inputNumber);
        inputNumber = inputNumber.toString();
        let lastThreeDigit = inputNumber.substring(inputNumber.length - 3);
        const otherNumbers = inputNumber.substring(0, inputNumber.length - 3);
        if (otherNumbers !== '') {
            lastThreeDigit = ',' + lastThreeDigit;
        }

        const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThreeDigit + afterPoint;

        return <span> {res} </span>;
    }

    render() {

        const originalFees = this.translateToIndianFormat(this.props.collegeDetails.original_fees);
        const discountedFees = this.translateToIndianFormat(this.props.collegeDetails.discounted_fees);

        return (

            <div className="about-college">
                <div className="college-image-area">
                    <div className="college-image">
                        <div className="on-img-content">
                            <div className="rating-block">
                                <div>
                                    <span style={{ fontSize: 18.5 + "px", fontWeight: "bold" }}>
                                        {this.props.collegeDetails.rating + " "}
                                    </span>
                                / 5
                            </div>
                                <div> {this.props.collegeDetails.rating_remarks} </div>
                            </div>
                            <div className="tags-block">
                                {
                                    this.props.collegeDetails.tags
                                        && this.props.collegeDetails.tags.length > 0 ?
                                        (this.props.collegeDetails.tags.map((tag, index) => (
                                            <div key={index} className="clg-tags">
                                                {tag}
                                            </div>
                                        )))
                                        : null
                                }
                            </div>
                            <div className="clg-rank">
                                {'#' + this.props.collegeDetails.ranking}
                            </div>
                        </div>

                    </div>
                </div>
                <div className="college-info-area">
                    <div className="clg-area">
                        <div className="clg-title">
                            <span style={{ paddingRight: "10px" }}>
                                {this.props.collegeDetails.college_name}
                            </span>
                            <span style={{ verticalAlign: "middle", display: "inline-flex" }}>
                                {
                                    [...Array(5)].map((e, i) => {
                                        let iconColor = '#adadad';
                                        if (this.props.collegeDetails.rating > i) {
                                            iconColor = '#444444';
                                        }

                                        return (<span key={i} style={{ fontSize: "10px" }}>
                                            <FontAwesomeIcon icon={faStar} color={iconColor} />
                                        </span>)
                                    })

                                }
                            </span>
                        </div>
                        <div>
                            {
                                this.props.collegeDetails.nearest_place
                                    && this.props.collegeDetails.nearest_place.length > 1 ?
                                    <span style={{ fontWeight: "500" }}>
                                        {this.props.collegeDetails.nearest_place[0]}
                                    </span>
                                    : null
                            }
                            {
                                this.props.collegeDetails.nearest_place
                                    && this.props.collegeDetails.nearest_place.length >= 2 ?
                                    <span style={{ color: "#adadad" }}>
                                        {' | ' + this.props.collegeDetails.nearest_place.slice(1).join(' | ')}
                                    </span>
                                    : null
                            }
                        </div>
                        <div>
                            <span style={{ fontWeight: "bold", color: "#37b396" }}>
                                93% Match: &nbsp;
                            </span>
                            {this.props.collegeDetails.famous_nearest_places}
                        </div>
                        <div className="offer-block">
                            {this.props.collegeDetails.offertext}
                        </div>
                    </div>
                    <div className="clg-fees-benefits">
                        <div style={{ padding: "15px 10px" }}>
                            <div>
                                <span>
                                    <strike>
                                        &#8377; {originalFees}
                                    </strike>
                                </span>
                                <span style={{color: "#dd1c26"}}>
                                    &nbsp; {this.props.collegeDetails.discount} % off
                                </span>
                            </div>
                            <div className="disc-fee"> &#8377; {discountedFees} </div>
                            <div style={{ opacity: 0.8 }}> {this.props.collegeDetails.fees_cycle} </div>
                        </div>
                        <div className="clg-amenities">
                            {this.props.collegeDetails.amenties.join(' . ')}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

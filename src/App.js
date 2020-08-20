import React, { Component } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component';

import collegesData from './assets/data/colleges.json';
import CollegeCard from './components/college-card/CollegeCard';

export default class App extends Component {

  state = {
    collegesInfo: null,
    collegeCard: null,
    numberOfVisibleClg: 0,
    hasMore: false
  }

  componentDidMount() {
    //Get Colleges List
    this.fetchMoreColleges(this.state.numberOfVisibleClg);
  }

  /**
   * 
   * @param {*} maxNumberOfVisibleClg
   * @memberof App
   * @description Fetch Colleges detail information
   */
  fetchMoreColleges(maxNumberOfVisibleClg) {

    let collegesVisibleCount = maxNumberOfVisibleClg;
    let hasMoreCollegesInList = false;
    let collegeVisibleList = [];

    if (maxNumberOfVisibleClg < collegesData.colleges.length) {

      hasMoreCollegesInList = false;
      if ((maxNumberOfVisibleClg + 10) < collegesData.colleges.length) {
        hasMoreCollegesInList = true;
        collegesVisibleCount = maxNumberOfVisibleClg + 10;
      } else {
        hasMoreCollegesInList = false;
        collegesVisibleCount = maxNumberOfVisibleClg + (collegesData.colleges.length - maxNumberOfVisibleClg);
      }

      collegeVisibleList = collegesData.colleges.slice(0, collegesVisibleCount);


    } else {
      collegesVisibleCount = collegesData.colleges.length;
      hasMoreCollegesInList = false;
      collegeVisibleList = collegesData.colleges;
    }

    //Adding some delay to load data
    setTimeout(() => this.setState({
      collegesInfo: collegeVisibleList,
      hasMore: hasMoreCollegesInList,
      numberOfVisibleClg: collegesVisibleCount
    }, this.processCollegeData), 1000);

  }

  /**
   * @memberof App
   * @description Process college data. 
   * Calculating for multiple college cards. 
   * One single card contains 2 colleges information
   */
  processCollegeData() {
    if ((this.state.collegesInfo != null) && (this.state.collegesInfo.length > 0)) {
      let numberOfCards = 1;
      if ((this.state.collegesInfo.length % 2) === 0) {
        numberOfCards = this.state.collegesInfo.length / 2;
      } else {
        numberOfCards = (this.state.collegesInfo.length / 2) + 1;
      }

      this.setState({
        collegeCard: numberOfCards
      });
    }
  }


  render() {

    return (
      (this.state.collegesInfo != null) && (this.state.collegesInfo.length > 0) ?
        (
          <InfiniteScroll
            dataLength={this.state.collegeCard}
            next={() => this.fetchMoreColleges(this.state.numberOfVisibleClg)}
            hasMore={this.state.hasMore}
            loader={<h2 style={{ textAlign: 'center' }}>Loading...</h2>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen all the Colleges</b>
              </p>
            }>
            <div className="clg-list-title"> Colleges in North India </div>
            {[...Array(this.state.collegeCard)].map((e, i) =>
              <CollegeCard
                key={i}
                colleges={[this.state.collegesInfo[i * 2], this.state.collegesInfo[(i * 2) + 1]]} />)
            }
          </InfiniteScroll>
        ) : null
    )
  }

}

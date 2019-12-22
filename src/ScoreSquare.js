import React from 'react';
import { Image, Modal } from 'semantic-ui-react';

class ScoreSquare extends React.Component {

  render() {
    const { img, score, char1, char2, matrix, row, col, gap, mismatch, match, highlight } = this.props;
    var left = "N/A";
    var top = "N/A";
    var topleft = "N/A";

    if ( row > 0 && col > 0 ) {
      if ( char1 === char2 ) { //match
        topleft = (matrix[row - 1][col - 1]).toString() + " + " + match.toString() + " = " + (matrix[row - 1][col - 1] + match).toString() + " (Due to match)";
      }
      else {
        topleft = (matrix[row - 1][col - 1]).toString() + " + " + mismatch.toString() + " = " + (matrix[row - 1][col - 1] + mismatch).toString() + " (Due to mismatch)";
      }
    }

    if ( row > 0 ) {
      top = (matrix[row - 1][col]).toString() + " + " + gap.toString() + " = " + (matrix[row - 1][col] + gap).toString() + " (Gap score)";
    }

    if ( col > 0 ) {
      left = (matrix[row][col - 1]).toString() + " + " + gap.toString() + " = " + (matrix[row ][col - 1] + gap).toString() + " (Gap score)";
    }
    return (
      <Modal trigger={
          <div class= { highlight ? "scoreSquare highlighted" : "scoreSquare"}>
              <Image src={img} size='small' />
              <p style={{position: 'absolute', top: '50%', left: '50%'}}> {score} </p>
          </div> }>
        <Modal.Header>Score Calculation</Modal.Header>
        <Modal.Content>
          <h3>Top left:</h3>
          <p>{topleft}</p>
          <h3>Top:</h3>
          <p>{top}</p>
          <h3>Left:</h3>
          <p>{left}</p>
          <h3>Max score: {score}</h3>
        </Modal.Content>
      </Modal>
    );
  }
}
export default ScoreSquare;

import React from 'react';
import { Grid, Container, Image, Modal, Header } from 'semantic-ui-react';
import ScoreSquare from './ScoreSquare';
const UP = [-1,0]
const LEFT = [0, -1]
const TOPLEFT = [-1, -1]
const ORIGIN = [0, 0]

class Matrix extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
            pointers: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
            algorithm: ''
        }
    }
    renderRow = (row, rowIndex, char, pointers, traceback) => {
      const { shortS, longS, matrix, match, mismatch, gap } = this.props;
      return (
        <Grid.Row>
        <Grid.Column>
          <p> {char} </p>
        </Grid.Column>
        {row.map((val, index) => {
            // If this element is a character, just show character
            if (isNaN(val)) {
                return (
                  <Grid.Column>
                    <p> {val} </p>
                  </Grid.Column>
                )
            }
            // If this element is an integer, display arrows
            else {
                var source = "arrows/NONE.png";
                var up, left, topleft = false;
                // Identify all of this cell's pointers
                for (var i = 0; i < pointers[rowIndex][index].length; i++) {
                    if (JSON.stringify(pointers[rowIndex][index][i]) == JSON.stringify(UP)) {
                        up = true;
                    }
                    else if (JSON.stringify(pointers[rowIndex][index][i]) == JSON.stringify(LEFT)) {
                        left = true;
                    }
                    else if (JSON.stringify(pointers[rowIndex][index][i]) == JSON.stringify(TOPLEFT)) {
                        topleft = true;
                    }
                }

                // Display appropriate arrows according to pointers
                if (up && left && topleft) {
                    source = "arrows/UP_LEFT_TOPLEFT.png";
                }
                else if (up && left) {
                    source = "arrows/UP_LEFT.png";
                }
                else if (up && topleft) {
                    source = "arrows/UP_TOPLEFT.png";
                }
                else if (left && topleft) {
                    source = "arrows/LEFT_TOPLEFT.png";
                }
                else if (up) {
                    source = "arrows/UP.png";
                }
                else if (left) {
                    source = "arrows/LEFT.png";
                }
                else if (topleft) {
                    source = "arrows/TOPLEFT.png";
                }

                // Check if this cell is in the traceback
                var in_traceback = false;
                for (var i = 0; i < traceback.length; i++) {
                    if (JSON.stringify([rowIndex, index]) == JSON.stringify(traceback[i])) {
                        in_traceback = true;
                        break;
                    }
                }
                return (
                  <Grid.Column>
                    <ScoreSquare img={source} score={val} row={rowIndex} col={index} mismatch={mismatch} gap={gap} match={match} char1={ shortS.split('')[rowIndex] } char2={ longS.split('')[index]} matrix={matrix} highlight={in_traceback}/>
                  </Grid.Column>
                )
            }
          })
        }
        </Grid.Row>
      );
    }

    render() {
        const { matrix, pointers, traceback, shortS, longS } = this.props;
        return (
          <Container>
            <Grid columns={matrix[0].length + 1} celled>
              {this.renderRow(longS.split(''), 0, ' ', pointers, traceback)}
              {matrix.map((row, index) => {
                  return (
                    this.renderRow(row, index, shortS[index], pointers, traceback)
                  )
              })}
            </Grid>
          </Container>
        );
    }
}

export default Matrix;

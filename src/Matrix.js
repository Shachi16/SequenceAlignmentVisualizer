import React from 'react';
import { Grid, Container, Image } from 'semantic-ui-react';

const UP = [-1,0]
const LEFT = [0, -1]
const TOPLEFT = [-1, -1]
const ORIGIN = [0, 0]

class Matrix extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
            pointers: [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
        }
    }
    renderRow = (row, rowIndex, char, pointers) => {
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
                var source;
                console.log(pointers[rowIndex][index]);
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
                return (
                  <Grid.Column>
                    <Image src={source} size='small' />
                    <p style={{position: 'absolute', top: '50%', left: '50%'}}> {val} </p>
                  </Grid.Column>
                )
            }
          })
        }
        </Grid.Row>
      );
    }
    render() {
        const { matrix, pointers, shortS, longS } = this.props;
        return (
          <Container>
            <Grid columns={matrix[0].length + 1} celled>
              {this.renderRow(longS.split(''), 0, ' ', pointers)}
              {matrix.map((row, index) => {
                  return (
                    this.renderRow(row, index, shortS[index], pointers)
                  )
              })}
            </Grid>
          </Container>
        );
    }
}

export default Matrix;

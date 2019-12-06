import React from 'react';
import { Grid, Image, Button, Container, Card } from 'semantic-ui-react';

class Matrix extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
        }
    }
    renderRow = (row, char) => {
      return (
        <Grid.Row>
        <Grid.Column>
          <p> {char} </p>
        </Grid.Column>
        {row.map((val, index) => {
            return (
              <Grid.Column>
                <p> {val} </p>
              </Grid.Column>
            )
          })
        }
        </Grid.Row>
      );
    }
    render() {
        const { matrix, shortS, longS } = this.props;
        return (
          <Container>
            <Grid columns={matrix[0].length + 1} celled>
              {this.renderRow(longS.split(''), ' ')}
              {matrix.map((row, index) => {
                  return (
                    this.renderRow(row, shortS[index])
                  )
              })}
            </Grid>
          </Container>
        );
    }
}

export default Matrix;

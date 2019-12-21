import React from 'react';
import Matrix from './Matrix';
import { Button } from 'semantic-ui-react';
import { globalAlign } from './GlobalAlign.js';
import { fittingAlign } from './FittingAlign.js';
import { localAlign } from './LocalAlign.js';
class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          matrix: [[]],
          pointers: [[]],
          traceback: [],
          alignment: [],
          v: '',
          w: '',
          match: 0,
          mismatch: 0,
          gap: 0,
          showMatrix: false,
          algorithm: 'global'
        }
    }

    handleClick = () => {
      const { algorithm } = this.state;
      var s1 = '-' + document.getElementById('input_s1').value;
      var s2 = '-' + document.getElementById('input_s2').value;
      var v = s1.length <= s2.length ? s1 : s2;
      var w = s1.length > s2.length ? s1 : s2;
      var match = parseInt(document.getElementById('input_match').value);
      var mismatch = parseInt(document.getElementById('input_mismatch').value);
      var gap = parseInt(document.getElementById('input_gap').value);
      var result;
      if (algorithm === 'global') {
        result = globalAlign(v, w, match, mismatch, gap);
      }
      else if (algorithm === 'fitting') {
        result = fittingAlign(v, w, match, mismatch, gap);
      }
      else {
        result = localAlign(v, w, match, mismatch, gap);
      }
      var M = result[0];
      var p = result[1];
      var traceback = result[2];
      var alignment = result[3].split(/\n/);
      var score = "Score: " + result[4];
      this.setState({matrix: M, pointers: p, traceback: traceback, alignment: alignment, score: score, showMatrix: true, v: v, w: w, match, mismatch, gap, algorithm: algorithm});
    }

    handleChange = () => {
      if (document.getElementById('btn_fitting').checked) {
          this.setState({algorithm: 'fitting'});
      }
      else if (document.getElementById('btn_local').checked) {
          this.setState({algorithm: 'local'});
      }
      else {
        this.setState({algorithm: 'global'});
      }
    }

    render() {
        const { matrix, pointers, traceback, alignment, score, v, w, showMatrix, match, mismatch, gap, algorithm } = this.state;
        return (
          <div>
            <h1> Sequence Aligner </h1>
            <form>
              <fieldset>
                <legend>Select Alignment Algorithm</legend>
                <p>
                  <input onChange={this.handleChange} type="radio" name="algorithm" id="btn_global" value="global" defaultChecked/>
                  <label for="btn_global" class="algorithm_select">Global</label>
                </p>
                <p>
                  <input onChange={this.handleChange} type="radio" name="algorithm" id="btn_fitting" value="fitting"/>
                  <label for="btn_fitting" class="algorithm_select">Fitting</label>
                </p>
                <p>
                  <input onChange={this.handleChange} type="radio" name="algorithm" id="btn_local" value="local"/>
                  <label for="btn_local">Local</label>
                </p>
              </fieldset>
              <fieldset>
                <legend>Enter Sequences</legend>
                <p>
                  <label for="input_s1">Sequence 1</label>
                  <input type="text" id="input_s1"/>
                </p>
                <p>
                  <label for="input_s2">Sequence 2</label>
                  <input type="text" id="input_s2"/>
                </p>
              </fieldset>
              <fieldset>
                <legend>Enter Scoring Function</legend>
                  <label for="input_match">Match</label>
                  <input class="score_input" type="number" id="input_match" min={0}/>
                  <label for="input_mismatch">Mismatch</label>
                  <input class="score_input" type="number" id="input_mismatch" max={0}/>
                  <label for="input_gap">Gap</label>
                  <input class="score_input" type="number" id="input_gap" max={0}/>
              </fieldset>
            </form>
            <div class="display">
              <Button id="btn_compute" onClick={this.handleClick}>Compute Alignment</Button>
              <div style={{margin: "0 auto", fontFamily: "Consolas", fontSize: 20}}>
                <p>{alignment[0]}<br/>{alignment[1]}</p>
                <p>{score}</p>
              </div>
              { showMatrix &&
                <Matrix matrix={matrix} pointers={pointers} traceback={traceback} match={match} mismatch={mismatch} gap={gap} longS={w} shortS={v} algorithm={algorithm}/>
              }
            </div>
          </div>
        );
    }
}

export default Home;
